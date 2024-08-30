<template>
  <div class="history-list glass-effect">
    <template v-if="historyList.length">
      <history-item
        v-for="el in historyList"
        :key="el.id"
        :history="el"
        @click="setToCurrentWeather(el)"
      />
    </template>
    <div v-else>Where is no history yet</div> 
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import HistoryItem from "./HistoryItem.vue";

export default defineComponent({
  name: "history-list",
  components: { HistoryItem },
  props: {},

  setup() {
    return {};
  },
  computed: {
    ...mapGetters(["historyList"]),
  },
  methods: {
    ...mapMutations(["setCurrentWeather"]),
    async setToCurrentWeather(cityWeather) {
      await this.setCurrentWeather(cityWeather);
    },
  },
});
</script>

<style scoped lang="scss">
.history-list {
  height: 300px;
  width: 400px;
}
</style>
