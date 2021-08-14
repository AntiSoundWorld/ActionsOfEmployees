import './../css/Page.css'

function Page(){

    return(
        <div>
            <iframe id="login" src="https://actionofemployeesapp.herokuapp.com/" frameBorder="0" sandbox="
            allow-popups
            allow-scripts
            allow-modals
            allow-forms
            allow-same-origin
            allow-top-navigation-by-user-activation
            allow-top-navigation
            allow-popups-to-escape-sandbox
            ">
            </iframe>
        </div>
        // <iframe id="login" src="https://11d4e69cd526.ngrok.io" frameBorder="0"></iframe>
    )
}

export default Page;