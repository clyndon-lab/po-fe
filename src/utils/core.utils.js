import { format } from 'date-fns'
import formatISO from 'date-fns/formatISO'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

// format string date - ISO to send to BE
export const dateToISO = (date) => formatISO(new Date(date ?? null))

export const dateToISOTime = (date) => format(new Date(date) || new Date(), 'hh:mm:ss')

export const formatBaseDate = (date) => {
  // console.log("date", new Date().getDate());
  const a = format(new Date(date ?? null) || new Date(), 'dd/MM/yyyy')
  return a
}

export const formatBaseDateTime = (date) => format(new Date(date) || new Date(), 'dd/MM/yyyy HH:mm')
// format ISO - string date
export const isoToStringDate = (isoDate) => format(new Date(isoDate ?? null), 'yyyy/MM/dd')
export const isoToStringDateCustom = (isoDate, formatType) => format(new Date(isoDate ?? null), formatType)
export const isoToStringDateDash = (isoDate) => format(new Date(isoDate ?? null), 'yyyy-MM-dd')

export const checkEmail = (_, value) => {
  // eslint-disable-next-line
  const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!value) return Promise.reject(new Error('Trường này là bắt buộc'))
  else {
    if (reg.test(value)) return Promise.resolve()
    return Promise.reject(new Error('Sai định dạng Email!'))
  }
}

export const checkIsNum = (_, value) => {
  if (!isNaN(value)) return Promise.resolve()
  return Promise.reject(new Error('Trường này chỉ được nhập số!'))
}

export const checkUrl = (_, value) => {
  // eslint-disable-next-line
  const reg = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  if (!value) return Promise.reject(new Error('Trường này là bắt buộc'))
  else {
    if (reg.test(value)) return Promise.resolve()
    return Promise.reject(new Error('Sai định dạng URL!'))
  }
}

export const formatNumber = (text) => {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const saveFile = (data, fileName) => {
  // if (typeof XLSX == 'undefined') XLSX = require('xlsx')

  var name = fileName ? fileName.replace('.xlsx', '') : 'POExport'

  var wb = XLSX.utils.book_new()

  var ws = XLSX.utils.json_to_sheet(data, { skipHeader: 0 })

  XLSX.utils.book_append_sheet(wb, ws, 'No Header')

  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${name}.xlsx`)
}

export const findCurrentMaterial = (list, matCode) => list.find((item) => item.Material === matCode)
export const findCurrentMaterialById = (list, id) => list.find((item) => item.Id === id)
export const findAMSProduct = (list, id) => list.find((item) => item.SAPId === id)
export const findCurrentMaterialGroup = (list, matCode) => list.find((item) => item.Code === matCode)
export const findCurrentPlant = (list, plant) => list.find((item) => item.Id === plant)

export const disabledDate = (current, max, min) => {
  const limiteFutre = new Date().setDate(new Date().getDate() + (max || 0) + 1)
  const limitePast = new Date().setDate(new Date().getDate() - (min || 0))
  return (!current
    || current.isAfter(isoToStringDateDash(limiteFutre))
    || current.isSameOrBefore(isoToStringDateDash(limitePast)))
}
