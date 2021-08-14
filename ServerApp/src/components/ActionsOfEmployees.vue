<template>
    <div>
        <Search />
        <Dates />
        <Table />
        <UpdateDatas />
    </div>
</template>

<script>

import Table from './Table/Table.vue'
import Dates from './Ranges/Dates/Dates.vue'
import Search from './Ranges/Search/Search.vue'
import UpdateDatas from './updateDatas/UpdateDatas.vue'

export default {
    components:{
        Table,
        Dates,
        Search,
        UpdateDatas
    }
}
</script>