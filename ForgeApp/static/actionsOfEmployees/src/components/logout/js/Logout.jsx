import '../css/Logout.css';

export default function Logout(props){

    function OnClick(){

        props.setIsLogout(true);
    }

    return (
        <button className="logout" onClick={OnClick}>Logout</button>
    )
}

