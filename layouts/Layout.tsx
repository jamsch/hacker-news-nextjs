import Link from 'next/link';
import styles from './Layout.module.css';

export default function Layout(props: {children: React.ReactNode}) {
  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <Link href="/" passHref>
          <a>
            {/* eslint-disable-next-line */}
            <img src="/favicon.ico" width="22" height="22" alt="Hacker News" className={styles.logo} />
            <strong>Hacker News</strong>
          </a>
        </Link>
      </div>
      <div className={styles.content}>{props.children}</div>
    </main>
  );
}
