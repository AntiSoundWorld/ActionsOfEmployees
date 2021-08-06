<template>
    <thead>
        <tr id='head'>
            <th class='ico'></th>
            <th class='name'><span>Name</span></th>
            <th class='jira_comments'>Jira comments</th>
            <th class='bitBucket_Commits'>BitBucket Commits</th>
            <th class='bitBucket_PullRequests'>BitBucket PullRequests</th>
        </tr>
    </thead>
</template>

<script>
export default {
    
}
</script>
<style scope>
    th {
        padding:5px;
        Color:white;
    }
    
    th:first-child{
        border-top-left-radius : 5px;
        border-bottom-left-radius: 5px;
        width: 5%;
    }

    th:last-child{
        border-top-right-radius : 5px;
        border-bottom-right-radius: 5px;
    }

    #head{
        background-color: #3498db;
        animation: laod 5s;
    }

    @keyframes laod{

        0%{
            background-color: #ffffff;

        }
        100%{
            background-color: #3498db;
        }
    }

    th text{
        position: relative;
        left: 30px;
    }
    .jira_comments {
        text-align: center;
    }

    .bitBucket_Commits{
        text-align: center;
    }

    .bitBucket_PullRequests{
        text-align: center;
}

</style>