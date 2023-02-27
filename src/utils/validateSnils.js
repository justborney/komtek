// Валидатор СНИЛС
export default (rule, value, callback) => {
  let result = false;

  // Если значение - число, приводим его к строке
  if (typeof value === "number") {
    value = value.toString();
  } else if (typeof value !== "string") {
    // Если значение не строка и не число, то это не валидный формат
    value = "";
  }
  if (!value.length) {
    // Проверяем, что значение не пустое
    callback(new Error("СНИЛС пуст"));
    // Проверяем, что значение состоит только из цифр
  } else if (/[^0-9]/.test(value)) {
    callback(new Error("СНИЛС может состоять только из цифр"));
    // Проверяем, что длина СНИЛС составляет 11 цифр
  } else if (value.length !== 11) {
    callback(new Error("СНИЛС может состоять только из 11 цифр"));
    // Если все проверки пройдены, проверяем контрольное число СНИЛС
  } else {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(value[i]) * (9 - i);
    }
    let checkDigit = 0;
    if (sum < 100) {
      checkDigit = sum;
    } else if (sum > 101) {
      checkDigit = parseInt(sum % 101);
      if (checkDigit === 100) {
        checkDigit = 0;
      }
    }
    if (checkDigit === parseInt(value.slice(-2))) {
      // Если контрольное число СНИЛС верно, то возвращаем true
      result = true;
    } else {
      // Если контрольное число СНИЛС не верно, возвращаем ошибку
      callback(new Error("Неправильное контрольное число"));
    }
  }
  return result;
};
