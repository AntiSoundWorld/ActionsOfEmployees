import getBitBucketAccessToken from "../../../public/Database/get/getBitbucketAccessToken.js";
import getJiraAccessToken from "../../../public/Database/get/getJiraAccessToken.js";

import getAccesses from "../../../public/Database/authorize.js";
import getState from "../../../public/Database/get/getState.js";

import isBitBucketAccessTokenExist from "../../../public/Database/isExist/isBitBucketAccessTokenExist.js";
import isJiraAccessTokenExist from "../../../public/Database/isExist/isJiraAccessTokenExist.js";

import authorizationOnBitbucket from "../../authorizationsAtlassian/authorizationOnBitbucket.js";
import authorizationOnJira from "../../authorizationsAtlassian/authorizationOnJira.js";

import isBasicTokenExist from "../../../public/Database/isExist/isAccountExist.js";
import collectInformation from "../../collector/GetInfo/collectInformation.js";
import dotenv from 'dotenv';
import updateActionsOfEmployees from '../../../public/Database/set/updateActionsOfEmployees.js'
import getActionsOfEmplyees from "../../../public/Database/get/getActionsOfEmplyees.js";
import getDomen from "../../../public/Database/get/getDomen.js";
import isContentExist from "../../../public/Database/isExist/isActionsOfEmployeesExist.js";
dotenv.config();

export default function getRoutes(app){
    
    app.get("/", function(request, response){
        response.render('registrationForm');
    });

    app.get('/access', (request, response) => {
        response.render('AccessForm');
    });

    app.get("/access_bitbucket", function({query: {state}}, response){
        response.redirect(`https://bitbucket.org/site/oauth2/authorize?client_id=${process.env.BITBUCKET_CLIENT_ID}&state=${state}&response_type=code`);
    });


    app.get("/access_confluence", function({query: {state}}, response){
        response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${process.env.JIRA_CLIENT_ID}&scope=read%3Aconfluence-content.summary%20read%3Aconfluence-space.summary%20read%3Aconfluence-props%20read%3Aconfluence-content.all%20read%3Aconfluence-user%20read%3Aconfluence-groups&redirect_uri=https%3A%2F%2F${process.env.DOMEN}%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`);
    });

    app.get('/access_jira', function({query: {state}}, response){

        response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${process.env.JIRA_CLIENT_ID}&scope=read%3Ajira-work%20read%3Ajira-user%20offline_access&redirect_uri=https%3A%2F%2F${process.env.DOMEN}%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`)
        // response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${process.env.JIRA_CLIENT_ID}&scope=read%3Ame%20read%3Aaccount&redirect_uri=https%3A%2F%2F${process.env.DOMEN}%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`)
    });
    
    app.get('/authorize', (request, response) => {
        response.render('loginForm');
    });

    app.get('/callback_bitbucket', async ({query: {code, state}}, res) => {

        res.send("<script>window.close();</script>");
        
        if (code === undefined) {
            return;
        }

        res.status(200).send();

        authorizationOnBitbucket(code, state);

    })

    app.get('/callback_jira', ({query: {code, state}}, res) => {
        
        res.send("<script>window.close();</script>");
        
        if (code === undefined) {
            return;
        }

        authorizationOnJira(code, state);
    })

    app.get('/get_bitbucket_access_token', ({headers: {authorization}}, response) =>{

        getBitBucketAccessToken(response, authorization);
    });

    app.get('/get_jira_access_token', ({headers: {authorization}}, response) =>{

        getJiraAccessToken(response, authorization);
    });

    app.get('/getAccesses', ({headers: {authorization}}, response) => {
        getAccesses(response, authorization);
    });

    app.get('/get_state', async ({headers: {authorization}}, response) => {

        response.json(await getState(authorization));
    });

    app.get('/is_bitbucket_accessToken_exist', async ({headers: {authorization}}, response) => {
        const status = await isBitBucketAccessTokenExist(authorization);
        console.log(status);
        response.status(status).send();
    });

    app.get('/is_jira_accessToken_exist', async ({headers: {authorization}}, response) => {
        const status = await isJiraAccessTokenExist(authorization);
        response.status(status).send();
    });

    app.get('/is_account_exist', async ({headers: {authorization}}, response) => {
        
        let status = await isBasicTokenExist(authorization);
        response.status(status).send();
    });

    app.get('/get_actions_of_employees', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);
        
        if (status === 404) {
            response.status(status).send();
            return;
        }
        
        
        const data = await getActionsOfEmplyees(authorization);
        
        if (data.status === 204) {
            response.status(data.status).send();
            return;
        }

        response.json(data.actions);
    })
    
    app.get('/is_content_exist', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);

        if (status === 404) {
            response.status(status).send();
            return;
        }

        let statusContent = await isContentExist(authorization);

        response.status(statusContent).send();
    });

    app.get('/domen', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);

        if (status === 404) {
            response.status(status).send();
            return;
        }

        let domen = await getDomen(authorization)
        console.log(domen);
        response.json(domen);
    });
}