import GetState from "../requests/gets/getState";
import GetDomen from "../requests/gets/getUrl";
import GetAccesses from "../requests/isAccessesExist/isAccessesExist";
import isAccountExist from "../requests/isAccountExist";

export default async function GetAccountVerification(basicToken){

    if(basicToken === null){

        return null;
    }

    const accountVerification = {


        accesses: await GetAccesses(basicToken),

        state: await GetState(basicToken),

        domen: await GetDomen(basicToken)
    }

    return accountVerification;
}