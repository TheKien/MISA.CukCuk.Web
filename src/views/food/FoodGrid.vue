<template>
  <div class="m-content-table">
    <div class="m-table">
      <!-- thead -->
      <div class="m-table-thead m-text-left">
        <div class="m-table-th" style="min-width: 159px">
          <div class="m-th-name m-flex-content-center">Loại Món</div>
          <div class="m-filter">
            <v-select
              :options="foodCategorys"
              label="FoodCategoryName"
            ></v-select>
          </div>
        </div>
        <div class="m-table-th" style="min-width: 179px">
          <div
            class="m-th-name m-flex-content-center"
            @click="onChangeSortObject(columnNames.FoodCode)"
          >
            <div>Mã món</div>
            <div
              class="mi mi-16 mi-sort-asc"
              v-show="
                sortSubmitted && sortOrder && columnName == columnNames.FoodCode
              "
            ></div>
            <div
              class="mi mi-16 mi-sort-desc"
              v-show="
                sortSubmitted &&
                !sortOrder &&
                columnName == columnNames.FoodCode
              "
            ></div>
          </div>
          <base-input-filter
            :column="columnNames.FoodCode"
            :valueType="'String'"
            @onChangeInputValue="onChangeInputValue"
          ></base-input-filter>
        </div>
        <div class="m-table-th" style="min-width: 149px">
          <div
            class="m-th-name m-flex-content-center"
            @click="onChangeSortObject(columnNames.FoodName)"
          >
            <div>Tên món</div>
            <div
              class="mi mi-16 mi-sort-asc"
              v-show="
                sortSubmitted && sortOrder && columnName == columnNames.FoodName
              "
            ></div>
            <div
              class="mi mi-16 mi-sort-desc"
              v-show="
                sortSubmitted &&
                !sortOrder &&
                columnName == columnNames.FoodName
              "
            ></div>
          </div>
          <base-input-filter
            :column="columnNames.FoodName"
            :valueType="'String'"
            @onChangeInputValue="onChangeInputValue"
          ></base-input-filter>
        </div>
        <div class="m-table-th" style="min-width: 149px">
          <div
            class="m-th-name m-flex-content-center"
            @click="onChangeSortObject(columnNames.MenuCategoryName)"
          >
            <div>Nhóm thực đơn</div>
            <div
              class="mi mi-16 mi-sort-asc"
              v-show="
                sortSubmitted &&
                sortOrder &&
                columnName == columnNames.MenuCategoryName
              "
            ></div>
            <div
              class="mi mi-16 mi-sort-desc"
              v-show="
                sortSubmitted &&
                !sortOrder &&
                columnName == columnNames.MenuCategoryName
              "
            ></div>
          </div>
          <base-input-filter
            :column="columnNames.MenuCategoryName"
            :valueType="'String'"
            @onChangeInputValue="onChangeInputValue"
          ></base-input-filter>
        </div>
        <div class="m-table-th" style="min-width: 89px">
          <div
            class="m-th-name m-flex-content-center"
            @click="onChangeSortObject(columnNames.UnitName)"
          >
            <div>Đơn vị tính</div>
            <div
              class="mi mi-16 mi-sort-asc"
              v-show="
                sortSubmitted && sortOrder && columnName == columnNames.UnitName
              "
            ></div>
            <div
              class="mi mi-16 mi-sort-desc"
              v-show="
                sortSubmitted &&
                !sortOrder &&
                columnName == columnNames.UnitName
              "
            ></div>
          </div>
          <base-input-filter
            :column="columnNames.UnitName"
            :valueType="'String'"
            @onChangeInputValue="onChangeInputValue"
          ></base-input-filter>
        </div>
        <div class="m-table-th" style="min-width: 119px">
          <div
            class="m-th-name m-flex-content-center"
            @click="onChangeSortObject(columnNames.SellingPrice)"
          >
            <div>Giá bán</div>
            <div
              class="mi mi-16 mi-sort-asc"
              v-show="
                sortSubmitted &&
                sortOrder &&
                columnName == columnNames.SellingPrice
              "
            ></div>
            <div
              class="mi mi-16 mi-sort-desc"
              v-show="
                sortSubmitted &&
                !sortOrder &&
                columnName == columnNames.SellingPrice
              "
            ></div>
          </div>
          <base-input-filter
            :column="columnNames.SellingPrice"
            :valueType="'Int32'"
            @onChangeInputValue="onChangeInputValue"
          ></base-input-filter>
        </div>
        <div class="m-table-th" style="min-width: 149px">
          <div class="m-th-name m-flex-content-center">
            Thay đổi theo thời giá
          </div>
          <div class="m-filter">
            <v-select :options="options" label="Text"></v-select>
          </div>
        </div>
        <div class="m-table-th" style="min-width: 149px">
          <div class="m-th-name m-flex-content-center">
            Điều chỉnh giá tự do
          </div>
          <div class="m-filter">
            <v-select :options="options" label="Text"></v-select>
          </div>
        </div>
        <div class="m-table-th" style="min-width: 139px">
          <div class="m-th-name m-flex-content-center">Định lượng NVL</div>
          <div class="m-filter">
            <v-select :options="options" label="Text"></v-select>
          </div>
        </div>
        <div class="m-table-th" style="min-width: 149px">
          <div
            class="m-th-name m-flex-content-center"
            @click="onChangeSortObject(columnNames.DisplayStatus)"
          >
            <div>Hiển thị trên thực đơn</div>
            <div
              class="mi mi-16 mi-sort-asc"
              v-show="
                sortSubmitted &&
                sortOrder &&
                columnName == columnNames.DisplayStatus
              "
            ></div>
            <div
              class="mi mi-16 mi-sort-desc"
              v-show="
                sortSubmitted &&
                !sortOrder &&
                columnName == columnNames.DisplayStatus
              "
            ></div>
          </div>
          <div class="m-filter">
            <v-select
              :options="options"
              :reduce="(Text) => Text.Value"
              v-model="cbxDisplayStatus"
              label="Text"
              @input="
                onChangeCbxValue(columnNames.DisplayStatus, cbxDisplayStatus)
              "
            ></v-select>
          </div>
        </div>
        <div class="m-table-th" style="min-width: 109px">
          <div class="m-th-name m-flex-content-center">Ngừng bán</div>
          <div class="m-filter">
            <v-select :options="options" label="Text"></v-select>
          </div>
        </div>
      </div>
      <!-- End thead -->

      <!-- tbody -->
      <div class="m-table-tbody">
        <!-- Loading -->
        <div class="m-loading-table" v-show="loading">
          <div class="m-loading-content">
            <vue-loading
              type="spiningDubbles"
              color="#3a3a3a"
              :size="{ width: '18px', height: '18px' }"
            ></vue-loading>
            <div class="m-loading-title">Đang lấy dữ liệu...</div>
          </div>
        </div>
        <!-- End loading -->
        <div
          class="m-table-tr"
          v-show="!loading"
          v-for="f in foodList"
          :key="f.FoodId"
          :class="{ 'row-active': f.FoodId == foodId }"
          @click="onClickRowActive(f.FoodId)"
          @dblclick="ondblclickUpdateFood()"
        >
          <div
            class="m-table-td"
            style="min-width: 159px"
            :title="f.FoodCategoryName"
          >
            {{ f.FoodCategoryName }}
          </div>
          <div class="m-table-td" style="min-width: 179px" :title="f.FoodCode">
            {{ f.FoodCode }}
          </div>
          <div class="m-table-td" style="min-width: 149px" :title="f.FoodName">
            {{ f.FoodName }}
          </div>
          <div class="m-table-td" style="min-width: 149px">
            {{ f.MenuCategoryName }}
          </div>
          <div class="m-table-td" style="min-width: 89px">{{ f.UnitName }}</div>
          <div class="m-table-td m-text-right" style="min-width: 119px">
            {{ f.SellingPrice | formatMoney }}
          </div>
          <div class="m-table-td m-text-center" style="min-width: 149px">
            <input type="checkbox" class="m-checkbox" disabled />
          </div>
          <div class="m-table-td m-text-center" style="min-width: 149px">
            <input type="checkbox" class="m-checkbox" disabled />
          </div>
          <div class="m-table-td m-text-center" style="min-width: 139px">
            Chưa thiết lập
          </div>
          <div class="m-table-td m-text-center" style="min-width: 149px">
            <input
              type="checkbox"
              :checked="f.DisplayStatus == 1 ? true : false"
              class="m-checkbox"
              disabled
            />
          </div>
          <div class="m-table-td m-text-center" style="min-width: 109px">
            <input type="checkbox" class="m-checkbox" disabled />
          </div>
        </div>
      </div>
      <!-- End tboody -->
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import BaseInputFilter from "../../components/BaseInputFilter.vue";
import { VueLoading } from "vue-loading-template";
import Enum from "../../common/enum";
export default {
  components: { BaseInputFilter, VueLoading },
  props: ["foodList", "foodId", "loading"],
  data() {
    return {
      /* Chiều sắp xếp false - giảm dần, true - tăng dần */
      sortOrder: false,
      /* Bật sắp xếp */
      sortSubmitted: false,
      /* Đối tượng tìm kiếm */
      objSort: {},
      /* Tên cột tìm kiếm */
      columnName: null,
      /* Danh sách tên cột tìm kiếm */
      columnNames: {
        FoodName: "FoodName",
        FoodCategory: "FoodCategory",
        FoodCode: "FoodCode",
        MenuCategoryName: "MenuCategoryName",
        UnitName: "UnitName",
        SellingPrice: "SellingPrice",
        DisplayStatus: "DisplayStatus",
      },
      /* Danh sách nhóm thực đơn */
      foodCategorys: [
        { FoodCategoryName: "Món ăn" },
        { FoodCategoryName: "Đồ Uống" },
        { FoodCategoryName: "Khác" },
      ],
      options: [
        { Value: 1, Text: "Có" },
        { Value: 0, Text: "Không" },
      ],
      cbxDisplayStatus: null,
    };
  },
  /* Table scroll x, tbody scroll y */
  mounted: function () {
    $(".m-table").on("scroll", function () {
      $(".m-table> *").width(
        $(".m-table").width() + $(".m-table").scrollLeft()
      );
    });
    this.sortSubmitted = false;
  },

  methods: {
    /**
     * Click 1 dòng để chọn
     * Author: TTKien(22/01/2021)
     */
    onClickRowActive(foodId) {
      this.$emit("onClickRowActive", foodId);
    },
    /**
     * Click column để sắP xếp
     * Author: TTKien(22/01/2021)
     */
    onChangeSortObject(columnName) {
      this.sortSubmitted = true;
      this.sortOrder = !this.sortOrder;
      this.columnName = columnName;
      this.objSort = {
        Column: columnName,
        SortOrder: this.sortOrder == true ? 0 : 1,
      };
      this.$emit("onChangeSortObject", this.objSort);
    },
    /**
     * Chọn 1 giá trị của cbx
     * Author(26/01/2022)
     */
    onChangeCbxValue(column, value) {
      let objFilter = {
        Column: column,
        Value: value,
        Operator: Enum.Operator.EqualTo,
        ValueType: Enum.ValueType.Int,
        AdditionalOperator: Enum.AdditionalOperator.And,
      };
      this.onChangeInputValue(objFilter);
    },
    /**
     * Thay đổi giá trị tìm kiếm
     * Author: TTKien(23/01/2021)
     */
    onChangeInputValue(objFilter) {
      this.$emit("onChangeInputValue", objFilter);
    },
    /**
     * Nháy đúp vào hàm mở form sửa
     * Author: TTKien (25/1/2022)
     */
    ondblclickUpdateFood() {
      this.$emit("ondblclickUpdateFood");
    },
  },

  filters: {
    /**
     * Format number to money VD: 1000000 => 1.000.000
     * Author: TTKien (20/1/2022)
     */
    formatMoney(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  watch: {},
};
</script>