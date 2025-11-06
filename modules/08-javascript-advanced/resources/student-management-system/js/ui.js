// UI Manager Class - Handles all user interface interactions
class UIManager {
    constructor(studentManager) {
        this.studentManager = studentManager;
        this.currentEditingId = null;
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Modal elements
        this.modal = document.getElementById('studentModal');
        this.confirmModal = document.getElementById('confirmModal');
        this.form = document.getElementById('studentForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.saveBtn = document.getElementById('saveBtn');
        
        // Table elements
        this.tableBody = document.getElementById('studentsTableBody');
        this.emptyState = document.getElementById('emptyState');
        this.bulkActions = document.getElementById('bulkActions');
        this.selectAllCheckbox = document.getElementById('selectAll');
        
        // Control elements
        this.searchInput = document.getElementById('searchInput');
        this.genderFilter = document.getElementById('genderFilter');
        this.sortBy = document.getElementById('sortBy');
        this.pageSize = document.getElementById('pageSize');
        
        // Statistics elements
        this.totalStudents = document.getElementById('totalStudents');
        this.maleStudents = document.getElementById('maleStudents');
        this.femaleStudents = document.getElementById('femaleStudents');
        
        // Pagination elements
        this.pagination = document.getElementById('pagination');
        this.showingFrom = document.getElementById('showingFrom');
        this.showingTo = document.getElementById('showingTo');
        this.totalRecords = document.getElementById('totalRecords');
        
        // Other elements
        this.loading = document.getElementById('loading');
        this.toastContainer = document.getElementById('toastContainer');
        this.selectedCount = document.getElementById('selectedCount');
    }

    attachEventListeners() {
        // Modal events
        document.getElementById('addStudentBtn').addEventListener('click', () => this.openAddModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Search and filter events
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        document.getElementById('clearSearch').addEventListener('click', () => this.clearSearch());
        this.genderFilter.addEventListener('change', (e) => this.handleGenderFilter(e.target.value));
        this.sortBy.addEventListener('change', (e) => this.handleSort(e.target.value));
        this.pageSize.addEventListener('change', (e) => this.handlePageSizeChange(e.target.value));
        
        // Bulk actions
        this.selectAllCheckbox.addEventListener('change', (e) => this.handleSelectAll(e.target.checked));
        document.getElementById('deleteSelectedBtn').addEventListener('click', () => this.handleDeleteSelected());
        document.getElementById('exportSelectedBtn').addEventListener('click', () => this.handleExportSelected());
        
        // Import/Export
        document.getElementById('exportBtn').addEventListener('click', () => this.handleExport());
        document.getElementById('importBtn').addEventListener('click', () => this.handleImportClick());
        document.getElementById('importFile').addEventListener('change', (e) => this.handleImport(e));
        
        // Modal backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        this.confirmModal.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) this.closeConfirmModal();
        });
        
        // Confirm modal events
        document.getElementById('confirmCancel').addEventListener('click', () => this.closeConfirmModal());
        document.getElementById('confirmOk').addEventListener('click', () => this.executeConfirmAction());
        
        // Real-time validation
        this.attachFormValidation();
    }

    attachFormValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    // Modal management
    openAddModal() {
        this.currentEditingId = null;
        this.modalTitle.textContent = 'Thêm sinh viên mới';
        this.saveBtn.innerHTML = '<i class="fas fa-save"></i> Thêm';
        this.form.reset();
        this.clearFormErrors();
        this.showModal();
    }

    openEditModal(studentId) {
        const student = this.studentManager.read(studentId);
        if (!student) {
            this.showToast('Không tìm thấy sinh viên', 'error');
            return;
        }

        this.currentEditingId = studentId;
        this.modalTitle.textContent = 'Sửa thông tin sinh viên';
        this.saveBtn.innerHTML = '<i class="fas fa-save"></i> Cập nhật';
        
        // Populate form with student data
        this.populateForm(student);
        this.clearFormErrors();
        this.showModal();
    }

    populateForm(student) {
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('fullName').value = student.fullName;
        document.getElementById('email').value = student.email;
        document.getElementById('gender').value = student.gender;
        document.getElementById('phone').value = student.phone || '';
        document.getElementById('birthDate').value = student.birthDate || '';
        document.getElementById('department').value = student.department || '';
        document.getElementById('address').value = student.address || '';
        document.getElementById('gpa').value = student.gpa || '';
        document.getElementById('status').value = student.status || 'Đang học';
    }

    showModal() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // Focus first input
        setTimeout(() => {
            const firstInput = this.form.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        this.form.reset();
        this.clearFormErrors();
        this.currentEditingId = null;
    }

    // Form handling
    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const studentData = {};
        
        for (let [key, value] of formData.entries()) {
            studentData[key] = value.trim();
        }

        // Convert empty strings to null for optional fields
        if (!studentData.phone) studentData.phone = '';
        if (!studentData.birthDate) studentData.birthDate = '';
        if (!studentData.department) studentData.department = '';
        if (!studentData.address) studentData.address = '';
        if (!studentData.gpa || studentData.gpa === '') studentData.gpa = null;

        this.showLoading();

        setTimeout(() => {
            let result;
            if (this.currentEditingId) {
                result = this.studentManager.update(this.currentEditingId, studentData);
            } else {
                result = this.studentManager.create(studentData);
            }

            this.hideLoading();

            if (result.success) {
                this.closeModal();
                this.refreshUI();
                const action = this.currentEditingId ? 'cập nhật' : 'thêm';
                this.showToast(`Đã ${action} sinh viên thành công`, 'success');
            } else {
                this.showToast(result.error, 'error');
            }
        }, 500);
    }

    // Form validation
    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        let error = '';

        switch (name) {
            case 'studentId':
                if (!value) {
                    error = 'MSSV là bắt buộc';
                } else if (!/^[A-Za-z0-9]+$/.test(value)) {
                    error = 'MSSV chỉ được chứa chữ cái và số';
                }
                break;
            
            case 'fullName':
                if (!value) {
                    error = 'Họ và tên là bắt buộc';
                } else if (!/^[A-Za-z\s\u00C0-\u024F\u1E00-\u1EFF]+$/.test(value)) {
                    error = 'Họ và tên chỉ được chứa chữ cái và khoảng trắng';
                }
                break;
            
            case 'email':
                if (!value) {
                    error = 'Email là bắt buộc';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Email không hợp lệ';
                }
                break;
            
            case 'phone':
                if (value && !/^[0-9]{10,11}$/.test(value)) {
                    error = 'Số điện thoại phải có 10-11 chữ số';
                }
                break;
            
            case 'gpa':
                if (value) {
                    const gpa = parseFloat(value);
                    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
                        error = 'GPA phải là số từ 0.00 đến 4.00';
                    }
                }
                break;
        }

        this.showFieldError(field, error);
        return !error;
    }

    showFieldError(field, error) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = error;
            field.classList.toggle('error', !!error);
        }
    }

    clearFieldError(field) {
        this.showFieldError(field, '');
    }

    clearFormErrors() {
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(element => element.textContent = '');
        
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }

    // Search and filter handlers
    handleSearch(searchTerm) {
        this.studentManager.setSearchTerm(searchTerm);
        this.refreshTable();
        this.refreshPagination();
    }

    clearSearch() {
        this.searchInput.value = '';
        this.handleSearch('');
    }

    handleGenderFilter(gender) {
        this.studentManager.setGenderFilter(gender);
        this.refreshTable();
        this.refreshPagination();
    }

    handleSort(sortBy) {
        this.studentManager.setSorting(sortBy);
        this.refreshTable();
        this.refreshPagination();
    }

    handlePageSizeChange(size) {
        this.studentManager.setPageSize(size);
        this.refreshTable();
        this.refreshPagination();
    }

    // Table management
    renderTable() {
        const students = this.studentManager.getPaginatedStudents();
        
        if (students.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();
        
        this.tableBody.innerHTML = students.map(student => this.createStudentRow(student)).join('');
        
        // Attach event listeners to new rows
        this.attachRowEventListeners();
    }

    createStudentRow(student) {
        const age = student.getAge();
        const gpaLevel = student.getGpaLevel();
        const statusClass = student.getStatusClass();
        const isSelected = this.studentManager.selectedStudents.has(student.id);

        return `
            <tr class="${isSelected ? 'selected' : ''}" data-id="${student.id}">
                <td>
                    <input type="checkbox" class="row-checkbox" ${isSelected ? 'checked' : ''}>
                </td>
                <td class="font-semibold">${student.studentId}</td>
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.gender}</td>
                <td>${age !== null ? age : '-'}</td>
                <td>${student.phone || '-'}</td>
                <td>${student.department || '-'}</td>
                <td>
                    ${student.gpa !== null ? 
                        `<span class="gpa-display ${gpaLevel}">${parseFloat(student.gpa).toFixed(2)}</span>` : 
                        '-'
                    }
                </td>
                <td>
                    <span class="status-badge ${statusClass}">${student.status}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="app.ui.openEditModal('${student.id}')" title="Sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="app.ui.confirmDelete('${student.id}')" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    attachRowEventListeners() {
        const checkboxes = this.tableBody.querySelectorAll('.row-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const row = e.target.closest('tr');
                const studentId = row.dataset.id;
                
                if (e.target.checked) {
                    this.studentManager.selectStudent(studentId);
                    row.classList.add('selected');
                } else {
                    this.studentManager.deselectStudent(studentId);
                    row.classList.remove('selected');
                }
                
                this.updateBulkActions();
                this.updateSelectAllCheckbox();
            });
        });
    }

    showEmptyState() {
        this.tableBody.innerHTML = '';
        this.emptyState.classList.remove('hidden');
    }

    hideEmptyState() {
        this.emptyState.classList.add('hidden');
    }

    // Selection management
    handleSelectAll(checked) {
        if (checked) {
            this.studentManager.selectAll();
        } else {
            this.studentManager.deselectAll();
        }
        
        this.refreshTable();
        this.updateBulkActions();
    }

    updateSelectAllCheckbox() {
        const currentPageStudents = this.studentManager.getPaginatedStudents();
        const selectedCount = currentPageStudents.filter(student => 
            this.studentManager.selectedStudents.has(student.id)
        ).length;
        
        if (selectedCount === 0) {
            this.selectAllCheckbox.checked = false;
            this.selectAllCheckbox.indeterminate = false;
        } else if (selectedCount === currentPageStudents.length) {
            this.selectAllCheckbox.checked = true;
            this.selectAllCheckbox.indeterminate = false;
        } else {
            this.selectAllCheckbox.checked = false;
            this.selectAllCheckbox.indeterminate = true;
        }
    }

    updateBulkActions() {
        const selectedCount = this.studentManager.selectedStudents.size;
        this.selectedCount.textContent = selectedCount;
        
        if (selectedCount > 0) {
            this.bulkActions.classList.add('show');
        } else {
            this.bulkActions.classList.remove('show');
        }
    }

    // Delete operations
    confirmDelete(studentId) {
        const student = this.studentManager.read(studentId);
        if (!student) return;

        this.showConfirmModal(
            'Xác nhận xóa',
            `Bạn có chắc chắn muốn xóa sinh viên "${student.fullName}"?`,
            () => this.deleteStudent(studentId)
        );
    }

    deleteStudent(studentId) {
        this.showLoading();
        
        setTimeout(() => {
            const result = this.studentManager.delete(studentId);
            this.hideLoading();
            
            if (result.success) {
                this.refreshUI();
                this.showToast('Đã xóa sinh viên thành công', 'success');
            } else {
                this.showToast(result.error, 'error');
            }
        }, 300);
    }

    handleDeleteSelected() {
        const selectedStudents = this.studentManager.getSelectedStudents();
        if (selectedStudents.length === 0) return;

        this.showConfirmModal(
            'Xác nhận xóa',
            `Bạn có chắc chắn muốn xóa ${selectedStudents.length} sinh viên đã chọn?`,
            () => this.deleteSelectedStudents()
        );
    }

    deleteSelectedStudents() {
        const selectedIds = Array.from(this.studentManager.selectedStudents);
        this.showLoading();
        
        setTimeout(() => {
            const result = this.studentManager.deleteMultiple(selectedIds);
            this.hideLoading();
            
            if (result.success) {
                this.refreshUI();
                this.showToast(`Đã xóa ${result.students.length} sinh viên thành công`, 'success');
            } else {
                this.showToast(result.error, 'error');
            }
        }, 500);
    }

    // Confirm modal
    showConfirmModal(title, message, onConfirm) {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;
        this.confirmAction = onConfirm;
        this.confirmModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeConfirmModal() {
        this.confirmModal.classList.remove('show');
        document.body.style.overflow = '';
        this.confirmAction = null;
    }

    executeConfirmAction() {
        if (this.confirmAction) {
            this.confirmAction();
        }
        this.closeConfirmModal();
    }

    // Import/Export
    handleExport() {
        const data = this.studentManager.exportData();
        this.downloadFile(data, 'students.json', 'application/json');
        this.showToast('Đã xuất dữ liệu thành công', 'success');
    }

    handleExportSelected() {
        const selectedStudents = this.studentManager.getSelectedStudents();
        if (selectedStudents.length === 0) {
            this.showToast('Vui lòng chọn sinh viên để xuất', 'warning');
            return;
        }

        const data = this.studentManager.exportSelected();
        this.downloadFile(data, 'selected_students.json', 'application/json');
        this.showToast(`Đã xuất ${selectedStudents.length} sinh viên đã chọn`, 'success');
    }

    handleImportClick() {
        document.getElementById('importFile').click();
    }

    handleImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const result = this.studentManager.importData(event.target.result);
                
                if (result.success) {
                    this.refreshUI();
                    this.showToast(result.message, 'success');
                } else {
                    if (result.details && result.details.length > 0) {
                        const errorList = result.details.slice(0, 5).join('\n');
                        this.showToast(`${result.error}:\n${errorList}`, 'error');
                    } else {
                        this.showToast(result.error, 'error');
                    }
                }
            } catch (error) {
                this.showToast('Lỗi khi đọc file', 'error');
            }
        };
        
        reader.readAsText(file);
        e.target.value = ''; // Reset file input
    }

    downloadFile(data, filename, type) {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Pagination
    renderPagination() {
        const totalPages = this.studentManager.getTotalPages();
        const currentPage = this.studentManager.currentPage;
        
        if (totalPages <= 1) {
            this.pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} 
                    onclick="app.ui.goToPage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button class="page-btn" onclick="app.ui.goToPage(1)">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="page-btn">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                        onclick="app.ui.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="page-btn">...</span>`;
            }
            paginationHTML += `<button class="page-btn" onclick="app.ui.goToPage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        paginationHTML += `
            <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} 
                    onclick="app.ui.goToPage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        this.pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.studentManager.setPage(page);
        this.refreshTable();
        this.refreshPagination();
    }

    updatePaginationInfo() {
        const stats = this.studentManager.getStatistics();
        const currentPage = this.studentManager.currentPage;
        const pageSize = this.studentManager.pageSize;
        const totalFiltered = stats.filtered;
        
        const from = totalFiltered === 0 ? 0 : (currentPage - 1) * pageSize + 1;
        const to = Math.min(currentPage * pageSize, totalFiltered);
        
        this.showingFrom.textContent = from;
        this.showingTo.textContent = to;
        this.totalRecords.textContent = totalFiltered;
    }

    // Statistics
    updateStatistics() {
        const stats = this.studentManager.getStatistics();
        this.totalStudents.textContent = stats.total;
        this.maleStudents.textContent = stats.male;
        this.femaleStudents.textContent = stats.female;
    }

    // Loading state
    showLoading() {
        this.loading.classList.add('show');
    }

    hideLoading() {
        this.loading.classList.remove('show');
    }

    // Toast notifications
    showToast(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getToastIcon(type);
        const title = this.getToastTitle(type);
        
        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-title">
                    <i class="${icon}"></i>
                    ${title}
                </span>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        // Add close functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));
        
        this.toastContainer.appendChild(toast);
        
        // Auto remove after duration
        setTimeout(() => this.removeToast(toast), duration);
    }

    getToastIcon(type) {
        switch (type) {
            case 'success': return 'fas fa-check-circle';
            case 'error': return 'fas fa-exclamation-circle';
            case 'warning': return 'fas fa-exclamation-triangle';
            default: return 'fas fa-info-circle';
        }
    }

    getToastTitle(type) {
        switch (type) {
            case 'success': return 'Thành công';
            case 'error': return 'Lỗi';
            case 'warning': return 'Cảnh báo';
            default: return 'Thông báo';
        }
    }

    removeToast(toast) {
        if (toast && toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }

    // UI refresh methods
    refreshUI() {
        this.refreshTable();
        this.refreshPagination();
        this.updateStatistics();
        this.updateBulkActions();
        this.updateSelectAllCheckbox();
    }

    refreshTable() {
        this.renderTable();
    }

    refreshPagination() {
        this.renderPagination();
        this.updatePaginationInfo();
    }

    // Initialize UI
    initialize() {
        this.refreshUI();
        
        // Generate sample data if no students exist
        if (this.studentManager.students.length === 0) {
            this.studentManager.generateSampleData();
            this.refreshUI();
            this.showToast('Đã tạo dữ liệu mẫu', 'info');
        }
    }
}