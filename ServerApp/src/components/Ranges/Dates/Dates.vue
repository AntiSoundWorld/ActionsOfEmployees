<template>
    <form id='rangeForm' v-on:submit="onSubmitRange">
        <input id="start" type='date' name="start" label="Start Date" :value="getDates.dates.start"/>
        <p></p>
        <input id="end" type='date' name="end" label="End Date" :value="getDates.dates.end" />
        <p></p>
        <button id='range-button'>range</button>
    </form>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';

export default {
    methods:{
        ...mapMutations(['updateDates']),
        ...mapActions(['getInformation']),
        onSubmitRange(event){
            event.preventDefault();

            const dates = {
                    dates:{
                        start: event.target.start.value,
                        end: event.target.end.value
                    }
            }
            this.updateDates(dates);
            this.getInformation();
        },
      
    },
    computed: {
        getDates(){
            return this.$store.getters.getDates
        }
    }
}
</script>

<style>
#rangeForm{
    position: absolute;
    top: 0;
    right: 0;
}

#start{
    padding: 5px 10px;
    margin: 2px 0;
    display: inline-block;
    border-top:none;
    border-left:none;
    border-right:none;
    box-sizing: border-box;
    border-color: #acacacf0;
    outline: none;
    animation:  loads 5s;

}

#end{
    padding: 5px 10px;
    margin: 2px 0;
    display: inline-block;
    border-top:none;
    border-left:none;
    border-right:none;
    border-color: #acacacf0;
    box-sizing: border-box;
    outline: none;
    animation:  loads 5s;
}

#range-button{
    box-sizing: content-box;
    padding: 5px 10px;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #35b947;
    border: none;
    transition: 0.5s;
    text-transform: uppercase;
    color: white;
    animation:  loads 5s;
}

@keyframes loads{
    0%{
        width: 0%;
      
    }
    100%{
        width: 100%;
    }
}

#range-button:hover{
    width: 100%;
    background-color: #3fc250;
}


</style>