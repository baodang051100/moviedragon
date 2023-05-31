import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Favorite = ({ userForm, movieId, movieInfo }) => {
    const [myListNumber, setMyListNumber] = useState([]);
    const [myListInfo, setMyListInfo] = useState(false);

    useEffect(() => {
        const variable = {
            userForm: userForm,
            movieId: movieId,
            movieTitle: movieInfo.title,
            movieImg: movieInfo.imgSm,
            movieYear: movieInfo.year,
            movieGenre: movieInfo.genre,
            movieLimit: movieInfo.limit,
            movieTrailer: movieInfo.trailer,
            movieVideo: movieInfo.video,
        }
        axios.post("http://localhost:8000/api/myList/myListNumber", variable, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
        }).then(res => {
            if (res.data.success) {
                setMyListNumber(res.data.MyListNumber)
            } else {
                alert("Failer to get my list number")
            }
        })
        // axios.post("http://localhost:8000/api/myList/myListInfo", variable, {
        //     headers: {
        //         token: "Bearer " + JSON.parse(localStorage.getItem("token"))
        //     },
        // }).then(res => {
        //     if (res.data.success) {
        //         setMyListInfo(res.data.info)
        //     } else {
        //         alert("Failer to get my list number")
        //     }
        // })
    }, [])

    return (
        <div>
            {/* <FavoriteIcon /> */}
            
        </div>
    )
}

export default Favorite