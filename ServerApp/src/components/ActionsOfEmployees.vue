<template>
    <div>
        <Domen />
        <Search />
        <Dates />
        <Table />
    </div>
</template>

<script>

import Table from './Table/Table.vue'
import Dates from './Ranges/Dates/Dates.vue'
import Search from './Ranges/Search/Search.vue'
import Domen from './Domen.vue'

export default {
    
    components:{
        // Domen,
        Table,
        Dates,
        Search,
    }
}
</script>