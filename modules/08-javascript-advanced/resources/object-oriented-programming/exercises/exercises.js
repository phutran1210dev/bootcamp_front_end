// Interactive Exercises for JavaScript OOP
// This file handles the exercise workspace and provides exercise templates

// Exercise data and templates
const exercises = {
    library: {
        title: "Library Management System",
        difficulty: "Dễ",
        description: "Tạo hệ thống quản lý thư viện với Book, Author, và Library classes",
        instructions: `
<h4>📚 Hướng dẫn bài tập Library Management</h4>
<ol>
    <li><strong>Tạo class Book:</strong>
        <ul>
            <li>Properties: title, author, isbn, available (boolean)</li>
            <li>Constructor nhận tất cả parameters</li>
            <li>Method: getInfo() - trả về thông tin sách</li>
        </ul>
    </li>
    <li><strong>Tạo class Author:</strong>
        <ul>
            <li>Properties: name, birthYear, books (array)</li>
            <li>Method: addBook(book) - thêm sách vào danh sách</li>
            <li>Method: getBookCount() - đếm số sách</li>
        </ul>
    </li>
    <li><strong>Tạo class Library:</strong>
        <ul>
            <li>Properties: name, books (array)</li>
            <li>Method: addBook(book) - thêm sách vào thư viện</li>
            <li>Method: borrowBook(isbn) - mượn sách</li>
            <li>Method: returnBook(isbn) - trả sách</li>
            <li>Method: findAvailableBooks() - tìm sách có sẵn</li>
        </ul>
    </li>
    <li><strong>Test code:</strong>
        <ul>
            <li>Tạo authors và books</li>
            <li>Tạo library và thêm books</li>
            <li>Test borrowing và returning</li>
        </ul>
    </li>
</ol>

<p><strong>💡 Gợi ý:</strong> Sử dụng constructor, methods, và array manipulation</p>`,
        template: `// Bài 1: Library Management System
// Tạo hệ thống quản lý thư viện

class Book {
    constructor(title, author, isbn, available = true) {
        // TODO: Implement constructor
    }
    
    getInfo() {
        // TODO: Return book information
    }
}

class Author {
    constructor(name, birthYear) {
        // TODO: Implement constructor
    }
    
    addBook(book) {
        // TODO: Add book to author's book list
    }
    
    getBookCount() {
        // TODO: Return number of books
    }
}

class Library {
    constructor(name) {
        // TODO: Implement constructor
    }
    
    addBook(book) {
        // TODO: Add book to library
    }
    
    borrowBook(isbn) {
        // TODO: Mark book as borrowed (available = false)
        // Return success/failure message
    }
    
    returnBook(isbn) {
        // TODO: Mark book as returned (available = true)
        // Return success/failure message
    }
    
    findAvailableBooks() {
        // TODO: Return array of available books
    }
}

// Test your implementation
const author1 = new Author("Nguyễn Du", 1766);
const book1 = new Book("Truyện Kiều", "Nguyễn Du", "978-0000000001");
const book2 = new Book("Lục Vân Tiên", "Nguyễn Đình Chiểu", "978-0000000002");

author1.addBook(book1);

const library = new Library("Thư viện Trung tâm");
library.addBook(book1);
library.addBook(book2);

console.log("Available books:", library.findAvailableBooks().length);
console.log(library.borrowBook("978-0000000001"));
console.log("Available books after borrowing:", library.findAvailableBooks().length);
console.log(library.returnBook("978-0000000001"));`
    },

    ecommerce: {
        title: "E-commerce System",
        difficulty: "Trung bình",
        description: "Xây dựng hệ thống e-commerce với Product, Cart, Customer",
        instructions: `
<h4>🛒 Hướng dẫn bài tập E-commerce System</h4>
<ol>
    <li><strong>Tạo class Product:</strong>
        <ul>
            <li>Properties: id, name, price, category, stock</li>
            <li>Method: isInStock() - kiểm tra còn hàng</li>
            <li>Method: reduceStock(quantity) - giảm số lượng</li>
            <li>Method: getInfo() - thông tin sản phẩm</li>
        </ul>
    </li>
    <li><strong>Tạo class CartItem:</strong>
        <ul>
            <li>Properties: product, quantity</li>
            <li>Method: getTotalPrice() - tính tổng giá</li>
            <li>Method: updateQuantity(newQuantity)</li>
        </ul>
    </li>
    <li><strong>Tạo class Cart:</strong>
        <ul>
            <li>Properties: items (array of CartItem)</li>
            <li>Method: addProduct(product, quantity)</li>
            <li>Method: removeProduct(productId)</li>
            <li>Method: updateQuantity(productId, quantity)</li>
            <li>Method: getTotalPrice() - tổng giá giỏ hàng</li>
            <li>Method: clear() - xóa giỏ hàng</li>
        </ul>
    </li>
    <li><strong>Tạo class Customer:</strong>
        <ul>
            <li>Properties: id, name, email, cart</li>
            <li>Method: checkout() - thanh toán</li>
            <li>Method: getOrderHistory() - lịch sử đơn hàng</li>
        </ul>
    </li>
</ol>

<p><strong>💡 Gợi ý:</strong> Sử dụng composition (Cart chứa CartItem), validation, và error handling</p>`,
        template: `// Bài 2: E-commerce System
// Xây dựng hệ thống mua bán trực tuyến

class Product {
    constructor(id, name, price, category, stock) {
        // TODO: Implement constructor
    }
    
    isInStock(quantity = 1) {
        // TODO: Check if product has enough stock
    }
    
    reduceStock(quantity) {
        // TODO: Reduce stock if possible, throw error if not enough
    }
    
    getInfo() {
        // TODO: Return product information
    }
}

class CartItem {
    constructor(product, quantity) {
        // TODO: Implement constructor
        // Validate quantity and product stock
    }
    
    getTotalPrice() {
        // TODO: Calculate total price (price * quantity)
    }
    
    updateQuantity(newQuantity) {
        // TODO: Update quantity with validation
    }
}

class Cart {
    constructor() {
        // TODO: Initialize empty cart
    }
    
    addProduct(product, quantity) {
        // TODO: Add product to cart or update existing quantity
        // Check if product already exists in cart
    }
    
    removeProduct(productId) {
        // TODO: Remove product from cart
    }
    
    updateQuantity(productId, quantity) {
        // TODO: Update product quantity in cart
    }
    
    getTotalPrice() {
        // TODO: Calculate total price of all items
    }
    
    getItemCount() {
        // TODO: Get total number of items
    }
    
    clear() {
        // TODO: Clear all items from cart
    }
}

class Customer {
    constructor(id, name, email) {
        // TODO: Implement constructor with cart
        this.orderHistory = [];
    }
    
    checkout() {
        // TODO: Process checkout
        // Move cart items to order history
        // Clear cart
        // Return order summary
    }
    
    getOrderHistory() {
        // TODO: Return order history
    }
}

// Test your implementation
const product1 = new Product(1, "iPhone 15", 999, "Electronics", 10);
const product2 = new Product(2, "MacBook Pro", 1999, "Electronics", 5);
const product3 = new Product(3, "AirPods", 199, "Electronics", 20);

const customer = new Customer(1, "Nguyễn Văn A", "vana@email.com");

customer.cart.addProduct(product1, 2);
customer.cart.addProduct(product2, 1);

console.log("Cart total:", customer.cart.getTotalPrice());
console.log("Items in cart:", customer.cart.getItemCount());

const order = customer.checkout();
console.log("Order:", order);
console.log("Order history:", customer.getOrderHistory());`
    },

    game: {
        title: "Game Character System",
        difficulty: "Khó",
        description: "Tạo hệ thống nhân vật game với inheritance và polymorphism",
        instructions: `
<h4>🎮 Hướng dẫn bài tập Game Character System</h4>
<ol>
    <li><strong>Tạo base class Character:</strong>
        <ul>
            <li>Properties: name, health, mana, level, experience</li>
            <li>Method: attack(target) - tấn công (abstract method)</li>
            <li>Method: takeDamage(damage) - nhận sát thương</li>
            <li>Method: heal(amount) - hồi máu</li>
            <li>Method: levelUp() - tăng level</li>
            <li>Method: isAlive() - kiểm tra còn sống</li>
        </ul>
    </li>
    <li><strong>Tạo class Warrior extends Character:</strong>
        <ul>
            <li>Additional properties: armor, strength</li>
            <li>Override attack() - physical damage</li>
            <li>Special method: shieldBlock() - chặn đòn tấn công</li>
            <li>Special method: berserkerRage() - tăng damage</li>
        </ul>
    </li>
    <li><strong>Tạo class Mage extends Character:</strong>
        <ul>
            <li>Additional properties: intelligence, spells[]</li>
            <li>Override attack() - magic damage (costs mana)</li>
            <li>Special method: castSpell(spellName, target)</li>
            <li>Special method: meditate() - hồi mana</li>
        </ul>
    </li>
    <li><strong>Tạo class Archer extends Character:</strong>
        <ul>
            <li>Additional properties: agility, arrows</li>
            <li>Override attack() - ranged damage</li>
            <li>Special method: multiShot(targets[]) - bắn nhiều mục tiêu</li>
            <li>Special method: dodge() - né tránh</li>
        </ul>
    </li>
    <li><strong>Tạo battle system:</strong>
        <ul>
            <li>Class Battle với method fight(character1, character2)</li>
            <li>Turn-based combat</li>
            <li>Random events và critical hits</li>
        </ul>
    </li>
</ol>

<p><strong>💡 Gợi ý:</strong> Sử dụng inheritance, method overriding, và polymorphism. Implement strategy pattern cho different attack types.</p>`,
        template: `// Bài 3: Game Character System
// Tạo hệ thống nhân vật game với inheritance và polymorphism

class Character {
    constructor(name, health = 100, mana = 50) {
        // TODO: Implement base character
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.mana = mana;
        this.maxMana = mana;
        this.level = 1;
        this.experience = 0;
    }
    
    attack(target) {
        // TODO: Abstract method - should be overridden
        throw new Error("attack() method must be implemented by subclass");
    }
    
    takeDamage(damage) {
        // TODO: Reduce health, check if alive
    }
    
    heal(amount) {
        // TODO: Restore health up to max
    }
    
    restoreMana(amount) {
        // TODO: Restore mana up to max
    }
    
    levelUp() {
        // TODO: Increase level, restore health/mana, increase stats
    }
    
    gainExperience(exp) {
        // TODO: Add experience, level up if enough
    }
    
    isAlive() {
        // TODO: Check if health > 0
    }
    
    getStats() {
        // TODO: Return character stats
    }
}

class Warrior extends Character {
    constructor(name) {
        super(name, 120, 30); // More health, less mana
        // TODO: Add warrior-specific properties
        this.armor = 10;
        this.strength = 15;
        this.rageMode = false;
    }
    
    attack(target) {
        // TODO: Physical attack based on strength
        // Consider armor of target
    }
    
    shieldBlock() {
        // TODO: Temporary increase armor for next attack
    }
    
    berserkerRage() {
        // TODO: Increase damage but reduce defense
    }
}

class Mage extends Character {
    constructor(name) {
        super(name, 80, 100); // Less health, more mana
        // TODO: Add mage-specific properties
        this.intelligence = 20;
        this.spells = ["Fireball", "Heal", "Lightning"];
    }
    
    attack(target) {
        // TODO: Magic attack based on intelligence
        // Costs mana
    }
    
    castSpell(spellName, target) {
        // TODO: Cast specific spell with different effects
        switch(spellName) {
            case "Fireball":
                // High damage, costs mana
                break;
            case "Heal":
                // Restore health, costs mana
                break;
            case "Lightning":
                // Medium damage, chance to stun
                break;
        }
    }
    
    meditate() {
        // TODO: Restore mana over time
    }
}

class Archer extends Character {
    constructor(name) {
        super(name, 90, 40); // Balanced stats
        // TODO: Add archer-specific properties
        this.agility = 18;
        this.arrows = 30;
        this.dodgeChance = 0.2;
    }
    
    attack(target) {
        // TODO: Ranged attack based on agility
        // Consumes arrows
    }
    
    multiShot(targets) {
        // TODO: Attack multiple targets with reduced damage
    }
    
    dodge() {
        // TODO: Increase dodge chance temporarily
    }
}

class Battle {
    constructor(character1, character2) {
        this.character1 = character1;
        this.character2 = character2;
        this.turn = 1;
        this.battleLog = [];
    }
    
    fight() {
        // TODO: Implement turn-based combat
        // Continue until one character dies
        // Return battle result
    }
    
    processTurn(attacker, defender) {
        // TODO: Process one turn of combat
        // Handle special abilities randomly
    }
    
    getBattleLog() {
        return this.battleLog;
    }
}

// Test your implementation
const warrior = new Warrior("Thần Chiến");
const mage = new Mage("Pháp Sư");
const archer = new Archer("Thiện Xạ");

console.log("=== CHARACTER STATS ===");
console.log(warrior.getStats());
console.log(mage.getStats());
console.log(archer.getStats());

console.log("\\n=== BATTLE: Warrior vs Mage ===");
const battle = new Battle(warrior, mage);
const result = battle.fight();
console.log("Battle result:", result);
console.log("Battle log:", battle.getBattleLog());`
    }
};

// Exercise workspace management
function loadExercise(exerciseType) {
    const exercise = exercises[exerciseType];
    if (!exercise) {
        alert('Exercise not found!');
        return;
    }
    
    // Show workspace
    const workspace = document.getElementById('exerciseWorkspace');
    workspace.style.display = 'block';
    
    // Update title
    document.getElementById('exerciseTitle').textContent = exercise.title;
    
    // Load template code
    document.getElementById('exerciseCode').value = exercise.template;
    
    // Load instructions
    document.getElementById('exerciseInstructions').innerHTML = exercise.instructions;
    
    // Clear output
    document.getElementById('exerciseOutput').innerHTML = 'Sẵn sàng để chạy code...';
    
    // Scroll to workspace
    workspace.scrollIntoView({ behavior: 'smooth' });
}

function closeExercise() {
    const workspace = document.getElementById('exerciseWorkspace');
    workspace.style.display = 'none';
}

function runExerciseCode() {
    const code = document.getElementById('exerciseCode').value;
    const output = document.getElementById('exerciseOutput');
    
    // Clear previous output
    output.innerHTML = '';
    
    // Redirect console.log to our output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    const logs = [];
    
    console.log = (...args) => {
        logs.push({ type: 'log', content: args.join(' ') });
        originalLog.apply(console, args);
    };
    
    console.error = (...args) => {
        logs.push({ type: 'error', content: args.join(' ') });
        originalError.apply(console, args);
    };
    
    console.warn = (...args) => {
        logs.push({ type: 'warn', content: args.join(' ') });
        originalWarn.apply(console, args);
    };
    
    try {
        // Create a new function to execute the code in a controlled environment
        const executeCode = new Function(code);
        executeCode();
        
        // Display logs
        if (logs.length === 0) {
            output.innerHTML = '✅ Code executed successfully (no output)';
        } else {
            logs.forEach(log => {
                const logElement = document.createElement('div');
                logElement.className = `log-${log.type}`;
                
                if (log.type === 'error') {
                    logElement.innerHTML = `❌ ${log.content}`;
                    logElement.style.color = '#ef4444';
                } else if (log.type === 'warn') {
                    logElement.innerHTML = `⚠️ ${log.content}`;
                    logElement.style.color = '#f59e0b';
                } else {
                    logElement.innerHTML = log.content;
                }
                
                output.appendChild(logElement);
            });
        }
        
    } catch (error) {
        output.innerHTML = `❌ Runtime Error:\n${error.message}\n\nStack trace:\n${error.stack}`;
        output.style.color = '#ef4444';
    }
    
    // Restore original console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    
    // Scroll to bottom of output
    output.scrollTop = output.scrollHeight;
}

function clearOutput() {
    document.getElementById('exerciseOutput').innerHTML = 'Output cleared.';
}

// Auto-save functionality
let autoSaveTimeout;
document.addEventListener('DOMContentLoaded', function() {
    const codeTextarea = document.getElementById('exerciseCode');
    if (codeTextarea) {
        codeTextarea.addEventListener('input', function() {
            // Clear previous timeout
            clearTimeout(autoSaveTimeout);
            
            // Set new timeout for auto-save
            autoSaveTimeout = setTimeout(() => {
                // Auto-save to localStorage
                const currentTitle = document.getElementById('exerciseTitle').textContent;
                if (currentTitle && currentTitle !== 'Bài tập') {
                    localStorage.setItem(`exercise_${currentTitle}`, codeTextarea.value);
                }
            }, 2000); // Save after 2 seconds of inactivity
        });
    }
});

// Load saved exercise code
function loadSavedExercise(exerciseTitle) {
    const saved = localStorage.getItem(`exercise_${exerciseTitle}`);
    if (saved) {
        const shouldLoad = confirm('Bạn có muốn load code đã lưu trước đó không?');
        if (shouldLoad) {
            document.getElementById('exerciseCode').value = saved;
        }
    }
}

// Enhanced error handling for exercises
window.addEventListener('error', function(event) {
    const output = document.getElementById('exerciseOutput');
    if (output && !output.innerHTML.includes('❌')) {
        output.innerHTML += `\n❌ Global Error: ${event.message}`;
        output.style.color = '#ef4444';
    }
});

// Exercise solutions (for reference - not exposed to students)
const solutions = {
    library: `
class Book {
    constructor(title, author, isbn, available = true) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.available = available;
    }
    
    getInfo() {
        return \`"\${this.title}" by \${this.author} (ISBN: \${this.isbn}) - \${this.available ? 'Available' : 'Borrowed'}\`;
    }
}

class Author {
    constructor(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
        this.books = [];
    }
    
    addBook(book) {
        this.books.push(book);
    }
    
    getBookCount() {
        return this.books.length;
    }
}

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    
    addBook(book) {
        this.books.push(book);
    }
    
    borrowBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn);
        if (!book) {
            return "Book not found";
        }
        if (!book.available) {
            return "Book is already borrowed";
        }
        book.available = false;
        return \`Successfully borrowed "\${book.title}"\`;
    }
    
    returnBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn);
        if (!book) {
            return "Book not found";
        }
        if (book.available) {
            return "Book was not borrowed";
        }
        book.available = true;
        return \`Successfully returned "\${book.title}"\`;
    }
    
    findAvailableBooks() {
        return this.books.filter(book => book.available);
    }
}
    `,
    // Add other solutions here...
};

// Hint system
function showHint(exerciseType) {
    const hints = {
        library: [
            "Bắt đầu với constructor đơn giản, gán các parameters cho properties",
            "Sử dụng Array.find() để tìm sách theo ISBN",
            "Boolean flag (available) để track trạng thái sách",
            "Array.filter() để lọc sách có sẵn"
        ],
        ecommerce: [
            "CartItem cần reference đến Product object",
            "Kiểm tra stock trước khi add vào cart",
            "Sử dụng Map hoặc Array để store cart items",
            "Reduce method để tính tổng giá"
        ],
        game: [
            "Base class Character cần abstract attack method",
            "Override attack() ở mỗi subclass với logic khác nhau",
            "Random number cho critical hits và dodge",
            "Battle loop với turn-based logic"
        ]
    };
    
    const exerciseHints = hints[exerciseType];
    if (exerciseHints) {
        const hintText = exerciseHints.join('\n• ');
        alert(`💡 Gợi ý cho bài tập:\n\n• ${hintText}`);
    }
}

// Progress tracking
function trackProgress(exerciseType) {
    const progress = JSON.parse(localStorage.getItem('oop_progress') || '{}');
    progress[exerciseType] = {
        completed: true,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('oop_progress', JSON.stringify(progress));
}

// Export functionality for exercise code
function exportExerciseCode() {
    const code = document.getElementById('exerciseCode').value;
    const title = document.getElementById('exerciseTitle').textContent;
    
    if (!code.trim()) {
        alert('Không có code để export!');
        return;
    }
    
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

console.log('JavaScript OOP Exercises loaded successfully!');