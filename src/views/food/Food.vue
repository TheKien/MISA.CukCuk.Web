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
            <button class="m-btn m-btn-icon" @click="onClickAddFood()">
              <i class="mi mi-16 mi-new m-mr-5"></i>
              Thêm
            </button>
            <button class="m-btn m-btn-icon" @click="onClickDuplicateFood()">
              <i class="mi mi-16 mi-duplicate m-mr-5"></i>
              Nhân bản
            </button>
            <button class="m-btn m-btn-icon" @click="onClickUpdateFood()">
              <i class="mi mi-16 mi-update m-mr-5"></i>
              Sửa
            </button>
            <button class="m-btn m-btn-icon" @click="callApiDeleteFood()">
              <i class="mi mi-16 mi-delete m-mr-5"></i>
              Xóa
            </button>
            <button class="m-btn m-btn-icon" @click="getFoods()">
              <i class="mi mi-16 mi-refresh m-mr-5"></i>
              Nạp
            </button>
          </div>
          <food-grid
            :foodList="foodList"
            :foodId="foodId"
            @onClickRowActive="onClickRowActive"
            @onChangeInputValue="onChangeInputValue"
            @onChangeSortObject="onChangeSortObject"
          ></food-grid>
        </div>
        <!-- paginate -->
        <base-pagination
          :pageIndex="pageIndex"
          :pageSize="pageSize"
          :totalRecord="totalRecord"
          :totalPage="totalPage"
          :listPageSizes="listPageSizes"
          @refresh="getFoods"
          @onChangePageIndex="onChangePageIndex"
          @onChangePageSize="onChangePageSize"
          @onChangeSortObject="onChangeSortObject"
        ></base-pagination>
        <!-- end paginate -->
        <!-- end content main -->
      </section>
      <!-- END CONTENT -->
    </div>
    <food-detail
      :isShowModal="isShowModal"
      :food="food"
      :modeBtn="modeBtn"
      @getFoods="getFoods"
      @onClickClose="onClickHideModalFood"
      @resetForm="resetForm"
    ></food-detail>
  </div>
</template>
<script>
import api from "../../apis/ApiService";
import BasePagination from "../../components/BasePagination.vue";
import FoodDetail from "./FoodDetail.vue";
import FoodGrid from "./FoodGrid.vue";
import Const from "../../common/const";

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
      listPageSizes: [25, 50, 100],
      /* Số trang hiện tại */
      pageIndex: 1,
      /* Tổng số bản ghi */
      totalRecord: 0,
      /* Tổng số trang */
      totalPage: 0,
      /* Đối tượng tìm kiếm */
      objFilter: {},
      /* Danh sách đổi tượng tìm kiếm */
      listObjFilters: [],
      /* Đổi tượng sắp xếp */
      objSort: {},
      /*========================= Food =========================*/

      foodId: null,
      /* Danh sách món ăn */
      foodList: [],
      /* Đối tượng món ăn */
      food: {
        FoodId: null,
        FoodCode: null,
        FoodName: null,
        FoodOrder: null,
        SellingPrice: null,
        CostPrice: null,
        Description: null,
        DisplayStatus: true,
        ImageName: null,
        FoodCategoryId: null,
        MenuCategoryId: null,
        UnitId: null,
        UnitName: null,
        MenuCategoryName: null,
        FoodCategoryName: null,
        FoodKitchens: [],
        FoodModifiers: [],
        EditMode: 0,
      },
      /* Form món ăn */
      isShowModal: false,
      modeBtn: 0,
    };
  },

  mounted() {
    this.getFoods();
  },

  methods: {
    /**
     * Lấy tất cả dữ liệu
     * Author: TTKien(20/1/2022)
     */
    getFoods() {
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
      this.getFoods();
    },

    /**
     * Chuyển tới trang khi nhập input
     * Author: TTKien(21/01/2022)
     */
    onChangePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.getFoods();
    },

    /**
     * Chọn 1 đối tượng trong table
     * Author: TTKien(21/01/2022)
     */
    onClickRowActive(foodId) {
      this.foodId = foodId;
    },

    /**
     * Click nut [Thêm] trên trang thực đơn
     * Author: TTKien(22/01/2022)
     */
    onClickAddFood() {
      try {
        this.resetForm();
        this.modeBtn = Const.modeBtn.Add;
        setTimeout(() => {
          this.onClickShowModalFood();
        }, 10);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Click nut [Sửa] trên trang thực đơn
     * Author: TTKien(22/01/2022)
     */
    onClickUpdateFood() {
      try {
        // Api getbyid
        this.modeBtn = Const.modeBtn.Update;
        this.callApiGetFoodById();
        setTimeout(() => {
          this.onClickShowModalFood();
        }, 200);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Click nut [Nhân bản] trên trang thực đơn
     * Author: TTKien(23/01/2022)
     */
    onClickDuplicateFood() {
      try {
        // Api getbyid
        this.modeBtn = Const.modeBtn.Add;
        this.callApiGetFoodById();
        setTimeout(() => {
          this.onClickShowModalFood();
        }, 200);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thay đổi column sắp xếp
     * Author: TTKien(22/01/2022)
     */
    onChangeSortObject(objSort) {
      this.objSort = objSort;
      this.getFoods();
    },
    /**
     * Tìm kiếm
     * Author: TTKien(23/01/2022)
     */
    onChangeInputValue(objFilter) {
      try {
        let me = this;
        // Nếu obj có giá trị rỗng
        if (objFilter.Value == "" || objFilter.Value == null) {
          // Neu ds loc khac rong
          if (me.listObjFilters.length > 0) {
            // kiem tra xem co trung obj khong
            for (let i = 0; i < me.listObjFilters.length; i++) {
              const element = me.listObjFilters[i];
              // neu trung thi xoa khoi ds loc
              if (element.Column == objFilter.Column) {
                me.listObjFilters.splice(i, 1);
              }
            }
          }
        }
        // Neu obj co gia tri
        else {
          // Neu ds loc rong
          if (me.listObjFilters.length == 0) me.listObjFilters.push(objFilter);
          else {
            // Neu ds loc khac rong
            // kiem tra trung
            let i = 0;
            for (let i = 0; i < me.listObjFilters.length; i++) {
              const element = me.listObjFilters[i];
              // neu trung thi sua
              if (element.Column == objFilter.Column) {
                element.Value = objFilter.Value;
                element.Operator = objFilter.Operator;
                i = i + 1;
              }
            }
            //Neu obj khong co trong ds loc
            if (i < 1) {
              me.listObjFilters.push(objFilter);
            }
          }
        }
        me.getFoods();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Reset lại form food detail
     * Author(22/01/2022)
     */
    resetForm() {
      this.food = {
        FoodId: null,
        FoodCode: null,
        FoodName: null,
        FoodOrder: null,
        SellingPrice: null,
        CostPrice: null,
        Description: null,
        DisplayStatus: false,
        ImageName: null,
        FoodCategoryId: null,
        MenuCategoryId: null,
        UnitId: null,
        UnitName: null,
        MenuCategoryName: null,
        FoodCategoryName: null,
        FoodKitchens: [],
        FoodModifiers: [],
        EditMode: 0,
      };
    },
    /*================= Api ================== */
    /**
     * Call api lấy món ăn theo id
     * Author: TTKien(21/01/2022)
     */
    callApiGetFoodById() {
      const me = this;
      api
        .getId(me.apiRouter, me.foodId)
        .then((response) => {
          me.food = response.data;
          //
          let foodKitchens = [];
          for (const kitchenId in me.food.FoodKitchens) {
            const element = me.food.FoodKitchens[kitchenId].KitchenId;
            foodKitchens.push(element);
          }
          me.food.FoodKitchens = foodKitchens;
          //
          // let foodModifiers = [];
          // for (const fm in me.food.FoodModifiers) {
          //   const element = me.food.FoodModifiers[fm];
          //   let foodModifer = {
          //     ModifierId: element.ModifierId,
          //     AdditionalCharge: element.AdditionalCharge,
          //   };
          //   foodModifiers.push(foodModifer);
          // }
          // me.food.FoodModifiers = foodModifiers;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Gọi api tìm kiếm theo từ khoá và phân trang.
     * Author: TTKien(20/1/2022)
     */
    callApiGetPaingFilterSort() {
      try {
        let me = this;
        let sort = "";
        let filters = "";
        if (this.objSort.Column == null) sort = "";
        else sort = JSON.stringify(this.objSort);
        filters = JSON.stringify(this.listObjFilters);
        api
          .get(
            `${this.apiRouter}/PagingFilterSort?pageSize=${this.pageSize}&pageIndex=${this.pageIndex}&objectFilters=${filters}&objectSort=${sort}`
          )
          .then((response) => {
            me.foodList = response.data.Data;
            me.foodId = this.foodList[0].FoodId;
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
      } catch (error) {
        console.log(error);
      }
    },

    callApiDeleteFood() {
      api
        .delete(this.apiRouter, this.foodId)
        .then((response) => {
          console.log(response);
          alert("Xoa ok");
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        this.getFoods();
      }, 10);
    },
  },

  watch: {
    pageIndex() {
      this.getFoods();
    },

    pageSize() {
      this.getFoods();
    },
  },
};
</script>