<template>
  <div class="history-item">
    <img :src="weaterIcon" alt="" width="25px" height="25px" />
    <span>{{ history.name }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "history-item",
  props: {
    history: { type: Object, default: () => ({}) },
  },
  setup() {
    return {};
  },
  computed: {
    weaterIcon() {
      return `https://openweathermap.org/img/wn/${this.history?.weather?.[0]?.icon}.png`;
    },
  },
});
</script>

<style scoped lang="scss">
.history-item {
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
}

.history-item:hover:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.history-item:hover:nth-child(5) {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.history-item:hover {
  cursor: pointer;
  background-color: rgb(0, 187, 255);
}
</style>
