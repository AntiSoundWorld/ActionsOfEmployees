<template>
        <input id="searchEmployee" label="Search Employee" name="name" placeholder='Search' autocomplete="off" @input="search" />
</template>



<script>
    import {mapActions} from 'vuex'
export default {
    methods:{
        ...mapActions(['searchEmployees']),
        search(event){
            this.searchEmployees(event.target.value)
        },
    },
}

</script>
<style scoped>
#searchEmployee{
  width: 250px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 14px;
  border: 2px solid rgb(223, 225, 230);
  box-shadow: none;
  background-color: rgb(255, 255, 255);
  color: rgb(107, 119, 140);
  outline: none;
  animation: load 5s;
}

@keyframes load{

  0%{
    width: 10px;
    
  }
  100%{
      width: 250px;
  }
}

#search-button{
  display: none;
}

#searchForm{
  position: fixed;
  left: 0px;
  top:  50px;
}


</style>