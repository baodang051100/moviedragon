import React from 'react';
import SidebarAdmin from '../../../components/Admin/Sidebar/Sidebar';
import UserList from '../User/userList/UserList';
import MovieList from '../Movie/movieList/movieList';
import ListMovie from '../List/listListMovie/ListMovie';
import { Route, Routes } from 'react-router-dom';
import styles from "./HomeAdmin.module.scss";
import NewList from '../List/newList/NewList';
import NewProduct from '../Movie/newMovie/NewMovie';
import NewUser from '../User/newUser/NewUser';

const HomeAdmin = () => {
    return (
        <div className={styles.home}>
            <div className={styles.sidebar}>
                <SidebarAdmin />
            </div>
            <div className={styles.element}>
                <Routes>
                    {/* <Route path='/admin' element={<HomeAdmin />} /> */}
                    <Route path='/user' element={<UserList />} />
                    <Route path='/newUser' element={<NewUser />} />
                    <Route path='/movie' element={<MovieList />} />
                    <Route path='/newMovie' element={<NewProduct />} />
                    <Route path='/list' element={<ListMovie />} />
                    <Route path='/newList' element={<NewList />} />
                </Routes>
            </div>
        </div>
    )
}

export default HomeAdmin