import styles from "./Account.module.scss";
import React, {useEffect, useState} from "react";

const Account = ({user, reloadUser, setCookies}) => {
    const [userdata, setUserdata] = useState({
        user_id: 0,
        name: '',
        age: 0,
        sex: '',
        weight: 0,
        height: 0,
        goal: '',
        target: '',
        place: '',
        calories: 0,
    });
    useEffect(()=>{
        fetch('/api/userdata').then(res=>res.json()).then(res=>{
            setUserdata(res)
        })
    },[]);
    const updateText = (key) => e => {
        setUserdata({...userdata, [key]: e.target.value});
    }
    const updateNumber = (key) => e => {
        setUserdata({...userdata, [key]: Number(e.target.value)});
    }
    useEffect(()=>{
        fetch('/api/userdata', {method: 'POST', body: JSON.stringify(userdata)})
            .then(res => res.json())
            .catch(err => console.log(err));
    },[userdata]);
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
                        <td>Имя</td>
                        <td><input type="text" value={userdata.name} onChange={updateText('name')}/></td>
                    </tr>
                    <tr>
                        <td>Рост</td>
                        <td>
                            <input type="number" min={0} max={300} value={userdata.height}
                                   onChange={updateNumber('height')}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Пол</td>
                        <td>
                            <select value={userdata.sex} onChange={updateText('sex')}>
                                <option value="" disabled={true}></option>
                                <option value="male">Мужчина</option>
                                <option value="female">Женщина</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Возраст</td>
                        <td>
                            <input type="number" min={0} max={100} value={userdata.age} onChange={updateNumber('age')}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Вес</td>
                        <td>
                            <input type="number" min={0} max={300} value={userdata.weight} onChange={updateNumber('weight')}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Цель</td>
                        <td>
                            <select value={userdata.target} onChange={updateText('target')}>
                                <option value="" disabled={true}></option>
                                <option value="weight loss">Похудение</option>
                                <option value="mass recruitment">Набор веса</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Место тренировок</td>
                        <td>
                            <select value={userdata.place} onChange={updateText('place')}>
                                <option value="" disabled={true}></option>
                                <option value="gym">Тренажёрный зал</option>
                                <option value="street">Уличные тренажёры</option>
                                <option value="home">Дом</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Количество потребляемых калорий</td>
                        <td>
                            <input type="number" min={0} max={10000} value={userdata.calories} onChange={updateNumber('calories')}/>
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