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
            <div class="m-modal-title">Thêm món</div>
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
                <div class="m-row m-pr-20">
                  <div class="m-modal-col-3">Tên món <span>(*)</span></div>
                  <div class="m-modal-col-9 m-flex-item-center">
                    <input type="text" class="m-input m-input-error" />
                    <div class="mi-16 mi-warning"></div>
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3">Mã món <span>(*)</span></div>
                  <div class="m-modal-col-9 m-flex-item-center">
                    <input type="text" class="m-input" />
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3">Thứ tự món <span>(*)</span></div>
                  <div class="m-modal-col-9">
                    <input type="text" class="m-input m-modal-col-6" />
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3">Nhóm thực đơn</div>
                  <div class="m-modal-col-9 m-row-inner">
                    <input type="text" class="m-input" />
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3">Giá bán <span>(*)</span></div>
                  <div class="m-modal-col-3">
                    <input
                      type="text"
                      value="0,00"
                      style="text-align: right"
                      class="m-input"
                    />
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3">Giá vốn</div>
                  <div class="m-modal-col-3">
                    <input
                      type="text"
                      value="0,00"
                      style="text-align: right"
                      class="m-input"
                    />
                  </div>
                </div>
                <div class="m-modal-group m-row m-textarea">
                  <div class="m-modal-col-3">Mô tả</div>
                  <div class="m-modal-col-9">
                    <textarea rows="3"></textarea>
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3">Chế biện tại</div>
                  <div class="m-modal-col-9">
                    <input type="text" class="m-input" />
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3"></div>
                  <div class="m-modal-col-9 m-flex">
                    <input type="checkbox" class="m-checkbox" />
                    <div class="m-modal-10">Hiển thị trên thực đơn</div>
                  </div>
                </div>
              </div>
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
            <!-- Sở thích phục vụ -->
            <div v-show="tabIndex == 1">
              <div class="m-modal-grid-view">
                <div>Món ăn:</div>
                <div class="m-flex" style="margin: 8px 0">
                  <div class="mi-32 mi-info"></div>
                  <div class="m-modal-info">
                    Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ
                    chọn nhanh order.<br />
                    VD: không cay/ít hành/thêm phomai...
                  </div>
                </div>

                <table class="m-modal-table">
                  <thead>
                    <tr>
                      <th>Sở thích phục vụ</th>
                      <th>Thu thêm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in modifiers" :key="index">
                      <td>
                        <input
                          type="text"
                          class="m-input"
                          v-model="row.ModifierName"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="m-input"
                          v-model="row.AdditionalCharge"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="m-end-tab">
                  <button
                    class="m-btn m-btn-icon m-mr-5"
                    @click="onClickAddRow()"
                  >
                    <i class="mi mi-16 mi-new m-mr-8"></i>
                    Thêm dòng
                  </button>
                  <button class="m-btn m-btn-icon">
                    <i class="mi mi-16 mi-delete m-mr-8"></i>
                    Xóa dòng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="m-modal-footer">
            <div class="m-footer-left">
              <button class="m-btn m -btn-icon">
                <i class="mi mi-16 mi-help m-mr-8"></i>
                Giúp
              </button>
            </div>
            <div class="m-footer-right">
              <button class="m-btn m-btn-icon m-mr-8">
                <i class="mi-16 mi-save m-mr-8"></i>
                Cất
              </button>
              <button class="m-btn m-btn-icon m-mr-8">
                <i class="mi-16 mi-save-add m-mr-8"></i>
                Cất và thêm
              </button>
              <button class="m-btn m-btn-icon" @click="onClickClose()">
                <i class="mi-16 mi-cancel m-mr-8"></i>
                Hủy bỏ
              </button>
            </div>
          </div>
          <!-- </form> -->
        </div>
        <div class="modal-background"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShowModal"],
  created: function () {},

  data() {
    return {
      /**
       * tab hiện tại 0 - thông tin chung, 1 - sở thích phụ vụ
       */
      tabIndex: 0,
      /* Đối tượng sở thích phục vụ */
      modifier: {
        ModifierName: null,
        ModifierId: null,
        AdditionalCharge: null,
      },
      /* List danh sách sở thích phục vụ */
      modifiers: [
        // {
        //   ModifierName: "Thêm đường",
        //   ModifierId: "Thêm đường",
        //   AdditionalCharge: 1234556,
        // },
      ],
      
    };
  },
  methods: {
    onClickClose() {
      this.$emit("onClickClose");
    },

    onClickAddRow() {
      this.modifiers.push(this.modifier);
    },
  },
};
</script>

<style scoped>
</style>