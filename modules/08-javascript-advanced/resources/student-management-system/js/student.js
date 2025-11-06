// Student Class - Model for student data
class Student {
    constructor(studentId, fullName, email, gender, phone = '', birthDate = '', department = '', address = '', gpa = null, status = 'Đang học') {
        this.id = this.generateId();
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.gender = gender;
        this.phone = phone;
        this.birthDate = birthDate;
        this.department = department;
        this.address = address;
        this.gpa = gpa;
        this.status = status;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    generateId() {
        return 'student_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    getAge() {
        if (!this.birthDate) return null;
        const today = new Date();
        const birthDate = new Date(this.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    getGpaLevel() {
        if (this.gpa === null || this.gpa === '') return null;
        const gpa = parseFloat(this.gpa);
        if (gpa >= 3.6) return 'excellent';
        if (gpa >= 3.0) return 'good';
        if (gpa >= 2.0) return 'average';
        return 'poor';
    }

    getStatusClass() {
        switch (this.status) {
            case 'Đang học': return 'active';
            case 'Tạm nghỉ': return 'inactive';
            case 'Đã tốt nghiệp': return 'graduated';
            case 'Thôi học': return 'dropped';
            default: return 'active';
        }
    }

    update(data) {
        Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'createdAt') {
                this[key] = data[key];
            }
        });
        this.updatedAt = new Date().toISOString();
    }

    toJSON() {
        return {
            id: this.id,
            studentId: this.studentId,
            fullName: this.fullName,
            email: this.email,
            gender: this.gender,
            phone: this.phone,
            birthDate: this.birthDate,
            department: this.department,
            address: this.address,
            gpa: this.gpa,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromJSON(data) {
        const student = new Student(
            data.studentId,
            data.fullName,
            data.email,
            data.gender,
            data.phone,
            data.birthDate,
            data.department,
            data.address,
            data.gpa,
            data.status
        );
        student.id = data.id;
        student.createdAt = data.createdAt;
        student.updatedAt = data.updatedAt;
        return student;
    }
}

// StudentManager Class - Handles CRUD operations and business logic
class StudentManager {
    constructor() {
        this.students = [];
        this.filteredStudents = [];
        this.currentPage = 1;
        this.pageSize = 25;
        this.searchTerm = '';
        this.genderFilter = '';
        this.sortBy = 'name';
        this.sortOrder = 'asc';
        this.selectedStudents = new Set();
        
        // Load data from localStorage
        this.loadFromStorage();
        
        // Initialize filtered students
        this.applyFilters();
    }

    // CRUD Operations
    create(studentData) {
        try {
            // Validation
            const validation = this.validateStudent(studentData);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            // Check for duplicate student ID
            if (this.findByStudentId(studentData.studentId)) {
                throw new Error('MSSV đã tồn tại trong hệ thống');
            }

            // Check for duplicate email
            if (this.findByEmail(studentData.email)) {
                throw new Error('Email đã được sử dụng bởi sinh viên khác');
            }

            const student = new Student(
                studentData.studentId,
                studentData.fullName,
                studentData.email,
                studentData.gender,
                studentData.phone,
                studentData.birthDate,
                studentData.department,
                studentData.address,
                studentData.gpa,
                studentData.status
            );

            this.students.push(student);
            this.saveToStorage();
            this.applyFilters();
            
            return { success: true, student };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    read(id) {
        return this.students.find(student => student.id === id);
    }

    update(id, studentData) {
        try {
            const student = this.read(id);
            if (!student) {
                throw new Error('Không tìm thấy sinh viên');
            }

            // Validation
            const validation = this.validateStudent(studentData, id);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            // Check for duplicate student ID (excluding current student)
            const existingStudent = this.findByStudentId(studentData.studentId);
            if (existingStudent && existingStudent.id !== id) {
                throw new Error('MSSV đã tồn tại trong hệ thống');
            }

            // Check for duplicate email (excluding current student)
            const existingEmail = this.findByEmail(studentData.email);
            if (existingEmail && existingEmail.id !== id) {
                throw new Error('Email đã được sử dụng bởi sinh viên khác');
            }

            student.update(studentData);
            this.saveToStorage();
            this.applyFilters();
            
            return { success: true, student };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    delete(id) {
        try {
            const index = this.students.findIndex(student => student.id === id);
            if (index === -1) {
                throw new Error('Không tìm thấy sinh viên');
            }

            const deletedStudent = this.students.splice(index, 1)[0];
            this.selectedStudents.delete(id);
            this.saveToStorage();
            this.applyFilters();
            
            return { success: true, student: deletedStudent };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    deleteMultiple(ids) {
        try {
            const deletedStudents = [];
            ids.forEach(id => {
                const index = this.students.findIndex(student => student.id === id);
                if (index !== -1) {
                    deletedStudents.push(this.students.splice(index, 1)[0]);
                    this.selectedStudents.delete(id);
                }
            });

            this.saveToStorage();
            this.applyFilters();
            
            return { success: true, students: deletedStudents };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Validation
    validateStudent(data, excludeId = null) {
        const errors = [];

        // Required fields
        if (!data.studentId?.trim()) {
            errors.push('MSSV là bắt buộc');
        } else if (!/^[A-Za-z0-9]+$/.test(data.studentId)) {
            errors.push('MSSV chỉ được chứa chữ cái và số');
        }

        if (!data.fullName?.trim()) {
            errors.push('Họ và tên là bắt buộc');
        } else if (!/^[A-Za-z\s\u00C0-\u024F\u1E00-\u1EFF]+$/.test(data.fullName)) {
            errors.push('Họ và tên chỉ được chứa chữ cái và khoảng trắng');
        }

        if (!data.email?.trim()) {
            errors.push('Email là bắt buộc');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push('Email không hợp lệ');
        }

        if (!data.gender) {
            errors.push('Giới tính là bắt buộc');
        }

        // Optional field validation
        if (data.phone && !/^[0-9]{10,11}$/.test(data.phone)) {
            errors.push('Số điện thoại phải có 10-11 chữ số');
        }

        if (data.gpa !== null && data.gpa !== '' && data.gpa !== undefined) {
            const gpa = parseFloat(data.gpa);
            if (isNaN(gpa) || gpa < 0 || gpa > 4) {
                errors.push('GPA phải là số từ 0.00 đến 4.00');
            }
        }

        if (data.birthDate) {
            const birthDate = new Date(data.birthDate);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 16 || age > 100) {
                errors.push('Tuổi phải từ 16 đến 100');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Search and Filter
    applyFilters() {
        let filtered = [...this.students];

        // Search filter
        if (this.searchTerm) {
            const searchLower = this.searchTerm.toLowerCase();
            filtered = filtered.filter(student => 
                student.fullName.toLowerCase().includes(searchLower) ||
                student.studentId.toLowerCase().includes(searchLower) ||
                student.email.toLowerCase().includes(searchLower) ||
                (student.phone && student.phone.includes(searchLower)) ||
                (student.department && student.department.toLowerCase().includes(searchLower))
            );
        }

        // Gender filter
        if (this.genderFilter) {
            filtered = filtered.filter(student => student.gender === this.genderFilter);
        }

        // Sort
        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch (this.sortBy) {
                case 'name':
                    aValue = a.fullName.toLowerCase();
                    bValue = b.fullName.toLowerCase();
                    break;
                case 'studentId':
                    aValue = a.studentId.toLowerCase();
                    bValue = b.studentId.toLowerCase();
                    break;
                case 'age':
                    aValue = a.getAge() || 0;
                    bValue = b.getAge() || 0;
                    break;
                case 'gpa':
                    aValue = parseFloat(a.gpa) || 0;
                    bValue = parseFloat(b.gpa) || 0;
                    break;
                default:
                    aValue = a.fullName.toLowerCase();
                    bValue = b.fullName.toLowerCase();
            }

            if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        this.filteredStudents = filtered;
        this.currentPage = 1; // Reset to first page
    }

    // Pagination
    getPaginatedStudents() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredStudents.slice(startIndex, endIndex);
    }

    getTotalPages() {
        return Math.ceil(this.filteredStudents.length / this.pageSize);
    }

    setPage(page) {
        const totalPages = this.getTotalPages();
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
        }
    }

    setPageSize(size) {
        this.pageSize = parseInt(size);
        this.currentPage = 1;
    }

    // Search, Filter, Sort methods
    setSearchTerm(term) {
        this.searchTerm = term;
        this.applyFilters();
    }

    setGenderFilter(gender) {
        this.genderFilter = gender;
        this.applyFilters();
    }

    setSorting(sortBy, sortOrder = 'asc') {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.applyFilters();
    }

    // Selection methods
    selectStudent(id) {
        this.selectedStudents.add(id);
    }

    deselectStudent(id) {
        this.selectedStudents.delete(id);
    }

    selectAll() {
        const currentPageStudents = this.getPaginatedStudents();
        currentPageStudents.forEach(student => this.selectedStudents.add(student.id));
    }

    deselectAll() {
        this.selectedStudents.clear();
    }

    getSelectedStudents() {
        return this.students.filter(student => this.selectedStudents.has(student.id));
    }

    // Utility methods
    findByStudentId(studentId) {
        return this.students.find(student => student.studentId === studentId);
    }

    findByEmail(email) {
        return this.students.find(student => student.email === email);
    }

    getStatistics() {
        const total = this.students.length;
        const male = this.students.filter(s => s.gender === 'Nam').length;
        const female = this.students.filter(s => s.gender === 'Nữ').length;
        
        return {
            total,
            male,
            female,
            filtered: this.filteredStudents.length
        };
    }

    // Data persistence
    saveToStorage() {
        try {
            const data = {
                students: this.students.map(student => student.toJSON()),
                version: '1.0.0',
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('studentManagementData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('studentManagementData');
            if (data) {
                const parsed = JSON.parse(data);
                if (parsed.students) {
                    this.students = parsed.students.map(studentData => Student.fromJSON(studentData));
                }
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.students = [];
        }
    }

    // Export/Import
    exportData(format = 'json') {
        const data = {
            students: this.students.map(student => student.toJSON()),
            exported: new Date().toISOString(),
            version: '1.0.0'
        };

        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        }
        
        // Could add CSV export here
        return data;
    }

    exportSelected(format = 'json') {
        const selectedStudents = this.getSelectedStudents();
        const data = {
            students: selectedStudents.map(student => student.toJSON()),
            exported: new Date().toISOString(),
            version: '1.0.0'
        };

        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        }
        
        return data;
    }

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (!data.students || !Array.isArray(data.students)) {
                throw new Error('Dữ liệu không hợp lệ');
            }

            const importedStudents = [];
            const errors = [];

            data.students.forEach((studentData, index) => {
                try {
                    // Validate student data
                    const validation = this.validateStudent(studentData);
                    if (!validation.isValid) {
                        errors.push(`Sinh viên ${index + 1}: ${validation.errors.join(', ')}`);
                        return;
                    }

                    // Check for duplicates
                    if (this.findByStudentId(studentData.studentId)) {
                        errors.push(`Sinh viên ${index + 1}: MSSV ${studentData.studentId} đã tồn tại`);
                        return;
                    }

                    if (this.findByEmail(studentData.email)) {
                        errors.push(`Sinh viên ${index + 1}: Email ${studentData.email} đã tồn tại`);
                        return;
                    }

                    const student = Student.fromJSON(studentData);
                    importedStudents.push(student);
                } catch (error) {
                    errors.push(`Sinh viên ${index + 1}: ${error.message}`);
                }
            });

            if (errors.length > 0) {
                return {
                    success: false,
                    error: 'Có lỗi khi import dữ liệu',
                    details: errors,
                    imported: 0
                };
            }

            // Add all valid students
            this.students.push(...importedStudents);
            this.saveToStorage();
            this.applyFilters();

            return {
                success: true,
                imported: importedStudents.length,
                message: `Đã import thành công ${importedStudents.length} sinh viên`
            };
        } catch (error) {
            return {
                success: false,
                error: 'Dữ liệu JSON không hợp lệ'
            };
        }
    }

    // Sample data generation
    generateSampleData() {
        const sampleStudents = [
            {
                studentId: 'SV001',
                fullName: 'Nguyễn Văn An',
                email: 'nguyenvanan@gmail.com',
                gender: 'Nam',
                phone: '0123456789',
                birthDate: '2000-01-15',
                department: 'Công nghệ thông tin',
                address: '123 Đường ABC, Quận 1, TP.HCM',
                gpa: 3.75,
                status: 'Đang học'
            },
            {
                studentId: 'SV002',
                fullName: 'Trần Thị Bình',
                email: 'tranthibinh@gmail.com',
                gender: 'Nữ',
                phone: '0987654321',
                birthDate: '1999-05-20',
                department: 'Kinh tế',
                address: '456 Đường DEF, Quận 2, TP.HCM',
                gpa: 3.25,
                status: 'Đang học'
            },
            {
                studentId: 'SV003',
                fullName: 'Lê Hoàng Cường',
                email: 'lehoangcuong@gmail.com',
                gender: 'Nam',
                phone: '0369852741',
                birthDate: '2001-03-10',
                department: 'Kỹ thuật',
                address: '789 Đường GHI, Quận 3, TP.HCM',
                gpa: 3.90,
                status: 'Đang học'
            }
        ];

        sampleStudents.forEach(studentData => {
            if (!this.findByStudentId(studentData.studentId) && !this.findByEmail(studentData.email)) {
                this.create(studentData);
            }
        });
    }
}