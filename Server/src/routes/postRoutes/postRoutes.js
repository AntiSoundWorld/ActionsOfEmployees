import authorize from "../../../public/Database/authorize.js";

export default function getRoutes(app){

    app.post('/authorize', ({headers: {authorization}}, response) => {
        authorize(response, authorization);
    });
}