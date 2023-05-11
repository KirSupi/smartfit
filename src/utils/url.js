export default function url(apiPath, params){
    const url = new URL(apiPath, window.location.origin);
    Object.keys(params).forEach(key=>{
        if (params[key]) url.searchParams.append(key, params[key]);
    });
    return url.toString();
}