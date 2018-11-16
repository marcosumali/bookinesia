// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
function formatMoney(number) {
  let money = new Intl.NumberFormat(['ban', 'id'], { maximumFractionDigits: 0 }).format(number)
  return money;
}


module.exports = {
  formatMoney
}