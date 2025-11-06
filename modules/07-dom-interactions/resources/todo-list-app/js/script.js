/**
 * Todo List App - JavaScript Functionality
 * Features: Add/Delete tasks, Mark as complete, LocalStorage integration
 */

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.taskIdCounter = 1;
        
        // DOM Elements
        this.todoForm = document.getElementById('todoForm');
        this.taskInput = document.getElementById('taskInput');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.taskTemplate = document.getElementById('taskTemplate');
        
        // Counters
        this.countAll = document.getElementById('countAll');
        this.countPending = document.getElementById('countPending');
        this.countCompleted = document.getElementById('countCompleted');
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.loadFromLocalStorage();
        this.bindEvents();
        this.render();
        this.updateCounters();
        
        // Focus on input when page loads
        this.taskInput.focus();
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Form submission
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Clear completed tasks
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to add task
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                this.taskInput.focus();
            }
            
            // Escape to clear input
            if (e.key === 'Escape') {
                this.taskInput.value = '';
                this.taskInput.blur();
            }
        });
    }
    
    /**
     * Add a new task
     */
    addTask() {
        const text = this.taskInput.value.trim();
        
        if (!text) {
            this.showNotification('Vui lòng nhập nội dung công việc!', 'warning');
            return;
        }
        
        if (text.length > 200) {
            this.showNotification('Nội dung công việc quá dài (tối đa 200 ký tự)!', 'warning');
            return;
        }
        
        const task = {
            id: this.taskIdCounter++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        
        this.tasks.unshift(task); // Add to beginning of array
        this.taskInput.value = '';
        this.saveToLocalStorage();
        this.render();
        this.updateCounters();
        
        this.showNotification('Đã thêm công việc mới!', 'success');
        
        // Focus back to input for quick adding
        this.taskInput.focus();
    }
    
    /**
     * Toggle task completion status
     */
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            
            this.saveToLocalStorage();
            this.render();
            this.updateCounters();
            
            const status = task.completed ? 'hoàn thành' : 'chưa hoàn thành';
            this.showNotification(`Đã đánh dấu công việc ${status}!`, 'info');
        }
    }
    
    /**
     * Delete a task
     */
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex > -1) {
            const task = this.tasks[taskIndex];
            
            // Confirm deletion
            if (confirm(`Bạn có chắc muốn xóa công việc "${task.text}"?`)) {
                this.tasks.splice(taskIndex, 1);
                this.saveToLocalStorage();
                this.render();
                this.updateCounters();
                
                this.showNotification('Đã xóa công việc!', 'success');
            }
        }
    }
    
    /**
     * Edit a task
     */
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const newText = prompt('Sửa nội dung công việc:', task.text);
            
            if (newText !== null) {
                const trimmedText = newText.trim();
                
                if (!trimmedText) {
                    this.showNotification('Nội dung công việc không được để trống!', 'warning');
                    return;
                }
                
                if (trimmedText.length > 200) {
                    this.showNotification('Nội dung công việc quá dài (tối đa 200 ký tự)!', 'warning');
                    return;
                }
                
                task.text = trimmedText;
                task.updatedAt = new Date().toISOString();
                
                this.saveToLocalStorage();
                this.render();
                
                this.showNotification('Đã cập nhật công việc!', 'success');
            }
        }
    }
    
    /**
     * Clear all completed tasks
     */
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('Không có công việc đã hoàn thành để xóa!', 'info');
            return;
        }
        
        if (confirm(`Bạn có chắc muốn xóa ${completedCount} công việc đã hoàn thành?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveToLocalStorage();
            this.render();
            this.updateCounters();
            
            this.showNotification(`Đã xóa ${completedCount} công việc đã hoàn thành!`, 'success');
        }
    }
    
    /**
     * Set filter for tasks
     */
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }
    
    /**
     * Get filtered tasks based on current filter
     */
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            default:
                return this.tasks;
        }
    }
    
    /**
     * Render tasks to DOM
     */
    render() {
        const filteredTasks = this.getFilteredTasks();
        this.todoList.innerHTML = '';
        
        if (filteredTasks.length === 0) {
            this.emptyState.classList.add('show');
            return;
        }
        
        this.emptyState.classList.remove('show');
        
        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.todoList.appendChild(taskElement);
        });
    }
    
    /**
     * Create task element from template
     */
    createTaskElement(task) {
        const template = this.taskTemplate.content.cloneNode(true);
        const taskItem = template.querySelector('.task-item');
        const checkbox = template.querySelector('.task-checkbox');
        const label = template.querySelector('.task-label');
        const taskText = template.querySelector('.task-text');
        const editBtn = template.querySelector('.btn-edit');
        const deleteBtn = template.querySelector('.btn-delete');
        
        // Set task data
        taskItem.dataset.id = task.id;
        checkbox.id = `task-${task.id}`;
        label.setAttribute('for', `task-${task.id}`);
        checkbox.checked = task.completed;
        taskText.textContent = task.text;
        
        // Add completion class
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        
        // Bind events
        checkbox.addEventListener('change', () => {
            this.toggleTask(task.id);
        });
        
        editBtn.addEventListener('click', () => {
            this.editTask(task.id);
        });
        
        deleteBtn.addEventListener('click', () => {
            this.deleteTask(task.id);
        });
        
        return template;
    }
    
    /**
     * Update task counters
     */
    updateCounters() {
        const allCount = this.tasks.length;
        const pendingCount = this.tasks.filter(t => !t.completed).length;
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        this.countAll.textContent = allCount;
        this.countPending.textContent = pendingCount;
        this.countCompleted.textContent = completedCount;
        
        // Hide/show clear completed button
        this.clearCompletedBtn.style.display = completedCount > 0 ? 'flex' : 'none';
    }
    
    /**
     * Save tasks to localStorage
     */
    saveToLocalStorage() {
        try {
            const data = {
                tasks: this.tasks,
                taskIdCounter: this.taskIdCounter,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem('todoApp', JSON.stringify(data));
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu:', error);
            this.showNotification('Không thể lưu dữ liệu!', 'error');
        }
    }
    
    /**
     * Load tasks from localStorage
     */
    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('todoApp');
            if (data) {
                const parsed = JSON.parse(data);
                this.tasks = parsed.tasks || [];
                this.taskIdCounter = parsed.taskIdCounter || 1;
                
                // Ensure taskIdCounter is always higher than existing task IDs
                if (this.tasks.length > 0) {
                    const maxId = Math.max(...this.tasks.map(t => t.id));
                    this.taskIdCounter = Math.max(this.taskIdCounter, maxId + 1);
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            this.showNotification('Không thể tải dữ liệu đã lưu!', 'error');
            this.tasks = [];
            this.taskIdCounter = 1;
        }
    }
    
    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: this.getNotificationColor(type),
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '1000',
            animation: 'slideInRight 0.3s ease-out',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
        
        // Add click to dismiss
        notification.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    /**
     * Get notification icon based on type
     */
    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }
    
    /**
     * Get notification color based on type
     */
    getNotificationColor(type) {
        switch (type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            default: return '#667eea';
        }
    }
    
    /**
     * Export tasks to JSON
     */
    exportTasks() {
        const data = {
            tasks: this.tasks,
            exportedAt: new Date().toISOString(),
            totalTasks: this.tasks.length,
            completedTasks: this.tasks.filter(t => t.completed).length
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Đã xuất dữ liệu thành công!', 'success');
    }
    
    /**
     * Import tasks from JSON file
     */
    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.tasks && Array.isArray(data.tasks)) {
                    this.tasks = data.tasks;
                    this.taskIdCounter = Math.max(...this.tasks.map(t => t.id), 0) + 1;
                    this.saveToLocalStorage();
                    this.render();
                    this.updateCounters();
                    this.showNotification('Đã nhập dữ liệu thành công!', 'success');
                } else {
                    throw new Error('Định dạng file không hợp lệ');
                }
            } catch (error) {
                console.error('Lỗi khi nhập dữ liệu:', error);
                this.showNotification('Không thể nhập dữ liệu! File không hợp lệ.', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}