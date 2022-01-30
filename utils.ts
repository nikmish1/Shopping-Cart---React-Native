import {CartItemProps, CartProps} from './App';

export const addItem = (
  cart: CartProps,
  cartItem: CartItemProps,
): CartProps => {
  let cartTotal = 0;
  const items = cart.items.map(item => {
    if (item.id === cartItem.id) {
      cartTotal = cartTotal + item.sp * (item.quantity + 1);

      return {
        ...item,
        quantity: item.quantity + 1,
        total: item.sp * (item.quantity + 1),
      };
    }
    cartTotal = cartTotal + item.sp * item.quantity;
    return item;
  });

  return {total: cartTotal, items};
};

export const removeItem = (
  cart: CartProps,
  cartItem: CartItemProps,
): CartProps => {
  let cartTotal = 0;
  const items = cart.items.map(item => {
    if (item.id === cartItem.id) {
      cartTotal = cartTotal + item.sp * (item.quantity - 1);

      return {
        ...item,
        quantity: item.quantity - 1,
        total: item.sp * (item.quantity - 1),
      };
    }
    cartTotal = cartTotal + item.sp * item.quantity;
    return item;
  });

  return {total: cartTotal, items};
};
