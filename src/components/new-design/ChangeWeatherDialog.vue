<template>
  <div v-if="modelValue" class="dialog-overlay" @click.self="close">
    <div class="dialog-content">
      <header class="dialog-header">
        <h3>{{ title }}</h3>
        <button class="dialog-close" @click="close">&times;</button>
      </header>
      <div class="dialog-body">
        <search-input />
        <div class="input-list">History</div>
        <ul class="history-list">
          <li
            v-for="history in historyList"
            :key="history.id"
            @click="setCurrentWeather(history)"
          >
            {{ history.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import SearchInput from "../SearchInput.vue";
import { useStore } from "vuex";
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Dialog",
  },
});

const store = useStore();
const emit = defineEmits(["update:modelValue"]);
const historyList = computed(() => {
  return store.getters.historyList;
});

function setCurrentWeather(historyEl) {
  store.commit("setCurrentWeather", historyEl);
}
function close() {
  emit("update:modelValue", false);
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  color: black;
  border-radius: 8px;
  min-width: 400px;
  min-height: 600px;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.dialog-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.dialog-body {
  padding: 0.5rem 0;
}

.dialog-footer {
  margin-top: 1rem;
  text-align: right;
}

.input-list {
  text-align: left;
  font-size: 24px;
  font-weight: 600;
  margin-top: 14px;
}

.history-list {
  list-style: none;
  padding: unset;
  margin: unset;
}

.history-list li {
  text-align: left;
  padding: 12px 0px;
  cursor: pointer;
}

.history-list li:hover {
  background-color: #222831;
  color: white;
}
</style>
