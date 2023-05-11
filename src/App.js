import React from 'react';
import './fonts/OpenSans/OpenSans.scss';
import './fonts/Bahnschrift/stylesheet.scss';
import './fonts/ResistSans/stylesheet.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Panel from "./components/Panel/Panel";
import {BrowserRouter} from "react-router-dom";
import {PopUpProvider} from 'shared/PopUp/PopUp';
import {MantineProvider} from "@mantine/core";

const App = () => (
    // <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
        <div id="App">
            <PopUpProvider>
                <Panel/>
            </PopUpProvider>
        </div>
    </BrowserRouter>
    // </MantineProvider>
)

export default App;