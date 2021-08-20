import isBasicTokenExist from "../../../public/Database/isExist/isAccountExist.js";
import registartion from "../../../public/Database/registartion.js";
import collectInformation from "../../collector/GetInfo/collectInformation.js";

export default function postRoutes(app){

    app.post('/registration', async ({body: {state, email, password}}, response) => {
        
        try{
            const status = await registartion(state, email, password);
            response.status(status).send();
        }
        catch(err){
            response.status(500).send();
            console.log(err);
        }

    });

    app.post('/is_account_exist', async ({headers: {authorization}}, response) => {

        const status = await isBasicTokenExist(authorization);
        response.status(status).send();
    })

    app.post('/collect_information', async ({body:{dates}, headers:{authorization}}, response) => {

        const status = await isBasicTokenExist(authorization);
        
        if(status === 404){
            response.status(status).send();
            return;
        }
        
        response.status(status).send();
        
        collectInformation(dates, authorization);
    })
}