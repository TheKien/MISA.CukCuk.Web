<template>
  <div class="m-content-table">
    <!-- table -->
    <table class="m-table">
      <thead class="m-text-left">
        <th style="min-width: 159px">
          <div class="m-th-name">Loại Món</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 179px">
          <div class="m-th-name">Mã Món</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 149px">
          <div class="m-th-name">Tên Món</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 149px">
          <div class="m-th-name">Nhóm Thực Đơn</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 89px">
          <div class="m-th-name">Đơn vị tính</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 99px">
          <div class="m-th-name">Giá bán</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 149px">
          <div class="m-th-name">Thay đổi theo thời giá</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 149px">
          <div class="m-th-name">Điều chỉnh giá tự do</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 139px">
          <div class="m-th-name">Định lượng NVL</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 159px">
          <div class="m-th-name">Hiển thị trên thực đơn</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
        <th style="min-width: 109px">
          <div class="m-th-name">Ngừng bán</div>
          <div class="m-filter">
            <div class="m-cbb-filter"><span>*.</span></div>
            <input type="text" class="m-input" />
          </div>
        </th>
      </thead>
      <tbody>
        <tr
          v-for="f in foodList"
          :key="f.FoodId"
          :class="{ 'row-active': f.FoodId == food.FoodId }"
          @click="onClickRowActive(f)"
        >
          <td style="min-width: 159px">{{ f.FoodCategoryName }}</td>
          <td style="min-width: 179px">{{ f.FoodCode }}</td>
          <td style="min-width: 149px">{{ f.FoodName }}</td>
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
          <td style="min-width: 159px" class="m-text-center">
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

export default {
  props: ["foodList", "food"],
  data() {
    return {
    };
  },
  mounted: function () {
    $("table").on("scroll", function () {
      $("table > *").width($("table").width() + $("table").scrollLeft());
    });
  },

  methods: {
    onClickRowActive(food) {
      this.$emit("onClickRowActive",food)
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
};
</script>