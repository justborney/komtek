export default (rule, value, callback) => {
  var result = false;

  if (typeof value === "number") {
    value = value.toString();
  } else if (typeof value !== "string") {
    value = "";
  }
  if (!value.length) {
    callback(new Error("СНИЛС пуст"));
  } else if (/[^0-9]/.test(value)) {
    callback(new Error("СНИЛС может состоять только из цифр"));
  } else if (value.length !== 11) {
    callback(new Error("СНИЛС может состоять только из 11 цифр"));
  } else {
    var sum = 0;
    for (var i = 0; i < 9; i++) {
      sum += parseInt(value[i]) * (9 - i);
    }
    var checkDigit = 0;
    if (sum < 100) {
      checkDigit = sum;
    } else if (sum > 101) {
      checkDigit = parseInt(sum % 101);
      if (checkDigit === 100) {
        checkDigit = 0;
      }
    }
    if (checkDigit === parseInt(value.slice(-2))) {
      result = true;
    } else {
      callback(new Error("Неправильное контрольное число"));
    }
  }
  return result;
};
