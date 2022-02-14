const submitForm = async (type, url, data) => {
    const res = await fetch(url, {
        method: type,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    });
    return res;
}



export {submitForm}