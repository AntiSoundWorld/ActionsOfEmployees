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

    app.get('/access_jira', function({query: {state}}, response){
        console.log(state);

        response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=YJcRuME54tdrp5mrWHl2uhF48YeuyntE&scope=read%3Ajira-work%20read%3Ajira-user%20offline_access&redirect_uri=https%3A%2F%2F${process.env.DOMEN}%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`)
        // response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=YJcRuME54tdrp5mrWHl2uhF48YeuyntE&scope=read%3Ajira-work%20read%3Ajira-user%20offline_access&redirect_uri=https%3A%2F%2F${process.env.DOMEN}%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`)
    });
    
    app.get('/authorize', (request, response) => {
        response.render('loginForm');
    });

    app.get('/callback_bitbucket', async ({query: {code, state}}, res) => {

        // res.redirect("https://www.atlassian.com/ru/software/jira");
        
        if (code === undefined) {
            return;
        }
        console.log(code, state);
        res.status(200).send();

        authorizationOnBitbucket(code, state);

    })

    app.get('/callback_jira', ({query: {code, state}}, res) => {
        res.redirect("https://www.atlassian.com/ru/software/jira");
        
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

    app.get('/get_state', ({headers: {authorization}}, response) => {
        getState(response, authorization);
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
}