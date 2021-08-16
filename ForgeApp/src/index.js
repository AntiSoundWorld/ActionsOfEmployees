import Resolver from '@forge/resolver';
import GetActionsOfEmployees from './requests/gets/getActionsOfEmployees.js';
import GetState from './requests/gets/getState.js';
import IsAccessesExist from './requests/isAccessesExist/isAccessesExist.js';
import IsContentExist from './requests/isAccessesExist/isContentExist.js';
import isAccountExist from './requests/isAccountExist.js';
import CollectInformations from './requests/posts/collectInformations.js';
import Registration from './requests/posts/registartion.js';

const resolver = new Resolver();

resolver.define("isAccountExist", async({payload}) => {
    return await isAccountExist(payload.basicToken);
});

resolver.define("isAccessesExist", async({payload}) => {

    return await IsAccessesExist(payload.basicToken);
})

resolver.define("getState", async({payload}) => {

    return await GetState(payload.basicToken);
});

resolver.define("collectInformations", async({payload}) => {

   await CollectInformations(payload.basicToken, payload.dates);
});

resolver.define("isContentExist", async({payload}) => {

   return await IsContentExist(payload.basicToken);
});

resolver.define("getActionsOfEmployees", async({payload}) => {

    return await GetActionsOfEmployees(payload.basicToken);
});

resolver.define("registration", async({payload}) => {

    return await Registration(payload.state, payload.email, payload.password );
})

export const handler = resolver.getDefinitions();