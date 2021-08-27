import {data} from './data.js'

const numberField = document.querySelector('.number-field')
const btn = document.querySelector('.btn')
const btnModal = document.querySelector('.btn__modal')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal__content')
const modOnes = data.modOnes
const ones = data.ones
const tens = data.tens
const hundreds = data.hundreds
const suffixes = data.suffixes

//вешаем на кнопку обработчик преобразования числа в слова
btn.addEventListener('click', () => {
  let string = numberField.value
  const result = convertFullNumToWords(string)
  modal.classList.add('active')
  modalContent.innerHTML = `<p>${result}</p>`
})

//скрываем модальное окно
btnModal.addEventListener('click', () => {
  modal.classList.remove('active')
  numberField.value = ''
})

//преобразуем числo в слова
function convertFullNumToWords(strNum) {
  const strNumArr = []
  const result = []
  let minus = ''
  strNum = strNum.trim()

  //обработка ошибок
  if (!Number.isInteger(+strNum) || strNum === '') return 'Пожалуйста, введите целое число'
  if (+strNum > 10e24 - 1 ) return 'Это слишком большое число'
  if (+strNum < -10e24 + 1) return 'Это слишком маленькое число'

  if (strNum[0] === '-') {
    strNum = strNum.slice(1)
    minus = 'минус '
  }
  strNum = parseInt(strNum).toString()
  if (strNum === '0') return 'ноль'

  //разбиваем строку на группы по три числа
  while (strNum.length > 3) {
    let dig1 = strNum[strNum.length - 1]
    let dig2 = strNum[strNum.length - 2]
    let dig3 = strNum[strNum.length - 3]
    strNumArr.push(dig3 + dig2 + dig1)
    strNum = strNum.slice(0, strNum.length - 3)
  }
  strNumArr.push(strNum)

  for (let i = strNumArr.length - 1; i >= 0; i--) {
    if (strNumArr[i] === '000') continue
    result.push(convertThreeNumToWords(strNumArr[i], i) + ' ' +  getSuffix(strNumArr[i], suffixes[i]))
  }

  return minus + result.join(' ')
}

//получаем суффикс числа
function getSuffix (numStr, suffix) {
  let index = 1

  if ((numStr % 100 > 4 && numStr % 100 < 20) || numStr % 10 === 0 || numStr % 10 > 4) index = 2
  if (numStr % 10 === 1) index = 0

  return suffix[index]
}

//преобразуем группу из трех чисел в слова
function convertThreeNumToWords(num, i) {
  let words = []
  const hundred = Math.floor(num/100)

  if (hundred) {
    words.push(hundreds[hundred])
    num -= hundred * 100
  }

  if (num > 19) {
    const ten = Math.floor(num/10)
    words.push(tens[ten])
    num -= ten * 10
  }

  if (num) {
    words.push((i === 1) && (+num === 1 || +num === 2) ? modOnes[num] : ones[num])
  }

  return words.join(' ')
}

















