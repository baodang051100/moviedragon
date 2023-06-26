import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, Register, Home } from "./pages/Auth/index";
import { Footer } from "./components/Auth/index";
import HomeAdmin from './pages/Admin/Home/HomeAdmin';
import { useSelector } from 'react-redux';
import HomeRouter from './pages/Auth/HomeRouter';
import Landingpage from './pages/Auth/Landingpage/Landingpage';

function App() {
  const user = useSelector((state) => state.auth.user);
  const users = JSON.parse(localStorage.getItem("user"))
  return (
    <div className='App'>
      <ToastContainer position='bottom-right' />
      <Routes>
        <Route path='/' element={!user ? <Home/> : <Navigate to="/vn" replace />} />
        <Route path='/vn/*' element={<HomeRouter />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/*-------------------ADMIN----------------------*/}
        {user && (
          <>
            {users.isAdmin ?
              (
                <>
                  <Route expact path='/admin//*' element={<HomeAdmin user={user} />} />
                </>
              ) : (
                <Route path='/' element={<Home />} />
              )}
          </>
        )}
      </Routes>
      <Footer />
    </div>
  )
}
export default App;
