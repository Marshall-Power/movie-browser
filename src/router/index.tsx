import {Route, Routes} from 'react-router-dom'
import {Home, Movie} from '../pages'

export const Router = () => {
    return(
    <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="movie/:id" element={<Movie/>}/>
    </Routes>)
}