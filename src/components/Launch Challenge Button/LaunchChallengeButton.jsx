import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LaunchChallengeButton.module.css';

export default function LaunchChallengeButton() {
  return (
    <div className={styles.container}>
      <Link to="/challengefight">
        <button className={styles.launchFightButton}>FIGHT</button>
      </Link>
    </div>
  );
}
