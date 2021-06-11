import api from '@forge/api';

export const isUserAuthorized = async(basicToken) => {

    if (Object.keys(basicToken).length == 0) {
        return 'return null becouse basic token is empty';
    }

    let url = 'https://65804b484b15.ngrok.io/authorize';

    console.log(url);
    const res = await api.fetch(url, {
        method: "POST",
        headers: {
            'Authorization': basicToken
        }
    });

    let info = {
        status: res.status,
        code: null
    }

    if(res.status === 401){
        return info;
    }

    info.code = await res.text();

    return info;
}