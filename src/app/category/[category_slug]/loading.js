import React from 'react';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingFlex}>
      {[...Array(10)].map((_, index) => (
        <div key={index} className={styles.loading}>
          <div className={styles.loadingImage} />
          <div className={styles.loadingTitle} />
          <div className={styles.loadingTitle} />
          <div className={styles.loadingPrice} />
        </div>
      ))}
    </div>
  );
};

export default Loading;
