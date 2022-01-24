<template>
  <div class="m-content-table">
    <!-- table -->
    <table class="m-table">
      <thead class="m-text-left">
        <th style="min-width: 159px">
          <div class="m-th-name m-flex-content-center">Loại Món</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 179px">
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
        </th>
        <th style="min-width: 179px">
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
        </th>
        <th style="min-width: 149px">
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
        </th>
        <th style="min-width: 89px">
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
        </th>
        <th style="min-width: 99px">
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
        </th>
        <th style="min-width: 149px">
          <div class="m-th-name m-flex-content-center">
            Thay đổi theo thời giá
          </div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 149px">
          <div class="m-th-name m-flex-content-center">
            Điều chỉnh giá tự do
          </div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 139px">
          <div class="m-th-name m-flex-content-center">Định lượng NVL</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 149px">
          <div
            class="m-th-name m-flex-content-center"
            @click="onChangeSortObject(columnNames.DislayStatus)"
          >
            <div>Hiển thị trên thực đơn</div>
            <div
              class="mi mi-16 mi-sort-asc"
              v-show="
                sortSubmitted &&
                sortOrder &&
                columnName == columnNames.DislayStatus
              "
            ></div>
            <div
              class="mi mi-16 mi-sort-desc"
              v-show="
                sortSubmitted &&
                !sortOrder &&
                columnName == columnNames.DislayStatus
              "
            ></div>
          </div>
          <base-input-filter
            :column="columnNames.DislayStatus"
            :valueType="'Int32'"
            @onChangeInputValue="onChangeInputValue"
          ></base-input-filter>
        </th>
        <th style="min-width: 109px">
          <div class="m-th-name m-flex-content-center">Ngừng bán</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
      </thead>
      <tbody>
        <div class="m-loading-table" v-show="loading">
          <vue-loading
            type="spiningDubbles"
            color="#000"
            :size="{ width: '50px', height: '50px' }"
          ></vue-loading>
        </div>
        <tr
          v-show="!loading"
          v-for="f in foodList"
          :key="f.FoodId"
          :class="{ 'row-active': f.FoodId == foodId }"
          @click="onClickRowActive(f.FoodId)"
        >
          <td style="min-width: 159px">{{ f.FoodCategoryName }}</td>
          <td style="min-width: 179px">{{ f.FoodCode }}</td>
          <td style="min-width: 179px">{{ f.FoodName }}</td>
          <td style="min-width: 149px">{{ f.MenuCategoryName }}</td>
          <td style="min-width: 89px">{{ f.UnitName }}</td>
          <td style="min-width: 99px" class="m-text-right">
            {{ f.SellingPrice | formatMoney }}
          </td>
          <td style="min-width: 149px" class="m-text-center">
            <input type="checkbox" class="m-checkbox" disabled />
          </td>
          <td style="min-width: 149px" class="m-text-center">
            <input type="checkbox" class="m-checkbox" disabled />
          </td>
          <td style="min-width: 139px">Chưa thiết lập</td>
          <td style="min-width: 149px" class="m-text-center">
            <input
              type="checkbox"
              :checked="f.DisplayStatus == 1 ? true : false"
              class="m-checkbox"
              disabled
            />
          </td>
          <td style="min-width: 109px" class="m-text-center">
            <input type="checkbox" class="m-checkbox" disabled />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import $ from "jquery";
import BaseInputFilter from "../../components/BaseInputFilter.vue";
import { VueLoading } from "vue-loading-template";
export default {
  components: { BaseInputFilter, VueLoading },
  props: ["foodList", "foodId", "loading"],
  data() {
    return {
      sortOrder: false,
      sortSubmitted: false,
      objSort: {},
      columnName: null,
      columnNames: {
        FoodName: "FoodName",
        FoodCategory: "FoodCategory",
        FoodCode: "FoodCode",
        MenuCategoryName: "MenuCategoryName",
        UnitName: "UnitName",
        SellingPrice: "SellingPrice",
        DisplayStatus: "DisplayStatus",
      },
    };
  },
  mounted: function () {
    $("table.m-table").on("scroll", function () {
      $("table.m-table> *").width(
        $("table.m-table").width() + $("table.m-table").scrollLeft()
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
     * Thay đổi giá trị tìm kiếm
     * Author: TTKien(23/01/2021)
     */
    onChangeInputValue(objFilter) {
      this.$emit("onChangeInputValue", objFilter);
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
  watch: {
    
  },
};
</script>