import React, { useState } from 'react';

import CartProvider from './store/CartProvider';

import Menu from './components/Menu/Menu';
import Navigation from './components/Navigation/Navigation';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalCloseHandler = function () {
    setIsModalOpen(false);
  };

  const modalOpenHandler = function () {
    setIsModalOpen(true);
  };

  return (
    <CartProvider>
      <Navigation
        onModalOpen={modalOpenHandler}
        onModalClose={modalCloseHandler}
        modalStatus={isModalOpen}
      />
      <Menu />
    </CartProvider>
  );
}

export default App;
