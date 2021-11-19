import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Link to="/about">
        <p className={styles.hfooter}>About</p>
      </Link>
    </div>
  );
}
