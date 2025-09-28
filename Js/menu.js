async function searchFood() {
    const query = document.getElementById('food-search').value || 'pizza';
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '<div class="text-center">Đang tải...</div>';
    try {
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`);
        const data = await res.json();
        foodList.innerHTML = '';
        if (!data.products || data.products.length === 0) {
            foodList.innerHTML = '<div class="text-center">Không tìm thấy món ăn.</div>';
            return;
        }
        data.products.slice(0, 9).forEach((product, idx) => {
            const name = product.product_name || 'Không tên';
            const img = product.image_front_url || '../img/hamburger.png';
            const price = Math.floor(Math.random() * 50 + 20) * 1000; // Giá ngẫu nhiên
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

        // Add event listeners for all "Thêm vào giỏ hàng" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const item = {
                    name: this.getAttribute('data-name'),
                    img: this.getAttribute('data-img'),
                    price: parseInt(this.getAttribute('data-price'))
                };
                cart.push(item);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`Đã thêm "${item.name}" vào giỏ hàng!`);
            });
        });
    } catch (err) {
        foodList.innerHTML = '<div class="text-center text-danger">Lỗi tải dữ liệu.</div>';
    }
}
document.addEventListener('DOMContentLoaded', searchFood);