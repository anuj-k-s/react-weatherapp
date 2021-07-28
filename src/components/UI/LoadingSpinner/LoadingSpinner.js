import React from 'react';

import styles from './LoadingSpinner.module.css';

const LoadingIndicator = () => (
  <div className={styles.lds_ring}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingIndicator;
