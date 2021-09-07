import Resolver from '@forge/resolver';
import GetAccountVerification from './accountVerification/accountVerification.js';
import { isLicensed } from './isLicensed/isLicensed.js';
import GetActionsOfEmployees from './requests/gets/getActionsOfEmployees.js';
import isAccessesExist from './requests/isAccessesExist/isAccessesExist.js';
import GetAccesses from './requests/isAccessesExist/isAccessesExist.js';
import isAccountExist from './requests/isAccountExist.js';
import CollectActionsOfEmployees from './requests/posts/collectActionsOfEmployees.js';

import Registration from './requests/posts/registartion.js';

const resolver = new Resolver();

resolver.define("isLicensed", ({payload, context}) => {

    console.log(context.license)
    // if(context.license.isActive !== true) {
    //     console.log("App is not licensed");
    //     return;
    // }
});

resolver.define("getAccountVerification", async({payload}) => {

    return await GetAccountVerification(payload.basicToken);;
});

resolver.define("collectActionsOfEmployees", async({payload}) => {

    console.log(payload)
    await CollectActionsOfEmployees(payload.basicToken, payload.dates);
});

resolver.define("getActionsOfEmployees", async({payload}) => {

    // console.log(await GetActionsOfEmployees(payload.basicToken))
    return await GetActionsOfEmployees(payload.basicToken);
});

resolver.define("registration", async({payload}) => {

    return await Registration(payload.state, payload.email, payload.password);
})

resolver.define("isAccessesExist", async({payload}) => {

    return await isAccessesExist(payload.basicToken);
});

resolver.define("isAccountExist", async ({payload}) => {
    console.log(await isAccountExist(payload.basicToken))
    return await isAccountExist(payload.basicToken)
})

export const handler = resolver.getDefinitions();