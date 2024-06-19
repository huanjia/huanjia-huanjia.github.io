// 判断number是否为一个整数
const isInteger = function (number) {
  return Math.floor(number) === number;
};

// 四舍五入
const toFixed = function (number, decimalLength = 0) {
  var times = Math.pow(10, decimalLength);
  var fixed = number * times + 0.5;
  return parseInt(fixed) / times;
};

// 将一个浮点数转成整数，返回整数和倍数
const toInteger = function (floatNumber) {
  const numberInfo = { times: 1, number: 0 };
  const isNegative = floatNumber < 0;
  if (isInteger(floatNumber)) {
    numberInfo.number = floatNumber;
    return numberInfo;
  }
  const stringFloatNumber = String(floatNumber);
  const dotPosition = stringFloatNumber.indexOf(".");
  const length = stringFloatNumber.substr(dotPosition + 1).length;
  numberInfo.times = Math.pow(10, length);
  numberInfo.number = toFixed(Math.abs(floatNumber) * numberInfo.times);
  if (isNegative) numberInfo.number = -numberInfo.number;
  return numberInfo;
};

// 加
const add = function (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toInteger(number1);
  const { number: num2, times: times2 } = toInteger(number2);
  const maxTimes = Math.max(times1, times2);
  let result;
  if (times1 === times2) result = (num1 + num2) / maxTimes;
  if (times1 > times2) result = (num1 + num2 * (times1 / times2)) / maxTimes;
  if (times1 < times2) result = (num1 * (times2 / times1) + num2) / maxTimes;
  return toFixed(result, decimalLength);
};

console.log(add(0.1, 0.2, 1)) // 0.3
console.log(toFixed(0.2286298683746, 3)) // 0.229
