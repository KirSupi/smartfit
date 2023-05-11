import React, {useEffect, useState} from "react";
import {ErrorResponseAborted} from "./BaseClient";

export default function HookWrapper(apiFunc, params = null, initData = null, additionalDependencies=[]) {
    const [data, setData] = useState(initData);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [controller, setController] = useState(null);
    const reload = async () => {
        if (!!controller) controller.abort();
        try {
            const newController = new AbortController();
            setController(newController);
            const {data: newData, error: newError} = await apiFunc(params, {signal: newController.signal});
            if (newError === ErrorResponseAborted) return;
            if (initData !== undefined) {
                if (newData !== undefined) {
                    setData(newData);
                } else {
                    setData(initData);
                }
            }
            setLoaded(true);
            setError(newError);
        } catch (err) {
            setLoaded(true);
            setError(err.toString());
            if (initData !== undefined) setData(initData);
        }
    }
    const deps = (
        !params || typeof params !== "object" ? [...additionalDependencies] :
            params.constructor.name === "Array" ? [...params, ...additionalDependencies] :
                params.constructor.name === "Object" ? [...Object.values(params), ...additionalDependencies]
                    : []
    );
    useEffect(()=> {
        reload().then()
    }, deps);
    return {data, loaded, error, reload, setData}
}