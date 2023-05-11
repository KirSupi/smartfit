import React from 'react';
import styles from './Finished.module.scss';
import TasksStatesTable from "shared/TasksStatesTable/TasksStatesTable";
import HookWrapper from "apiClient/HookWrapper";
import apiClient from "apiClient";
import {Page, PageTitle} from "../Page";
const Finished = () => {
    const {data, loaded, error} = HookWrapper(apiClient.herder.finished.get);
    return <Page>
        <PageTitle>Finished</PageTitle>
        <TasksStatesTable states={data} loaded={loaded} error={error}/>
    </Page>
}
export default Finished;