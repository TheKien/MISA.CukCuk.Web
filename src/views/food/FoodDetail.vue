<template>
  <div class="food-detail">
    <!-- MODAL LARGE-->
    <div class="m-row">
      <div
        id=""
        class="m-modal-medium"
        :class="{ 'm-modal-show': isShowModal }"
      >
        <div class="m-modal">
          <div class="m-modal-header">
            <div class="m-modal-title">{{ title }}</div>
            <div class="m-close-modal mi-16 mi-close"></div>
          </div>
          <!-- <form> -->
          <div class="m-modal-content">
            <div class="m-tab-bar">
              <div
                class="m-tab"
                :class="{ 'tab-conversions': tabIndex == 0 }"
                @click="tabIndex = 0"
              >
                Thông tin chung
              </div>
              <div
                class="m-tab"
                :class="{ 'tab-conversions': tabIndex == 1 }"
                @click="tabIndex = 1"
              >
                Sở thích phục vụ
              </div>
            </div>
            <!-- Thông tin chung -->
            <div
              class="m-flex-justify-content-between"
              style="padding: 6px 8px"
              v-show="tabIndex == 0"
            >
              <div style="width: 506px">
                <!-- Food Name -->
                <div class="m-row m-pr-20">
                  <div class="m-modal-col-3">Tên món <span>(*)</span></div>
                  <div class="m-modal-col-9 m-flex-item-center">
                    <input
                      type="text"
                      class="m-input"
                      ref="txtFoodName"
                      v-model="food.FoodName"
                      :class="{
                        'm-input-error': submitted && $v.food.FoodName.$error,
                      }"
                      @blur="getFoodCode(food.FoodName)"
                    />
                    <div
                      class="mi-16 mi-warning"
                      v-show="submitted && $v.food.FoodName.$error"
                      title="Trường này không được để trống."
                    ></div>
                  </div>
                </div>
                <!-- Food Code -->
                <div class="m-row">
                  <div class="m-modal-col-3">Mã món <span>(*)</span></div>
                  <div class="m-modal-col-9 m-flex-item-center">
                    <input
                      type="text"
                      class="m-input"
                      ref="txtFoodCode"
                      v-model="food.FoodCode"
                      :class="{
                        'm-input-error': submitted && $v.food.FoodCode.$error,
                      }"
                    />
                    <div
                      class="mi-16 mi-warning"
                      v-show="submitted && !$v.food.FoodCode.maxLength"
                      title="Trường này tối đa 25 kí tự."
                    ></div>
                    <div
                      class="mi-16 mi-warning"
                      v-show="submitted && !$v.food.FoodCode.required"
                      title="Trường này không được bỏ trống."
                    ></div>
                  </div>
                </div>
                <!-- Menu Category -->
                <div class="m-row">
                  <div class="m-modal-col-3">Nhóm thực đơn</div>
                  <div class="m-modal-col-9">
                    <v-select
                      :options="menuCategorys"
                      :reduce="
                        (MenuCategoryName) => MenuCategoryName.MenuCategoryId
                      "
                      v-model="food.MenuCategoryId"
                      label="MenuCategoryName"
                    ></v-select>
                  </div>
                </div>
                <!-- Unit -->
                <div class="m-row">
                  <div class="m-modal-col-3">Đơn vị tính <span>(*)</span></div>
                  <div class="m-modal-col-9 m-flex-item-center">
                    <v-select
                      style="flex: 1"
                      :options="units"
                      :reduce="(UnitName) => UnitName.UnitId"
                      v-model="food.UnitId"
                      label="UnitName"
                      :class="{
                        'm-input-error': submitted && $v.food.UnitId.$error,
                      }"
                    ></v-select>
                    <div
                      class="mi-16 mi-warning"
                      v-show="submitted && $v.food.UnitId.$error"
                      title="Trường này không được để trống."
                    ></div>
                  </div>
                </div>
                <!-- Selling Price -->
                <div class="m-row">
                  <div class="m-modal-col-3">Giá bán <span>(*)</span></div>
                  <div class="m-modal-col-4 m-flex-item-center">
                    <money
                      style="text-align: right"
                      ref="txtSellingPrice"
                      class="m-input"
                      v-model="food.SellingPrice"
                      v-bind="money"
                      :class="{
                        'm-input-error':
                          submitted && $v.food.SellingPrice.$error,
                      }"
                    ></money>
                    <div
                      class="mi-16 mi-warning"
                      v-show="submitted && $v.food.SellingPrice.$error"
                      title="Trường này không được để trống."
                    ></div>
                  </div>
                </div>
                <!-- CostPrice -->
                <div class="m-row">
                  <div class="m-modal-col-3">Giá vốn</div>
                  <div class="m-modal-col-4">
                    <money
                      style="text-align: right"
                      class="m-input"
                      v-model="food.CostPrice"
                      v-bind="money"
                    ></money>
                  </div>
                </div>
                <!-- Description -->
                <div class="m-modal-group m-row m-textarea">
                  <div class="m-modal-col-3">Mô tả</div>
                  <div class="m-modal-col-9">
                    <textarea rows="3" v-model="food.Description"></textarea>
                  </div>
                </div>
                <!-- Kitchen -->
                <div class="m-row">
                  <div class="m-modal-col-3">Chế biện tại</div>
                  <div class="m-modal-col-9">
                    <!-- <input
                      type="text"
                      class="m-input"
                      v-model="food.FoodKitchens"
                    /> -->
                    <v-select
                      multiple
                      v-model="foodKitchens"
                      :reduce="(KitchenName) => KitchenName.KitchenId"
                      label="KitchenName"
                      :options="kitchens"
                    />
                  </div>
                </div>
                <!-- DisplayStatus -->
                <div class="m-row">
                  <div class="m-modal-col-3"></div>
                  <div class="m-modal-col-9 m-flex">
                    <input
                      type="checkbox"
                      class="m-checkbox"
                      v-model="displayStatus"
                    />
                    <div class="m-modal-10">Không hiển thị trên thực đơn</div>
                  </div>
                </div>
              </div>
              <!-- Image -->
              <div class="m-photo">
                <legend>Ảnh đại diện</legend>
                <div class="m-flex">
                  <div class="m-photo-default"></div>
                  <!-- <div class="m-photo-icon"> Biểu tượng</div>   -->
                  <div class="m-btn-box">
                    <div class="m-btn m-btn-add-photo">...</div>
                    <br />
                    <div class="m-btn m-btn-delete-photo">
                      <i class="fas fa-times" style="color: red"></i>
                    </div>
                  </div>
                </div>

                <div class="m-photo-label">
                  Chọn các ảnh có định dạng <br />
                  <b>(.jpg, .jpeg, .png, .gif)</b>
                </div>
              </div>
            </div>
            <!-- Food Modifier -->
            <div v-show="tabIndex == 1" style="margin: 0 8px">
              <div>Món ăn:</div>
              <div class="m-flex" style="margin: 8px 0">
                <div class="mi-32 mi-info"></div>
                <div class="m-modal-info">
                  Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ
                  chọn nhanh order.<br />
                  VD: không cay/ít hành/thêm phomai...
                </div>
              </div>

              <div class="m-modal-grid-view">
                <table class="m-modal-table">
                  <thead>
                    <tr>
                      <th style="width: 50%; position: sticky; top: -1px">
                        Sở thích phục vụ
                      </th>
                      <th style="width: 20%; position: sticky; top: -1px">
                        Thu thêm
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(fm, index) in foodModifiers"
                      :key="index"
                      @click="onClickActiveModifier(index)"
                      :class="{ 'row-active': index == rowActive }"
                    >
                      <td>
                        <v-select
                          style="flex: 1"
                          v-model="fm.ModifierId"
                          :options="modifiers"
                          :reduce="(ModifierName) => ModifierName.ModifierId"
                          label="ModifierName"
                          @input="
                            fm.AdditionalCharge = modifiers.find(
                              (x) => x.ModifierId == fm.ModifierId
                            ).AdditionalCharge
                          "
                        ></v-select>
                      </td>
                      <td>
                        <money
                          style="text-align: right"
                          class="m-input"
                          v-model="fm.AdditionalCharge"
                          v-bind="money"
                        ></money>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="m-end-tab">
                <button
                  class="m-btn m-btn-icon m-mr-5"
                  @click="onClickAddRow()"
                >
                  <i class="mi mi-16 mi-new m-mr-8"></i>
                  Thêm dòng
                </button>
                <button
                  class="m-btn m-btn-icon"
                  @click="onClickRemoveRow(index)"
                  :class="{ 'm-disable': foodModifiers.length == 0 }"
                >
                  <i class="mi mi-16 mi-delete m-mr-8"></i>
                  Xóa dòng
                </button>
              </div>
            </div>
            <!-- End Food Modifier  -->
          </div>

          <!-- Modal footer -->
          <div class="m-modal-footer">
            <div class="m-footer-left">
              <button class="m-btn m-btn-icon" title="F1">
                <i class="mi mi-16 mi-help m-mr-8"></i>
                Giúp
              </button>
            </div>
            <div class="m-footer-right">
              <button
                class="m-btn m-btn-icon m-mr-8"
                title="Ctrl + S"
                @click="onClickSave(0)"
              >
                <i class="mi-16 mi-save m-mr-8"></i>
                Cất
              </button>
              <button
                class="m-btn m-btn-icon m-mr-8"
                title="Ctrl + Shift + S"
                @click="onClickSave(1)"
              >
                <i class="mi-16 mi-save-add m-mr-8"></i>
                Cất và thêm
              </button>
              <button
                class="m-btn m-btn-icon"
                @click="onClickClose()"
                title="Ctrl + B"
              >
                <i class="mi-16 mi-cancel m-mr-8"></i>
                Hủy bỏ
              </button>
            </div>
          </div>
          <!-- End modal footer -->

          <!-- </form> -->
        </div>
        <div class="modal-background"></div>
      </div>
    </div>
    <base-popup-warning
      :isShowPopup="isShowPopup"
      :popup="popup"
      @onClickClosePopup="onClickClosePopUp"
    ></base-popup-warning>
  </div>
</template>

<script>
import api from "../../apis/ApiService";
import { required, maxLength } from "vuelidate/lib/validators";
import Const from "../../common/const";
import Enum from "../../common/enum";
import { Money } from "v-money";
import BasePopupWarning from "../../components/BasePopupWarning.vue";
import Resource from "../../common/resource";

export default {
  props: ["isShowModal", "food", "modeBtn"],
  components: { Money, BasePopupWarning },
  data() {
    return {
      apiRouter: "Foods",
      /**
       * tab hiện tại 0 - thông tin chung, 1 - sở thích phụ vụ
       */
      tabIndex: 0,
      /* true - Bắt validate, flase - không bắt validate */
      submitted: false,
      /* Đối tượng sở thích phục vụ */
      foodModifiers: [],
      /* Danh sách bếp chọn trong select mutilple */
      foodKitchens: [],
      /* Trạng thái hiển thị của món ăn */
      displayStatus: false,
      /* List danh sách sở thích phục vụ */
      modifiers: [],
      /* List danh sách đơn vị tính*/
      units: [],
      /* List danh sách bếp chế biến */
      kitchens: [],
      /* List danh sách nhóm */
      menuCategorys: [],
      /* Mode btn 0 - Cất, 1 - Cất và thêm mới */
      btn: 0,
      /* Dòng modifier đang đc chọn */
      rowActive: 0,
      /* style money */
      money: {
        thousands: ".",
        precision: 0,
      },
      /* Title form */
      title: Enum.Title.Add,
      isShowPopup: false,
      popup: {}
    };
  },

  methods: {
    /* ================ Events ================ */
    /**
     * Click nút [Huỷ]
     * Author: TTKien(22/01/2022)
     */
    onClickClose() {
      this.$emit("onClickClose");
    }, /**
     * Click nút đóng popup
     * Author: TTKien(22/01/2022)
     */
    onClickClosePopUp() {
      this.isShowPopup = false;
    },
    /**
     * Khi click button Thêm dòng
     * Author: TTKien (21/1/2022)
     */
    onClickAddRow() {
      let con = {
        ModifierId: null,
        AdditionalCharge: 0,
      };
      this.foodModifiers.push(con);
    },
    /**
     * Chọn 1 dòng modifier
     * Author: TTKien(23/01/2022)
     */
    onClickActiveModifier(index) {
      this.rowActive = index;
    },
    /**
     * Xoá 1 dòng đang chọn
     * Author: TTKien(23/01/2022)
     */
    onClickRemoveRow() {
      this.foodModifiers.splice(this.rowActive, 1);
    },
    onClickSave(btn) {
      /**
       * Click nút [Cất] hoặc [Cất & thêm]
       */
      try {
        this.submitted = true;
        this.btn = btn;
        // convert giá về int
        if (this.food.SellingPrice)
          this.food.SellingPrice = Number.parseInt(this.food.SellingPrice);
        if (this.food.CostPrice)
          this.food.CostPrice = Number.parseInt(this.food.CostPrice);
        // Chuyển trạng thái false = 1 (hiển thị), true = 0 (không hiển thị)
        this.food.DisplayStatus = this.displayStatus == true ? 0 : 1;
        // Bỏ qua các trường rỗng
        this.foodModifiers = this.foodModifiers.filter(
          (x) => x.ModifierId != null
        );
        // Kiểm tra trùng con trong danh sách sở thích phục vụ
        // if (this.foodModifiers.length > 0) {
        //   for (const fm in this.foodModifiers) {
        //     const element = this.foodModifiers[fm];
        //     var isExist = this.foodModifiers.indexOf(element);
        //     console.log(isExist);
        //   }
        // }

        if (
          this.modeBtn == Const.modeBtn.Add ||
          this.modeBtn == Const.modeBtn.Duplicate
        ) {
          // Nhân bản
          if (this.modeBtn == Const.modeBtn.Duplicate) {
            this.FoodId = null;
            this.food.FoodKitchens = [];
          }
          // Convert list id thành list obj kitchenId
          for (const kitchenId in this.foodKitchens) {
            const element = this.foodKitchens[kitchenId];
            let objKitchenId = { KitchenId: element };
            this.food.FoodKitchens.push(objKitchenId);
          }
          this.food.FoodModifiers = this.foodModifiers;
        } else {
          //UPDATE
          // Lấy danh sách thay đổi bếp chế biến có edit mode
          this.food.FoodKitchens = this.compareTwoArrayKitchen(
            this.food.FoodKitchens,
            this.foodKitchens
          );
          // Lấy danh sách thay đổi sở thích phục vu có edit mode
          this.food.FoodModifiers = this.compareTwoArrayModifier(
            this.food.FoodModifiers,
            this.foodModifiers
          );
        }
        this.$v.$touch();
        // Nếu form error
        if (this.$v.$invalid) {
          // Tên món ăn rỗng
          if (this.$v.food.FoodName.$error) {
            setTimeout(() => {
              this.$refs.txtFoodName.focus();
            }, 0);
            return;
          }
          // Mã món ăn rỗng hoặc quá 25 kí tự
          if (this.$v.food.FoodCode.$error) {
            setTimeout(() => {
              this.$refs.txtFoodCode.focus();
            }, 10);
            return;
          }
          // K chọn đơn vị tính
          if (this.$v.food.UnitId.$error) {
            return;
          }
          // Giá bán rỗng
          if (this.$v.food.SellingPrice.$error) {
            setTimeout(() => {
              this.$refs.txtSellingPrice.focus();
            }, 10);
            return;
          }
        } else {
          if (
            this.modeBtn == Const.modeBtn.Add ||
            this.modeBtn == Const.modeBtn.Duplicate
          ) {
            this.callApiCreateFood();
          } else {
            // UPDATE
            this.callApiUpdateFood();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /* ================== Api ======================== */
    /**
     * Gọi api thêm mới món ăn
     * Author: TTKien(22/01/2022)
     */
    callApiCreateFood() {
      const me = this;
      api
        .create(me.apiRouter, me.food)
        .then((res) => {
          // Nếu có lỗi dũ liệu nhập
          if (res.data.Status == Resource.StatusCode.Warning) {
            this.isShowPopup = true;
            this.popup.Status = Resource.PopUp.Status.Warning;
            this.popup.Title = res.data.Data[0];
          } else {
            me.$emit("getFoods");
            // Select button 'cất '
            if (me.btn == Const.btn.Save) {
              // Hide modal
              me.onClickClose();
            } else {
              //'cất và thêm'
              // Reset Form
              me.foodModifiers = [];
              me.$emit("resetForm");
              setTimeout(() => {
                me.submitted = false;
              }, 0);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /**
     * Gọi api thêm mới món ăn
     * Author: TTKien(22/01/2022)
     */
    callApiUpdateFood() {
      const me = this;
      api
        .update(me.apiRouter, me.food.FoodId, me.food)
        .then(() => {
          me.$emit("getFoods");
          // Select button 'cất '
          if (me.btn == Const.btn.Save) {
            // Hide modal
            me.onClickClose();
          } else {
            //'cất và thêm'
            // Reset Form
            me.submitted = false;
            me.foodModifiers = [];
            me.$emit("resetForm");
            setTimeout(() => {
              me.$refs.txtFoodName.focus();
            }, 10);
          }
        })
        .catch(function (res) {
          console.log(res.response);
        });
    },
    /* ============Lấy data============ */
    /**
     * Lấy tất cả đơn vị tính
     * Author: TTKien(22/01/2022)
     */
    getUnits() {
      let me = this;
      api
        .get(`Units`)
        .then((response) => {
          me.units = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Lấy tất cả sở thích phục vụ
     * Author: TTKien(22/01/2022)
     */
    getModifiers() {
      let me = this;
      api
        .get(`Modifiers`)
        .then((response) => {
          me.modifiers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Lấy tất cả nhóm thực đơn
     * Author: TTKien(22/01/2022)
     */
    getMenuCategorys() {
      let me = this;
      api
        .get(`MenuCategorys`)
        .then((response) => {
          me.menuCategorys = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Lấy tất cả bếp chế biến
     * Author: TTKien(22/01/2022)
     */
    getKitchens() {
      let me = this;
      api
        .get(`Kitchens`)
        .then((response) => {
          me.kitchens = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /*================== Khác ================= */
    /**
     * Lấy mã món ăn theo tên món ăn
     * Author: TTKien(22/01/2022)
     */
    getFoodCode(foodName) {
      if (foodName == null) {
        return;
      }
      let str = foodName;
      if (this.modeBtn == Const.modeBtn.Add) {
        let str = this.convertStringToCode(foodName);
        // Cắt bỏ khoảng trắng
        this.food.FoodCode = str;
      }

      if (str.length > 25 || this.modeBtn == Const.modeBtn.Duplicate) {
        let str2 = foodName;
        str2 = str2.match(/\b(\w)/g);
        str2 = str2.join("").toUpperCase();
        str2 = str2.slice(0, 25);
        this.food.FoodCode = str2;
      }
    },
    /**
     * Chuyển chuỗi string thành code VD: Sườn Xào => SUONXAO
     * Author: TTKien(21/01/2022)
     */
    convertStringToCode(str) {
      //Loại bỏ dấu tiếng việt
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      // Loại bỏ kí tự đặc biệt
      str = str.replace(/[^\w\s]/gi, "");
      // Loại bỏ khoẳng trắng
      str = str.toUpperCase().split(" ").join("");
      return str;
    },

    /**
     * So sánh 2 mảng trả về mảng mới kèm thuộc tính edit mode.
     * Author: TTKien(23/01/2022)
     */
    compareTwoArrayKitchen(arrOld, arrNew) {
      let res = [];
      let arrDel = [];
      let arrAdd = [];
      // Lấy ra các đối tượng xoá - Có trong mảng cũ nhưng không có trong mảng mới
      arrDel = arrOld.filter(function (v) {
        return arrNew.every((n) => JSON.stringify(n) !== JSON.stringify(v));
      });
      // Lấy ra các đối tượng Thêm - Không có trong mảng cũ nhưng có trong mảng mới
      arrAdd = arrNew.filter(function (v) {
        return arrOld.every((n) => JSON.stringify(n) !== JSON.stringify(v));
      });

      // Thêm edit mode: 1 - Thêm, 3 - Xoá
      for (const objDel in arrDel) {
        if (Object.hasOwnProperty.call(arrDel, objDel)) {
          const element = arrDel[objDel];
          res.push({ KitchenId: element, EditMode: 3 });
        }
      }
      for (const objAdd in arrAdd) {
        if (Object.hasOwnProperty.call(arrAdd, objAdd)) {
          const element = arrAdd[objAdd];
          res.push({ KitchenId: element, EditMode: 1 });
        }
      }
      return res;
    },
    /**
     * So sánh 2 mảng trả về mảng mới kèm thuộc tính edit mode.
     * Author: TTKien(23/01/2022)
     */
    compareTwoArrayModifier(arrOld, arrNew) {
      let res = [];
      let arrDel = [];
      let arrAdd = [];
      let foodModifiers = [];
      for (const fm in arrOld) {
        const element = arrOld[fm];
        let foodModifer = {
          ModifierId: element.ModifierId,
          AdditionalCharge: element.AdditionalCharge,
        };
        foodModifiers.push(foodModifer);
      }
      arrOld = foodModifiers;
      for (const fm in arrNew) {
        const element = arrNew[fm];
        arrNew[fm].AdditionalCharge = Number.parseInt(element.AdditionalCharge);
      }
      // Lấy ra các đối tượng xoá - Có trong mảng cũ nhưng không có trong mảng mới
      arrDel = arrOld.filter(function (v) {
        return arrNew.every((n) => JSON.stringify(n) !== JSON.stringify(v));
      });
      // Lấy ra các đối tượng Thêm - Không có trong mảng cũ nhưng có trong mảng mới
      arrAdd = arrNew.filter(function (v) {
        return arrOld.every((n) => JSON.stringify(n) !== JSON.stringify(v));
      });

      // Thêm edit mode: 1 - Thêm, 3 - Xoá, 2 - Sửa
      for (const objDel in arrDel) {
        if (Object.hasOwnProperty.call(arrDel, objDel)) {
          const element = arrDel[objDel];
          res.push({
            ModifierId: element.ModifierId,
            AdditionalCharge: Number.parseInt(element.AdditionalCharge),
            EditMode: 3,
          });
        }
      }
      for (const objAdd in arrAdd) {
        if (Object.hasOwnProperty.call(arrAdd, objAdd)) {
          const element = arrAdd[objAdd];
          res.push({
            ModifierId: element.ModifierId,
            AdditionalCharge: Number.parseInt(element.AdditionalCharge),
            EditMode: 1,
          });
        }
      }
      return res;
    },
  },

  /**
   * Validate dữ liệu
   * Author(22/01/2022)
   */
  validations: {
    food: {
      FoodCode: {
        required,
        maxLength: maxLength(25),
      },
      FoodName: { required },
      UnitId: { required },

      SellingPrice: { required },
    },
  },

  mounted() {
    this.getUnits();
    this.getKitchens();
    this.getModifiers();
    this.getMenuCategorys();
  },

  watch: {
    /**
     * Khi hiển thị form
     * Author: TTKien(22/01/2022)
     */
    isShowModal() {
      this.title =
        this.modeBtn == Const.modeBtn.Update
          ? Enum.Title.Update
          : Enum.Title.Add;
      this.tabIndex = 0;
      this.submitted = false;
      this.displayStatus = this.food.DisplayStatus == 1 ? false : true;
      if (
        this.modeBtn == Const.modeBtn.Update ||
        this.modeBtn == Const.modeBtn.Duplicate
      ) {
        this.foodKitchens = this.food.FoodKitchens;
        let foodModifiers = [];
        for (const fm in this.food.FoodModifiers) {
          const element = this.food.FoodModifiers[fm];
          let foodModifer = {
            ModifierId: element.ModifierId,
            AdditionalCharge: element.AdditionalCharge,
          };
          foodModifiers.push(foodModifer);
        }
        this.foodModifiers = foodModifiers;
      } else {
        this.foodKitchens = [];
        this.foodModifiers = [];
      }

      setTimeout(() => {
        this.$refs.txtFoodName.focus();
      }, 10);
    },
    /**
     * Khi chuyển tab mới
     * Author: TTKien(22/01/2022)
     */
    tabIndex() {
      if (this.foodModifiers.length == 0) this.onClickAddRow();
      setTimeout(() => {
        this.$refs.txtFoodName.focus();
      }, 10);
    },
  },
};
</script>

<style scoped>
</style>