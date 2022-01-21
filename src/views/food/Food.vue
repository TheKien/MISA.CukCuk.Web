<template>
  <div class="content-food">
    <div class="m-main">
      <!-- CONTENT -->
      <section class="m-content">
        <!-- title page -->
        <div class="m-title">
          <span>Thực đơn</span>
          <div class="m-title-right">
            <button class="m-btn m-btn-icon">
              <i class="mi-14 mi-speaker m-mr-8"></i>
              Phản hồi
            </button>
          </div>
        </div>
        <!-- end title page -->
        <!-- Content main -->
        <div class="m-content-main">
          <div class="m-toolbar">
            <button class="m-btn m-btn-icon" @click="onClickShowModalFood">
              <i class="mi mi-16 mi-new m-mr-5"></i>
              Thêm
            </button>
            <button class="m-btn m-btn-icon">
              <i class="mi mi-16 mi-duplicate m-mr-5"></i>
              Nhân bản
            </button>
            <button class="m-btn m-btn-icon">
              <i class="mi mi-16 mi-update m-mr-5"></i>
              Sửa
            </button>
            <button class="m-btn m-btn-icon">
              <i class="mi mi-16 mi-delete m-mr-5"></i>
              Xóa
            </button>
            <button class="m-btn m-btn-icon">
              <i class="mi mi-16 mi-refresh m-mr-5"></i>
              Nạp
            </button>
          </div>
          <food-grid :foodList="foodList"></food-grid>
        </div>
        <!-- paginate -->
        <div class="m-paginate">
          <div class="m-paging-left">
            <div class="m-page-bar">
              <div
                class="mi-16 mi-page-first"
                @click="pageIndex = 1"
                :class="{ 'm-disable': pageIndex == 1 }"
              ></div>
              <div
                class="mi-16 mi-page-pre"
                @click="pageIndex--"
                :class="{ 'm-disable': pageIndex == 1 }"
              ></div>
              <div class="m-text-paging">|</div>
              <div class="m-text-paging">Trang</div>
              <div>
                <input
                  type="input"
                  value="1"
                  :max="totalPage"
                  v-model="pageIndex"
                  class="m-input"
                  style="height: 24px; width: 38px"
                />
              </div>
              <div class="m-text-paging">trên {{ totalPage }}</div>
              <div class="m-text-paging">|</div>
              <div
                class="mi-16 mi-page-next"
                @click="pageIndex++"
                :class="{ 'm-disable': pageIndex == totalPage }"
              ></div>
              <div
                class="mi-16 mi-page-last"
                @click="pageIndex = totalPage"
                :class="{ 'm-disable': pageIndex == totalPage }"
              ></div>
              <div class="m-text-paging">|</div>
              <div class="mi-16 mi-page-refresh"></div>
              <div class="m-text-paging">|</div>
            </div>
            <div class="m-chosse-size">
              <div class="m-combobox">
                <input type="text" value="50" v-model="pageSize" />
                <button class="m-combobox-btn mi-14 mi-dropdown"></button>
              </div>
            </div>
          </div>
          <div class="m-paging-right">
            Hiển thị {{ pageIndex * pageSize - pageSize + 1 }} -
            {{
              pageSize * pageIndex > totalRecord
                ? totalRecord
                : pageSize * pageIndex
            }}
            trên {{ totalRecord }} kết quả
          </div>
        </div>
        <!-- end paginate -->
        <!-- end content main -->
      </section>
      <!-- END CONTENT -->
    </div>
    <food-detail
    :isShowModal="isShowModal"
    ></food-detail>
  </div>
</template>
<script>
import api from "../../apis/ApiService";
import FoodDetail from './FoodDetail.vue';
import FoodGrid from "./FoodGrid.vue";
// import Filters from "../../common/filters";
export default {
  components: { FoodGrid, FoodDetail },

  data() {
    return {
      /*========================= Controller =========================*/
      /* Tên controller */
      apiRouter: "Foods",
      /*========================= Paging =========================*/
      /* Số bản ghi trên 1 trang */
      pageSize: 50,
      /* Số trang hiện tại */
      pageIndex: 1,
      /* Tổng số bản ghi */
      totalRecord: 0,
      /* Tổng số trang */
      totalPage: 0,
      /* Đối tượng tìm kiếm */
      objFilter: {
        Column: null,
        Operator: 0,
        Value: null,
        ValueType: null,
      },
      /* Danh sách đổi tượng tìm kiếm */
      listObjFilters: [],
      /* Đổi tượng sắp xếp */
      objSort: {
        Column: null,
        SortOrder: 0,
      },
      /*========================= Food =========================*/
      /* Danh sách món ăn */
      foodList: [],
      /* Form món ăn */
      isShowModal: true,
    };
  },
  created() {
    this.GetFoods();
  },

  methods: {
    /**
     * Lấy tất cả dữ liệu
     * Author: TTKien(20/1/2022)
     */
    GetFoods() {
      this.callApiGetPaingFilterSort();
    },
    /*================= Events ================== */
    /**
     * Hiển thị modal
     * Author: TTKien(21/01/2022)
     */
    onClickShowModalFood()
    {
      this.isShowModal = true;
    },
    /**
     * Gọi api tìm kiếm theo từ khoá và phân trang.
     * Author: TTKien(20/1/2022)
     */
    callApiGetPaingFilterSort() {
      var me = this;
      var sort = "";
      var filters = "";
      if (this.objSort.Column == null) sort = "";
      else sort = JSON.stringify(this.objSort);
      filters = JSON.stringify(this.listObjFilters);
      api
        .get(
          `${this.apiRouter}/PagingFilterSort?pageSize=${this.pageSize}&pageIndex=${this.pageIndex}&objectFilters=${filters}&objectSort=${sort}`
        )
        .then((response) => {
          me.foodList = response.data.Data;
          me.totalRecord = response.data.TotalRecord;
          if (response.data) {
            me.totalPage = response.data.TotalPage;
          } else {
            me.totalPage = 1;
            me.totalRecord = 0;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  watch: {
    pageIndex() {
      this.GetFoods();
    },
  },
};
</script>