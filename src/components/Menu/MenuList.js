import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';

import Card from '../UI/Card';
import ListItems from '../UI/ListItems';
import MenuForm from './MenuForm';

import styles from './MenuList.module.scss';

const MenuList = function (props) {
  const cartCtx = useContext(CartContext);

  return (
    <Card className={styles['menu__list']}>
      {cartCtx.isLoading && !cartCtx.err && 'Loading...'}

      {cartCtx.error && !cartCtx.isLoading && cartCtx.error}

      {!cartCtx.isLoading &&
        !cartCtx.error &&
        cartCtx.itemsAvailable.map(item => (
          <ListItems
            key={item.item}
            className={styles['menu__list-item']}
            data-id={item.item}
          >
            <div className={styles['menu__item']}>
              <p className={styles['menu__item-name']}>{item.item}</p>
              <p className={styles['menu__item-discription']}>
                {item.description}
              </p>
              <p className={styles['menu__item-cost']}>$ {item.cost}</p>
            </div>
            <MenuForm />
          </ListItems>
        ))}
    </Card>
  );
};

export default MenuList;
