# Bài 6: Ứng dụng Todo List Hiện Đại

## 👀 Tổng quan
- Bài học JavaScript thực chiến: xây dựng Todo List với lưu trữ local.
- Kết hợp HTML5 semantic, CSS3 responsive và kiến trúc JavaScript hướng đối tượng.
- Nhấn mạnh quy trình sản phẩm: lên requirement → thiết kế UI → code → kiểm thử.

**Thời lượng đề xuất:** 3 giờ (180 phút).

## 🎯 Mục tiêu học tập
Học viên hoàn thành buổi học sẽ:
- Phân tích yêu cầu và vẽ user flow cho ứng dụng quản lý công việc.
- Tổ chức dự án theo cấu trúc module (`js/`, `css/`, assets) chuẩn Bootcamp.
- Viết class quản lý Todo, thao tác với DOM và LocalStorage.
- Áp dụng kỹ thuật event delegation, validation và state management cơ bản.
- Thực hiện testing thủ công dựa trên checklist và ghi log lỗi.

## ✅ Tiền đề cần chuẩn bị
- Hoàn thành Bài 5 (JavaScript cơ bản) hoặc kiến thức ES6 (class, arrow function, destructuring).
- Đã cài đặt VS Code, Live Server, trình duyệt Chrome.
- Chuẩn bị file starter trong thư mục `bai6/`.

## 🗂️ Kế hoạch buổi học
| Thời lượng | Hoạt động | Hình thức |
|-----------:|-----------|-----------|
| 15 phút | Warm-up: phân tích sản phẩm Todo apps nổi tiếng | Discussion |
| 30 phút | Mini-lecture: Kiến trúc, LocalStorage, event flow | Instructor-led demo |
| 35 phút | Guided Practice 1: Tạo class `TodoApp`, render danh sách | Pair programming |
| 15 phút | Nghỉ & giải đáp lỗi thường gặp | Break |
| 30 phút | Mini-lecture: State transitions, validation, accessibility | Instructor-led demo |
| 35 phút | Guided Practice 2: Bộ lọc, thống kê, bulk actions | Small group |
| 20 phút | Lab Challenge: Hoàn thiện Todo List với theme switcher | Solo coding |
| 10 phút | Retrospective & giao bài tập về nhà | Discussion |

## 🛠️ Lộ trình cập nhật HTML
- **Giai đoạn 1 – CRUD cơ bản:** Hoàn thiện cấu trúc `index.html` với header, form thêm task, danh sách và trạng thái rỗng. Chuẩn bị template `<template id="taskTemplate">` để phù hợp Guided Practice 1.
- **Giai đoạn 2 – Bộ lọc & thống kê:** Bổ sung cụm filter, bộ đếm, bulk actions và khu vực thống kê như README mô tả. Đảm bảo mỗi phần có `id`/class rõ ràng để JS thao tác.
- **Giai đoạn 3 – Nâng cao trải nghiệm:** Tạo placeholder cho toast, theme switcher, modal xác nhận và khu vực ghi chú tài nguyên nhằm phục vụ Lab Challenge, Homework và rubric.

## 🔑 Khái niệm chính
- CRUD workflow, state machine, optimistic UI.
- LocalStorage API (`setItem`, `getItem`, `JSON.stringify`).
- Event delegation trên danh sách động.
- Accessible form (ARIA, keyboard navigation).
- Tổ chức module JS: separation of concerns (Model–View–Controller).

## 🧑‍🏫 Ghi chú cho giảng viên
- Cho học viên xem mockup UI trước khi code để thống nhất mục tiêu.
- Thực hành live-coding ngắn để minh họa render danh sách từ dữ liệu mẫu.
- Nhắc học viên sử dụng Chrome DevTools (tab Application > Local Storage) để debug.
- Khuyến khích ghi lại bug phát sinh và cách fix trong file `COMPLETED.md` (tuỳ chọn).

## 🧪 Guided Practice
### Activity 1 – Core CRUD Flow (35 phút)
1. Khởi tạo class `TodoApp` với state `todos` (array object `{id, title, completed, createdAt}`).
2. Cài đặt phương thức `addTodo`, `toggleTodo`, `deleteTodo` và render template với `<template>` HTML.
3. Đồng bộ state vào LocalStorage sau mỗi thao tác.
4. Thêm validation: từ 1–200 ký tự, không trùng lặp.

### Activity 2 – Filters & Productivity Boosters (35 phút)
1. Tạo filter buttons: Tất cả / Chưa xong / Hoàn thành sử dụng event delegation.
2. Hiển thị counters (`total`, `active`, `completed`).
3. Cài đặt `clearCompleted()` và modal xác nhận.
4. Thêm toggle Dark/Light mode sử dụng `data-theme` + CSS variables.

## 🧱 Lab Challenge – Todo Pro (20 phút)
- Yêu cầu: Hoàn thiện Todo List với các tính năng nâng cao.
- Checklist đánh giá:
  - 2 điểm: UI responsive, hỗ trợ keyboard.
  - 2 điểm: Filter & bulk actions hoạt động ổn định.
  - 1 điểm: LocalStorage không mất dữ liệu sau reload.
  - 1 điểm: Có thông báo trạng thái (toast/snackbar hoặc inline message).

## 🏠 Bài tập về nhà
1. **Feature Extension:** Thêm tính năng hẹn giờ nhắc nhở (deadline + cảnh báo màu) hoặc kéo-thả sắp xếp (SortableJS).
2. **Testing Report:** Tạo bảng kiểm thử thủ công (ít nhất 10 test case) và ghi kết quả.
3. **Refactor Challenge:** Tách code thành module `TodoService`, `TodoView`, `TodoController` và mô tả trong README cá nhân.

## 📊 Đánh giá & Rubric
| Tiêu chí | Điểm | Mô tả |
|---------|-----:|-------|
| Kiến trúc & code tổ chức tốt | 3 | Sử dụng class/module rõ ràng, comment cần thiết. |
| Chức năng CRUD & lưu trữ | 3 | Tất cả thao tác hoạt động, dữ liệu không lỗi. |
| UI/UX & accessibility | 2 | Responsive, hỗ trợ phím tắt, thông báo rõ ràng. |
| Hoàn thành lab & homework | 2 | Bàn giao repo/capture kèm hướng dẫn chạy. |

## 📚 Tài nguyên tham khảo
- [MDN – Working with Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN – Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [A11y Project – Accessible Forms](https://www.a11yproject.com/checklists/web-form/)

