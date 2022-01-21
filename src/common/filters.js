class Filters {
  /**
   * Format datetime to DD-MM-YYYY
   * Author: TTKien (20/1/2022)
   */
  formatDateDDMMYYYY(value) {
    if (value) return moment(String(value)).format("DD/MM/YYYY");
  }

  /**
   * Format number to money VD: 1000000 => 1.000.000
   * Author: TTKien (20/1/2022)
   */
  formatMoney(value) {
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
export default Filters;