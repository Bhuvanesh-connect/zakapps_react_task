import Title from './components/common/Title';
import Header from './components/common/Header';
import AppRoutes from './routing/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.wrapper}>
      <Title />
      <Header />
      <AppRoutes />
      <ToastContainer position="bottom-right" autoClose={3000} style={{ marginBottom: '60px' }}/>
    </div>
  )
}

export default App
