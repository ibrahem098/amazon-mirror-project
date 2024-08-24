export let cart = [];

export function addToCart(productId, quantitySelectorElemnt) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += Number(quantitySelectorElemnt.value)
        matchingItem = ''
    } else {
        cart.push({
            productId,
            quantity: Number(quantitySelectorElemnt.value)
        })
    }
}