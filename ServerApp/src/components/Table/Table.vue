<template>
    <table className="table">
        <Head />
        <Body />
        </table>
</template>


<script>
import Head from '@/components/Table/Head'
import Body from '@/components/Table/Body'

export default {
    
    components:{
        Head,
        Body
    },
 

}
</script>

<style scoped>

table{
    width: 100%;
    position: absolute;
    top: 150px;
    margin-left: auto;
    margin-right: auto;
    border-collapse: separate; /* allow spacing between cell borders */
    border-spacing: 0 10px;
}


  
</style>