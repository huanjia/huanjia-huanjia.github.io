// https://leetcode-cn.com/problems/linked-list-cycle/solution/pan-duan-yi-ge-dan-lian-biao-shi-fou-you-huan-by-u/

var hasCycle = function(head) {
  while (head) {
    if (head.flag) {
      return true;
    }
    head.flag = true;
    head = head.next;
  }
  return false;
};

var hasCycle = function(head) {
  try {
    JSON.stringify(head);
    return false;
  }
  catch (err) {
    return true;
  }
};

// https://leetcode-cn.com/problems/linked-list-cycle/solution/lei-si-xiao-xue-de-zhui-ji-wen-ti-kuai-man-zhi-zhe/
var hasCycle = (head) => {
  let map = new Map();
  while (head) {
    if (map.has(head)) {
      return true;
    }
    map.set(head, true);
    head = head.next;
  }
  return false;
}

var hasCycle = (head) => {
  let fastP = head;
  let slowP = head;
  // 当前快指针指向了节点
  while (fastP) {
    // 下一个为null了，没有环
    if (!fastP.next) {
      return false; 
    }
    slowP = slowP.next; // 快的前面都有节点，慢的前面当然有
    fastP = fastP.next.next; // 推进2个节点
    // 快慢指针相遇，有环
    if (slowP === fastP) {
      return true; 
    }
  }
  return false; // fastP为null了也始终不相遇
}