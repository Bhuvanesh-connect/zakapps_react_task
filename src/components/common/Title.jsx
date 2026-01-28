import { useLocation } from 'react-router-dom';
import styles from './../../app.module.scss';

const titleMap = [
  { path: '/products', title: 'Products Page' },
  { path: '/admin', title: 'Admin Page' },
];

const Title = () => {
  const { pathname } = useLocation();

  const match = titleMap.find(({ path }) =>
    pathname.startsWith(path)
  );

  const title = match ? match.title : 'My Store';

  return (
    <div className={styles.titleHeader}>
      <h2>{title}</h2>
    </div>
  )
};

export default Title;