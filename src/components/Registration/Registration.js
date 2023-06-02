import styles from "./Registration.module.scss";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import appStyles from "../../App.module.scss";

const Registration = ({setCookies}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return <div id={styles.Registration}>
        <div id={styles.Container}>
            <div id={styles.Logo}>SmartFit</div>
            <div id={styles.Form}>
                <label htmlFor={styles.InputLogin}>Логин</label>
                <input type="text" id={styles.InputLogin} onChange={e=>setLogin(e.target.value)}/>
                <label htmlFor={styles.InputPassword}>Пароль</label>
                <input type="text" id={styles.InputPassword} onChange={e=>setPassword(e.target.value)}/>
                <input type="button" value='Зарегистрироваться' id={styles.AuthButton} className={appStyles.white} onClick={e=>{
                    fetch('/api/auth/sign-up', {
                        method:'POST',
                        body:JSON.stringify({
                            username:login,
                            password:password
                        })
                    }).then(()=>{
                        fetch('/api/auth/sign-in', {
                            method:'POST',
                            body:JSON.stringify({
                                username:login,
                                password:password
                            })
                        }).then(res=>res.text()).then(res=>setCookies('session', res?.session?.session || "invalid", {path: '/'}));
                    });
                }}/>
            </div>
            <a href="" id={styles.AuthLink} onClick={e=>{
                e.preventDefault();
                navigate('/auth');
            }}>Вход</a>
        </div>
    </div>
}
export default Registration;