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
        <base-pagination
          :pageIndex="pageIndex"
          :pageSize="pageSize"
          :totalRecord="totalRecord"
          :totalPage="totalPage"
          :listPageSizes="listPageSizes"
          @onChangePageIndex="onChangePageIndex"
          @onChangePageSize="onChangePageSize"
        ></base-pagination>
        <!-- end paginate -->
        <!-- end content main -->
      </section>
      <!-- END CONTENT -->
    </div>
    <food-detail
      :isShowModal="isShowModal"
      @onClickClose="onClickHideModalFood"
    ></food-detail>
  </div>
</template>
<script>
import api from "../../apis/ApiService";
import BasePagination from "../../components/BasePagination.vue";
import FoodDetail from "./FoodDetail.vue";
import FoodGrid from "./FoodGrid.vue";
// import Filters from "../../common/filters";
export default {
  components: { FoodGrid, FoodDetail, BasePagination },

  data() {
    return {
      /*========================= Controller =========================*/
      /* Tên controller */
      apiRouter: "Foods",
      /*========================= Paging =========================*/
      /* Số bản ghi trên 1 trang */
      pageSize: 50,
      listPageSizes:[25,50,100],
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
      /* Đối tượng món ăn */
      food: {
        FoodId: null,
        FoodCode: null,
        FoodName: null,
        FoodOrder: null,
        SellingPrice: null,
        CostPrice: null,
        Description: null,
        ImageId: null,
        FoodCategoryId: null,
        MenuCategoryId: null,
        UnitId: null,
        DisplayStatus: null,
        FoodModifer: [],
        FoodKitchen: [],
      },
      /* Danh sách món ăn */
      foodList: [],
      /* Form món ăn */
      isShowModal: false,
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
    onClickShowModalFood() {
      this.isShowModal = true;
    },
    /**
     * Ẩn modal
     * Author: TTKien(21/01/2022)
     */
    onClickHideModalFood() {
      this.isShowModal = false;
    },
    /**
     * Chuyển tới trang khi nhập input
     *  Author: TTKien(21/01/2022)
     */
    onChangePageIndex(pageIndex) {
      this.pageIndex = pageIndex;
      this.GetFoods();
    },
      /**
     * Chuyển tới trang khi nhập input
     *  Author: TTKien(21/01/2022)
     */
    onChangePageSize(pageSize) {
      this.pageSize = pageSize;
      this.GetFoods();
    },
    /*================= Events ================== */
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

    pageSize() {
      this.GetFoods();
    },
  },
};
</script>