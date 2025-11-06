# 📚 HIGHLANDS COFFEE - BEM METHODOLOGY DOCUMENTATION

## 🎯 Tổng quan về BEM (Block Element Modifier)

BEM là một phương pháp đặt tên CSS giúp tạo ra code có cấu trúc, dễ đọc và dễ bảo trì. BEM viết tắt của:

- **Block**: Thành phần độc lập (ví dụ: `header`, `menu`, `hero`)
- **Element**: Phần của block (ví dụ: `header__logo`, `menu__item`)  
- **Modifier**: Biến thể của block/element (ví dụ: `button--primary`, `menu__item--active`)

## 🏗️ Cú pháp BEM

```css
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

### Ví dụ thực tế:
```css
.header {}                    /* Block */
.header__logo {}              /* Element */
.header__nav {}               /* Element */
.header__nav-link {}          /* Element */
.header__nav-link--active {}  /* Element với Modifier */
```

## 📋 Cấu trúc Blocks trong dự án

### 1. 🏠 HEADER Block
```css
.header                    /* Main header container */
.header__container         /* Header content wrapper */
.header__logo              /* Logo text */
.header__logo-icon         /* Coffee icon in logo */
.header__nav               /* Navigation container */
.header__nav-list          /* Navigation list */
.header__nav-item          /* Individual nav item */
.header__nav-link          /* Navigation links */
.header__nav-link--active  /* Active navigation state */
```

**HTML Structure:**
```html
<header class="header">
  <div class="header__container">
    <h1 class="header__logo">
      <i class="header__logo-icon"></i>
      Highlands Coffee
    </h1>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item">
          <a href="#" class="header__nav-link header__nav-link--active">
            Trang chủ
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

### 2. 🎭 HERO Block
```css
.hero                /* Hero section container */
.hero__content       /* Content wrapper */
.hero__title         /* Main hero title */
.hero__subtitle      /* Hero subtitle */
.hero__cta-button    /* Call-to-action button */
```

### 3. ℹ️ ABOUT Block
```css
.about                      /* About section */
.about__title               /* Section title */
.about__description         /* Main description */
.about__features            /* Features grid container */
.about__feature             /* Individual feature card */
.about__feature-icon        /* Feature icon */
.about__feature-title       /* Feature title */
.about__feature-description /* Feature description */
```

### 4. 🍽️ MENU Block
```css
.menu                        /* Menu section */
.menu__title                 /* Menu section title */
.menu__filter                /* Filter buttons container */
.menu__filter-button         /* Filter button */
.menu__filter-button--active /* Active filter button */
.menu__grid                  /* Menu items grid */
.menu__item                  /* Individual menu item */
.menu__item-image            /* Item image container */
.menu__item-icon             /* Item icon */
.menu__item-title            /* Item name */
.menu__item-description      /* Item description */
.menu__item-price            /* Item price */
.menu__item-button           /* Add to cart button */
.menu__item-button--added    /* Button after adding item */
```

### 5. 🛒 CART Block
```css
.cart                        /* Cart sidebar */
.cart--open                  /* Cart opened state */
.cart__title                 /* Cart header */
.cart__items                 /* Cart items container */
.cart__item                  /* Individual cart item */
.cart__item-content          /* Item content wrapper */
.cart__item-info             /* Item information */
.cart__item-name             /* Item name */
.cart__item-details          /* Item details (price x quantity) */
.cart__item-controls         /* Item control buttons */
.cart__quantity-button       /* Quantity change button */
.cart__quantity-button--decrease  /* Decrease quantity */
.cart__quantity-button--increase  /* Increase quantity */
.cart__remove-button         /* Remove item button */
.cart__total                 /* Cart total section */
.cart__checkout-button       /* Checkout button */
.cart__toggle-button         /* Floating cart toggle */
```

### 6. 📞 CONTACT Block
```css
.contact              /* Contact section */
.contact__title       /* Contact title */
.contact__info        /* Contact info grid */
.contact__item        /* Contact item card */
.contact__item-icon   /* Contact icon */
.contact__item-text   /* Contact text */
```

### 7. 🦶 FOOTER Block
```css
.footer              /* Footer section */
.footer__content     /* Footer content wrapper */
.footer__text        /* Footer text */
.footer__social      /* Social links container */
.footer__social-link /* Individual social link */
```

## 🎨 Utility Classes

BEM cũng hỗ trợ utility classes với prefix `u-`:

```css
.u-text-center        /* Text alignment center */
.u-margin-bottom-sm   /* Small bottom margin */
.u-margin-bottom-md   /* Medium bottom margin */
.u-margin-bottom-lg   /* Large bottom margin */
.u-hidden             /* Hide element */
.u-visible            /* Show element */
```

## 📱 Responsive Design với BEM

```css
/* Base styles */
.header__container {
  display: flex;
  justify-content: space-between;
}

/* Mobile styles */
@media (max-width: 768px) {
  .header__container {
    flex-direction: column;
  }
  
  .header__nav-list {
    gap: 1rem;
  }
}
```

## 💡 Best Practices

### ✅ DO - Nên làm:

1. **Tên rõ ràng và mô tả:**
```css
.menu__item-button          /* ✅ Rõ ràng */
.menu__filter-button--active /* ✅ Mô tả chính xác */
```

2. **Một block cho một component:**
```css
.header {}     /* ✅ Component header */
.menu {}       /* ✅ Component menu riêng biệt */
```

3. **Modifiers mô tả trạng thái:**
```css
.cart--open                    /* ✅ Trạng thái mở */
.menu__filter-button--active  /* ✅ Trạng thái active */
```

### ❌ DON'T - Không nên:

1. **Tên quá ngắn hoặc không rõ ràng:**
```css
.btn {}        /* ❌ Quá ngắn */
.item {}       /* ❌ Không rõ thuộc block nào */
```

2. **Nesting quá sâu:**
```css
.header__nav__list__item__link {} /* ❌ Quá dài */
```

3. **Dùng tag selectors với BEM:**
```css
.header h1 {}  /* ❌ Không theo BEM */
.header__logo {} /* ✅ Đúng BEM */
```

## 🔧 JavaScript với BEM

### Module-based approach:
```javascript
const MenuModule = {
  elements: {
    filterButtons: document.querySelectorAll('.menu__filter-button'),
    menuItems: document.querySelectorAll('.menu__item'),
  },
  
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    this.elements.filterButtons.forEach(button => {
      button.addEventListener('click', this.handleFilter.bind(this));
    });
  }
};
```

## 📊 Lợi ích của BEM

### 1. **Tính nhất quán:**
- Tất cả developers đều hiểu cấu trúc
- Dễ dàng đoán được tên class

### 2. **Khả năng bảo trì:**
- Dễ tìm và sửa CSS
- Không có conflicts giữa các styles

### 3. **Tái sử dụng:**
- Components có thể dùng lại ở nhiều nơi
- Styles không phụ thuộc context

### 4. **Scalability:**
- Dễ mở rộng dự án
- Thêm features mới không ảnh hưởng code cũ

## 📝 Ví dụ Migration

### Before (Không BEM):
```html
<div class="menu">
  <button class="filter active">All</button>
  <div class="item">
    <h3>Coffee</h3>
    <button class="add-btn">Add</button>
  </div>
</div>
```

### After (BEM):
```html
<div class="menu">
  <button class="menu__filter-button menu__filter-button--active">
    All
  </button>
  <div class="menu__item">
    <h3 class="menu__item-title">Coffee</h3>
    <button class="menu__item-button">Add</button>
  </div>
</div>
```

## 🎯 Kết luận

BEM methodology giúp:
- **Tổ chức code CSS có cấu trúc**
- **Dễ đọc và bảo trì**
- **Tránh conflicts và bugs**
- **Tăng hiệu quả làm việc nhóm**
- **Scalable cho dự án lớn**

Việc áp dụng BEM từ đầu sẽ giúp dự án phát triển ổn định và chuyên nghiệp hơn! 🚀

---

**📧 Contact:** Highlands Coffee Development Team  
**📅 Last Updated:** November 2025  
**🔖 Version:** 1.0.0