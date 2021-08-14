
export default {
    state: {
        actionsOfEmployees: []
    },
    getters: {
        getActionsOfEmployees(state){
            return state.actionsOfEmployees;
        }
    },
    mutations: {
        updateActionsOfEmployees(state, newActionsOfEmployeess){

            state.actionsOfEmployees = newActionsOfEmployeess;
        }
    },
    actions: {
        async getInformation({commit, dispatch, getters}){

            commit('updateList', [])

            dispatch('collectInformation', getters.getDates.dates);

            setTimeout(() => {dispatch('getActionsOfEmployees'), dispatch, commit}, 5000)
        },
        async collectInformation({dispatch, getters}){

            collectInformation(getters.getDates);
        },
        async getActionsOfEmployees({getters, dispatch, commit}){
            
            getActionsOfEmployees(dispatch, commit);
        }
    }
}

async function collectInformation(dates){

    fetch(`https://actionsofemployees.herokuapp.com/collect_information`, {

        method: "POST",
        headers:{
            'Authorization': `Basic ${localStorage.getItem('basicToken')}`,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(dates)
    })
}

async function getActionsOfEmployees(dispatch, commit){

    const res = await fetch(`https://actionsofemployees.herokuapp.com/get_actions_of_employees`, {
        headers:{
            'Authorization': `Basic ${localStorage.getItem('basicToken')}`,
        },
    })

    if(res.status === 204){
        setTimeout(() => {
            dispatch('getActionsOfEmployees')
        }, 5000);
        return;
    }

    const response = await res.json();

    await commit('updateActionsOfEmployees', JSON.parse(response))
    await commit('updateList', JSON.parse(response));
}