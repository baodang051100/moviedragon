import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Landingpage from './Landingpage/Landingpage'
import MyList from './MyList/MyList'
import Watch from './Watch/Watch'
import { Header } from '../../components/Auth'
import Search from './Search/Search'

const HomeRouter = ({ user }) => {
    return (
        <div className="route">
            <Header />
            <Routes>
                <Route path='/' element={<Landingpage />} />
                <Route path='/movies' element={<Landingpage type="movie" />} />
                <Route path='/series' element={<Landingpage type="series" />} />
                <Route path='/mylist' element={<MyList />} />
                <Route path='/watch/:id' element={<Watch />} />
                <Route path='/search' element={<Search />} />
            </Routes>
        </div>
    )
}

export default HomeRouter