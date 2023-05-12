import styles from "./Account.module.scss";
import React, {useState} from "react";

const Account = ({user, reloadUser, setCookies}) => {
    const [newPassword, setNewPassword] = useState('');
    const update = (key) => e => {
        fetch('/api/user', {method: 'POST', body: JSON.stringify({[key]: e.target.value})})
            .then(res => res.json())
            .catch(err => console.log(err));
    }
    return <div id={styles.Account}>
        <h1>Личный кабинет</h1>
        <div id={styles.Container}>
            <div id={styles.PhotoWrapper}>
                <img src="photo.jpg" alt="" id={styles.Photo}/>
            </div>
            <div id={styles.FormWrapper}>
                <table>
                    <tbody>
                    <tr>
                        <td>ФИО</td>
                        <td><input type="text" value={user.data.name} onChange={update('name')}/></td>
                    </tr>
                    <tr>
                        <td>Логин</td>
                        <td><input type="text" disabled={true} value={user.login}/></td>
                    </tr>
                    <tr>
                        <td>Рост</td>
                        <td>
                            <input type="number" min={0} max={300} value={user.data.height}
                                   onChange={update('height')}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Пол</td>
                        <td>
                            <select value={user.data.sex} onChange={update('sex')}>
                                <option value="" disabled={true}></option>
                                <option value="male">Мужчина</option>
                                <option value="female">Женщина</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Дата рождения</td>
                        <td>
                            <input type="date" value={user.data.birthdate} onChange={update('birthdate')}/>
                        </td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td>Новый пароль</td>
                        <td>
                            <input type="password" onChange={e => {
                                update('password')(e);
                                setNewPassword(e.target.value);
                            }}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <input type="button" id={styles.ExitButton} value='Выйти' onClick={e => {
            setCookies('session', '', {path: '/'});
        }}/>
    </div>
}
export default Account;