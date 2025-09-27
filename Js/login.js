function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ email và mật khẩu.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
        alert(`Chào mừng, ${foundUser.name}! Đăng nhập thành công.`);
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        window.location.href = "../index.html";
    } else {
        alert("Sai email hoặc mật khẩu.");
    }
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Đăng xuất thành công.");
    window.location.href = "./index.html";
}

function checkLoginStatus(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    if (user) {
        document.getElementById("profile-login")?.classList.add("d-none");
        document.getElementById("profile-register")?.classList.add("d-none");

        document.getElementById("profile-menu")?.classList.remove("d-none");
    } else {
        document.getElementById("profile-login")?.classList.remove("d-none");
        document.getElementById("profile-register")?.classList.remove("d-none");
        document.getElementById("profile-menu")?.classList.add("d-none");
    }
}
document.addEventListener("DOMContentLoaded", checkLoginStatus);
document.getElementById("login-form")?.addEventListener("submit", loginUser);
document.getElementById("logout-btn")?.addEventListener("click", logoutUser);