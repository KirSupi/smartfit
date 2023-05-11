import React, {createContext, useEffect, useState} from "react";
import HookWrapper from "ApiClient/HookWrapper";
import apiClient from "ApiClient";
import {useCookies} from "react-cookie";
import omitBy from "lodash/omitBy";
import {ResponseError} from "ApiClient/BaseClient";
import {useUserLocalStorage} from "Utils/localStorageUtils";

const initUserState = {
    id: 0,
    login: "",
    role: "web",
    role_model: {
        permissions: {},
        offer: "instagram",
        offer_data: {
            instagram_link: ""
        },
        traffic_status: false,
        traffic_quality: "",
        wallet: "",
        referral_rate: "",
        referrals: [],
        invited_by: null,
        invited_at: ""
    }
};
const UserContext = createContext(initUserState);

export const UserProvider = ({children}) => {
    const [cookies, setCookie] = useCookies(["session", "sessions", "activationToken"]);
    const {data: user, loaded: userLoaded, error: userLoadError, reload: reloadUser, setData: setUser} = HookWrapper(apiClient.auth.getMe, {}, {});
    const [userLocalStorage, setUserLocalStorage] = useUserLocalStorage(user?.id || 0);
    const checkUser = () => {
        if (!userLoaded) return;
        if (userLoadError) {
            if (userLoadError === ResponseError) return;
            if (cookies.session !== undefined && cookies.sessions !== undefined) {
                const newSessions = omitBy(cookies.sessions, s => s === cookies.session);
                setCookie("sessions", newSessions, {path: '/'});
                let newSession = "";
                if (newSessions) {
                    newSession = newSessions[Object.keys(newSessions)[0]];
                }
                setCookie("session", newSession, {path: '/'});
            } else {
                setCookie("session", "", {path: '/'});
                setCookie("sessions", {}, {path: '/'});
            }
        } else {
            if (cookies.session !== undefined && cookies.sessions !== undefined && user && user.login !== undefined) {
                if (!!cookies.activationToken) setCookie("activationToken", "", {path: "/"});
                if (!(cookies.session in Object.values(cookies.sessions)))
                    setCookie("sessions", {...cookies.sessions, [user.login]: cookies.session}, {path: "/"});
            }
        }
    }
    useEffect(checkUser, [userLoaded, userLoadError]);
    useEffect(reloadUser, [cookies.session]);
    const providerValue = {user, userLoaded, userLoadError, reloadUser, setUser, userLocalStorage, setUserLocalStorage};
    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    )
}
export const UserConsumer = UserContext.Consumer;
