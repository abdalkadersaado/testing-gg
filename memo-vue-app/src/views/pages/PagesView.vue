<template>
  <div
    dir="auto"
    class="d-flex m-0 justify-content-center"
    style="background-color: #f3f3f3; min-height: 100vh"
  >
    <LeftPageComponent />
    <RightPageComponent />
  </div>
</template>

<script>
import LeftPageComponent from "@/components/PageComponent/LeftPageComponent.vue";
import RightPageComponent from "@/components/PageComponent/RightPageComponent.vue";
export default {
  name: "PageView",

  components: { LeftPageComponent, RightPageComponent },
};
</script>

<style lang="scss" scoped>
.row {
  // padding: 0 !important;
  // margin: 0!important;
}
</style>
