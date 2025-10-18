// Khai báo hàm bất đồng bộ để có thể dùng await khi gọi API
async function searchFood() {
    // Lấy từ ô tìm kiếm; nếu rỗng thì mặc định 'pizza'
    const query = document.getElementById('food-search').value || 'pizza';
    // Thẻ chứa kết quả hiển thị
    const foodList = document.getElementById('food-list');
    // Hiển thị trạng thái đang tải để người dùng biết
    foodList.innerHTML = '<div class="text-center">Đang tải...</div>';
    try {
        // Gọi API Open Food Facts với query đã được encodeURIComponent
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`);
        // Chuyển response thành object JSON
        const data = await res.json();
        // Xóa nội dung tạm (loading)
        foodList.innerHTML = '';
        // Nếu không có products hoặc rỗng -> thông báo không tìm thấy
        if (!data.products || data.products.length === 0) {
            foodList.innerHTML = '<div class="text-center">Không tìm thấy món ăn.</div>';
            return; // dừng hàm tại đây
        }
        // Lấy tối đa 9 sản phẩm và render từng cái một
        data.products.slice(0, 9).forEach((product, idx) => {
            // Lấy tên, nếu không có dùng fallback
            const name = product.product_name || 'Không tên';
            // Lấy ảnh, nếu không có dùng ảnh mặc định trong project
            const img = product.image_front_url || '../img/hamburger.png';
            // Sinh giá ngẫu nhiên (placeholder) và nhân 1000 để thành VNĐ
            const price = Math.floor(Math.random() * 50 + 20) * 1000; // Giá ngẫu nhiên
            // Thêm thẻ card vào DOM
            foodList.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${img}" class="card-img-top" alt="${name}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${name}</h5>
                            <p class="card-text text-center">Giá: ${price.toLocaleString()} VNĐ</p>
                            <div class="text-center">
                                <button class="btn btn-primary add-to-cart-btn" 
                                    data-name="${name}" 
                                    data-img="${img}" 
                                    data-price="${price}">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Sau khi render xong, tìm tất cả nút "Thêm vào giỏ hàng" và gắn sự kiện
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Lấy giỏ hàng hiện tại từ localStorage hoặc khởi tạo mảng rỗng
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                // Tạo đối tượng item từ các thuộc tính data- trên nút
                const item = {
                    name: this.getAttribute('data-name'),
                    img: this.getAttribute('data-img'),
                    price: parseInt(this.getAttribute('data-price'))
                };
                // Thêm item vào giỏ và lưu lại vào localStorage
                cart.push(item);
                localStorage.setItem('cart', JSON.stringify(cart));
                // Thông báo người dùng
                alert(`Đã thêm "${item.name}" vào giỏ hàng!`);
            });
        });
    } catch (err) {
        // Khi có lỗi (mạng, parse, v.v.) hiển thị thông báo lỗi cho người dùng
        foodList.innerHTML = '<div class="text-center text-danger">Lỗi tải dữ liệu.</div>';
    }
}
// Khi DOM load xong, tự động gọi searchFood để hiển thị menu mặc định
document.addEventListener('DOMContentLoaded', searchFood);