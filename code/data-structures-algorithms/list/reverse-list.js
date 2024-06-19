// https://juejin.im/post/5a5962f251882573505129e5

// 数组的反转
let array = [1, 2, 3, 4, 5];
for (let i = 0; i < array.length / 2; i ++) {
  [array[i], array[array.length - i - 1]] = [array[array.length - i - 1], array[i]];
}
console.log(array);  // [5, 4, 3, 2, 1]

/* 
 * 以下为链表反转
 */
// 节点构造函数
function Node(val) {
  this.val = val;
  this.next = null;
}

// 定义链表
function List(array) {
  this.head = null
  let i = 0, temp = null;
  while (i < array.length) {
    if ( i === 0) {
      this.head = new Node(array[i]);
      temp = this.head;
    } else {
      let newNode = new Node(array[i]);
      temp.next = newNode;
      temp = temp.next;
    }
    i++;
  }
}

// 遍历链表
function traverseList(listHead) {
  while (listHead) {
    console.log(listHead.val);
    listHead = listHead.next;
  }
}

// 反转链表
var reverseList = function(head) {
  let pre = null;
  let next = null;
  while (head) {
    next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
};