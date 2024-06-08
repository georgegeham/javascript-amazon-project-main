
export let cart = JSON.parse(localStorage.getItem('Cart'));

if (!cart) {
    cart = [];
}
/////////////////
//Add items with specific quantities in the Cart
//////////////////
export function addCart(itemId, quantity) {
    let matching
    console.log(itemId)
    if (cart) {
        cart.forEach((item) => {
            if (itemId === item.productId) {
                matching = item;
            }
        })
    }
    if (matching) {
        matching.quantity += quantity;
    }
    else {
        cart.push({
            productId: itemId,
            quantity: quantity,
            deliveryOption: Math.floor((Math.random() * 10) % 3) + 1
        })
    }
    saving();
    console.log(cart)
}
function saving() {
    localStorage.setItem('Cart', JSON.stringify(cart));
}
export function updateDeliveryOption(productId, newdeliveryOption) {
    cart.forEach((element) => {
        if (element.productId === productId) {
            element.deliveryOption = Number(newdeliveryOption);
        }
    })
    saving();
}
export function deleteFromCart(productId) {
    let newCart = [];
    cart.forEach((element) => {
        if (element.productId != productId) {
            newCart.push(element)
        }
        cart = newCart;
        saving();
        Count();
        console.log(cart);
    })
}
export function Count() {
    let count = 0;
    cart.forEach((element) => {
        count += element.quantity;
    })
    localStorage.setItem('cartQuantity', count);
    return count
}
export function updateCart(itemId, newQuantity) {
    cart.forEach((element) => {
        if (element.productId === itemId) {
            if (newQuantity >= 0 || newQuantity < 1000)
                element.quantity = newQuantity;
        }
    })
    saving();
    console.log(cart);
}
export function resetCart() {
    cart = [];
    saving();
}