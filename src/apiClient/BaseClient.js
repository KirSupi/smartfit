export const ResponseError = 'response error';
export const ErrorResponseAborted = 'AbortError: The user aborted a request.';

const getApiUrlWithParams = (apiPath, params) => {
    if (!apiPath.startsWith("http")) apiPath = window.location.origin + apiPath;
    const url = new URL(apiPath);
    if (typeof params === "object" && params !== undefined && params !== null)
        Object.keys(params).forEach(key=>{
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, (params[key]+""));
            }
        });
    return url.toString();
}

const apiCall = async (path, fetchParams) => {
    let data, error;
    await fetch(path, fetchParams)
        .then(res => res.json())
        .then(res => {
            if (!res || !res.result) {
                error = ResponseError;
                return;
            }
            error = "";
            if (res.result === "error") {
                if (res.error) {
                    if (res.error.code) error += "(" + res.error.code + ") ";
                    if (res.error.message) error += res.error.message;
                } else {
                    error += "failed to recognize the error";
                }
            } else {
                if (res.data !== null && res.data !== undefined) data = res.data;
            }
        })
        .catch(err => {
            // if (err.toString() === 'AbortError: The user aborted a request.') return;
            // console.log(err);
            console.log("CATCHER", err.toString());
            error = err.toString();
        });
    return {data, error};
}

class BaseClient {
    constructor(path) {
        this.path = path;
    }
    create(path) {
        return async (params, fetchParams={}) => await apiCall(this.path + path, {method: "POST", body: JSON.stringify(params), ...fetchParams});
    }
    get(path) {
        return async (params={}, fetchParams={}) => await apiCall(getApiUrlWithParams(this.path + path, params), {method: "GET", ...fetchParams});
    }
    update(path) {
        return async (params, fetchParams={}) => await apiCall(this.path + path, {method: "PUT", body: JSON.stringify(params), ...fetchParams});
    }
    delete(path) {
        return async (params=null, fetchParams={}) => await apiCall(this.path + path, {method: "DELETE", body: !!params ? JSON.stringify(params) : undefined, ...fetchParams});
    }
}

export default BaseClient;