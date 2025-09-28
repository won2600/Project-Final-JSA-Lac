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
                data.products.slice(0, 9).forEach(product => {
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
                                        <a class="btn btn-primary" href="./gio_hang.html" role="button">Thêm vào giỏ hàng</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } catch (err) {
                foodList.innerHTML = '<div class="text-center text-danger">Lỗi tải dữ liệu.</div>';
            }
        }
        document.addEventListener('DOMContentLoaded', searchFood);