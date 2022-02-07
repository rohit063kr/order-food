import React from 'react';

const CartContext = React.createContext({
  itemsAvailable: [],
  itemsInCart: [],
  totalAmount: 0,
  addItems: () => {},
  removeItem: () => {},
});

export default CartContext;
