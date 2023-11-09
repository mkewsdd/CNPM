const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function getstart(){
    popcartHandle();
    openPopcart();
    closePopcart();
    search();
    changePage();
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
        var cartProductList = document.querySelector('.cart__product-items');

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
    searchBtn.addEventListener('click', function() {
        if (searchInput.style.display !== 'block') {
          searchInput.style.display = 'block';
          suggestionsList.style.display = 'block';
          inputProduct.focus();
        } else {
          searchInput.style.display = 'none';
          suggestionsList.style.display = 'none';
          suggestionsList.innerHTML = ''; // làm rỗng gợi ý 
        }
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

    inputProduct.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const productSearch = capitalizeFirstLetter(inputProduct.value);
            inputProduct.value = "";
    
            let foundProduct = false;
            drinksName.forEach(function (element, index) {
                //ktra xem productSearch có rỗng và có nằm trong sản phẩm không
                if (productSearch && drinksName[index].innerHTML.includes(productSearch)) {
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
    console.log(keyword)
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


    document.addEventListener("click", function (event) {
        drinksItem.forEach(function(item) {
            item.classList.remove('highlighted');
        });
    });


    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
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
