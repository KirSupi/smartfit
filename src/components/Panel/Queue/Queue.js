import React, {useState} from 'react';
import styles from './Queue.module.scss';
import HookWrapper from "apiClient/HookWrapper";
import apiClient from "apiClient";
import TasksStatesTable from "shared/TasksStatesTable/TasksStatesTable";
import Button from "shared/inputs/Button";
import PopUp from "shared/PopUp/PopUp";
import {Page, PageTitle} from "../Page";
const Queue = () => {
    const {data, loaded, error} = HookWrapper(apiClient.herder.queue.get);
    const [addTaskPopUpOpened, setAddTaskPopUpOpened] = useState(false);
    const AddTask = () => {
        return <div>
            add
        </div>
    }
    return <Page>
        <PageTitle>Queue<Button value='Add' onClick={()=>setAddTaskPopUpOpened(true)}/></PageTitle>

        <TasksStatesTable states={data} loaded={loaded} error={error}/>
        <PopUp opened={addTaskPopUpOpened} onClose={()=>setAddTaskPopUpOpened(false)}>
            <AddTask/>
        </PopUp>
    </Page>
}
export default Queue;