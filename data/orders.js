import daysjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
class order {
    id;
    orderTime;
    products;
    totalCostCents;

    constructor(order) {
        this.id = order.id;
        this.products = order.products;
        this.orderTime = order.orderTime;
        this.totalCostCents = order.totalCostCents;
    }
    getTime() {
        return daysjs(this.orderTime).format('dddd D');
    }
    getPrice() {
        return ((this.totalCostCents / 100).toFixed(2));
    }
    getId() {
        return this.id;
    }
}
export function getOrder(orderId) {
    let matchingOrder;

    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });

    return matchingOrder;
}
export function getItemTime(order, productId) {
    let Time
    order.products.forEach((item) => {
        if (item.productId === productId) {
            Time = daysjs(item.estimatedDeliveryTime).format('dddd D');
        }
    })
    return Time;
}
export function getItemQuantity(order, productId) {
    let quantity
    order.products.forEach((item) => {
        if (item.productId === productId)
            quantity = item.quantity;
    })
    return quantity;
}
export let orders = JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order) {
    orders.unshift(order);
    console.log("order Ack");
    saving();
}
function saving() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
orders = orders.map((one) => {
    return new order(one);
    saving();
})
export function updateQuantity(productId) {
    orders.forEach((order) => {
        order.products.forEach((product) => {
            if (product.productId === productId) {
                product.quantity += 1;
                saving();
            }
        })
    })
}