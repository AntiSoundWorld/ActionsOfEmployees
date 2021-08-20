<template>
    <div>
        <Search />
        <Dates />
        <Table />
        <UpdateDatas />
        <Sprint />
    </div>
</template>

<script>

import Table from './Table/Table.vue'
import Dates from './Ranges/Dates/Dates.vue'
import Search from './Ranges/Search/Search.vue'
import UpdateDatas from './updateDatas/UpdateDatas.vue'
import Sprint from './Sprint.vue'

export default {
    components:{
        Sprint,
        Table,
        Dates,
        Search,
        UpdateDatas,
        Sprint
    }
}
</script>