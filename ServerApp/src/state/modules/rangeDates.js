
export default{
    state: {
        dates: defaultDates(),
        currentDates: defaultDates()
    },
    getters: {
        getDates(state){
            return state.dates;
        },
        getCurrentDates(state){
            return state.currentDates;
        }
    },
    actions: {
        showDates(){
            console.log(getDefaultDates);
        }
    },
    mutations: {
        updateDates(state, newDates){
            state.dates = newDates;
        }
    }
};

function defaultDates(){
    
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