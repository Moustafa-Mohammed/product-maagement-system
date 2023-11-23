const title = document.querySelector("#title");
const category = document.querySelector("#category");
const status = document.querySelector("#status");
const price = document.querySelector("#price");
const taxes = document.querySelector("#taxes");
const discount = document.querySelector("#discount");

const addProductBtn = document.querySelector("#addProduct");
const updateProductBtn = document.querySelector("#updateProduct");
const deleteProductBtn = document.querySelector("#deleteProduct");
const deleteAllProductsBtn = document.querySelector("#deleteAll");
const total = document.querySelector("#total");
const productsTable = document.querySelector("tbody");

let currentProductIndex;

// initialize the data
const products = JSON.parse(localStorage.getItem("products")) || [];

// get total amount
function getTotalAmount() {
  let totalAmount = +price.value + +taxes.value + -+discount.value;
  if (!isNaN(totalAmount)) {
    total.innerHTML = totalAmount;
  }
  if (totalAmount > 0) {
    total.classList.add("greenBackground");
  } else {
    total.classList.remove("greenBackground");
  }
}

const amounts = Array.from(document.querySelector(".amounts").children);

amounts.forEach((amount) => {
  amount.addEventListener("input", getTotalAmount);
});

// Add product
function addProduct() {
  const product = {
    title: title.value,
    category: category.value,
    status: status.value,
    taxes: +taxes.value,
    discount: +discount.value,
    price: +price.value,
    total: +price.value + +taxes.value - +discount.value,
  };
  if (addProductBtn.innerHTML === "Add Product") {
    products.push(product);
  } else {
    products[currentProductIndex] = product;
  }
  addProductBtn.innerHTML === "Add Product";
  localStorage.setItem("products", JSON.stringify(products));

  clearInputs();
  displayProducts();
  checkButtonStatus();
}

// clear inputs
function clearInputs() {
  title.value = "";
  category.value = "";
  taxes.value = "";
  discount.value = "";
  price.value = "";
  status.value = "";
  total.innerHTML = "";
}

addProductBtn.onclick = (e) => {
  e.preventDefault();
  addProduct();
};

function displayProducts() {
  productsTable.innerHTML = "";
  products.forEach((p, index) => {
    const productTemplate = `<tr>
    <td>${index}</td>
    <td>${p.title}</td>
    <td>${p.category}</td>
    <td>${p.status}</td>
    <td>${p.price}</td>
    <td>${p.taxes}</td>
    <td>${p.discount}</td>
    <td>${p.total}</td>
    <td><button onclick="updateProduct(${index})">Update</button></td>
    <td><button class="delete" onclick="deleteProduct(${index})">delete</button></td>
  </tr>`;

    productsTable.insertAdjacentHTML("beforeend", productTemplate);
  });
}

// remove product
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
  checkButtonStatus();
}

// update product
function updateProduct(index) {
  addProductBtn.innerHTML = "Update Product";
  const product = products.find((p, i) => i === index);
  currentProductIndex = index;
  title.value = product.title;
  price.value = product.price;
  category.value = product.category;
  status.value = product.status;
  discount.value = product.discount;
  taxes.value = product.taxes;
  getTotalAmount();
}

window.onload = () => {
  displayProducts();
  clearInputs();
  getTotalAmount();
  checkButtonStatus();
};

function deleteAllProducts() {
  products = [];
  localStorage.removeItem("products");
  productsTable.innerHTML = "";
  checkButtonStatus();
}

deleteAllProductsBtn.addEventListener("click", deleteAllProducts);

// check button status
function checkButtonStatus() {
  if (products.length === 0) {
    deleteAllProductsBtn.setAttribute("disabled", "true");
    deleteAllProductsBtn.classList.add("disabled");
  }
}
