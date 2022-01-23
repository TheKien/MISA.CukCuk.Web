<template>
  <div class="m-paginate">
    <div class="m-paging-left">
      <div class="m-page-bar">
        <!-- Button trang đầu tiên -->
        <div
          class="mi-16 mi-page-first"
          @click="onClickPageFirst()"
          :class="{ 'm-disable': pageIndex == 1 }"
        ></div>
        <!-- Button trang trước -->
        <div
          class="mi-16 mi-page-pre"
          @click="onClickPagePre()"
          :class="{ 'm-disable': pageIndex == 1 }"
        ></div>
        <div class="m-text-paging">|</div>
        <div class="m-text-paging">Trang</div>
        <!-- Input nhập số trang-->
        <div>
          <input
            type="input"
            value="1"
            @blur="onChangePageIndex()"
            v-model="pageNumber"
            class="m-input"
            style="height: 24px; width: 38px"
          />
        </div>
        <div class="m-text-paging" style="min-width: 50px">trên {{ totalPage }}</div>
        <!-- Button trang tiếp theo -->
        <div class="m-text-paging">|</div>
        <div
          class="mi-16 mi-page-next"
          @click="onClickPageNext()"
          :class="{ 'm-disable': pageIndex == totalPage }"
        ></div>
        <!-- Button trang cuối cùng -->
        <div
          class="mi-16 mi-page-last"
          @click="onClickPageLast()"
          :class="{ 'm-disable': pageIndex == totalPage }"
        ></div>
        <div class="m-text-paging">|</div>
        <div class="mi-16 mi-page-refresh" @click="onClickRefresh()"></div>
        <div class="m-text-paging">|</div>
      </div>
      <div class="m-chosse-size m-flex-item-center" :class="{
            'm-chosse-size-active': showDropdownPageSize,
          }">
        <div class="page-size-text">
          {{ pageSize}}
        </div>
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
            <i class="fas fa-sort-down"></i>
          </div>
          <div class="m-dropdown-list">
            <div
              v-for="page in listPageSizes"
              :key="page"
              class="m-dropdown-item"
              :class="{
                'm-dropdown-item-active': pageSize == page,
              }"
              @click="onChangePageSize(page)"
            >
              {{ page }}
            </div>
          </div>
        </div>
      </div>  
    </div>
    <div class="m-paging-right">
      Hiển thị {{ pageIndex * pageSize - pageSize + 1 }} -
      {{
        pageSize * pageIndex > totalRecord ? totalRecord : pageSize * pageIndex
      }}
      trên {{ totalRecord }} kết quả
    </div>
  </div>
</template>

<script>
export default {
  props: ["pageIndex", "pageSize", "totalPage", "totalRecord", "listPageSizes"],
  data() {
    return {
      pageNumber: this.pageIndex,
      showDropdownPageSize: false,
    };
  },
  methods: {
    /**
     * Click nút chuyển đến trang đầu tiên
     * Author: TTKien(21/01/2022)
     */
    onClickPageFirst() {
      this.pageNumber = 1;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Click nút chuyển đến trang tiếp theo
     * Author: TTKien(21/01/2022)
     */
    onClickPagePre() {
      this.pageNumber--;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Click nút chuyển đến trang cuối cùng
     * Author: TTKien(21/01/2022)
     */
    onClickPageLast() {
      this.pageNumber = this.totalPage;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Click nút chuyển đến trang tiếp theo
     * Author: TTKien(21/01/2022)
     */
    onClickPageNext() {
      this.pageNumber++;
      this.onChangePageIndex(this.pageNumber);
    },
    /**
     * Chuyển tới trang khi nhập input
     *  Author: TTKien(21/01/2022)
     */
    onChangePageIndex() {
      if (this.pageNumber > this.totalPage) this.pageNumber = this.totalPage;
      this.$emit("onChangePageIndex", this.pageNumber);
    },
    /**
     * Thay đổi số bản ghi trên 1 trang
     *  Author: TTKien(21/01/2022)
     */
    onChangePageSize(pageSize) {
      this.$emit("onChangePageSize", pageSize);
    },
    /**
     * Nút tải lại trang
     * Author: TTKien(22/01/2022)
     */
    onClickRefresh()
    {
      this.$emit("refresh");
    }
  },
  watch: {
    pageSize() {
      this.pageNumber = 1;
      this.showDropdownPageSize = false;
    },
  },
};
</script>
<style scoped>
@import url("../assets/css/component/dropdown.css");
</style>