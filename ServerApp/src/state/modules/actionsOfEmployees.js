
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

            dispatch('collectInformation')
            setTimeout(() =>{dispatch('getActionsOfEmployees')}, 5000)
        },
        async collectInformation({getters}){
            fetch(`https://actionsofemployees.herokuapp.com/collect_information`, {
                method: "POST",
                headers:{
                    'Authorization': `Basic ${localStorage.getItem('basicToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getters.getDates)
            })
        },
        async getActionsOfEmployees({dispatch, commit}){
           
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
            await commit('updateList', JSON.parse(response))
        }
    }
}