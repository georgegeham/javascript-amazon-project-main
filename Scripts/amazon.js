import { addCart } from '../data/cart.js'
import { products, loadProducts } from '../data/products.js'
let items = ''
let accumilative = ''
let filtered;
////////////////
//Display Content of page
///////////////////////
async function render() {
  await loadProducts();
  filtered = products;
  amazon();
}
render();
function amazon() {
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  if (search) {
    filtered = products.filter((element) => { return element.name.toLowerCase().includes(search.toLowerCase()) });
  }
  filtered.forEach((item) => {
    pageRender(item);
  })
  function pageRender(item) {
    items = `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${item.geturl()}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${item.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="${item.getRatingImage()}">
      <div class="product-rating-count link-primary">
        ${item.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${item.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-value-for-${item.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer">${item.ifAppliance()}</div>

    <div class="added-to-cart js-added-${item.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary" data-item-id = "${item.id}">
      Add to Cart
    </button>
  </div>`
    accumilative += items;
  }
  document.querySelector('.products-grid').innerHTML = accumilative;
  ////////////////
  //Fetch Value of Select
  ////////////////
  let count = JSON.parse(localStorage.getItem('cartQuantity')) || 0;
  document.querySelector('.cart-quantity').innerHTML = count;
  function fetchSelectValue(itemId) {
    const select = document.querySelector(`.js-quantity-value-for-${itemId}`);
    return Number(select.value);
  }
  ////////////////
  //Update Cart Quantity
  ///////////////
  function updateCartQuantity(itemId) {
    count += fetchSelectValue(itemId);
    document.querySelector('.cart-quantity').innerHTML = count;
    localStorage.setItem('cartQuantity', count);
  }
  ////////////////////
  ///Display Added Message
  /////////////////////
  function added(itemId) {
    let prevkey;
    document.querySelector(`.js-added-${itemId}`).classList.add('js-added');
    if (prevkey) {
      clearTimeout(prevkey);
    }
    const key = setTimeout(() => {
      document.querySelector(`.js-added-${itemId}`).classList.remove('js-added');
    }, 1500);
    prevkey = key;
  }
  ///////////////
  //Button Listener
  ////////////////
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
      const { itemId } = button.dataset;
      updateCartQuantity(itemId);
      addCart(itemId, fetchSelectValue(itemId));
      added(itemId);
    })
  })
  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    }
  });
}