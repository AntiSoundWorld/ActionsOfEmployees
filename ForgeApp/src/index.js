import Resolver from '@forge/resolver';
import getInfo from './GetInfo/getInfo';
import { getDates } from './GetInfo/Tools/tools';
import GetMacketForRender from './Makcets/getMacketForRender';
import { send } from './Requests/getAcessToken';
import { isUserAuthorized } from './Requests/requestsToServer';

const resolver = new Resolver();

resolver.define("checkIsAuthorized", async ({payload}) => {
 
});

resolver.define("GetInfo", async ({payload}) => {
   
  
});


export const handler = resolver.getDefinitions();