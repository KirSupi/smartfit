import React from 'react';
import styles from './Home.module.scss';
import {Container} from "react-bootstrap";
const Home = () => {
    return <div id={styles.Home}>
        <div id={styles.Header}>
            <div id={styles.HeaderGradient}>
                <div id={styles.HeaderNoise}>
                    <div id={styles.HeaderInnerGradient}>
                    <div id={styles.HeaderContent}>
                        go-herder
                    </div>
                </div>
                </div>
            </div>
        </div>
        <Container>
            kek
        </Container>
    </div>
}
export default Home;