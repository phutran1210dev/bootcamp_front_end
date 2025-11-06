# Bài 3: CSS Flexbox & Grid

## 👀 Tổng quan
- Học viên thực hành xây dựng layout hiện đại với Flexbox và CSS Grid.
- Áp dụng tư duy component và quy ước BEM vào dự án giao diện cà phê tương tác.
- Sử dụng demo trực quan để quan sát tác động của từng thuộc tính layout.

**Thời lượng đề xuất:** 3 giờ (180 phút) – phù hợp cho một buổi Bootcamp Front-end.

## 🎯 Mục tiêu học tập
Sau buổi học, học viên có thể:
- Phân biệt thời điểm sử dụng Flexbox và Grid trong bố cục 1 chiều và 2 chiều.
- Cấu hình trục chính, căn chỉnh và trật tự phần tử bằng các thuộc tính Flexbox cốt lõi.
- Thiết lập lưới responsive với `grid-template-columns`, `grid-template-areas` và `gap`.
- Áp dụng quy ước BEM để đặt tên lớp và tái sử dụng component trong dự án.
- Triển khai một layout sản phẩm hoàn chỉnh đáp ứng desktop và mobile.

## ✅ Tiền đề cần chuẩn bị
- Hoàn thành Bài 1–2 về HTML & CSS cơ bản.
- Visual Studio Code và tiện ích Live Server.
- Trình duyệt Chrome/Edge với DevTools.
- Slide deck hoặc bảng viết để trình bày thuộc tính Flexbox/Grid.

## 🗂️ Kế hoạch buổi học
| Thời lượng | Hoạt động | Hình thức |
|-----------:|-----------|-----------|
| 15 phút | Ôn tập & khởi động: phân tích layout website mẫu | Discussion |
| 35 phút | Mini-lecture: Flexbox fundamentals (`display`, `justify-content`, `align-items`, `flex-wrap`, `order`) | Instructor-led demo |
| 25 phút | Guided Practice 1: Xây dựng thanh điều hướng responsive bằng Flexbox | Pair programming |
| 15 phút | Nghỉ & giải đáp nhanh | Break |
| 30 phút | Mini-lecture: CSS Grid (`grid-template`, `auto-fit`, `fr`) + so sánh với Flexbox | Instructor-led demo |
| 35 phút | Guided Practice 2: Card layout với Grid và breakpoint | Small group |
| 20 phút | Lab Challenge: Trang menu cà phê kết hợp Flexbox & Grid | Solo coding |
| 5 phút | Wrap-up & giao bài tập về nhà | Discussion |

## 🛠️ Lộ trình cập nhật HTML
- **Giai đoạn 1 – Nền tảng Flexbox:** Bổ sung mục "Lộ trình" trong `index.html`, chuẩn hoá hero, navigation và khối nội dung Flexbox theo chuẩn BEM. Hiển thị ví dụ trực quan cho `display`, `justify-content`, `align-items` đúng như mục Flexbox Basics.
- **Giai đoạn 2 – Ứng dụng Grid:** Mở rộng HTML với demo `grid-template-areas`, `repeat()` và liên kết tới phần Guided Practice bằng CTA trong thẻ roadmap. Đảm bảo bảng so sánh Flexbox vs Grid phản ánh nội dung README.
- **Giai đoạn 3 – Tối ưu & Lab:** Liên kết thử thách Lab, tài nguyên và bài tập về nhà thông qua các CTA ở roadmap. Bổ sung phần "Next Steps" giới thiệu lộ trình học tiếp theo và gắn với mục Homework/Resources.

## 🔑 Khái niệm chính
- Flex container, flex item, main axis vs cross axis.
- `justify-content`, `align-items`, `align-content`, `flex-basis`, `flex-grow`, `flex-shrink`.
- Grid track, line, area; `repeat()`, `minmax()`, `auto-fill` vs `auto-fit`.
- Responsive layout bằng media query và unit `fr`.
- Naming convention BEM: `block__element--modifier`.

## 🧑‍🏫 Ghi chú cho giảng viên
- Bắt đầu bằng ví dụ thực tế (Spotify layout, dashboard, menu quán cà phê).
- Đặt câu hỏi kiểm tra nhanh sau mỗi thuộc tính (ví dụ: “Thuộc tính nào để căn giữa theo chiều dọc?”).
- Trong Guided Practice, hướng dẫn học viên mở DevTools > Layout để quan sát Flexbox/Grid overlay.
- Khuyến khích học viên commit từng cột mốc trong repo cá nhân để ghi lại tiến độ.

## 🧪 Guided Practice
### Activity 1 – Responsive Navbar (35 phút)
1. Sử dụng starter `index.html` trong thư mục `bai3/`.
2. Tạo container `.header` theo BEM với logo và navigation list.
3. Áp dụng `display: flex`, `justify-content: space-between`, `align-items: center`.
4. Tại breakpoint `< 768px`, chuyển navigation thành hamburger button bằng `flex-direction: column`.
5. Kết thúc bằng phần recap: học viên so sánh cách xử lý nếu dùng Grid.

### Activity 2 – Product Card Grid (35 phút)
1. Tạo section `.menu` chứa 6 thẻ `.menu__item`.
2. Dùng `display: grid` với `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));`.
3. Thêm khu vực hero dùng `grid-template-areas` để minh họa layout 2 chiều.
4. Ở breakpoint nhỏ, chuyển sang 1 cột và điều chỉnh khoảng cách bằng `gap`.

## 🧱 Lab Challenge – Coffee Menu Layout (20 phút)
- Yêu cầu: Kết hợp Flexbox và Grid tạo trang menu với header, hero, danh sách sản phẩm, testimonial và footer.
- Rubric hoàn thành tại lớp:
  - 2 điểm: Header + hero responsive.
  - 2 điểm: Section sản phẩm Grid có tối thiểu 2 breakpoint.
  - 1 điểm: Áp dụng ít nhất 3 class BEM chuẩn.
  - 1 điểm: Sử dụng biến CSS hoặc custom property để quản lý màu.

## 🏠 Bài tập về nhà
1. **Refactor Portfolio Section (1–1.5 giờ):** Dùng Grid để sắp xếp gallery dự án cá nhân, thêm hiệu ứng hover.
2. **Flexbox Debugging (30 phút):** Cho trước 5 đoạn code sai, yêu cầu học viên sửa và giải thích lý do.
3. **Reflection:** Viết ghi chú (200 chữ) về sự khác biệt Flexbox vs Grid và khi nào nên kết hợp cả hai.

## 📊 Đánh giá & phản hồi
| Tiêu chí | Điểm | Mô tả |
|---------|-----:|-------|
| Hiểu khái niệm Flexbox/Grid | 3 | Giải thích đúng tác dụng thuộc tính khi được hỏi.
| Ứng dụng vào layout responsive | 3 | Bố cục không bị vỡ ở 3 breakpoint (mobile/tablet/desktop).
| Chất lượng BEM & code style | 2 | Tên class rõ ràng, tránh lặp CSS.
| Hoàn thành bài tập về nhà | 2 | Nộp repo/CodeSandbox đúng hạn với README mô tả.

## 📚 Tài nguyên tham khảo
- [CSS Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN – Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN – CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [BEM Methodology](https://getbem.com/)

