import styles from "./Calendar.module.scss";
import React, {useEffect, useState} from "react";
const mockRes = {
    "data": [
        {
            "id": 1,
            "Date": "2023-05-29T09:23:10.34Z",
            "Title": "Chest and Tricep Workout",
            "Exercises": [
                {
                    "id": 1,
                    "title": "Bench Press",
                    "sets": 3,
                    "reps": [
                        10,
                        8,
                        6
                    ],
                    "weights": [
                        135,
                        155,
                        175
                    ],
                    "calories": 150
                },
                {
                    "id": 2,
                    "title": "Incline Dumbbell Press",
                    "sets": 3,
                    "reps": [
                        12,
                        10,
                        8
                    ],
                    "weights": [
                        50,
                        55,
                        60
                    ],
                    "calories": 120
                },
                {
                    "id": 3,
                    "title": "Cable Crossover",
                    "sets": 3,
                    "reps": [
                        15,
                        12,
                        10
                    ],
                    "weights": [
                        20,
                        25,
                        30
                    ],
                    "calories": 90
                }
            ],
            "WorkoutExercises": null
        },
        {
            "id": 4,
            "Date": "2023-05-28T17:30:00Z",
            "Title": "Back and Bicep Workout",
            "Exercises": [
                {
                    "id": 8,
                    "title": "Deadlift",
                    "sets": 4,
                    "reps": [
                        8,
                        6,
                        4,
                        2
                    ],
                    "weights": [
                        110,
                        120,
                        120,
                        120
                    ],
                    "calories": 200
                },
                {
                    "id": 9,
                    "title": "Pull-Up",
                    "sets": 3,
                    "reps": [
                        12,
                        10,
                        8
                    ],
                    "weights": null,
                    "calories": 60
                },
                {
                    "id": 10,
                    "title": "Barbell Curl",
                    "sets": 3,
                    "reps": [
                        10,
                        8,
                        6
                    ],
                    "weights": [
                        65,
                        75,
                        85
                    ],
                    "calories": 70
                }
            ],
            "WorkoutExercises": null
        },
        {
            "id": 5,
            "Date": "2023-05-27T10:00:00Z",
            "Title": "Leg Workout",
            "Exercises": [
                {
                    "id": 11,
                    "title": "Squat",
                    "sets": 5,
                    "reps": [
                        12,
                        10,
                        8,
                        6,
                        4
                    ],
                    "weights": [
                        90,
                        100,
                        110,
                        120,
                        120
                    ],
                    "calories": 250
                },
                {
                    "id": 12,
                    "title": "Leg Press",
                    "sets": 4,
                    "reps": [
                        15,
                        12,
                        10,
                        8
                    ],
                    "weights": [
                        180,
                        200,
                        210,
                        210
                    ],
                    "calories": 150
                },
                {
                    "id": 13,
                    "title": "Lunges",
                    "sets": 3,
                    "reps": [
                        12,
                        10,
                        8
                    ],
                    "weights": [
                        30,
                        35,
                        40
                    ],
                    "calories": 100
                }
            ],
            "WorkoutExercises": null
        }
    ]
};
const Calendar = () => {
    const [workouts, setWorkouts] = useState([]);
    useEffect(()=>{
        fetch('/api/workouts/').then(res=>res.json()).then(res=>{
            setWorkouts(res.data);
        })
        // setWorkouts(mockRes.data);
    },[]);
    const formatDate = dateRaw => {
        let [year, month, day] = dateRaw.slice(0, 10).split('-', 3);
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
    const sortFunc = (a, b) => (a.Date > b.Date ? -1 : a.Date === b.Date ? 0 : 1);
    return <div id={styles.Calendar}>
        <h1>Тренировки</h1>
        <div id={styles.Workouts}>
            {
                workouts.sort(sortFunc).map(workout => <div className={styles.Workout} key={workout.id}>
                    <div
                        className={styles.Title + ' ' + (workout.Date < today ? styles.Past : workout.Date === today ? styles.Today : styles.Future)}>
                        {workout.Title} {formatDate(workout.Date)}
                    </div>
                    <div className={styles.Exercises}>
                        <table>
                            <tbody>
                            {workout.Exercises.map((exercise, exerciseIndex) => <tr key={exerciseIndex}>
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