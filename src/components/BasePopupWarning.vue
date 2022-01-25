<template>
  <div class="m-popup-box" :class="{ 'm-popup-show': isShowPopup && status == popup.Status }">
  <!-- <div class="m-popup-box" :class="{ 'm-popup-show': true }"> -->
    <div class="m-popup">
      <div class="m-popup-header">CUKCUK - Quản lý nhà hàng</div>
      <div class="m-popup-content m-flex">
        <div class="mi mi-32 mi-error"></div>
        <!-- Messenger -->
        <div class="m-messenger">{{ popup.Title }}</div>
      </div>
      <div class="m-popup-footer">
        <div class="m-flex-justify-end">
          <!-- Button close -->
          <button class="m-btn" ref="btnClose" @click="onClickClose()">Đồng ý</button>
        </div>
      </div>
    </div>
    <div class="m-popup-background"></div>
  </div>
</template>

<script>
import Resource from "../common/resource";
export default {
  data() {
    return {
      status: Resource.PopUp.Status.Warning,
    };
  },

  props: ["isShowPopup", "popup"],

  methods: {
    /**
     * Click nút [Đồng Ý]
     * Author: TTKien (22/01/2021)
     */
    onClickClose() {
      this.$emit("onClickClosePopup");
    },
  },
};
</script>