import React from 'react';
import styles from './Active.module.scss';
import HookWrapper from "apiClient/HookWrapper";
import apiClient from "apiClient";
import TasksStatesTable from "shared/TasksStatesTable/TasksStatesTable";
import Button from "shared/inputs/Button";
import {Page, PageTitle} from "../Page";
const Active = () => {
    const {data, loaded, error} = HookWrapper(apiClient.herder.active.get);
    return <Page>
        <PageTitle>Active</PageTitle>
        <TasksStatesTable states={data} loaded={loaded} error={error}/>
    </Page>
}
export default Active;