# Bài 4: Bootstrap Framework Essentials

## 👀 Tổng quan
- Giúp học viên xây dựng prototype responsive nhanh bằng Bootstrap 5.
- Tập trung vào Grid System, component phổ biến và utility classes.
- Kết thúc buổi học với landing page hoàn chỉnh có form đăng ký.

**Thời lượng đề xuất:** 3 giờ (180 phút).

## 🎯 Mục tiêu học tập
Sau buổi học, học viên có thể:
- Cấu hình dự án Bootstrap qua CDN và cấu trúc file chuẩn Bootcamp.
- Tùy biến Grid System 12 cột với breakpoint và gutter thích hợp.
- Áp dụng component core (Navbar, Cards, Forms, Buttons) cùng utility classes.
- Kết hợp Bootstrap cùng CSS tùy chỉnh và JavaScript nhẹ để mở rộng tính năng.
- Triển khai landing page marketing đáp ứng nhiều thiết bị.

## ✅ Tiền đề cần chuẩn bị
- Đã học Bài 1–3 hoặc nắm vững HTML/CSS nền tảng.
- Kiến thức Flexbox & Grid căn bản để hiểu cơ chế bootstrap.
- VS Code + Live Server, trình duyệt Chrome.
- Tải trước starter kit trong thư mục `bai4/`.

## 🗂️ Kế hoạch buổi học
| Thời lượng | Hoạt động | Hình thức |
|-----------:|-----------|-----------|
| 10 phút | Warm-up: so sánh thiết kế thuần CSS vs dùng framework | Discussion |
| 25 phút | Mini-lecture: Giới thiệu Bootstrap 5, cấu trúc, cách import | Instructor-led demo |
| 30 phút | Guided Practice 1: Bootstrap Grid (container, row, col, breakpoint) | Pair programming |
| 15 phút | Nghỉ & Q&A nhanh | Break |
| 30 phút | Mini-lecture: Components (Navbar, Card, Carousel, Form) | Instructor-led demo |
| 35 phút | Guided Practice 2: Customizing utilities & theme colors | Small group |
| 25 phút | Lab Challenge: Landing page với hero, features, pricing, CTA | Solo coding |
| 10 phút | Showcase & feedback, giao bài tập về nhà | Discussion |

## 🛠️ Lộ trình cập nhật HTML
- **Giai đoạn 1 – Khởi tạo:** Thêm mục "Lộ trình" trong navbar/hero của `index.html`, diễn giải tổng quan Bootstrap và cấu trúc file starter đúng chuẩn README.
- **Giai đoạn 2 – Ứng dụng:** Cập nhật section Grid, Components, Utilities với ví dụ tương ứng (navbar, card, form). Liên kết CTA từ roadmap tới từng section để học viên truy cập nhanh.
- **Giai đoạn 3 – Nâng cao:** Hoàn thiện phần Thực hành/Lab với lời kêu gọi hoàn chỉnh, bổ sung liên kết tài nguyên và đảm bảo footer, form, CTA đáp ứng rubric đánh giá.

## 🔑 Khái niệm chính
- CDN vs self-hosting, file structure Bootcamp (`index.html`, `styles.css`, `script.js`).
- Container types (`.container`, `.container-fluid`, `.container-xl`).
- Breakpoint & column utilities (`col-sm-6`, `col-lg-4`, `offset`, `order`).
- Component APIs: `data-bs-toggle`, modal, collapse.
- Utility classes: spacing (`m-`, `p-`), typography (`fw-bold`), color (`bg-primary`).

## 🧑‍🏫 Ghi chú cho giảng viên
- Chuẩn bị so sánh trước/sau khi áp dụng Bootstrap để thấy lợi ích.
- Nhấn mạnh best practice: không override trực tiếp class core, nên dùng custom class hoặc `:root` variables.
- Khi demo component, sử dụng DevTools > Computed để minh họa nguồn style.
- Khuyến khích học viên kiểm tra accessibility (contrast, aria-label) trong Form demo.

## 🧪 Guided Practice
### Activity 1 – Mastering the Grid (30 phút)
1. Từ file `grid-demo.html`, yêu cầu học viên tạo layout 3 cột desktop, 2 cột tablet, 1 cột mobile.
2. Sử dụng `g-3`, `align-items-center` và `order-lg-last` cho hero image.
3. Trình bày cách dùng `col-auto` cho button.

### Activity 2 – Component Customization (35 phút)
1. Sử dụng `nav` + `navbar-expand-lg` để tạo thanh menu cố định.
2. Tạo card deck giới thiệu khóa học với `card`, `card-body`, `btn-outline-primary`.
3. Custom màu chủ đạo bằng cách override biến trong `styles.css`:
   ```css
   :root {
     --bs-primary: #6f42c1;
     --bs-body-font-family: 'Inter', sans-serif;
   }
   ```
4. Thêm form đăng ký với `form-floating`, validation feedback (`is-invalid`).

## 🧱 Lab Challenge – Marketing Landing Page (25 phút)
- Deliverable: Trang landing quảng bá khóa học front-end.
- Yêu cầu tối thiểu:
  - Header fixed với navbar collapse trên mobile.
  - Hero section có CTA button và hình minh họa.
  - Section features dạng 3 cột trên desktop, 1 cột mobile.
  - Pricing section sử dụng `card` và `btn-primary`.
  - Footer với icon mạng xã hội (`bi bi-facebook`, ...).

## 🏠 Bài tập về nhà
1. **Clone Component Library:** Tạo 5 component Bootstrap tùy biến (Navbar, Hero, Pricing card, Testimonial, Footer) và ghi chú cách tuỳ chỉnh.
2. **Form Validation Mini-project:** Xây dựng form đăng ký sự kiện dùng Bootstrap validation + custom tooltip.
3. **Research task:** Viết blog (300 chữ) so sánh Bootstrap với Tailwind, ưu/nhược điểm cho Bootcamp projects.

## 📊 Đánh giá & Rubric
| Tiêu chí | Điểm | Mô tả |
|---------|-----:|-------|
| Hiểu Bootstrap Grid & breakpoint | 3 | Sắp xếp layout đúng yêu cầu trong Guided Practice. |
| Sử dụng component & utility chuẩn | 3 | Dùng class đúng cú pháp, tránh lặp code thuần CSS. |
| Tùy biến theme & accessibility | 2 | Override biến hợp lý, đảm bảo contrast, aria-label. |
| Hoàn thành lab & bài tập về nhà | 2 | Deploy hoặc ghi lại kết quả (GitHub/Netlify). |

## 📚 Tài nguyên tham khảo
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Cheatsheet Grid](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Form Validation Guidelines](https://getbootstrap.com/docs/5.3/forms/validation/)

