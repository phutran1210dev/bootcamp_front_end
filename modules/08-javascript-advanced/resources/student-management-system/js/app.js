// Main Application Class - Orchestrates the entire application
class StudentManagementApp {
    constructor() {
        this.studentManager = null;
        this.ui = null;
        this.isInitialized = false;
    }

    async initialize() {
        try {
            // Show loading while initializing
            document.getElementById('loading').classList.add('show');
            
            // Initialize core components
            this.studentManager = new StudentManager();
            this.ui = new UIManager(this.studentManager);
            
            // Initialize UI
            this.ui.initialize();
            
            // Setup global error handling
            this.setupErrorHandling();
            
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            // Setup auto-save
            this.setupAutoSave();
            
            this.isInitialized = true;
            
            // Hide loading
            document.getElementById('loading').classList.remove('show');
            
            console.log('Student Management System initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize Student Management System:', error);
            this.showCriticalError('Không thể khởi tạo hệ thống. Vui lòng tải lại trang.');
        }
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.ui.showToast('Đã xảy ra lỗi không mong muốn', 'error');
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.ui.showToast('Đã xảy ra lỗi xử lý dữ liệu', 'error');
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N: Add new student
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.ui.openAddModal();
            }
            
            // Ctrl/Cmd + F: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            
            // Ctrl/Cmd + E: Export data
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.ui.handleExport();
            }
            
            // Escape: Close modals
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal.show');
                modals.forEach(modal => {
                    if (modal.id === 'studentModal') {
                        this.ui.closeModal();
                    } else if (modal.id === 'confirmModal') {
                        this.ui.closeConfirmModal();
                    }
                });
            }
            
            // Delete key: Delete selected students
            if (e.key === 'Delete' && !e.target.matches('input, textarea, select')) {
                const selectedCount = this.studentManager.selectedStudents.size;
                if (selectedCount > 0) {
                    this.ui.handleDeleteSelected();
                }
            }
        });
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            if (this.studentManager) {
                this.studentManager.saveToStorage();
            }
        }, 30000);
        
        // Save before page unload
        window.addEventListener('beforeunload', () => {
            if (this.studentManager) {
                this.studentManager.saveToStorage();
            }
        });
    }

    showCriticalError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-family: Arial, sans-serif;
        `;
        
        errorDiv.innerHTML = `
            <div style="text-align: center; background: #dc2626; padding: 2rem; border-radius: 8px; max-width: 500px;">
                <h2 style="margin-bottom: 1rem;">Lỗi hệ thống</h2>
                <p style="margin-bottom: 1rem;">${message}</p>
                <button onclick="location.reload()" style="background: white; color: #dc2626; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                    Tải lại trang
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
    }

    // Utility methods for external access
    addStudent(studentData) {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return { success: false, error: 'Hệ thống chưa được khởi tạo' };
        }
        
        const result = this.studentManager.create(studentData);
        if (result.success) {
            this.ui.refreshUI();
        }
        return result;
    }

    updateStudent(id, studentData) {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return { success: false, error: 'Hệ thống chưa được khởi tạo' };
        }
        
        const result = this.studentManager.update(id, studentData);
        if (result.success) {
            this.ui.refreshUI();
        }
        return result;
    }

    deleteStudent(id) {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return { success: false, error: 'Hệ thống chưa được khởi tạo' };
        }
        
        const result = this.studentManager.delete(id);
        if (result.success) {
            this.ui.refreshUI();
        }
        return result;
    }

    getStudent(id) {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return null;
        }
        
        return this.studentManager.read(id);
    }

    getAllStudents() {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return [];
        }
        
        return this.studentManager.students;
    }

    searchStudents(searchTerm) {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return [];
        }
        
        this.studentManager.setSearchTerm(searchTerm);
        this.ui.refreshUI();
        return this.studentManager.filteredStudents;
    }

    getStatistics() {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return { total: 0, male: 0, female: 0, filtered: 0 };
        }
        
        return this.studentManager.getStatistics();
    }

    exportData() {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return null;
        }
        
        return this.studentManager.exportData();
    }

    importData(jsonData) {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return { success: false, error: 'Hệ thống chưa được khởi tạo' };
        }
        
        const result = this.studentManager.importData(jsonData);
        if (result.success) {
            this.ui.refreshUI();
        }
        return result;
    }

    // Development helpers
    generateSampleData() {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return;
        }
        
        this.studentManager.generateSampleData();
        this.ui.refreshUI();
        this.ui.showToast('Đã tạo dữ liệu mẫu', 'success');
    }

    clearAllData() {
        if (!this.isInitialized) {
            console.error('Application not initialized');
            return;
        }
        
        this.studentManager.students = [];
        this.studentManager.selectedStudents.clear();
        this.studentManager.saveToStorage();
        this.studentManager.applyFilters();
        this.ui.refreshUI();
        this.ui.showToast('Đã xóa tất cả dữ liệu', 'success');
    }

    // Debug information
    getDebugInfo() {
        if (!this.isInitialized) {
            return { error: 'Application not initialized' };
        }
        
        return {
            totalStudents: this.studentManager.students.length,
            filteredStudents: this.studentManager.filteredStudents.length,
            currentPage: this.studentManager.currentPage,
            pageSize: this.studentManager.pageSize,
            searchTerm: this.studentManager.searchTerm,
            genderFilter: this.studentManager.genderFilter,
            sortBy: this.studentManager.sortBy,
            selectedStudents: this.studentManager.selectedStudents.size,
            version: '1.0.0'
        };
    }
}

// Global application instance
const app = new StudentManagementApp();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.initialize();
});

// Global utility functions for HTML onclick handlers
window.openAddModal = () => app.ui.openAddModal();
window.openEditModal = (id) => app.ui.openEditModal(id);
window.confirmDelete = (id) => app.ui.confirmDelete(id);
window.goToPage = (page) => app.ui.goToPage(page);

// Console helpers for development
window.studentApp = {
    app,
    addSample: () => app.generateSampleData(),
    clearAll: () => app.clearAllData(),
    debug: () => console.log(app.getDebugInfo()),
    stats: () => console.log(app.getStatistics()),
    export: () => console.log(app.exportData()),
    students: () => console.log(app.getAllStudents())
};

// Log initialization
console.log('Student Management System loaded. Use window.studentApp for debugging.');

// Performance monitoring
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Student Management System loaded in ${loadTime}ms`);
        }, 0);
    });
}

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the following lines if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}