<template>
    <div>
        <button class='updateDatas'  v-on:click='onSubmit' :disabled="isActive">Update</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    methods:{
        ...mapActions(['getInformation']),
        ...mapGetters(['getDates', 'getCurrentDates']),
        onSubmit(){
            this.getInformation();
        },
       
    },
    computed:{
        isActive(){
            let isDateActual = true;

            let userDateEnd = this.getDates().dates.end;

            let actualDateEnd = this.getCurrentDates().dates.end;

            if(userDateEnd === actualDateEnd){
                isDateActual = false;
            }

            return isDateActual;
        }
    }
}
</script>

<style scoped>
.updateDatas{
    position: absolute;
    top: 161.5px;
    left: 10px;
    border: none;
    background: rgb(2, 183, 255);
    width: 100px;
    height: 25px;
    border-radius: 3px;
}
</style>