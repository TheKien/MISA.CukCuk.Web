<template>
  <div class="m-popup-box" :class="{ 'm-popup-show': isShowPopup }">
    <div class="m-popup">
      <div class="m-popup-content">
        <div class="m-flex">
          <div
            class="mi mi-48 mi-exclamation-warning-48"
            v-if="popup.Status == status.Warning"
          ></div>
          <div
            class="mi mi-48 mi-exclamation-question-48"
            v-if="popup.Status == status.Question"
          ></div>
          <!-- Messenger -->
          <div class="m-messenger">{{ popup.Title }}</div>
        </div>
        <div class="m-mess-line"></div>
      </div>
      <div class="m-popup-bottom">
        <div v-show="popup.Status == status.Warning" class="m-flex-justify-end">
          <!-- Button close -->
          <button class="m-btn m-btn-success" @click="onClickClose()">
            Đồng ý
          </button>
        </div>
        <div v-if="popup.Status == status.Question" class="m-flex-justify-end">
          <!-- Button comfirm -->
          <button class="m-btn m-btn-success" @click="onClickYes()">Có</button>
          <button class="m-btn m-btn-gray m-mr-10" @click="onClickNot()">
            Không
          </button>
          <!-- Button close -->
          <button class="m-btn m-btn-gray" @click="onClickClose()">Huỷ</button>
          <!-- Button close -->
        </div>
      </div>
    </div>
    <div class="m-popup-background"></div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import Resourse from "../common/resource";
export default {
  data() {
    return {
      icon: "",
      status: {
        Question: Resourse.PopUp.Status.Question,
        Warning: Resourse.PopUp.Status.Warning,
      },
    };
  },

  props: ["isShowPopup", "popup"],

  methods: {
    /**
     * If click OK, call function in father-component
     * Author: TTKien (12/12/2021)
     */
    onClickComfirm() {
      if (this.popup.Mode == 0) {
        this.$emit("onClickDelete");
      } else {
        this.$emit("onClickDeleteMutilple");
      }
    },

    /**
     * If click NOT, close the popup
     * Author: TTKien (12/12/2021)
     */
    onClickClose() {
      this.$emit("onClickClosePopup");
    },
    /**
     * If click NOT, close the popup question
     * Author: TTKien (12/12/2021)
     */
    onClickNot() {
      this.$emit("onClickClosePopup");
      // Call funciton close modal from global
      eventBus.$emit("onClickClose");
    },
    /**
     * If click YES, close the popup question
     * Author: TTKien (12/12/2021)
     */
    onClickYes() {
      this.$emit("onClickClosePopup");
      // Call funciton submit form modal from global
      eventBus.$emit("onClickSubmit", 0);
    },
  },
};
</script>