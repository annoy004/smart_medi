export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2); // for two decimal places
};

export const updateCart = (state) => {
    // Calculate item prices with discount applied
    state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => {
            const discountedPrice = item.price - (item.price * (item.discount || 0) / 100);
            return acc + discountedPrice * item.qty;
        }, 0)
    );

    // Calculate shipping price (if order is over $100 then free, else $10 shipping)
    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

    // Calculate tax price (15% tax)
    state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

    // Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice) 
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
};
