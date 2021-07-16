<template>
    <tbody>
        <tr class='body' v-for="(user, index) in getActionsOfEmployees" :key="index">
            <td>
                <img class='image' :src="user.accountAvatar">
            </td>
            <td class='accountName'>{{user.accountName}}</td>
            <td class='numOfComments'>{{user.numOfComments}}</td>
            <td class='numOfCommits'>{{user.numOfCommits}}</td>
            <td class='numOfpullRequests'>{{user.numOfpullRequests}}</td>
        </tr>
    </tbody>
</template>

<script>
export default {
      computed:{
          getActionsOfEmployees(){
            return this.$store.getters.getList
        }
    }
}
</script>

<style>

.body{
  background-color: rgb(245, 245, 245);
  transition: 0.25;
  animation: move 1s;
}

@keyframes move{

  0%{
      transform: translate(100%);
  }
  80%{
      transform: translate(1%);
  }
  100%{
      transform: translate(0%);
  }
}

.body:hover{
  background-color: #3498db;
}

td{
  transition: all 10s ease-in-out;
}
.name{
  width: 23.5%;
}

.jira_comments{
  width: 23.5%;
}

.bitBucket_Commits{
  width: 23.5%;
}

.bitBucket_PullRequests{
  width: 23.5%;
}

.image{
  display: flex;
  width:32px;
  height: 32px;
  margin-left: 4px;
}

.numOfComments {
  text-align: center;
}

.numOfCommits{
  text-align: center;
}

.numOfpullRequests{
  text-align: center;
}

.hide{
  animation: remove 30s;
}

@keyframes remove{

  0%{
      transform: translate(0%);
  }
  2%{
    transform: translate(100%);
  }
  100%{
      transform: translate(1000%);
  }

}
</style>