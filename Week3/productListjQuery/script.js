$(document).ready(function () {
    $("body").prepend(`
      <nav class="navbar">
        <div class="navbar-brand">
          <img src="images/order.png" alt="Logo" class="navbar-icon">
          <span class="navbar-title">Teknoloji Ürünleri</span>
        </div>
      </nav>
    `);

    $("body").append(`
      <div class="container">
        <div id="productList"></div>
      </div>
      <div id="popup">
        <div class="popup-content">
          <button class="close-btn">&times;</button>
          <h2 id="popup-title"></h2>
          <div class="popup-image-wrapper">
            <img id="popup-image" src="" alt="product image">
          </div>
          <p id="popup-details"></p>
        </div>
      </div>
    `);

    $("head").append(`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
        body {
          padding: 20px;
          background: linear-gradient(135deg, #D1F8EF, #3674B5);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }
        .navbar {
          width: 100%;
          background-color: #A1E3F9;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10000;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .navbar-icon {
          width: 40px;
          height: 40px;
        }
        .navbar-title {
          color: #3674B5;
          font-size: 20px;
          font-weight: bold;
        }
        .container {
          margin-top: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
        }
        #productList {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }
        .product-card {
          background: white;
          padding: 16px;
          border-radius: 10px;
          border: 2px solid #3674B5;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          text-align: center;
          max-width: 250px;
          width: 100%;
          height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease-in-out;
          cursor: pointer;
        }
        .product-card img {
          width: 100%;
          height: auto;
          max-height: 200px;
          object-fit: contain;
          border-radius: 5px;
        }
        .product-card h3 {
          font-size: 18px;
          margin: 12px 0 4px;
          font-weight: bold;
          color: #578FCA;
        }
        .product-card .price {
          font-size: 18px;
          font-weight: bold;
          margin: 8px 0;
        }
        .product-card .buy-button {
          display: inline-block;
          background: #578FCA;
          color: white;
          text-decoration: none;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-card .buy-button:hover {
          background: #36A7D1;
        }
        #popup {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }
        #popup .popup-content {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
          position: relative;
          text-align: center;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
        }
        #popup .popup-content .close-btn {
          position: absolute;
          top: 5px;
          right: 15px;
          background: none;
          border: none;
          font-size: 35px;
          color: red;
          cursor: pointer;
        }
        #popup .popup-content .popup-image-wrapper {
          margin: 20px 0;
        }
        #popup img {
          width: 100%;
          border-radius: 10px;
        }
      </style>
    `);

    $.ajax({
        url: "products.json",
        method: "GET",
        dataType: "json",
        success: function (products) {
            $("#productList").empty();
            products.forEach(product => {
                $("#productList").append(`
                  <div class="product-card" data-name="${product.name}" data-details="${product.details}" data-image="${product.image}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <a href="${product.link}" class="buy-button" target="_blank">Ürüne git</a>
                  </div>
                `);
            });

            $(".product-card").click(function () {
                const productName = $(this).attr("data-name");
                const productDetails = $(this).attr("data-details");
                const productImage = $(this).attr("data-image");

                $("#popup-title").text(productName);
                $("#popup-details").html(productDetails);
                $("#popup-image").attr("src", productImage);

                $("#popup").fadeIn(300, function () {
                    $(".popup-content").animate({ opacity: 1, top: "50%" }, 300);
                });
            });

            $(".close-btn").click(function () {
                $(".popup-content").animate({ opacity: 0, top: "45%" }, 300, function () {
                    $("#popup").fadeOut(300);
                });
            });

            $(".product-card").hover(
                function () {
                    $(this).animate({ scale: "1.05" }, 200);
                },
                function () {
                    $(this).animate({ scale: "1" }, 200);
                }
            );
        },
        error: function (error) {
            console.error("Verileri çekerken hata oluştu:", error);
        }
    });
});