export function dataConvert(input) {
  var d = new Date(input)
  var year = d.getFullYear()
  var month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
  var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
  var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
  var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
  var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
  return (year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds)
}

// 10位时间戳转换
export function timestampToTime(timestamp) {
  const date = new Date(timestamp * 1000)
  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D =
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':'
  const s =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}

