
export default{
    state:{
        domen: null
    },
    getters:{
        getDomen(state){
            return state.domen;
        } 
    },
    actions:{
       async setDomen({commit}, basicToken){

        console.log('i am here');

            let domen = await fetch('https://actionsofemployees.herokuapp.com/domen', {

                headers:{
                    'Authorization': `Basic ${basicToken}`
                }
            });

            let res = await domen.json();
            
            commit('updateDomen', res);
       }
    },
    mutations:{
        updateDomen(state, domen){
            state.domen = domen;
        }
    }
}