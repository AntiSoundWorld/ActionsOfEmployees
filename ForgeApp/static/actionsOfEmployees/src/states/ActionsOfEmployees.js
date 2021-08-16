const[actionsOfEmployees, setActionsOfEmplyees] = useState([]);

export function GetActionsOfEmployees(){

    return actionsOfEmployees;
}

export function SetActionsOfEmployees(newActionsOfEmployees){

    actionsOfEmployees(newActionsOfEmployees);
}