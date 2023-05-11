import React from 'react';
import styles from './TasksStatesTable.module.scss';
import {beautifyDatetime} from "../../utils/dates";
import {useNavigate} from "react-router-dom";

const TasksStatesTable = ({states, loaded, error}) => {
    const navigate = useNavigate();
    const maxVisibleStdoutLen = 20;
    return <div id={styles.TasksTable} className={'col-xl-8'}>
        <table>
            <thead>
            <tr>
                <th>CHECKBOX</th>
                <th>#</th>
                <th>command</th>
                <th>args</th>
                <th>started at</th>
                <th>finished at</th>
                <th>output</th>
            </tr>
            </thead>
            {!loaded || !!error || !states?.length ? null : <tbody>
                {states.map(state => <tr onClick={() => navigate('/tasks/' + state.task_id)}>
                    <td>{state.task_id}</td>
                    <td>{state.command}</td>
                    <td>{(state.args || []).join(' ')}</td>
                    <td>{state.started_at ? beautifyDatetime(state.started_at) : ""}</td>
                    <td>{state.finished_at ? beautifyDatetime(state.finished_at) : ""}</td>
                    <td>{(state.stdout || '').slice(0, maxVisibleStdoutLen)}{(state.stdout || '').length > maxVisibleStdoutLen ? '...' : ''}</td>
                </tr>)}
                </tbody>
            }
        </table>
        {!loaded ? <div>Loading...</div> : !!error ? <div>Error on loading:<code>{error}</code></div> :
            !states?.length ? <div>No tasks</div> : null}
    </div>
}
export default TasksStatesTable;