<template>
    <div>
        <Search />
        <Dates />
        <Table />
    </div>
</template>

<script>

import Table from './Table/Table.vue'
import Dates from './Ranges/Dates/Dates.vue'
import Search from './Ranges/Search/Search.vue'

export default {
    components:{
        Table,
        Dates,
        Search
    }
}
</script>