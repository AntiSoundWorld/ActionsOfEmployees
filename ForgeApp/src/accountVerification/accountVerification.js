import GetState from "../requests/gets/getState";
import GetDomen from "../requests/gets/getUrl";
import isAccessesExist from "../requests/isAccessesExist/isAccessesExist";

export default async function GetAccountVerification(basicToken){

    if(basicToken === null){

        return null;
    }

    const accountVerification = {

        state: await GetState(basicToken),

        domen: await GetDomen(basicToken)
    }

    return accountVerification;
}