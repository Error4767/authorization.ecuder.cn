export default (...args)=> {
    return fetch(...args).then(r=> r.ok ? r : Promise.reject(r.statusText));
}