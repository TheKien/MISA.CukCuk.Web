<template>
  <div
    class="m-popup-box"
    :class="{ 'm-popup-show': isShowPopup && status == popup.Status }"
  >
    <div class="m-popup">
      <div class="m-popup-header">CUKCUK - Quản lý nhà hàng</div>
      <div class="m-popup-content">
        <div class="m-flex">
          <div class="mi mi-32 mi-question"></div>
          <!-- Messenger -->
          <div class="m-messenger">{{ popup.Title }}</div>
        </div>
      </div>
      <div class="m-popup-footer">
        <div class="m-flex-justify-end">
          <!-- Button comfirm -->
          <button
            class="m-btn m-btn-success"
            ref="btnYes"
            @click="onClickYes()"
          >
            Có
          </button>
          <button class="m-btn m-btn-gray m-mr-10" @click="onClickNo()">
            Không
          </button>
          <!-- Button close -->
          <button
            class="m-btn m-btn-gray"
            v-show="showBtnCancel"
            @click="onClickCancel()"
          >
            Huỷ bỏ
          </button>
          <!-- Button close -->
        </div>
      </div>
    </div>
    <div class="m-popup-background"></div>
  </div>
</template>

<script>
// import { eventBus } from "../main";
import Resourse from "../common/resource";
export default {
  data() {
    return {
      status: Resourse.PopUp.Status.Question,
    };
  },

  props: ["isShowPopup", "popup", "showBtnCancel"],

  methods: {
    /**
     * Click nút [Không]
     * Author: TTKien (24/01/2021)
     */
    onClickNo() {
      this.$emit("onClickNo");
      this.onClickCancel();
    },
    /**
     * Click nút [Có]
     * Author: TTKien (24/01/2021)
     */
    onClickYes() {
      this.$emit("onClickYes",0);
      this.onClickCancel();
    },
    /**
     * Click nút [Huỷ]
     */
    onClickCancel() {
      this.$emit("onClickCancel");
    },
  },
  watch: {
    isShowPopup() {
      setTimeout(() => {
        this.$refs.btnYes.focus();
      }, 10);
    },
  },
};
</script>