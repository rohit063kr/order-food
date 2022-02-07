import React from 'react';

import MenuList from './MenuList';

import styles from './Menu.module.scss';

const Menu = function (props) {
  return (
    <div className={styles['menu']}>
      <h2 className={styles['menu__heading']}>
        Order your delicious item here...
      </h2>
      <p className={styles['menu__description']}>
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem
      </p>
      <MenuList />
    </div>
  );
};

export default Menu;
