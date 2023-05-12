import styles from "./Calendar.module.scss";
import React from "react";

const Calendar = () => {
    const workouts = [
        {
            id: 1,
            date: "2023-05-04",
            title: "Грудь и руки",
            exercises: [
                {
                    title: "Жим лёжа",
                    reps: [5, 5, 5, 5, 5]
                },
                {
                    title: "Подъём штанги в скамье Скотта",
                    reps: [5, 8, 8]
                },
                {
                    title: "Бег",
                    dur: 180, // dur -> duration in seconds
                },
            ]
        },
        {
            id: 2,
            date: "2023-05-07",
            title: "Спина",
            exercises: [
                {
                    title: "Подтягивания",
                    reps: [7, 7, 7]
                },
                {
                    title: "Бабочка",
                    reps: [12, 8, 12]
                },
                {
                    title: "Бег",
                    dur: 120, // dur -> duration in seconds
                },
            ]
        },
        {
            id: 3,
            date: "2023-05-10",
            title: "Грудь и руки",
            exercises: [
                {
                    title: "Жим лёжа",
                    reps: [5, 5, 5, 5, 5]
                },
                {
                    title: "Подъём штанги в скамье Скотта",
                    reps: [5, 8, 8]
                },
                {
                    title: "Бег",
                    dur: 180, // dur -> duration in seconds
                },
            ]
        },
        {
            id: 4,
            date: "2023-05-12",
            title: "Грудь и руки",
            exercises: [
                {
                    title: "Жим лёжа",
                    reps: [12, 12, 12]
                },
                {
                    title: "Подъём штанги в скамье Скотта",
                    reps: [12, 12, 12]
                },
                {
                    title: "Бег",
                    dur: 330, // dur -> duration in seconds
                },
            ]
        },
        {
            id: 5,
            date: "2023-05-14",
            title: "Грудь и руки",
            exercises: [
                {
                    title: "Жим лёжа",
                    reps: [20, 10]
                },
                {
                    title: "Подъём штанги в скамье Скотта",
                    reps: [15, 15, 12]
                },
                {
                    title: "Бег",
                    dur: 300, // dur -> duration in seconds
                },
            ]
        }
    ];
    const formatDate = dateRaw => {
        let [year, month, day] = dateRaw.split('-', 3);
        const date = [day, month, year].join('.')
        let dayOfWeek = '';
        switch ((new Date(dateRaw)).getDay()) {
            case 0:
                dayOfWeek = 'вс';
                break;
            case 1:
                dayOfWeek = 'пн';
                break;
            case 2:
                dayOfWeek = 'вт';
                break;
            case 3:
                dayOfWeek = 'ср';
                break;
            case 4:
                dayOfWeek = 'чт';
                break;
            case 5:
                dayOfWeek = 'пт';
                break;
            case 6:
                dayOfWeek = 'сб';
                break;
        }
        return date + (dayOfWeek ? ' (' + dayOfWeek + ')' : '')
    }
    const formatDuration = dur => {
        const seconds = dur % 60;
        dur = (dur - seconds) / 60;
        const minutes = dur % 60;
        // dur = (dur - minutes) / 60;
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
    const getToday = () => {
        const d = new Date();
        const [year, month, day] = [
            d.getFullYear(),
            (((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1)),
            ((d.getDate() < 10 ? '0' : '') + d.getDate()),
        ]
        return [year, month, day].join('-')
    }
    const today = getToday();
    const sortFunc = (a, b) => (a.date > b.date ? -1 : a.date === b.date ? 0 : 1);
    return <div id={styles.Calendar}>
        <h1>Тренировки</h1>
        <div id={styles.Workouts}>
            {
                workouts.sort(sortFunc).map(workout => <div className={styles.Workout} key={workout.id}>
                    <div
                        className={styles.Title + ' ' + (workout.date < today ? styles.Past : workout.date === today ? styles.Today : styles.Future)}>
                        {workout.title} {formatDate(workout.date)}
                    </div>
                    <div className={styles.Exercises}>
                        <table>
                            <tbody>
                            {workout.exercises.map((exercise, exerciseIndex) => <tr key={exerciseIndex}>
                                <td>{exercise.title} {}</td>
                                <td>{!!exercise.reps ? exercise.reps.join(' ') : formatDuration(exercise.dur)}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>)
            }
        </div>
    </div>
}
export default Calendar;