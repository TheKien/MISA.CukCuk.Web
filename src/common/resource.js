let Resource = {
  Url: "https://localhost:44375/api/v1",
  Message: {
    ErrorValidate:{
        Required: "Trường này không được để trống",
        MaxLength: "Trường này tối đa 25 kí tự"
    },
    Warning: "Có lỗi sảy ra vui lòng gọi MISA để nhận trợ giúp !",
  },
  PopUp: {
    Status: {
      Danger: 0,
      Warning: 1,
      Question: 2,
    },
    Title: {
      Question: "Dữ liệu đã bị thay đổi, bạn có muốn cất không?",
      TitleDeleteWithParam(param) {
        return `Bạn có thực sự muốn xoá nhân viên <${param}> không?`;
      },
      TitleDulicateCodeWithParam(param) {
        return `Mã <${param}> đã tồn tại trên một trong các danh sách sau: Món ăn, đồ uống, combo, món khác, dịch vụ tính tiền theo thời gian`;
      },
    },
  },
  StatusCode: {
    Success: "Success",
    Warning: "Warning"
  }
};

export default Resource;
