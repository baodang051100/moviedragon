import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, Register, Home, Movie } from "./pages/Auth/index";
import { Header, Footer } from "./components/Auth/index";
import List from './pages/Auth/list/List';
import HomeAdmin from './pages/Admin/Home/HomeAdmin';
import { useSelector } from 'react-redux';
import Watch from './pages/Auth/Watch/Watch';
import Landingpage from './pages/Auth/Landingpage/Landingpage';
import Fearture from './components/Auth/Fearture/Fearture';
import axios from 'axios';
import MyList from './pages/Auth/MyList/MyList';

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className='App'>
      <ToastContainer position='bottom-right' />
      <div className="header"><Header /></div>
      <Routes>
        <Route path='/' element={!user ? <Home /> : <Navigate to="/vn" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/*-------------------ADMIN----------------------*/}
        {user && (
          <>
            {user.isAdmin ? (
              <Route expact path='/admin//*' element={<HomeAdmin />} />
            ) : (
              <Route path='/' element={<Home />} />
            )}
          </>
        )}
        {/*-------------------USER----------------------*/}
        {user ?
          (
            <>
              <Route path='/vn/' element={<Landingpage />} />
              <Route path='/vn/movies' element={<Landingpage type="movie" />} />
              <Route path='/vn/series' element={<Landingpage type="series" />} />
              <Route path='/vn/mylist' element={<MyList />} />
              <Route path='/vn/watch/:id' element={<Watch />} />
            </>
          ) : (
            <Route path='/' element={<Home />} />
          )}
      </Routes>
      <Footer />
    </div>
  )
}
export default App;
