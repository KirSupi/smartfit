import React from 'react';
import styles from './Page.module.scss';

const Page = ({children})=><div className={styles.Page}>
    {children}
</div>
const PageTitle = ({children}) => <div className={styles.PageTitle}>
    {children}
</div>
export {Page, PageTitle};