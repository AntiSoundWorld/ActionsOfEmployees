import GetState from "../requests/gets/getState";
import GetAccesses from "../requests/isAccessesExist/isAccessesExist";
import isAccountExist from "../requests/isAccountExist";

export default async function GetAccountVerification(basicToken){

    if(basicToken === null){

        return null;
    }

    const accountVerification = {

        isAccountExist: await isAccountExist(basicToken),

        accesses: await GetAccesses(basicToken),

        state: await GetState(basicToken),
    }

    return accountVerification;
}