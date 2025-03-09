$(document).ready(function () {
    $(".loadProducts-btn").click(function () {
        $.ajax({
            url: "products.json",
            dataType: "json",
            success: function (data) {
                $("#productList").empty();
                $(".loadProducts-btn").hide();

                data.forEach(product => {
                    let productCard = `
                        <div class="product-card" id="product-${product.id}">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p class="price">${product.price}</p>
                            <a href="${product.link}" target="_blank" class="buy-button">
                                <i class="fas fa-shopping-cart"></i> Satın Alın
                            </a>
                        </div>
                    `;
                    $("#productList").append(productCard);
                });
            },
            error: function () {
                alert("Ürünler yüklenirken hata oluştu.");
            }
        });
    });
});
