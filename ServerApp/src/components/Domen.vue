<template>
    <div id='label'>
        <div id="domen">{{getDomen}}</div>
    </div>
</template>

<script>

export default {
    
    computed:{
        getDomen(){
            return this.$store.getters.getDomen;
        }
    }

}
</script>

<style scoped>
#label{
    position: relative;
    width: 100%;
    text-align: center;
}
#domen{
    position: absolute;
    display: flex;
    border: 2px solid rgb(163, 163, 163);
    border-radius: 5px;
}
</style>