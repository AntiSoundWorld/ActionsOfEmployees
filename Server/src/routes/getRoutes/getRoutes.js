import setBitBucketAccessToken from "../../../public/Database/set/setBitBucketAccessToken.js";
import setJiraAccessToken from '../../../public/Database/set/setJiraAccessToken.js';
import setState from "../../../public/Database/set/setState.js";

import dotenv from 'dotenv';
import getBitBucketAccessToken from "../../../public/Database/get/getBitbucketAccessToken.js";
import getJiraAccessToken from "../../../public/Database/get/getJiraAccessToken.js";
dotenv.config();

export default function getRoutes(app){
    
    app.get("/", function(request, response){
        response.render('registrationForm');
    });

    app.get('/access', ({query: {state, email, password}}, response) => {
        
        console.log(state, email, password);
        setState(response, state, email, password);

        response.render('AccessForm');
    });

    app.get("/access_bitbucket", function({query: {state}}, response){
        response.redirect(`https://bitbucket.org/site/oauth2/authorize?client_id=${process.env.BITBUCKET_CLIENT_ID}&state=${state}&response_type=code`);
    });

    app.get('/access_jira', function({query: {state}}, response){
        response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=YJcRuME54tdrp5mrWHl2uhF48YeuyntE&scope=read%3Ajira-work%20read%3Ajira-user&redirect_uri=https%3A%2F%2Factionsofemployees.herokuapp.com%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`);
    });
    
    app.get('/authorize', (request, response) => {
        response.render('loginForm');
    });

    app.get('/callback_bitbucket', ({query: {code, state}}, res) => {

        res.redirect("https://www.atlassian.com/ru/software/jira");

        if (code === undefined) {
            
            response.send('you`re not a good man');
            return;
        }

        setBitBucketAccessToken(code, state);
    })

    app.get('/callback_jira', ({query: {code, state}}, res) => {

        res.redirect("https://www.atlassian.com/ru/software/jira");

        if (code === undefined) {
            
            // response.send('you`re not a good man');
            return;
        }

        setJiraAccessToken(code, state);
    })
    
    app.post('/registration', ({query: {email}, headers: {authorization}}, response) => {

        response.sendStatus(200);
        
        // registerUser(userAccessInfo);
    });

    app.get('/get_bitbucket_access_token', ({headers: {authorization}}, response) =>{

        getBitBucketAccessToken(response, authorization);
    });

    app.get('/get_jira_access_token', ({headers: {authorization}}, response) =>{

        getJiraAccessToken(response, authorization);
    });
}