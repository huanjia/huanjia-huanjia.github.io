// https://cnodejs.org/topic/5aa6828219b2e3db18959ce9
// 排序

// 冒泡排序
function bubble_sort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var swap = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = swap;
      }
    }
  }
}

var arr = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8];
bubble_sort(arr);
console.log(arr);



// 快速排序
function quick_sort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    console.log('quick_sort', arr[i]);
    if (arr[i] < pivot) {
      console.log('left', arr[i]);
      left.push(arr[i]);
    } else {
      console.log('right', arr[i]);
      right.push(arr[i]);
    }
  }

  return quick_sort(left).concat([pivot], quick_sort(right));
}

var arr = [5, 6, 2, 1, 3, 8, 7, 1, 2, 3, 4, 7];
console.log(quick_sort(arr));

// 插入排序
function insert_sort(arr) {
  var i = 1,
  j, key, len = arr.length;
  for (; i < len; i++) {
    var j = i;
    var key = arr[j];
    while (--j > -1) {
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }

    arr[j + 1] = key;
  }

  return arr;
}
var sortArr = insert_sort([2, 34, 54, 2, 5, 1, 7]);
console.log(sortArr);