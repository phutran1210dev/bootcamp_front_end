// OOP Examples and Demonstrations
// This file contains all the live examples used in the HTML page

// Global variables to store demo instances
let currentPerson = null;
let currentAccount = null;
let currentAnimal = null;
let currentCar = null;
let shapeCalculator = null;

// Person Class Demo
function createPersonDemo() {
    const name = document.getElementById('personName').value || 'Nguyễn Văn A';
    const age = parseInt(document.getElementById('personAge').value) || 25;
    const email = document.getElementById('personEmail').value || 'vana@email.com';
    
    // Person class definition
    class Person {
        constructor(name, age, email) {
            this.name = name;
            this.age = age;
            this.email = email;
        }

        introduce() {
            return `Xin chào, tôi là ${this.name}, ${this.age} tuổi`;
        }

        get info() {
            return `${this.name} - ${this.email}`;
        }

        set updateAge(newAge) {
            if (newAge > 0 && newAge < 150) {
                this.age = newAge;
            }
        }

        static createAdult(name, email) {
            return new Person(name, 18, email);
        }
    }
    
    currentPerson = new Person(name, age, email);
    
    const output = document.getElementById('personOutput');
    output.innerHTML = `
<strong>✅ Đã tạo Person thành công!</strong>

<strong>Thông tin:</strong>
• Tên: ${currentPerson.name}
• Tuổi: ${currentPerson.age}
• Email: ${currentPerson.email}

<strong>Methods:</strong>
• introduce(): "${currentPerson.introduce()}"
• info getter: "${currentPerson.info}"

<strong>Test setter:</strong>`;
    
    // Test setter
    const newAge = age + 1;
    currentPerson.updateAge = newAge;
    output.innerHTML += `
• Cập nhật tuổi thành ${newAge}: ${currentPerson.age}

<strong>Static method:</strong>`;
    
    // Test static method
    const adult = Person.createAdult("Test Adult", "adult@email.com");
    output.innerHTML += `
• Person.createAdult(): "${adult.name}, ${adult.age} tuổi"`;
}

// BankAccount Demo Functions
function createAccountDemo() {
    const accountNumber = document.getElementById('accountNumber').value || '123456789';
    const initialBalance = parseFloat(document.getElementById('initialBalance').value) || 1000;
    const pin = document.getElementById('pin').value || '1234';
    
    // BankAccount class with private fields
    class BankAccount {
        #balance = 0;
        #accountNumber;
        #pin;

        constructor(accountNumber, initialBalance = 0, pin) {
            this.#accountNumber = accountNumber;
            this.#balance = initialBalance;
            this.#pin = pin;
        }

        deposit(amount) {
            if (amount > 0) {
                this.#balance += amount;
                return `Đã nạp ${amount}. Số dư: ${this.#balance}`;
            }
            return "Số tiền không hợp lệ";
        }

        withdraw(amount, pin) {
            if (!this.#validatePin(pin)) {
                return "Mã PIN không đúng";
            }
            
            if (amount > 0 && amount <= this.#balance) {
                this.#balance -= amount;
                return `Đã rút ${amount}. Số dư: ${this.#balance}`;
            }
            return "Số tiền không hợp lệ hoặc không đủ số dư";
        }

        #validatePin(pin) {
            return this.#pin === pin;
        }

        get balance() {
            return this.#balance;
        }

        get accountInfo() {
            return `Tài khoản: ${this.#accountNumber}`;
        }
    }
    
    currentAccount = new BankAccount(accountNumber, initialBalance, pin);
    
    document.getElementById('accountControls').style.display = 'flex';
    const output = document.getElementById('accountOutput');
    output.innerHTML = `
<strong>✅ Đã tạo tài khoản thành công!</strong>

${currentAccount.accountInfo}
Số dư ban đầu: ${currentAccount.balance}
Mã PIN: ${pin} (đã được bảo vệ bằng private field)

<strong>Sẵn sàng để thực hiện giao dịch...</strong>`;
}

function depositDemo() {
    if (!currentAccount) {
        alert('Vui lòng tạo tài khoản trước!');
        return;
    }
    
    const amount = parseFloat(document.getElementById('amount').value);
    if (!amount || amount <= 0) {
        alert('Vui lòng nhập số tiền hợp lệ!');
        return;
    }
    
    const result = currentAccount.deposit(amount);
    appendToOutput('accountOutput', `\n💰 ${result}`);
    document.getElementById('amount').value = '';
}

function withdrawDemo() {
    if (!currentAccount) {
        alert('Vui lòng tạo tài khoản trước!');
        return;
    }
    
    const amount = parseFloat(document.getElementById('amount').value);
    const pin = document.getElementById('pinInput').value;
    
    if (!amount || amount <= 0) {
        alert('Vui lòng nhập số tiền hợp lệ!');
        return;
    }
    
    if (!pin) {
        alert('Vui lòng nhập mã PIN!');
        return;
    }
    
    const result = currentAccount.withdraw(amount, pin);
    appendToOutput('accountOutput', `\n💳 ${result}`);
    document.getElementById('amount').value = '';
    document.getElementById('pinInput').value = '';
}

function checkBalanceDemo() {
    if (!currentAccount) {
        alert('Vui lòng tạo tài khoản trước!');
        return;
    }
    
    appendToOutput('accountOutput', `\n📊 Số dư hiện tại: ${currentAccount.balance}`);
}

// Animal Inheritance Demo
function createAnimalDemo() {
    const type = document.getElementById('animalType').value;
    const name = document.getElementById('animalName').value || 'Buddy';
    const breedOrColor = document.getElementById('animalBreed').value || 'Golden Retriever';
    
    // Animal classes with inheritance
    class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
            this.energy = 100;
        }

        eat(food) {
            this.energy += 10;
            return `${this.name} đã ăn ${food}. Năng lượng: ${this.energy}`;
        }

        sleep() {
            this.energy += 20;
            return `${this.name} đã ngủ. Năng lượng: ${this.energy}`;
        }

        makeSound() {
            return `${this.name} phát ra âm thanh`;
        }

        getInfo() {
            return `Tên: ${this.name}, Loài: ${this.species}, Năng lượng: ${this.energy}`;
        }
    }

    class Dog extends Animal {
        constructor(name, breed) {
            super(name, "Chó");
            this.breed = breed;
            this.loyalty = 100;
        }

        makeSound() {
            return `${this.name} sủa: Gâu gâu!`;
        }

        wagTail() {
            this.loyalty += 5;
            return `${this.name} vẫy đuôi vui vẻ! Lòng trung thành: ${this.loyalty}`;
        }

        fetch(item) {
            this.energy -= 10;
            this.loyalty += 10;
            return `${this.name} đã đi lấy ${item}! Năng lượng: ${this.energy}, Lòng trung thành: ${this.loyalty}`;
        }

        getInfo() {
            return super.getInfo() + `, Giống: ${this.breed}, Lòng trung thành: ${this.loyalty}`;
        }
    }

    class Cat extends Animal {
        constructor(name, color) {
            super(name, "Mèo");
            this.color = color;
            this.independence = 80;
        }

        makeSound() {
            return `${this.name} kêu: Meo meo!`;
        }

        climb() {
            this.energy -= 5;
            return `${this.name} đã trèo lên cao! Năng lượng: ${this.energy}`;
        }

        hunt() {
            this.energy -= 15;
            this.independence += 5;
            return `${this.name} đã đi săn! Năng lượng: ${this.energy}, Độc lập: ${this.independence}`;
        }

        getInfo() {
            return super.getInfo() + `, Màu: ${this.color}, Độc lập: ${this.independence}`;
        }
    }
    
    if (type === 'dog') {
        currentAnimal = new Dog(name, breedOrColor);
    } else {
        currentAnimal = new Cat(name, breedOrColor);
    }
    
    document.getElementById('animalControls').style.display = 'flex';
    const output = document.getElementById('animalOutput');
    output.innerHTML = `
<strong>✅ Đã tạo ${currentAnimal.species} thành công!</strong>

${currentAnimal.getInfo()}

<strong>Sẵn sàng cho các hoạt động...</strong>`;
}

function animalEatDemo() {
    if (!currentAnimal) {
        alert('Vui lòng tạo animal trước!');
        return;
    }
    
    const foods = ['thức ăn khô', 'thịt', 'cá', 'rau củ', 'bánh quy'];
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    const result = currentAnimal.eat(randomFood);
    appendToOutput('animalOutput', `\n🍽️ ${result}`);
}

function animalSleepDemo() {
    if (!currentAnimal) {
        alert('Vui lòng tạo animal trước!');
        return;
    }
    
    const result = currentAnimal.sleep();
    appendToOutput('animalOutput', `\n💤 ${result}`);
}

function animalSoundDemo() {
    if (!currentAnimal) {
        alert('Vui lòng tạo animal trước!');
        return;
    }
    
    const result = currentAnimal.makeSound();
    appendToOutput('animalOutput', `\n🔊 ${result}`);
}

function animalSpecialDemo() {
    if (!currentAnimal) {
        alert('Vui lòng tạo animal trước!');
        return;
    }
    
    let result;
    if (currentAnimal.species === 'Chó') {
        const items = ['bóng', 'que gỗ', 'đồ chơi', 'giày'];
        const randomItem = items[Math.floor(Math.random() * items.length)];
        result = currentAnimal.fetch(randomItem);
    } else {
        const actions = [currentAnimal.climb(), currentAnimal.hunt()];
        result = actions[Math.floor(Math.random() * actions.length)];
    }
    
    appendToOutput('animalOutput', `\n⭐ ${result}`);
}

function animalInfoDemo() {
    if (!currentAnimal) {
        alert('Vui lòng tạo animal trước!');
        return;
    }
    
    appendToOutput('animalOutput', `\n📋 ${currentAnimal.getInfo()}`);
}

// Car Encapsulation Demo
function createCarDemo() {
    const brand = document.getElementById('carBrand').value || 'Toyota';
    const model = document.getElementById('carModel').value || 'Camry';
    const maxFuel = parseFloat(document.getElementById('maxFuel').value) || 60;
    
    // Car class with encapsulation
    class Car {
        #engine;
        #fuel;
        #maxFuel;
        #isRunning = false;

        constructor(brand, model, maxFuel = 50) {
            this.brand = brand;
            this.model = model;
            this.#maxFuel = maxFuel;
            this.#fuel = 0;
            this.#engine = {
                temperature: 20,
                rpm: 0
            };
        }

        start() {
            if (this.#isRunning) {
                return "Xe đã được khởi động rồi!";
            }
            
            if (this.#fuel <= 0) {
                return "Không thể khởi động - hết xăng!";
            }

            this.#isRunning = true;
            this.#engine.rpm = 800;
            this.#warmUpEngine();
            return `${this.brand} ${this.model} đã khởi động thành công!`;
        }

        stop() {
            if (!this.#isRunning) {
                return "Xe đã tắt rồi!";
            }

            this.#isRunning = false;
            this.#engine.rpm = 0;
            this.#coolDownEngine();
            return `${this.brand} ${this.model} đã tắt máy.`;
        }

        addFuel(amount) {
            if (amount <= 0) {
                return "Số lượng xăng phải lớn hơn 0!";
            }

            const canAdd = Math.min(amount, this.#maxFuel - this.#fuel);
            this.#fuel += canAdd;
            
            if (canAdd < amount) {
                return `Đã thêm ${canAdd}L xăng. Bình xăng đã đầy! (${this.#fuel}/${this.#maxFuel}L)`;
            }
            
            return `Đã thêm ${canAdd}L xăng. Tổng: ${this.#fuel}L`;
        }

        drive(distance) {
            if (!this.#isRunning) {
                return "Hãy khởi động xe trước!";
            }

            const fuelNeeded = distance * 0.1;
            
            if (fuelNeeded > this.#fuel) {
                return `Không đủ xăng! Cần ${fuelNeeded}L nhưng chỉ có ${this.#fuel}L`;
            }

            this.#fuel -= fuelNeeded;
            this.#updateEngineLoad(distance);
            
            return `Đã lái ${distance}km. Xăng còn lại: ${this.#fuel.toFixed(1)}L`;
        }

        #warmUpEngine() {
            this.#engine.temperature = 90;
        }

        #coolDownEngine() {
            this.#engine.temperature = 20;
        }

        #updateEngineLoad(distance) {
            const load = Math.min(3000, 800 + (distance * 10));
            this.#engine.rpm = load;
            this.#engine.temperature = Math.min(110, 90 + (distance * 0.5));
        }

        get fuelLevel() {
            return `${this.#fuel.toFixed(1)}/${this.#maxFuel}L`;
        }

        get engineStatus() {
            return {
                running: this.#isRunning,
                temperature: this.#engine.temperature,
                rpm: this.#engine.rpm
            };
        }

        get carInfo() {
            return `${this.brand} ${this.model} - ${this.#isRunning ? 'Đang chạy' : 'Đã tắt máy'}`;
        }
    }
    
    currentCar = new Car(brand, model, maxFuel);
    
    document.getElementById('carControls').style.display = 'block';
    const output = document.getElementById('carOutput');
    output.innerHTML = `
<strong>✅ Đã tạo xe thành công!</strong>

${currentCar.carInfo}
Dung tích bình xăng: ${maxFuel}L
Xăng hiện tại: ${currentCar.fuelLevel}

<strong>Sẵn sàng cho các thao tác...</strong>`;
}

function addFuelDemo() {
    if (!currentCar) {
        alert('Vui lòng tạo xe trước!');
        return;
    }
    
    const amount = parseFloat(document.getElementById('fuelAmount').value);
    if (!amount || amount <= 0) {
        alert('Vui lòng nhập số lít xăng hợp lệ!');
        return;
    }
    
    const result = currentCar.addFuel(amount);
    appendToOutput('carOutput', `\n⛽ ${result}`);
    document.getElementById('fuelAmount').value = '';
}

function startCarDemo() {
    if (!currentCar) {
        alert('Vui lòng tạo xe trước!');
        return;
    }
    
    const result = currentCar.start();
    appendToOutput('carOutput', `\n🚗 ${result}`);
}

function stopCarDemo() {
    if (!currentCar) {
        alert('Vui lòng tạo xe trước!');
        return;
    }
    
    const result = currentCar.stop();
    appendToOutput('carOutput', `\n🛑 ${result}`);
}

function driveCarDemo() {
    if (!currentCar) {
        alert('Vui lòng tạo xe trước!');
        return;
    }
    
    const distance = parseFloat(document.getElementById('driveDistance').value);
    if (!distance || distance <= 0) {
        alert('Vui lòng nhập khoảng cách hợp lệ!');
        return;
    }
    
    const result = currentCar.drive(distance);
    appendToOutput('carOutput', `\n🏁 ${result}`);
    document.getElementById('driveDistance').value = '';
}

function carStatusDemo() {
    if (!currentCar) {
        alert('Vui lòng tạo xe trước!');
        return;
    }
    
    const status = currentCar.engineStatus;
    const info = `
📊 Trạng thái xe:
• ${currentCar.carInfo}
• Xăng: ${currentCar.fuelLevel}
• Động cơ: ${status.running ? 'Đang chạy' : 'Tắt'}
• Nhiệt độ: ${status.temperature}°C
• RPM: ${status.rpm}`;
    
    appendToOutput('carOutput', info);
}

// Shape Polymorphism Demo
function initializeShapeCalculator() {
    if (!shapeCalculator) {
        // Shape classes for polymorphism demo
        class Shape {
            constructor(name) {
                this.name = name;
            }

            calculateArea() {
                throw new Error("calculateArea() phải được implement bởi class con");
            }

            calculatePerimeter() {
                throw new Error("calculatePerimeter() phải được implement bởi class con");
            }

            getInfo() {
                return `${this.name} - Diện tích: ${this.calculateArea().toFixed(2)}, Chu vi: ${this.calculatePerimeter().toFixed(2)}`;
            }
        }

        class Rectangle extends Shape {
            constructor(width, height) {
                super("Hình chữ nhật");
                this.width = width;
                this.height = height;
            }

            calculateArea() {
                return this.width * this.height;
            }

            calculatePerimeter() {
                return 2 * (this.width + this.height);
            }
        }

        class Circle extends Shape {
            constructor(radius) {
                super("Hình tròn");
                this.radius = radius;
            }

            calculateArea() {
                return Math.PI * this.radius * this.radius;
            }

            calculatePerimeter() {
                return 2 * Math.PI * this.radius;
            }
        }

        class Triangle extends Shape {
            constructor(side1, side2, side3) {
                super("Tam giác");
                this.side1 = side1;
                this.side2 = side2;
                this.side3 = side3;
            }

            calculateArea() {
                const s = this.calculatePerimeter() / 2;
                return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
            }

            calculatePerimeter() {
                return this.side1 + this.side2 + this.side3;
            }

            isValidTriangle() {
                return (this.side1 + this.side2 > this.side3) &&
                       (this.side1 + this.side3 > this.side2) &&
                       (this.side2 + this.side3 > this.side1);
            }
        }

        class ShapeCalculator {
            constructor() {
                this.shapes = [];
            }

            addShape(shape) {
                if (shape instanceof Shape) {
                    this.shapes.push(shape);
                    return `Đã thêm ${shape.name}`;
                }
                throw new Error("Object phải là instance của Shape");
            }

            calculateTotalArea() {
                return this.shapes.reduce((total, shape) => total + shape.calculateArea(), 0);
            }

            calculateTotalPerimeter() {
                return this.shapes.reduce((total, shape) => total + shape.calculatePerimeter(), 0);
            }

            getShapesSummary() {
                return this.shapes.map(shape => shape.getInfo()).join('\n');
            }

            clear() {
                this.shapes = [];
            }
        }

        // Store classes globally for use in demo functions
        window.Shape = Shape;
        window.Rectangle = Rectangle;
        window.Circle = Circle;
        window.Triangle = Triangle;
        
        shapeCalculator = new ShapeCalculator();
    }
}

// Shape type change handler
document.addEventListener('DOMContentLoaded', function() {
    const shapeTypeSelect = document.getElementById('shapeType');
    if (shapeTypeSelect) {
        shapeTypeSelect.addEventListener('change', function() {
            updateShapeParams();
        });
        updateShapeParams(); // Initialize
    }
});

function updateShapeParams() {
    const shapeType = document.getElementById('shapeType').value;
    const param1 = document.getElementById('param1');
    const param2 = document.getElementById('param2');
    const param3 = document.getElementById('param3');
    
    if (shapeType === 'rectangle') {
        param1.placeholder = 'Chiều rộng';
        param1.value = '5';
        param2.placeholder = 'Chiều cao';
        param2.value = '3';
        param2.style.display = 'inline-block';
        param3.style.display = 'none';
    } else if (shapeType === 'circle') {
        param1.placeholder = 'Bán kính';
        param1.value = '4';
        param2.style.display = 'none';
        param3.style.display = 'none';
    } else if (shapeType === 'triangle') {
        param1.placeholder = 'Cạnh 1';
        param1.value = '3';
        param2.placeholder = 'Cạnh 2';
        param2.value = '4';
        param2.style.display = 'inline-block';
        param3.placeholder = 'Cạnh 3';
        param3.value = '5';
        param3.style.display = 'inline-block';
    }
}

function addShapeDemo() {
    initializeShapeCalculator();
    
    const shapeType = document.getElementById('shapeType').value;
    const param1 = parseFloat(document.getElementById('param1').value);
    const param2 = parseFloat(document.getElementById('param2').value);
    const param3 = parseFloat(document.getElementById('param3').value);
    
    if (!param1 || param1 <= 0) {
        alert('Vui lòng nhập thông số hợp lệ!');
        return;
    }
    
    let shape;
    try {
        if (shapeType === 'rectangle') {
            if (!param2 || param2 <= 0) {
                alert('Vui lòng nhập chiều cao hợp lệ!');
                return;
            }
            shape = new Rectangle(param1, param2);
        } else if (shapeType === 'circle') {
            shape = new Circle(param1);
        } else if (shapeType === 'triangle') {
            if (!param2 || param2 <= 0 || !param3 || param3 <= 0) {
                alert('Vui lòng nhập tất cả các cạnh hợp lệ!');
                return;
            }
            shape = new Triangle(param1, param2, param3);
            if (!shape.isValidTriangle()) {
                alert('Các cạnh không tạo thành tam giác hợp lệ!');
                return;
            }
        }
        
        const result = shapeCalculator.addShape(shape);
        const output = document.getElementById('shapesOutput');
        output.innerHTML += `\n✅ ${result}`;
        output.innerHTML += `\n   ${shape.getInfo()}`;
        
    } catch (error) {
        alert(`Lỗi: ${error.message}`);
    }
}

function calculateTotalDemo() {
    if (!shapeCalculator || shapeCalculator.shapes.length === 0) {
        alert('Vui lòng thêm ít nhất một hình trước!');
        return;
    }
    
    const totalArea = shapeCalculator.calculateTotalArea();
    const totalPerimeter = shapeCalculator.calculateTotalPerimeter();
    
    const output = document.getElementById('shapesOutput');
    output.innerHTML += `\n\n📊 TỔNG KẾT:`;
    output.innerHTML += `\n• Tổng diện tích: ${totalArea.toFixed(2)}`;
    output.innerHTML += `\n• Tổng chu vi: ${totalPerimeter.toFixed(2)}`;
    output.innerHTML += `\n• Số lượng hình: ${shapeCalculator.shapes.length}`;
}

function clearShapesDemo() {
    if (shapeCalculator) {
        shapeCalculator.clear();
    }
    const output = document.getElementById('shapesOutput');
    output.innerHTML = '🗑️ Đã xóa tất cả hình.';
}

// Utility Functions
function appendToOutput(outputId, text) {
    const output = document.getElementById(outputId);
    output.innerHTML += text;
    output.scrollTop = output.scrollHeight;
}

function copyCode(button) {
    const codeBlock = button.closest('.code-example').querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#72d572';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Không thể copy code. Vui lòng copy thủ công.');
    });
}

// Initialize demos when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript OOP Examples loaded successfully!');
    
    // Initialize any necessary components
    initializeShapeCalculator();
});