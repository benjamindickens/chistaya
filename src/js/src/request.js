const submitForm = async (type, url, data = null) => {
    const options = type === "post" ? {
        method: type,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    } : {
        method: type,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
    }
    const res = await fetch(url, options);
    return res;
}

export {submitForm}