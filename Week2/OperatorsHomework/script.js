let userName = prompt("Adınız nedir?");
while (userName.length < 3) {
    userName = prompt("Adınız en az 3 karakterli olmalıdır. Lütfen tekrar girin:");
}

let userAge = prompt("Yaşınız kaç?");
while (isNaN(userAge) || userAge < 18) {
    userAge = prompt("Yaşınız sadece sayıdan oluşmalı ve 18'den büyük olmalıdır. Lütfen tekrar girin:");
}

let userJob = prompt("Mesleğiniz nedir?");
while (userJob.length < 3) {
    userJob = prompt("Mesleğiniz en az 3 karakterli olmalıdır. Lütfen tekrar girin:");
}

let user = {
    name: userName,
    age: userAge,
    job: userJob
};

console.log("Kullanıcı Bilgileri: ", user);

let products = [
    { name: "Laptop", price: 25000 },
    { name: "Phone", price: 8000 },
    { name: "Headphones", price: 500 }
];

let cart = [];

function showProducts() {
  let productList = "Ürünler:\n";
  products.forEach((product) => {
      productList += `${product.name} - ${product.price} TL\n`;
  });
  
  let buyedProducts = prompt(productList + "Sepete eklemek istediğiniz ürünü yazınız. (Çıkmak için q): ");
  
  if (buyedProducts.toLowerCase() === 'q') {
    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    } 

    let cartList = "Sepetiniz:\n";
    cart.forEach((item, index) => {
        cartList += `${index + 1}. ${item.name} - ${item.price} TL\n`;
    });
    console.log(cartList);

    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    console.log("Toplam Fiyat: ", totalPrice + " TL");
    alert(cartList + "\n" + "Toplam Fiyat: " + totalPrice + " TL");
    return; 
  }
  let product = products.find(product => product.name.toLowerCase() === buyedProducts.toLowerCase());
  
  if (!product) {
      alert("Geçersiz seçim!");
      return; 
  }

  cart.push(product);
  console.log(cart)
  console.log(product.name + " ürünü sepete eklendi. Fiyat:", product.price + " TL");
  alert(`${product.name} ürün sepete eklendi. Fiyat: ${product.price} TL`);
}

function removeProduct() {
  if (cart.length === 0) {
      alert("Sepetiniz boş!");
      return;
  } 

  let cartList = "Sepetiniz:\n";
  cart.forEach((item, index) => {
      cartList += `${index + 1}. ${item.name} - ${item.price} TL\n`;
  });

  let productName = prompt(cartList + "Sepetten çıkarmak istediğiniz ürünün adını yazın:");
  let productIndex = cart.findIndex(item => item.name.toLowerCase() === productName.toLowerCase());
  
  if (productIndex !== -1) {
      cart.splice(productIndex, 1);
      alert(`${productName} sepetten çıkarıldı.`);
      console.log(cart)
  } else {
      alert("Ürün bulunamadı!");
  }
}

function showCart() {
    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    } 

    let cartList = "Sepetiniz:\n";
    cart.forEach((item, index) => {
        cartList += `${index + 1}. ${item.name} - ${item.price} TL\n`;
    });
  
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    console.log(cartList);
    console.log("Toplam Fiyat: ", totalPrice + " TL");
    alert(cartList + "\n" + "Toplam Fiyat: " + totalPrice + " TL");
  }

function addProduct() {
    let productName = prompt("Yeni ürün adını girin:");
    let productPrice = prompt("Yeni ürün fiyatını girin:");
  
    if (!productName || !productPrice || isNaN(productPrice) || productPrice <= 0) {
        alert("Geçersiz giriş! Ürün adı ve fiyatı doğru şekilde girin.");
        return;
    }

    let isProductExist = products.some(product => product.name.toLowerCase() === productName.toLowerCase());
    if (isProductExist) {
        alert("Bu ürün zaten mevcut! Lütfen farklı bir ürün adı girin.");
        return;
    }
  
    let newProduct = {
        name: productName,
        price: Number(productPrice)
    };
  
    products.push(newProduct);
    console.log("Yeni ürün eklendi: ", newProduct);
    alert(`${newProduct.name} ürünü başarıyla eklendi. Fiyat: ${newProduct.price} TL`);
  }