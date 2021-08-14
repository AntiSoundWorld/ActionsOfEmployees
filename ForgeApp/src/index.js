import Resolver from '@forge/resolver';
import IsAccessesExist from './requests/isAccessesExist/isAccessesExist.js';
import isAccountExist from './requests/isAccountExist.js';

const resolver = new Resolver();

resolver.define("isAccountExist", async({payload}) => {
    
    return await isAccountExist(payload.basicToken);
});

resolver.define("isAccessesExist", async({payload}) => {

    return IsAccessesExist(payload.basicToken);
})

export const handler = resolver.getDefinitions();