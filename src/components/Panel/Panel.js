import React from 'react';
import styles from './Panel.module.scss';
import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home/Home";
import Queue from "./Queue/Queue";
import Active from "./Active/Active";
import Finished from "./Finished/Finished";
import {Container} from "react-bootstrap";

const Panel = () => {
    return <div id={styles.Panel}>
        <Sidebar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/' element={<Content/>}>
                <Route path='queue' element={<Queue/>}/>
                <Route path='active' element={<Active/>}/>
                <Route path='finished' element={<Finished/>}/>
            </Route>
            <Route path='*' element={<Navigate to='/' replace={true}/>}/>
        </Routes>
    </div>
}
// const Redirect = ({to}) => {
//     const navigate = useNavigate();
//     navigate(to+'');
//     return null;
// }
const Sidebar = () => {
    const navigate = useNavigate();
    const Link = ({to, children}) => <div className={styles.Link} onClick={() => navigate(to)}
                                          active={window.location.pathname === to ? '1' : undefined}>{children}</div>
    return <div id={styles.Sidebar}>
        <div id={styles.Links}>
            <div id={styles.Logo}>go-herder</div>
            <Link to='/home'>Home</Link>
            <Link to='/queue'>Queue</Link>
            <Link to='/active'>Active</Link>
            <Link to='/finished'>Finished</Link>
        </div>
    </div>
}
const Content = () => {
    return <Container>
        <Outlet/>
    </Container>
    // return <div id={styles.Content}>
    //     <Outlet/>
    // </div>
}
export default Panel;