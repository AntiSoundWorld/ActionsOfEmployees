
export default{
    state:{
        dates: defaultDates()
    },
    getters:{
        getDates(state){
            return state.dates;
        }
    },
    actions:{
        showDates(){
            console.log(getDefaultDates);
        }
    },
    mutations:{
        updateDates(state, newDates){
            state.dates = newDates;
        }
    }
};

function defaultDates(){
    let date = new Date();
    
    let year = date.getFullYear()
    let month = date.getMonth();
    
    if(month < 10){
        month =  month + 1;
        month = '0' + month
    }

    let endDay = null;

    if(month === '02' || month === '04' || month === '06' || month === '09' || month === '11'){

        endDay = '30';
    }
    else{
        endDay = '31';
    }
    

    let dates = {
        dates:{
                start: year + '-' + month + '-' + '01',
                end: year + '-' + month + '-' + endDay
            }

        }

    return dates;
}