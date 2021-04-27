export const callApi = (method, url, data, token) => {
    const request = {
        method: method
    };
    if (data) {
        request.body = JSON.stringify(data);
        request.headers = {
            'Content-Type': 'application/json',
        }
    }
    if (token) {
        request.headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    return new Promise((resolve, reject) => {
        fetch(
            url,
            request
        )
        .then(res =>{
            console.log('================json====================');
            console.log(res);
            console.log('====================================');
            return res.json();
        })
        .then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            resolve(res);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
    })
}