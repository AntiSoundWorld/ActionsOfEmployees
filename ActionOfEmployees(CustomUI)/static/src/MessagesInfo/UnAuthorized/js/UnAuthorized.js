import LogInForm from "../../../LabelLog-in/LogInForm/jss/LogInForm";

import './../css/UnAuthorzed.css'

function UnAuthorized(props){

    const onSubmit = async () => {

        props.setLabel(<LogInForm setUserBasicToken={props.setUserBasicToken} />);
    }

    return(
        <form id='message'>
            <text >
                <h1 id='NotAuthorized'>Not Authorized</h1>
            </text>
            <p></p>
            <button id='button' onClick={onSubmit}>try again</button>
        </form>
    )
}



export default UnAuthorized;