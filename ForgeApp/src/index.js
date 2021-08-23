import Resolver from '@forge/resolver';
import GetAccountVerification from './accountVerification/accountVerification.js';
import GetActionsOfEmployees from './requests/gets/getActionsOfEmployees.js';
import GetAccesses from './requests/isAccessesExist/isAccessesExist.js';
import isAccountExist from './requests/isAccountExist.js';
import CollectActionsOfEmployees from './requests/posts/collectActionsOfEmployees.js';

import Registration from './requests/posts/registartion.js';


const resolver = new Resolver();

resolver.define("getAccountVerification", async({payload}) => {

    const res = await GetAccountVerification(payload.basicToken);

    return res 
});

resolver.define("collectActionsOfEmployees", async({payload}) => {

    await CollectActionsOfEmployees(payload.basicToken, payload.dates);
});

resolver.define("getActionsOfEmployees", async({payload}) => {

    return await GetActionsOfEmployees(payload.basicToken);
});

resolver.define("registration", async({payload}) => {

    console.log("tap;");
    return await Registration(payload.state, payload.email, payload.password);
})

resolver.define("getAccesses", async({payload}) => {

    return await GetAccesses(payload.basicToken);
});

resolver.define("isAccountExist", async ({payload}) => {

    return await isAccountExist(payload.basicToken)
})

export const handler = resolver.getDefinitions();