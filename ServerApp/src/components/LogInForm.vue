<template>
    <div class="main-form">

          <div class="label">
            <h1>Action Of Emplyees</h1>
              <text>Login</text>
          </div>
          
          <form class="box" v-on:submit="onSubmit">

            <div class="inputs">
                <i class="fas fa-user"></i>
                <input id="email" type="email" name="" placeholder="email">
            </div>

            <div class="inputs">
                <i class="fas fa-lock"></i>
                <input id="password" type="password" name="" placeholder="Password">
            </div>

            <a class="registration" href="https://actionsofemployees.herokuapp.com/">registration</a>

            <input class="reg-button" type="submit">

          </form>
        </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    methods:{
        ...mapActions(['isAccountExist']),
        async onSubmit(event){
            event.preventDefault();
            
            const basicToken = btoa(`${event.target.email.value}:${event.target.password.value}`);

            this.isAccountExist(basicToken);
        },
    },
}
</script>

<style scoped>
.box{
    position: absolute;
    width: 300px;
    height: 400px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 15px;
}
.label{
    position: absolute;
    top: 18%;
    left: 50%;
    width: 350px;
    height: 100px;
    transform: translate(-50%, -50%);
    display: block;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.label h1{
    width: 100%;
    margin: 5px;
    color: #025388;
}

.label text {
    position: absolute;
    right: 3%;
    color: #025388;
}
.inputs{
    display: grid;
    border: 2px solid #3498db;
    margin:25px auto;
    width: 250px;
    height: 45px;
    display: grid;
    grid-template-columns: 5% 95%;

    border-radius: 55px;
}

input[type = 'email'], input[type = 'password']{
    display: block;
    margin: 2px auto;
    background: none;
    height: 39px;
    width: 200px;
    border: none;
    outline: none;
    border-radius: 24px;
}

.inputs i{
    margin: auto 9px;
    color: #0580d3;
}

.inputs:hover{
    width: 250px;
    border-color: #770294;
}

.registration{
    position: relative;
    top: -25px;
    right: -80px;
}

.reg-button{
    display: block;
    margin: 2px auto;
    background-color: #3498db;
    height: 49px;
    width: 125px;
    outline: none;
    border: none;
    border-radius: 24px;
    border-color: #3498db;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.15s;
    color: white;
    font-weight: 600;
}

.reg-button:hover{
    width: 135px;
    background-color: #3498db;
    border: none;
}

input:-webkit-autofill { 
    -webkit-background-clip: text;
}
</style>>
