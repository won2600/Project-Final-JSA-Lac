const isEmail = (e) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || "");

const isStrongPassword = (p) => {
  // >=8, có chữ hoa, chữ thường, số, ký tự đặc biệt
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(p || "");
};

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const comfirmPassword = document.getElementById("register-cf-password").value.trim();
    const avatarStyle = 'initials';

    if (!name || !email || !password || !comfirmPassword ) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    if (!name || name.length < 2) {
        alert("Vui lòng nhập họ tên (>= 2 ký tự).");
        return;
    }

    if (!email || !isEmail(email)) {
        alert("Email không hợp lệ.");
        return;
    }

    if (!isStrongPassword(password)) {
        alert("Mật khẩu yếu. Yêu cầu >=8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.");
        return;
    }

    if (password !== comfirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    // Nếu chưa có người dùng nào thì khởi tạo mảng rỗng
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // u đại diện cho từng user trong mảng users
    const existedUser = users.find(u => u.email === email);
    if (existedUser) {
        alert("Email đã được đăng ký!");
        return;
    }

    users.push({ name, email, password, avatarStyle});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Chuyển sang trang đăng nhập.");
    window.location.href = "./dang_nhap.html";
}