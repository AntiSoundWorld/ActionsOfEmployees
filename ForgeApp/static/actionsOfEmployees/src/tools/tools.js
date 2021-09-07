export default function defaultDates(){
    
    let date = new Date();
    
    let year = date.getFullYear()
    let month = date.getMonth();
    let day = date.getDate();
    
    if(month < 10){
        month =  month + 1;
        month = '0' + month
    }

    if(day < 10){
        day = '0' + day;
    }

    let dates = {
        dates:{
                start: year + '-' + month + '-' + '01',
                end: year + '-' + month + '-' + day
            }

        }


    return dates;
}

export function correctFilter(actionsOfEmployees, search){

    let searchLowCase = removeSpace(search.toLowerCase());

    let exactNames = [];

    let isfullNameExist = false;
    
    actionsOfEmployees.map(actionsOfEmployee => {
        let userLowCase = removeSpace(actionsOfEmployee.user.accountName.toLowerCase());

        if(isfullNameExist === true){
            return null;
        }

        if(actionsOfEmployee.user.accountName === search && isfullNameExist === false){
            exactNames.push(actionsOfEmployee);
            isfullNameExist = true;
            return null;
        }

        let exactContainer = '';
        let aboutContainer = '';
        let i = 0;

        while(i !== actionsOfEmployee.user.accountName.length){

            let j = 0;

            while(j <= search.length){
                
                if(userLowCase[i] === searchLowCase[j] && i === j){

                    exactContainer = exactContainer + userLowCase[i];
                }

                if(userLowCase[i] === searchLowCase[j] && i !== j){

                    aboutContainer = aboutContainer + userLowCase[i];
                }

                j++;
            }

           i++
        }

        if(exactContainer.length === search.length){
            exactNames.push(actionsOfEmployee);
        }
     
    });
    
    return exactNames;
}


export function removeSpace(val){
    if(val.length === 0 ){
        return val;
    }

    let i = 0;
    
    let upgraded = '';
    
    while(i <= val.length){
        
        if(val[i] !== ' ' && val[i] !== undefined){
            upgraded = upgraded + val[i];
        }
        i++;
    }
    
    return upgraded;
}