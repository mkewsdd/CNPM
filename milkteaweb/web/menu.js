const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function getstart(){
    popcartHandle();
    openPopcart();
    closePopcart();
    closePayment();
    search();
    changePage();
    priceFilter()
    getData();
}
getstart()

function popcartHandle() {
    const buttons = $$('.drink__hover-text');
    const popcart = $('#popcart'); 
    const productsImg = $$('.drink__img');
    const productsName = $$('.drink__name');
    const productsPrice = $$('.drink__price');
    const cartList = $('.cart__product-items');
    const productName = $('.popcart__product-name');
    const cartCount = $('.cart-count');
    const productCounts = $('.counts__products');
    const productsTotalPrice = $('.total');
    const payment = $('.popcart__pay');

    var storedCartProducts = [];
    // Lấy thông tin của sản phẩm người dùng click vào
    buttons.forEach(button => {
        button.onclick = function() {

            const index = Array.from(buttons).indexOf(button);

            // Lấy thông tin tương ứng từ danh sách productsName và productsPrice
            const productImg = productsImg[index].src;
            const productName = productsName[index].innerText;
            const productPrice = productsPrice[index].innerText;
      
            const product = {
                img: productImg,
                name: productName,
                price: productPrice
            };

            addToCart(product);

            popcart.style.display = "block";    
        };
    });
    
    function addToCart(product) {
        const cartList = $('.cart__product-items');
        const productName = $('.popcart__product-name');
        const cartCount = $('.cart-count');
        const productCounts = $('.counts__products');
        const productsTotalPrice = $('.total');
        const popcart = $('#popcart');    

    // Tạo popcart
        // Lấy số thẻ li trong thẻ ul(bắt đầu từ 0)
        const productQuantity = cartList.childElementCount + 1;
        // Đếm số sản phẩm trong giỏ hàng
        productCounts.innerHTML = productQuantity;
        cartCount.innerHTML = productQuantity;

        // Cho biết sản phẩm vừa được thêm vào
        productName.innerHTML = product.name;

        // Tạo phần tử li mới
        const li = document.createElement('li');
        li.classList.add('cart__product-item');
    
        // Tạo phần tử chứa thông tin sản phẩm
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        
        // Tạo phần tử hình ảnh sản phẩm
        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.classList.add('cart__product-img');
        
        // Tạo phần tử tên sản phẩm
        const name = document.createElement('div');
        name.classList.add('product-name');
        name.innerText = product.name;
        
        // Tạo phần tử xóa sản phẩm
        const deleteProduct = document.createElement('div');
        deleteProduct.classList.add('delete__product');
        deleteProduct.innerText = 'xóa';
        
        // Chèn các phần tử vào phần tử chứa thông tin sản phẩm
        name.appendChild(deleteProduct);
        productItem.appendChild(img);
        productItem.appendChild(name);
        
        // Tạo phần tử chứa giá sản phẩm, số lượng và tổng cộng
        const productCalculator = document.createElement('div');
        productCalculator.classList.add('product__caculator');
        
        // Tạo phần tử giá sản phẩm
        const price = document.createElement('div');
        price.classList.add('product-price');
        price.innerText = product.price;
        
        // Tạo phần tử số lượng
        const count = document.createElement('div');
        count.classList.add('product-count');
        const countInput = document.createElement('input');
        countInput.classList.add('count__input');
        countInput.type = 'number';
        countInput.min = '1';
        countInput.value = '1';
        count.appendChild(countInput);
        
        // Tạo phần tử tổng cộng
        const total = document.createElement('div');
        total.classList.add('product-total');
        total.innerText = product.price;

        // Chèn các phần tử vào phần tử chứa giá sản phẩm, số lượng và tổng cộng
        productCalculator.appendChild(price);
        productCalculator.appendChild(count);
        productCalculator.appendChild(total);
        
        // Chèn phần tử chứa thông tin sản phẩm và phần tử chứa giá sản phẩm, số lượng và tổng cộng vào li
        li.appendChild(productItem);
        li.appendChild(productCalculator);
        
        // Chèn li vào danh sách giỏ hàng
        cartList.appendChild(li);

        // Tính tổng số tiền của toàn bộ sản phẩm trong giỏ hàng
        function updateTotalPrice() {
            const productItems = document.querySelectorAll('.cart__product-item');
            let totalPrice = 0;
    
            productItems.forEach(function(item) { //item ở đây là thẻ li
                const totalElement = item.querySelector('.product-total');
                const itemPrice = parseFloat(totalElement.innerText.replace(/[^0-9.-]+/g, ''));
                totalPrice += itemPrice;
            });
        
            productsTotalPrice.innerHTML = formatCurrency(totalPrice + ".000đ");
        }
        
        // Tính tổng số tiền ngay khi click vào mua hàng
        updateTotalPrice();

        // Tạo sự kiện lắng nghe thay đổi số lượng
        countInput.addEventListener('input', function() {
            const quantity = parseInt(countInput.value);
            if (!isNaN(quantity)) {
                const unitPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ''));
                const totalPrice = quantity * unitPrice;
                total.innerHTML = formatCurrency(totalPrice + ".000đ");
                updateTotalPrice(); // Gọi hàm cập nhật tổng số tiền
            }
        });

        deleteProduct.addEventListener('click', function() {
            // Xóa phần tử cha chứa thông tin sản phẩm và giá sản phẩm, số lượng và tổng cộng
            li.remove();
            const productQuantity = cartList.childElementCount;
            productCounts.innerHTML = productQuantity; 
            cartCount.innerHTML =  productQuantity;
            updateTotalPrice(); // Gọi hàm cập nhật tổng số tiền
        });
    }

    // Hàm xử lí thanh toán
    payment.addEventListener('click', function() {
        const paymentForm = $('.payment__form');
        const popcartForm = $('#popcart');
        const productItems = $$('.cart__product-item');
        const popcartTotal = $('.total');
        const totalPrice = $('.payment__price');
        const paySubmit = $('.payment__submit');
        const customerName = $('.customer__name')
        const customerPhone = $('.customer__phone');
        const customerEmail= $('.customer__Email');        
        const customerAddress = $('.customer__address');
        const payOption = $('.cashpay__option');

        if (productItems.length > 0) {
            paymentForm.style.display = "flex";
            popcartForm.style.display = "none";
            totalPrice.innerHTML = popcartTotal.innerHTML;
        } else {
            alert('Bạn không có sản phẩm nào để mua.'); // Hiện thông báo nếu không có sản phẩm
        }

        // Kiểm tra xem sự kiện đã được gắn chưa
        if (!paySubmit.hasEvent) {
            paySubmit.hasEvent = true;

            // Gắn sự kiện chỉ một lần
            paySubmit.addEventListener('click', function() {
                const payOption = document.querySelector('input[name="paymentMethod"]:checked');
            
                if (
                    customerName.value &&
                    customerPhone.value &&
                    isValidEmail(customerEmail.value) && // Sử dụng hàm kiểm tra email
                    customerAddress.value &&
                    payOption && // Kiểm tra xem người dùng đã chọn một phương thức thanh toán hay chưa
                    payOption.value
                ) {
                    alert('Bạn đã đặt hàng thành công');
                } else {
                    alert('Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán để hoàn tất đơn hàng.');
                }
            });
            
            // Hàm kiểm tra định dạng email
            function isValidEmail(email) {
                const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
                return emailRegex.test(email);
            }
            
        }
    });

    // Hàm định dạng số tiền thành định dạng tiền tệ với dấu chấm ngăn cách hàng nghìn
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
}


function openPopcart() {
    const cart = $('.cart-icon');
    const popcart = $('#popcart');
    
    cart.onclick = function() {
        popcart.style.display = "block";
    }
}

function closePopcart() {
    const closePopcart = $('.close__popcart');
    const popcart = $('#popcart');
    const continueBuying = $('.popcart__close')

    // Ẩn giỏ hàng khi click vào icon x
    closePopcart.onclick = function() {
        popcart.style.display = "none";
    }

    // Ẩn giỏ hàng khi click vào thanh tiếp tục mua hàng
    continueBuying.onclick = function() {
        popcart.style.display = "none";
    }
}

function closePayment() {
    const closePaymentBtn = $('.close__payment');
    const paymentForm = $('.payment__form');

    // Ẩn thanh toán khi click vào icon x
    closePaymentBtn.onclick = function() {
        paymentForm.style.display = "none";
    }
}

function search() {
    const searchBtn = $('.search__btn-container');
    const searchInput = $('.product__search');
    const inputProduct = $('.input-product');
    const suggestionsList = $('.suggestions-list');
    const drinksName = $$('.drink__name');
    const drinksItem = $$('.drinks__item');
    const productsName = [];
    const products = [];

    drinksName.forEach(function(element) {
        productsName.push(element.innerHTML);
    })

    // Lấy ra các sảm phẩm
    drinksName.forEach(function(element, i){
        products.push(drinksName[i].innerText);
    })
    
    // Hiện thanh tìm kiếm
    searchBtn.addEventListener('click', function(event) {
        if (searchInput.style.display !== 'block') {
            searchInput.style.display = 'block';
            suggestionsList.style.display = 'block';
            inputProduct.focus();
        } else {
            searchInput.style.display = 'none';
            suggestionsList.style.display = 'none';
            inputProduct.value = "";
        }
    });

    searchBtn.addEventListener("blur", (event) => {
        event.target.style.display = "none";
        console.log(1);
    });
  
    searchBtn.addEventListener('click', function() {
        const inputText = inputProduct.value.toLowerCase();
        const filteredProducts = products.filter(function(product) {// Để kiểm tra phần tử có inputText là chữ thường
          return product.toLowerCase().startsWith(inputText);
        });
    
        suggestionsList.innerHTML = '';

        // Hiện thị các sản phẩm gợi ý
        filteredProducts.forEach(function(product) {
          const li = document.createElement('li');
          li.textContent = product;
          suggestionsList.appendChild(li);
        });
    });

    // Nếu thanh Input rỗng thì hiện gợi ý
    inputProduct.addEventListener('input', function () {
        const inputText = inputProduct.value.toLowerCase();
        const filteredProducts = products.filter(function (product) {
            return product.toLowerCase().startsWith(inputText);
        });
    
        suggestionsList.innerHTML = '';
    
        // Hiển thị các sản phẩm gợi ý
        filteredProducts.forEach(function (product) {
          const li = document.createElement('li');
          li.textContent = product;
          suggestionsList.appendChild(li);
        });
    
        if (inputText == '') {
          // Nếu thanh input là rỗng, hiển thị gợi ý
          suggestionsList.style.display = 'block';
        } else {
          suggestionsList.style.display = 'none';
        }
    });

    // Thêm sản phẩm gợi ý vào thanh input
    suggestionsList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            inputProduct.value = event.target.textContent;
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
            inputProduct.focus();
        }
    }); 

    inputProduct.addEventListener('click', function() {
        const inputText = inputProduct.value.toLowerCase();
        const filteredProducts = products.filter(function (product) {
            return product.toLowerCase().startsWith(inputText);
        });
    
        suggestionsList.innerHTML = '';
    
        // Hiển thị các sản phẩm gợi ý
        filteredProducts.forEach(function (product) {
          const li = document.createElement('li');
          li.textContent = product;
          suggestionsList.appendChild(li);
        });
    
        if (inputText == '') {
          // Nếu thanh input là rỗng, hiển thị gợi ý
          suggestionsList.style.display = 'block';
        } else {
          suggestionsList.style.display = 'none';
        }
    });

    inputProduct.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const productSearch = inputProduct.value;
            inputProduct.value = "";
    
            let foundProduct = false;
            drinksName.forEach(function (element, index) {
                //ktra xem productSearch có rỗng và có nằm trong sản phẩm không
                if (productSearch.toLowerCase() === drinksName[index].innerHTML.toLowerCase()) {
                  foundProduct = true;
                  removeHighlights();
                  drinksItem[index].classList.add('highlighted');
                  drinksItem[index].scrollIntoView(); // Trỏ con trỏ chuột vào sản phẩm vừa tìm kiếm
                  return;
                }
            });
            if (!foundProduct) {
                alert("Không tìm thấy sản phẩm");
            } 
        }
    });

    // Xóa highlight cho tất cả sản phẩm
    function removeHighlights() {
        drinksItem.forEach(function(item) {
            item.classList.remove('highlighted');
        });
    
        // click ra ngoài thì xóa
        inputProduct.addEventListener('click', function() {
            removeHighlights();
        });
        
        document.addEventListener('click', function(event) {
            if(!searchInput.contains(event.target)){
                removeHighlights();
            }
        });
    }
    
    // Lấy giá trị từ khóa tìm kiếm từ URL
    var urlParams = new URLSearchParams(window.location.search);
    var keyword = urlParams.get("keyword");//lưu giá trị của thanh input    

    // Kiểm tra xem từ khóa có tồn tại hay không
    if (keyword) {
        // Tìm kiếm và highlight sản phẩm
        var foundProduct = false; // Biến kiểm tra xem đã tìm thấy sản phẩm hay chưa
    
        for (var index = 0; index < products.length; index++) {
            // Kiểm tra xem tên sản phẩm có chứa từ khóa tìm kiếm (đúng toàn bộ chữ cái) hay không
            if (productsName[index].toLowerCase() === keyword.toLowerCase()) {
                // Highlight sản phẩm
                drinksItem[index].classList.add('highlighted');
                drinksItem[index].scrollIntoView(); // Trỏ con trỏ chuột vào sản phẩm vừa tìm kiếm
                foundProduct = true; // Đánh dấu đã tìm thấy sản phẩm
            }
        }
    
        if (!foundProduct) {
            alert("Không tìm thấy sản phẩm");
        }
    } else if (keyword === "") {
        //alert("Không tìm thấy sản phẩm");
    }


    document.addEventListener("click", function(event) {
        drinksItem.forEach(function(item) {
            item.classList.remove('highlighted');
        });
    });
}

function changePage() {
    const homePage = $('#home');
    const introductionPage = $('#introduction');
    const menuPage = $('#menu');
    const newsPage = $('#news');

    homePage.onclick = function() {
        window.location.href = '../web/home.html';
    }

    introductionPage.onclick = function() {
        window.location.href = '../web/introduction.html';
    }

    menuPage.onclick = function() {
        window.location.href = '../web/menu.html';
    } 

    newsPage.onclick = function() {
        window.location.href = '../web/news.html';
    }
}

function priceFilter() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const priceOptions = $('.price__options');
    const options = $('.price__options__container');
    const filterOptions = $$('.filter__products');
    const drinksContainer = $('.drinks__items');
    const drinks = $$('.drinks__item');

    // Hiện/Ẩn thanh option
    priceOptions.addEventListener('click', function() {
        if (options.style.display !== 'block') {
            options.style.display = 'block';
        } else {
            options.style.display = 'none';
        }
    });

    // Ẩn thanh option khi click ra ngoài
    document.addEventListener('mouseup', function(event) {
        const target = event.target;
        if (!options.contains(target) && options.style.display === 'block') {
            options.style.display = 'none';
        }
    });

    // Xử lý sự kiện khi chọn các tùy chọn bộ lọc
    filterOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            // Xóa lớp active của tất cả các tùy chọn bộ lọc
            filterOptions.forEach(function(filterOption) {
                filterOption.classList.remove('active');
            });
            // Thêm lớp active cho tùy chọn được chọn
            option.classList.add('active');

            // Kiểm tra xem tùy chọn được chọn là "Mới nhất" hay "Số lượt mua"
            if(option.textContent === "Mới nhất" || option.textContent === "Số lượt mua") {
                // Xáo trộn các sản phẩm
                shuffleProducts();
            } else if(option.textContent === "Liên Quan") {
                stableProducts(); 
            }
        });
    });

    // Hàm để lại sản phẩm như ban đầu
    function stableProducts() {
        const newOrder = [
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/05-a41e0c7f-e4c9-4ad2-9412-1e8c4d79a028.jpg?v=1510561983257',
                hoverText: 'Mua hàng',
                name: 'Sinh tố dâu tây',
                price: '42.000₫'
            },
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/07-550de86d-8a95-4083-8490-8ee5fcb930c6.jpg?v=1510561744770',
                hoverText: 'Mua hàng',
                name: 'Trà xanh bưởi',
                price: '29.000₫'
            },
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/09-a09e1b97-407c-42d9-8070-9d9b52ff7590.jpg?v=1510560775437',
                hoverText: 'Mua hàng',
                name: 'Trà xanh dưa leo',
                price: '34.000₫'
            },
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/08-f2fa2b17-8e88-4f68-9311-452ff574b2d0.jpg?v=1510560912103',
                hoverText: 'Mua hàng',
                name: 'Trà sữa socola',
                price: '37.000₫'
            },
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/2016910154723-tra-xanh-xi-muoi.jpg?v=1510561254037',
                hoverText: 'Mua hàng',
                name: 'Trà chanh đài loan',
                price: '27.000₫'
            },
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/2016910153030-tra-olong-sui-bot.jpg?v=1510561084490',
                hoverText: 'Mua hàng',
                name: 'Hồng trà mật ong',
                price: '36.000₫'
            },
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/04-de27bf4e-5fa7-4517-a796-94b7d46d5b4e.jpg?v=1510560499817',
                hoverText: 'Mua hàng',
                name: 'Trà sữa kiwi',
                price: '32.000₫'
            },
            {
                imgSrc: 'https://bizweb.dktcdn.net/thumb/large/100/270/285/products/11-72b16683-c3bd-4c4f-9ba2-f9b2a5dce3a8.jpg?v=1510560206717',
                hoverText: 'Mua hàng',
                name: 'Trà sữa khoai môn',
                price: '45.000₫'
            }
        ];
    
        drinksContainer.innerHTML = ''; // Xóa các sản phẩm hiện có
    
        newOrder.forEach(function (product) {
            const drinkItem = document.createElement('li');
            drinkItem.className = 'drinks__item';
    
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'drink__img-wrapper';
    
            const img = document.createElement('img');
            img.className = 'drink__img';
            img.src = product.imgSrc;
    
            const hoverText = document.createElement('span');
            hoverText.className = 'drink__hover-text';
            hoverText.textContent = product.hoverText;
    
            imgWrapper.appendChild(img);
            imgWrapper.appendChild(hoverText);
    
            const drinkInfo = document.createElement('div');
            drinkInfo.className = 'drink__info';
    
            const drinkName = document.createElement('h1');
            drinkName.className = 'drink__name';
            drinkName.textContent = product.name;
    
            const drinkPrice = document.createElement('p');
            drinkPrice.className = 'drink__price';
            drinkPrice.textContent = product.price;
    
            drinkInfo.appendChild(drinkName);
            drinkInfo.appendChild(drinkPrice);
    
            drinkItem.appendChild(imgWrapper);
            drinkItem.appendChild(drinkInfo);
    
            drinksContainer.appendChild(drinkItem);
        });
    }

    // Hàm xáo trộn các sản phẩm
    function shuffleProducts() {
        const shuffledDrinks = Array.from(drinks).sort(function() {
            return 0.5 - Math.random();
        });
        // Xóa các sản phẩm hiện có
        drinksContainer.innerHTML = '';
        // Thêm lại các sản phẩm đã được xáo trộn
        shuffledDrinks.forEach(function(drink) {
            drinksContainer.appendChild(drink);
        });
    }
    // Sắp xếp theo giá thấp đến cao
    $('#sort-asc').addEventListener('click', function () {
        sortProducts('asc');
    });

    // Sắp xếp thep giá cao đến thấp
    $('#sort-desc').addEventListener('click', function () {
        sortProducts('desc');
    });

    // Hàm sắp xếp theo lựa chọn order
    function sortProducts(order) {
        var productList = $('.drinks__items');
        var items = Array.from(productList.children);

        // Dùng sort để sắp xếp mảng
        items.sort(function (a, b) {
            var priceA = parseFloat(a.querySelector('.drink__price').innerText.replace('₫', '').replace(',', ''));
            var priceB = parseFloat(b.querySelector('.drink__price').innerText.replace('₫', '').replace(',', ''));

            // Sắp xếp theo order đã lựa chọn
            if (order === 'asc') {
                // Sắp xếp theo giá tăng dần
                return priceA - priceB;
            } else {
                // Sắp xếp theo giá giảm dần
                return priceB - priceA;
            }
        });

        // Xóa danh sách sản phẩm
        productList.innerHTML = '';

        // Chèn lại các sản phẩm sau khi sắp xếp theo order
        items.forEach(function (item) {
            productList.appendChild(item);
        });
    }
}

function getData() {
    const drinksName = $$('.drink__name');
    const products = [];

    // Lấy ra các sản phẩm
    drinksName.forEach(function(element, i){
        products.push(drinksName[i].innerText);
    })

    // Lưu trữ dữ liệu tên các sản phẩm vào Local Storage
    localStorage.setItem("menuproducts", JSON.stringify(products));
}

