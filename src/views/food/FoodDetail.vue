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
            <!-- Sở thích phục vụ -->
            <div class="m-tab-bar">
              <div class="tab-conversions">Thông tin chung</div>
              <div class="m-pl-8">Sở thích phục vụ</div>
            </div>
            <div class="m-flex">
              <div style="width: 506px">
                <div class="m-row m-pr-20">
                  <div class="m-modal-col-3">Tên món <span>(*)</span></div>
                  <div class="m-modal-col-9">
                    <input type="text" class="m-input" />
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-modal-col-3">Mã món <span>(*)</span></div>
                  <div class="m-modal-col-9">
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
              <div>
                  <legend>Ảnh đại diện</legend>
                  <div class="m-photo m-photo-default"></div>
                  <div class="m-btn-box">
                    <span class="m-btn m-btn-add-photo">...</span>
                    <span class="m-btn m-btn-delete-photo">
                      <i class="fas fa-times"></i>
                    </span>
                  </div>
                </div>
                <div class="m-photo-label">
                  Chọn các ảnh có định dạng <br />
                  <b>(.jpg, .jpeg, .png, .gif)</b>
                </div>
            </div>
          </div>
          <div class="m-modal-footer">
            <div class="m-footer-left">
              <button class="m-btn m-btn-icon">
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
              <button class="m-btn m-btn-icon">
                <i class="mi-16 mi-cancel m-mr-8"></i>
                Hủy bỏ
              </button>
            </div>
          </div>
          <!-- </form> -->
          <!-- <div class="m-modal-grid-view">
              <table class="m-modal-table">
                <tr>
                  <th style="width: 5%;">STT</th>
                  <th style="width: 25%;">Đơn vị chuyển đổi</th>
                  <th style="width: 20%;">Tỷ lệ chuyển đổi</th>
                  <th style="width: 20%;">Phép tính</th>
                  <th>Mô tả</th>
                </tr>
              </table>
            </div> -->
          <!-- <div class="m-end-tab">
              <button class="m-btn m-btn-icon m-mr-5">
                <i class="mi mi-16 mi-new m-mr-8"></i>
                Thêm dòng
              </button>
              <button class="m-btn m-btn-icon">
                <i class="mi mi-16 mi-delete m-mr-8"></i>
                Xóa dòng
              </button>
            </div> -->
        </div>
        <div class="modal-background"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShowModal"],
};
</script>

<style scoped>
</style>