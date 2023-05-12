import React, {useEffect, useState} from 'react';
import './fonts/Roboto/stylesheet.css';
import './App.module.scss';
import Main from "./components/Main/Main";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useCookies} from "react-cookie";
import Auth from "./components/Auth/Auth";
import Registration from "./components/Registration/Registration";

const App = () => {
    const [cookies, setCookies] = useCookies(['session']);
    const [user, setUser] = useState({id: 0, login: '', data: {}});
    const reloadUser = () => {
        if (cookies.session !== '') setUser({
            id: 1,
            login: "testUser",
            data: {name: "", height: 170, sex: "male", birthdate: ""}
        });
        fetch('/api/auth').then(res => res.json()).then(res => {
            setUser(res.user);
        }).catch(err => console.log(err));
    }
    useEffect(reloadUser, [cookies.session]);
    return <BrowserRouter>
        <div id="App">
            <Routes>
                {!cookies || !cookies.session || !user || !user.id ? <>
                    <Route path='/auth' element={<Auth setCookies={setCookies}/>}/>
                    <Route path='/registration' element={<Registration setCookies={setCookies}/>}/>
                    <Route path='*' element={<Navigate to='/auth' replace={true}/>}/>
                </> : <>
                    <Route path='*' element={<Main user={user} reloadUser={reloadUser} setCookies={setCookies}/>}/>
                </>}
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;