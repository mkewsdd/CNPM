const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function getStart(){
    changepage();
    signOut();
}
getStart();

//Hàm chuyển sang trang quản lí khác
function changepage(){
    const customerPage = $('.sidebar__customer');
    const productPage = $('.sidebar__product');
    const billPage = $('.sidebar__order');

    //Trang quản lí khách hàng
    customerPage.addEventListener('click', function() {
        window.location.href = '../admin/customer.html';
    })

    //Trang quản lí sản phẩm
    productPage.addEventListener('click', function() {
        window.location.href = '../admin/product.html';
    })

    //Trang quản lí hóa đơn
    billPage.addEventListener('click', function() {
        window.location.href = '../admin/bill.html';
    })
}

// Hàm thêm người dùng mới
function addUser() {
    // Lấy bảng và số lượng dòng hiện tại
    let table = document.getElementById("customer__table");
    let rowCount = table.rows.length;

    // Tạo một dòng mới
    let row = table.insertRow(rowCount);

    // Tạo các ô dữ liệu cho dòng mới
    let cell1 = row.insertCell(0); // Mã khách hàng
    let cell2 = row.insertCell(1); // Tên khách hàng
    let cell3 = row.insertCell(2); // Email
    let cell4 = row.insertCell(3); // Số điện thoại
    let cell5 = row.insertCell(4); // Địa chỉ
    let cell6 = row.insertCell(5); // Mã đặt hàng
    let cell7 = row.insertCell(6); // Hành động

    // Gán giá trị mặc định cho các ô dữ liệu
    cell1.innerHTML = "00" + rowCount; // Mã khách hàng là số thứ tự của dòng
    cell2.innerHTML = "Tên mới"; // Tên khách hàng là Tên mới
    cell3.innerHTML = "Email mới"; // Email khách hàng là Email mới
    cell4.innerHTML = "Số điện thoại mới"; // Số điện thoại khách hàng là Số điện thoại mới
    cell5.innerHTML = "Địa chỉ mới"; // Địa chỉ khách hàng là Địa chỉ mới
    cell6.innerHTML = "Mã đặt hàng"; // Mã đặt hàng khách hàng là Mã đặt hàng mới

    // Tạo nút sửa cho hành động
    let editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.setAttribute("onclick", "editUser(this)");
    editButton.textContent = "Sửa";


    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.setAttribute("onclick", "deleteUser(this)");
    deleteButton.textContent = "Xóa";

    // Thêm tác vụ vào ô hành động
    cell7.className = "customer__actioned";
    cell7.appendChild(editButton);
    cell7.appendChild(deleteButton);

    // Cho phép chỉnh sửa các ô dữ liệu
    for (let i = 0; i < 6; i++) {
        row.cells[i].setAttribute("contenteditable", false);
    }
}

// Hàm tìm kiếm người dùng theo mã khách hàng
function searchUser() {
    // Lấy giá trị nhập liệu
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    // Lấy bảng và các dòng
    let table = document.getElementById("customer__table");
    let tr = table.getElementsByTagName("tr");
    // Lặp qua các dòng và ẩn những dòng không khớp với giá trị nhập liệu
    for (let i = 1; i < tr.length; i++) {
        // Lấy ô mã khách hàng
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            // Lấy giá trị trong ô
            let text = td.textContent || td.innerText;
            // So sánh với giá trị nhập liệu
            if (text.toUpperCase().indexOf(filter) > -1) {
                // Hiển thị dòng nếu khớp
                tr[i].style.display = "";
            } else {
                // Ẩn dòng nếu không khớp
                tr[i].style.display = "none";
            }
        }
    }
}

//Hàm đăng xuất
function signOut(){
    const signOutBtn = $('.signout__btn');

    //Trang đăng nhập
    signOutBtn.addEventListener('click', function() {
        window.location.href = '../login/login.html';
    })
}

// Hàm sửa thông tin người dùng
function editUser(button) {
    // Lấy dòng chứa nút sửa
    let row = button.parentNode.parentNode;

    // Lấy các ô dữ liệu trong dòng
    let cells = row.getElementsByTagName("td");

    // Lặp qua các ô và cho phép chỉnh sửa
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].setAttribute("contenteditable", true);
    }

    // Thay đổi nút sửa thành nút lưu
    button.textContent = "Lưu";
    button.setAttribute("onclick", "saveUser(this)");
}

// Hàm lưu thông tin người dùng
function saveUser(button) {
    // Lấy dòng chứa nút lưu
    let row = button.parentNode.parentNode;

    // Lấy các ô dữ liệu trong dòng
    let cells = row.getElementsByTagName("td");

    // Lặp qua các ô và ngăn chặn chỉnh sửa
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].setAttribute("contenteditable", false);
    }
    
    // Thay đổi nút lưu thành nút sửa
    button.textContent = "Sửa";
    button.setAttribute("onclick", "editUser(this)");
}

// Hàm xóa thông tin người dùng
function deleteUser(button) {
    // Xác nhận xóa
    let confirm = window.confirm("Bạn có chắc muốn xóa người dùng này không?");
    if (confirm) {
        // Lấy dòng chứa nút xóa
        let row = button.parentNode.parentNode;
        // Lấy bảng chứa dòng
        let table = document.getElementById("customer__table");
        // Xóa dòng khỏi bảng
        table.deleteRow(row.rowIndex);
    }
}



