const Resource = {
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
        return `Bạn có thực sự muốn xoá món <<${param}>>   không?`;
      },
    },
  },
  StatusCode: {
    Success: "Success",
    Warning: "Warning"
  }
};

export default Resource;
