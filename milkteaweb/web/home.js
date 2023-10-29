const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy dữ liệu từ Local Storage
const storedData = localStorage.getItem('myData');

let productsData;
// Kiểm tra xem dữ liệu có tồn tại không
if (storedData) {
    productsData = JSON.parse(storedData);
}

function getstart(){
    popcartHandle();
    openPopcart()
    closePopcart();
    search();
    changePage() ;
}
getstart()

function popcartHandle() {
    const buttons = $$('.drink__hover-text');
    const popcart = $('#popcart'); 
    const productsImg = $$('.drink__img');
    const productsName = $$('.drink__name');
    const productsPrice = $$('.drink__price');

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

        // Lấy số thẻ li trong thẻ ul(bắt đầu từ 0)
        const productQuantity = cartList.childElementCount + 1;

        // Cho biết sản phẩm vừa được thêm vào
        productName.innerHTML = product.name;

        // Đếm số sản phẩm trong giỏ hàng
        productCounts.innerHTML = productQuantity;
        cartCount.innerHTML = productQuantity;

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

function search() {
    const searchBtn = $('.search__btn-container');
    const searchInput = $('.product__search');
    const inputProduct = $('.input-product');
    const suggestionsList = $('.suggestions-list');
    const drinksName = $$('.drink__name');
    
    // Hiện thanh tìm kiếm
    searchBtn.addEventListener('click', function() {
        if (searchInput.style.display !== 'block') {
          searchInput.style.display = 'block';
          suggestionsList.style.display = 'block';
          inputProduct.focus();
        } else {
          searchInput.style.display = 'none';
          suggestionsList.style.display = 'none';
          suggestionsList.innerHTML = ''; // Clear the suggestions list when hiding the search input
        }
    });
  
    searchBtn.addEventListener('click', function() {
        const inputText = inputProduct.value.toLowerCase();
        const filteredProducts = productsData.filter(function(product) {// Để kiểm tra phần tử có inputText là chữ thường
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
        const filteredProducts =  productsData.filter(function (product) {
          return product.toLowerCase().startsWith(inputText);
        });
    
        suggestionsList.innerHTML = '';
    
        // Hiển thị các sản phẩm gợi ý
        filteredProducts.forEach(function (product) {
          const li = document.createElement('li');
          li.textContent = product;
          suggestionsList.appendChild(li);
        });
    
        if (inputText === '') {
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
        }
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


// createElement
// classList.add
// parseFloat
// replace
// appendChild
// toLocaleString
//childElementCount
