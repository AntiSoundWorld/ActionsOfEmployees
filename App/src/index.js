import Resolver from '@forge/resolver';
import getInfo from './GetInfo/getInfo';
import { getDates } from './GetInfo/Tools/tools';
import GetMacketForRender from './Makcets/getMacketForRender';
import { send } from './Requests/getAcessToken';
import { isUserAuthorized } from './Requests/requestsToServer';

const resolver = new Resolver();

resolver.define("checkIsAuthorized", async ({payload}) => {
   
   let res = await isUserAuthorized(payload);

   return res;
});

resolver.define("GetInfo", async ({payload}) => {
   
   let usersInfo = await getInfo(payload);

   return usersInfo;
});


resolver.define('GetMacketForRender', () => {
   
   return GetMacketForRender();
});
export const handler = resolver.getDefinitions();