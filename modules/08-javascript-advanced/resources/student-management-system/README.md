# Bài 7: Student Management System

## 👀 Tổng quan
- Dự án cuối module JavaScript: xây dựng hệ thống quản lý sinh viên CRUD hoàn chỉnh.
- Tập trung kiến trúc nhiều module, quản lý dữ liệu, UI nâng cao và tối ưu trải nghiệm người dùng.
- Chuẩn bị cho mini-capstone hoặc phỏng vấn front-end junior.

**Thời lượng đề xuất:** 3.5 giờ (210 phút).

## 🎯 Mục tiêu học tập
Học viên sau buổi học sẽ:
- Thiết kế mô hình dữ liệu sinh viên và ánh xạ vào UI có phân trang.
- Triển khai kiến trúc module (Model–Service–View–Controller) với ES6 modules.
- Thao tác với LocalStorage, backup JSON và xử lý lỗi đồng bộ.
- Xây dựng các tính năng tìm kiếm, lọc, sắp xếp, thống kê nâng cao.
- Thực hiện kiểm thử thủ công & viết checklist bàn giao sản phẩm.

## ✅ Tiền đề cần chuẩn bị
- Hoàn thành Bài 6 hoặc có kinh nghiệm JavaScript OOP, DOM nâng cao.
- Kiến thức HTML form validation, CSS layout, Bootstrap cơ bản.
- Cài đặt VS Code, Live Server, trình duyệt Chrome.
- Starter code trong thư mục `bai7/` (chia sẵn `css/`, `js/`).

## 🗂️ Kế hoạch buổi học
| Thời lượng | Hoạt động | Hình thức |
|-----------:|-----------|-----------|
| 15 phút | Warm-up: phân tích dữ liệu mẫu & user stories | Discussion |
| 30 phút | Mini-lecture: Kiến trúc module, data schema, flow CRUD | Instructor-led demo |
| 35 phút | Guided Practice 1: Khởi tạo model `Student`, service lưu trữ | Pair programming |
| 15 phút | Nghỉ & giải đáp | Break |
| 30 phút | Mini-lecture: Search, filter, sort, pagination UX | Instructor-led demo |
| 40 phút | Guided Practice 2: Bảng sinh viên với form modal, validation | Small group |
| 35 phút | Lab Challenge: Dashboard thống kê + bulk actions | Solo coding |
| 20 phút | Retro, trình bày sản phẩm, giao homework | Discussion |

## 🛠️ Lộ trình cập nhật HTML
- **Giai đoạn 1 – Data Layer:** Bổ sung bảng sinh viên, checkbox bulk, modal CRUD và empty state trong `index.html` đúng mô tả Guided Practice 1.
- **Giai đoạn 2 – UI Interaction:** Tổ chức thanh tìm kiếm, filter, sort, pagination, bulk actions với `id`/class khớp README để module JS thao tác.
- **Giai đoạn 3 – Dashboard nâng cao:** Thêm khu vực thống kê, placeholder xuất/nhập JSON, toast thông báo và CTA dẫn tới Lab/Resources phục vụ rubric.

## 🔑 Khái niệm chính
- Data modelling: `Student { id, studentId, fullName, email, gender, dob, faculty, gpa, status }`.
- Module pattern: `student.js` (model), `repository.js` (data), `ui.js` (view), `app.js` (controller).
- Form validation nâng cao (regex, unique constraint, async check).
- Pagination logic (page size, total pages, disable state).
- UX nâng cao: bulk select, confirm modal, toast notification.

## 🧑‍🏫 Ghi chú cho giảng viên
- Trình chiếu sơ đồ kiến trúc và flow sự kiện trước khi coding.
- Cung cấp file JSON mẫu để import nhanh, giúp học viên tập trung vào tính năng.
- Đề xuất chia vai trò trong nhóm: data engineer, UI lead, QA.
- Khi demo pagination, sử dụng bảng console để giải thích công thức.

## 🧪 Guided Practice
### Activity 1 – Data Layer & CRUD (35 phút)
1. Tạo class `Student` và `StudentRepository` quản lý danh sách trong LocalStorage.
2. Cài đặt phương thức `create`, `update`, `remove`, `find`, `list` với validation (trùng MSSV, email).
3. Render bảng sinh viên ban đầu từ dữ liệu mẫu.
4. Ghi log thao tác (console hoặc bảng lịch sử) để chuẩn bị cho analytics.

### Activity 2 – UI Interactions (40 phút)
1. Tạo modal form thêm/sửa sinh viên (`dialog` hoặc Bootstrap modal).
2. Binding form với controller, cung cấp feedback realtime (`.is-invalid`).
3. Cài đặt tìm kiếm, lọc giới tính, sắp xếp theo tên/GPA, phân trang.
4. Thêm bulk actions: chọn nhiều sinh viên → xóa/ xuất dữ liệu.

## 🧱 Lab Challenge – Student Dashboard Pro (35 phút)
- Yêu cầu: Mở rộng ứng dụng với dashboard thống kê.
- Checklist đánh giá:
  - 2 điểm: Widget thống kê (tổng SV, tỷ lệ giới tính, GPA trung bình) cập nhật realtime.
  - 2 điểm: Pagination & filter hoạt động mượt, không lỗi hiển thị.
  - 1 điểm: Bulk export/import JSON kèm xác nhận.
  - 1 điểm: UI thân thiện mobile, tối thiểu 2 breakpoint.

## 🏠 Bài tập về nhà
1. **Feature Proposal:** Viết tài liệu đề xuất 2 tính năng mới (ví dụ: biểu đồ GPA, tích hợp Firebase) và mô tả giải pháp.
2. **Testing & QA:** Tạo checklist 15 test case bao phủ CRUD, filter, import/export, responsive.
3. **Deployment:** Đưa sản phẩm lên GitHub Pages hoặc Netlify, viết README mô tả cách sử dụng.

## 📊 Đánh giá & Rubric
| Tiêu chí | Điểm | Mô tả |
|---------|-----:|-------|
| Kiến trúc module & code quality | 3 | Code tách lớp rõ ràng, tuân thủ naming convention. |
| Chức năng CRUD + filter + pagination | 3 | Tính năng hoạt động ổn định, không lỗi console. |
| UX nâng cao & accessibility | 2 | Form có validation, hỗ trợ keyboard, thông báo rõ ràng. |
| Bàn giao & tài liệu | 2 | Có hướng dẫn chạy, demo link, báo cáo kiểm thử. |

## 📚 Tài nguyên tham khảo
- [MDN – Using modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN – Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [You Don't Know JS Yet](https://github.com/getify/You-Dont-Know-JS)
- [Web.dev – Accessible Data Tables](https://web.dev/learn/accessibility/tables/)

