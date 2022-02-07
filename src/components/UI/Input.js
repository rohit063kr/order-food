import React, { forwardRef } from 'react';

import styles from './Input.module.scss';

const Input = forwardRef(function (props, ref) {
  return (
    <input
      className={styles['input']}
      type={props.type}
      ref={ref}
      onChange={props.onChange}
    />
  );
});

export default Input;
