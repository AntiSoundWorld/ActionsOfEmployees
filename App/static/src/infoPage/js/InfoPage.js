import { invoke } from "@forge/bridge";
import { useEffect, useState } from "react";
import LoadingScreen from "../../LoadingScreen/js/LoadingScreen";
import RangeDates from "../../Ranges/RangeDates/js/RangeDates";
import Search from "../../Ranges/Search/js/Search";
import { InitializedMyTable } from "../../Tables/IntitializeMyTable";
import { getDates } from "../../Tools/tools";
import './../css/InfoPage.css'

function InfoPage(props){

    const[usersInfo, setUsersInfo] = useState([]);
    const[listOfUsers, setListOfUsers] = useState([]);
    const[search, setSearch] = useState(null);
    const[dates, setDates] = useState(getDates());
    const[table, setTable] = useState(<LoadingScreen />);
    const[body, setBody] = useState(<LoadingScreen />);
    

    useEffect(() => {
        
        if(usersInfo.length == 0){

            let datas = {
                accessToken: props.accessToken,
                dates: dates
            }
    
            invoke('GetInfo', datas).then(promise => {
                setUsersInfo(promise);
            });
        }
    });
    
    useEffect(() => {
        
        setListOfUsers(usersInfo);
       
    }, [usersInfo]);
    
    

    return (
        <div className="infoPage">
            <RangeDates dates={dates} setDates={setDates} search={search} accessToken={props.accessToken} setUsersInfo={setUsersInfo}/>
            <Search usersInfo={usersInfo} setSearch={setSearch} listOfUsers={listOfUsers} setListOfUsers={setListOfUsers}/>
            <InitializedMyTable macket={listOfUsers} body={body}/>
        </div>
    )
}

export default InfoPage;