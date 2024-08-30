<template>
  <div style="display: flex; margin-bottom: 24px;">
    <div class="autocomplete-wrapper">
      <input
        type="text"
        v-model="search"
        @input="searchByCity"
        class="search"
        placeholder="Search for location"
      />
      <ul class="autocomplete-list">
        <li v-for="searchEl in serchCityList" :key="searchEl.lat" @click="setCity(searchEl)">
          {{ searchEl.name }}
        </li>
      </ul>
    </div>

    <button @click="setCity">search</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default defineComponent({
  name: "search-input",
  setup() {
    return {};
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters(["serchCityList"]),
  },
  methods: {
    ...mapMutations(["deleteAllSearchList"]),
    ...mapActions(["GET_CITY_LIST", "SET_WEATHER"]),
    async searchByCity() {
      if (this.search !== "") {
        await this.GET_CITY_LIST(this.search);
      }
    },
    async setCity(city) {
      await this.SET_WEATHER(city);
      this.deleteAllSearchList();
    },
  },
});
</script>

<style scoped lang="scss">
.search {
  border: unset;
  background: #e9e9e9;
  padding: 0.5em;
}
.search:focus {
  outline: none;
}
button {
  margin-left: 8px;
  border: unset;
  background: rgb(0, 153, 255);
  padding: 0.5em;
  color: #fff;
}
.autocomplete-list {
  list-style: none;
  padding: unset;
  margin: unset;
  text-align: left;
  position: absolute;
  z-index: 1;
  width: 100%;
}
.autocomplete-list li {
  cursor: pointer;
  border: 1px solid #e9e9e9;
  border-top: unset;
  padding: 0.5em;
  background: #e9e9e9;
  color: #000;
}

.autocomplete-wrapper {
  display: inline-block;
  position: relative;
}
</style>
