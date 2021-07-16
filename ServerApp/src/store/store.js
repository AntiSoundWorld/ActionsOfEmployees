import { createApp } from 'vue'
import Vuex from 'vuex'
import authorization from '../state/modules/authorization'
import rangeDates from '../state/modules/rangeDates'
import actionsOfEmployees from '../state/modules/actionsOfEmployees'
import search from '../state/modules/search'

export default new Vuex.Store({
   modules: {
      authorization,
      rangeDates,
      actionsOfEmployees,
      search
   }
});