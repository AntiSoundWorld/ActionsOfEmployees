import Resolver from '@forge/resolver';
import GetAccountVerification from './accountVerification/accountVerification.js';
import GetActionsOfEmployees from './requests/gets/getActionsOfEmployees.js';
import isAccessesExist from './requests/isAccessesExist/isAccessesExist.js';
import GetAccesses from './requests/isAccessesExist/isAccessesExist.js';
import isAccountExist from './requests/isAccountExist.js';
import CollectActionsOfEmployees from './requests/posts/collectActionsOfEmployees.js';

import Registration from './requests/posts/registartion.js';

const resolver = new Resolver();

resolver.define("getAccountVerification", async({payload}) => {

    return await GetAccountVerification(payload.basicToken);;
});

resolver.define("collectActionsOfEmployees", async({payload}) => {

    await CollectActionsOfEmployees(payload.basicToken, payload.dates);
});

resolver.define("getActionsOfEmployees", async({payload}) => {

    return await GetActionsOfEmployees(payload.basicToken);
});

resolver.define("registration", async({payload}) => {

    return await Registration(payload.state, payload.email, payload.password);
})

resolver.define("isAccessesExist", async({payload}) => {

    return await isAccessesExist(payload.basicToken);
});

resolver.define("isAccountExist", async ({payload}) => {

    return await isAccountExist(payload.basicToken)
})

export const handler = resolver.getDefinitions();