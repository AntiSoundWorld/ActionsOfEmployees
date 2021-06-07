import {login, registerUser} from "../../public/Database/database.js";
import request from 'request';


export default function routes(app){
    
    app.get("/", function(request, response){
        response.render('registrationForm');
    });

    app.get("/access_bitbucket", function(request, response){
        response.redirect("https://bitbucket.org/site/oauth2/authorize?client_id=gDd2kRzMDDKFM7Pdwg&response_type=code");
    });

    app.post('/authorize', ({headers: {authorization}}, response) => {

        login(response, authorization);
    });

    app.post('/registration', ({query: {email}, headers: {authorization}}, response) => {

        response.sendStatus(200);
        
        app.get('/callback', ({query: {code}}, res) => {
            
            registerUser(email, authorization, code);
            
            if (code === undefined) {
                
                response.send('you`re not a good man');
                return;
            }
    
        })

    });
}

// начинаем прослушивать подключения на 3000 порту