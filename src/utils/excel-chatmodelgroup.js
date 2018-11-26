import XLSX from 'xlsx'

// 处理excel第一个sheet的函数
export const handleUploadExcelSingleSheet = e => {
  return new Promise(resolve => {
    const files = e.target.files
    let data
    let workbook
    let persons = {} // 存储获取到的数据
    const fileReader = new FileReader()
    fileReader.onload = ev => {
      try {
        ;(data = ev.target.result),
          (workbook = XLSX.read(data, {
            // 以二进制流方式读取得到整份excel表格对象
            type: 'binary',
            // EXCEL UTF-8的code为65001
            // codepage: 936,
            codepage: 65001
          }))
        persons = {} // 存储获取到的数据
        // console.log('workbook', workbook)
      } catch (e) {
        console.log('文件类型不正确', e)
        return
      }

      // 表格的表格范围，可用于判断表头是否数量是否正确
      let fromTo = ''
      // 遍历每张表读取
      // for (let sheet in workbook.Sheets) {
      const sheet = 'Sheet1'
      if (workbook.Sheets.hasOwnProperty(sheet)) {
        fromTo = workbook.Sheets[sheet]['!ref']
        // console.log(fromTo)
        persons[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        // break; // 如果只取第一张表，就取消注释这行
        // }
      }
      resolve(persons)
    }

    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0])
  })
}

// 下载表格xlsx文件
export const downloadExcel = (
  aoa,
  fileName = '拓途数据-',
  sheetName = 'Sheet1'
) => {
  var ws = XLSX.utils.aoa_to_sheet(aoa)

  // 新建一个workbook
  var wb = XLSX.utils.book_new()
  // sheet名称
  var new_ws_name = sheetName
  // 将sheet的内容加入到workbook中
  XLSX.utils.book_append_sheet(wb, ws, new_ws_name)

  XLSX.writeFile(wb, `拓途数据-${fileName}.xlsx`)
}
