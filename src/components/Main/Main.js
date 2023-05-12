import React from 'react';
import styles from './Main.module.scss';
import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Account from "../Account/Account";
import Calendar from "../Calendar/Calendar";

const Main = ({user, reloadUser, setCookies}) => {
    return <div id={styles.Main}>
        <Header/>
        <Routes>
            <Route path='/' element={<Content/>}>
                <Route path='calendar' element={<Calendar/>}/>
                <Route path='account' element={<Account user={user} reloadUser={reloadUser} setCookies={setCookies}/>}/>
            </Route>
            <Route path='*' element={<Navigate to='/calendar' replace={true}/>}/>
        </Routes>
    </div>
}

const Header = () => {
    const navigate = useNavigate();
    const Link = ({to, children}) => <div className={styles.Link} onClick={() => navigate(to)}
                                          active={window.location.pathname === to ? '1' : undefined}>{children}</div>
    return <div id={styles.Header}>
        <div id={styles.Left}>SmartFit</div>
        <div id={styles.Right}>
            <Link to='/calendar'>Календарь тренировок</Link>
            <Link to='/account'>Личный кабинет</Link>
        </div>
    </div>
}
const Content = () => {
    return <div id={styles.Content}>
        <Outlet/>
    </div>
}
export default Main;