import React from 'react';
import * as styles from './Spinner.module.css';

const spinner = (props) => (
  <div className="Spinner">
    <div className={styles.Loader}></div>
    <p>{props.loading}</p>
  </div>
);

export default spinner;