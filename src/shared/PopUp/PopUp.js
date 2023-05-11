import React, {createContext, useContext, useEffect, useState} from 'react';
import styles from './PopUp.module.scss'

const initPopUpState = {
    show: false,
    content: null,
    onClose: () => {
    },
};

const PopUpContext = createContext(initPopUpState);
const closePopUp = () => {
};

export const PopUpProvider = ({children}) => {
    const [PopUpState, setPopUpState] = useState(initPopUpState);
    document.body.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            setPopUpState(initPopUpState);
            if (typeof PopUpState.onClose === "function") PopUpState.onClose();
        }
    });
    const providerValue = {PopUpState, setPopUpState};
    return <PopUpContext.Provider value={providerValue}>
        {children}
        <PopUpContainer/>
    </PopUpContext.Provider>
};

export const PopUpContainer = () => <PopUpContext.Consumer>
    {({PopUpState, setPopUpState}) =>
        <div id={styles.PopUp} opened={PopUpState.show ? "1" : undefined}>
            <div id={styles.PopUpBackground}
                 onClick={(e) => {
                     if (e.target.id === styles.PopUpBackground) {
                         setPopUpState({...initPopUpState});
                         if (typeof PopUpState.onClose === "function") PopUpState.onClose();
                     }
                 }}>
                <div id={styles.PopUpContent}>
                    {PopUpState.content}
                </div>
            </div>
        </div>
    }
</PopUpContext.Consumer>

const PopUp = ({children, opened, ...props}) => {
    return <PopUpContext.Consumer>
        {
            ({setPopUpState}) => <Opener children={children} opened={opened} setPopUpState={setPopUpState} {...props}/>
        }
    </PopUpContext.Consumer>
}

const Opener = ({children, opened, setPopUpState, ...props}) => {
    useEffect(() => {
        if (opened) {
            setPopUpState({
                ...initPopUpState,
                content: children,
                show: true,
                onClose: props.onClose
            })
        } else {
            setPopUpState(initPopUpState);
        }
    }, [opened]);
    return null;
}
export default PopUp;