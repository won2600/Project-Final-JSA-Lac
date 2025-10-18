// Hàm xử lý khi người dùng submit form đăng nhập
function loginUser(event) {
    // Ngăn hành vi mặc định của form (không để trang reload)
    event.preventDefault();

    // Lấy giá trị email từ ô input có id "login-email", loại khoảng trắng đầu/cuối
    const email = document.getElementById("login-email").value.trim();
    // Lấy giá trị mật khẩu từ ô input có id "login-password"
    const password = document.getElementById("login-password").value;

    // Nếu thiếu email hoặc mật khẩu, thông báo và dừng xử lý
    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ email và mật khẩu.");
        return;
    }

    // Lấy mảng users từ localStorage (nếu chưa có thì dùng mảng rỗng)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Tìm user có email và password khớp trong mảng users
    const foundUser = users.find(u => u.email === email && u.password === password);

    // Nếu tìm thấy user hợp lệ
    if (foundUser) {
        // Thông báo chào mừng
        alert(`Chào mừng, ${foundUser.name}! Đăng nhập thành công.`);
        // Lưu user đã đăng nhập vào localStorage dưới khóa "loggedInUser"
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        // Chuyển hướng về trang chủ (tương đối)
        window.location.href = "../index.html";
    } else {
        // Nếu không tìm thấy, thông báo lỗi xác thực
        alert("Sai email hoặc mật khẩu.");
    }
}

// Hàm xử lý đăng xuất
function logoutUser() {
    // Xóa thông tin người dùng đã đăng nhập khỏi localStorage
    localStorage.removeItem("loggedInUser");
    // Thông báo đã đăng xuất
    alert("Đăng xuất thành công.");
    // Chuyển hướng về trang index
    window.location.href = "./index.html";
}

// Hàm kiểm tra trạng thái đăng nhập và cập nhật UI
function checkLoginStatus(event) {
    // Nếu được gọi như handler event, ngăn hành vi mặc định (an toàn nếu có event)
    event?.preventDefault?.();
    // Lấy user đang đăng nhập từ localStorage (nếu chưa có -> null)
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (user) {
        // Nếu có người đăng nhập: ẩn phần login/register
        document.getElementById("profile-login")?.classList.add("d-none");
        document.getElementById("profile-register")?.classList.add("d-none");
        // Hiện menu/profile cho người đã đăng nhập
        document.getElementById("profile-menu")?.classList.remove("d-none");
    } else {
        // Nếu chưa đăng nhập: hiện login/register, ẩn profile-menu
        document.getElementById("profile-login")?.classList.remove("d-none");
        document.getElementById("profile-register")?.classList.remove("d-none");
        document.getElementById("profile-menu")?.classList.add("d-none");
    }
}

// Khi DOM đã sẵn sàng, gọi checkLoginStatus để cập nhật giao diện ngay
document.addEventListener("DOMContentLoaded", checkLoginStatus);

// Nếu tồn tại form đăng nhập (id="login-form") thì gắn sự kiện submit -> loginUser
document.getElementById("login-form")?.addEventListener("submit", loginUser);

// Nếu tồn tại nút logout (id="logout-btn") thì gắn sự kiện click -> logoutUser
document.getElementById("logout-btn")?.addEventListener("click", logoutUser);