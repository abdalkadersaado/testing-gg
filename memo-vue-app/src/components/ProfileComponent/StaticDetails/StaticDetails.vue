<template>
  <biography-component></biography-component>
  <current-city-component></current-city-component>
  <hometown-component></hometown-component>
  <date-joinning></date-joinning>
</template>

<script>
import BiographyComponent from "./BiographyComponent.vue";
import CurrentCityComponent from "./CurrentCityComponent.vue";
import DateJoinning from "./DateJoinning.vue";
import HometownComponent from "./HometownComponent.vue";

export default {
  components: {
    BiographyComponent,
    CurrentCityComponent,
    HometownComponent,
    DateJoinning,
  },
  data() {
    return {};
  },
};
</script>
<style></style>
