import Link from 'next/link';
import styles from './CustomerCart.module.css';

export default function CustomerCart() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.heading}>Customer Cart</h1>
        <Link href="/">
          <button className={styles.button}>Go to Home Page</button>
        </Link>
      </div>
    </div>
  );
}
