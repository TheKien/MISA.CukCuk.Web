<template>
  <div class="m-page-size m-flex">
    <div class="page-size-text">{{ pageSize }} bản ghi trên trang</div>
    <div
      class="m-dropdown"
      :class="{
        'm-dropdown-active': showDropdownPageSize,
      }"
    >
      <div
        class="m-icon-arrow"
        @click="showDropdownPageSize = !showDropdownPageSize"
      >
        <div
          class="mi mi-14 mi-arrow-up--black"
          :class="{ 'm-rotate-180': showDropdownPageSize == true }"
        ></div>
      </div>
      <div class="m-dropdown-list">
        <div
          v-for="page in pageSizes"
          :key="page"
          class="m-dropdown-item"
          :class="{
            'm-dropdown-item-active': pageSize == page,
          }"
          @click="changePageSize(page)"
        >
          {{ page }} bản ghi trên trang
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pageSize", "listPageSizes"],
  data() {
    return {
      pageSizes: this.listPageSizes,
      showDropdownPageSize: false,
    };
  },
  methods: {
    changePageSize(pageSize) {
      this.$emit("changePageSize", pageSize);
    },
  },
  watch: {
    pageSize: function () {
      this.$emit("loadData");
      this.showDropdownPageSize = false;
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/component/dropdown.css");

.m-page-size {
  border: 1px solid #babec5;
  position: relative;
}
.m-page-size .page-size-text {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  min-width: 160px;
}
.m-page-size .m-dropdown {
  padding: 0;
}
.m-page-size .m-icon-arrow {
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.m-page-size .m-icon-arrow:hover {
  background: #e0e0e0;
}
.m-page-size .m-icon-arrow div {
  transition: transform 0.15s linear;
}
.m-page-size .m-dropdown.m-dropdown-active {
  border: none;
  background: #e0e0e0;
}
.m-page-size .m-dropdown .m-dropdown-list {
  bottom: 32px;
  top: unset;
  left: -161px;
  width: 192px;
  z-index: 4;
}
.m-page-size .m-dropdown .m-dropdown-list .m-dropdown-item {
  height: 32px;
}
.m-page-size .m-dropdown-item-active {
  color: #fff;
  background-color: #2ca01c;
}
.m-rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.15s linear;
}
</style>