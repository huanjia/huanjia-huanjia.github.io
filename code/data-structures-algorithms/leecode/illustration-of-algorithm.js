/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}



/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

function LinkedList() {
    // 表示链表的长度
    this.length = 0;
    // 表示链表的头结点（第一个节点）
    this.head = null;
}

LinkedList.prototype.append = function(key) {
    var node = new ListNode(key);
    // 如果链表还没有节点
    if (!this.head) {
        this.head = node;
    } else {
        // 通过循环找到最后一个节点，然后让最后一个节点指向新节点
        var current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = node;
    }
    // 修改链表的长度
    this.length++;
}


/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var mirrorTree = function(root) {
    if (root === null) {
        return root;
    }
      var tmp = root.left;
      root.left = mirrorTree(root.right);
      root.right = mirrorTree(tmp);
    
    return root;
};



/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    return root === null || recur(root.left, root.right);
};

var recur = function(L, R) {
    if (L === null && R === null) {
        return true;
    }
    if (L === null || R === null || L.val !== R.val) {
        return false;
    }
    return recur(L.left, R.right) && recur(L.right, R.left);
}



/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if (root === null) {
        return [];
    }
    var queue = [].push(root);
    var result = [];
    while(queue.length > 0) {
        queue.pop();
        result.push(root.val);
        if (root.left !== null) {
            queue.push(root.left);
        }
        if (root.right !== null) {
            queue.push(root.right);
        }
    }

    return result;
};



/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder2 = function(root) {
    if (root === null) {
        return [];
    }
    var queue = [].push(root);
    var result = [];
    while(queue.length > 0) {
        var tmp = [];
        var tmpQueue = [];
        for (var i = 0; i < queue.length; i++) {
            const item = queue.pop();
            tmp.push(item.val);
            if (item.left !== null) {
                tmpQueue.push(item.left);
            }
            if (item.right !== null) {
                tmpQueue.push(item.right);
            }
        }
        queue = tmpQueue;
        // if (result.length %2 === 1) {
        //   tmp.reverse();
        // }
        result.push(tmp);
    }

    return result;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder3 = function(root) {
    if (root === null) {
        return [];
    }
    var queue = [].push(root);
    var result = [];
    while(queue.length > 0) {
        var tmp = [];
        var tmpQueue = [];
        for (var i = 0; i < queue.length; i++) {
            const item = queue.pop();
            if (result.length %2 === 0) {
                tmp.push(itme.val);
            } else {
                tmp.unshift(item.val);
            }
            if (item.left !== null) {
                tmpQueue.push(item.left);
            }
            if (item.right !== null) {
                tmpQueue.push(item.right);
            }
        }
        queue = tmpQueue;
        result.push(tmp);
    }

    return result;
};



/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var path = [];
var res = [];
var pathSum = function(root, sum) {
    recur(root, sum);
    return res;
};

var recur = function(root, tar) {
    if (root === null) {
        return;
    }
    path.push(root.val)
    tar -= root.val;
    if (tar === 0 && root.left === null & root.right === null) {
        res.push(path);
    }
    recur(root.left, tar);
    recur(root.right, tar);
    path.pop();
}



/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var pre;
var head;
var treeToDoublyList = function(root) {
    if (root === null) {
        return null;
    }
    dfs(root);
    head.left = pre;
    pre.right = head;
    return head;
};
var dfs = function(cur) {
    if (cur === null) {
        return;
    }
    dfs(cur.left);
    if (pre !== null) {
        pre.right = cur;
    } else {
        head = cur;
    }
    cur.left = pre;
    pre = cur;
    dfs(cur.right);
};



/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (root === null) {
        return [];
    }
    var res = '[';
    var queue = [].push(root);
    var recur = function() {
        while (queue.length > 0) {
            var node = queue.pop();
            if (node.val !== null) {
                res += `${node.val},`;
                res.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
            } else {
                res += `null,`;
            }
        }
    };
    
    recur(root);
    return res += `]`; 
};


/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (data === '[]') {
        return null;
    }
    var vals = data.substring(1, data.length - 1).split(',');
    var root = parseInt(vals[0]);
    var queue = [].push(root);
    var i = 1;
    while (queue.length > 0) {
        var node  = queue.pop();
        if (vals[i] !== 'null') {
            node.left = parseInt(vals[i]);
            queue.push(node.left);
        }
        i++;
        if (vals[i] !== 'null') {
            node.right = parseInt(vals[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */



 /**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
    var queue = s.split('');
    var res = [];
    dfs(0);
    return res;
};

var dfs = function(x) {
    if (x === queue.length - 1) {
        res.push(queue.join(''));
    }
    var dic = new Set();
    for (i = 0; i < queue.length; i++) {
        if (dic.has(queue[i])) {
            continue;
        }
        dic.add(`${i}_${queue[i]}`);
        [queue[i], queue[x]] = [queue[x], queue[i]];
        dfs(x + 1);
        [queue[i], queue[x]] = [queue[x], queue[i]];
    }
}



/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) {
        return 0;
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};



/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) {
        return 0;
    }
    var queue = [].push(root.val);
    var tmp;
    var res = 0;
    while(queue.length > 0) {
        tmp = [];
        for (var i = 0; i < queue.length; i++) {
            var node = queue[i];
            if (node.left !== null) {
                tmp.push(node.left);
            }
            if (node.right !== null) {
                tmp.push(node.right);
            }
        }
        queue = tmp;
        res++;
    }
    return res;
};



/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    return recur(root) !== -1;
};

var recur = function(root) {
    if (root === null) {
        return 0;
    }
    left = recur(root.left);
    if (left === -1) {
        return -1;
    }
    right = recur(root.right);
    if (right === -1) {
        return -1;
    }
    if (Math.abs(left - right) <= 1) {
        return Math.max(left, right) + 1;
    } else {
        return -1;
    }
}


var isBalanced = function(root) {
    if (root === null) {
        return true;
    }
    return Math.abs(maxDepth(root.left), maxDepth(root.right) <= 1)
    && isBalanced(root.left)
    && isBalanced(root.right);
}



/**
 * @param {number} n
 * @return {number}
 */
var sumNums = function(n) {
  var sum = 0;
  n > 1 && (sum += sumNums(n - 1));
  return sum;
};



/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (p > q) {
        [p, q] = [q, p];
    }
    while(root) {
        if (root.val < p.val) {
            root = root.right;
        } else if (root.val > q.val) {
            root = root.left;
        } else {
            break;
        }
    }
    return root;
};

var lowestCommonAncestor = function(root, p, q) {
    if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else {
        return root;
    }
}

var lowestCommonAncestor = function(root, p, q) {
    if (root === null || root.val === p.val || root.val === q.val) {
        return root;
    }
    var left = lowestCommonAncestor(root.left, p, q);
    var right = lowestCommonAncestor(root.right, p, q);
    if (left === null && right === null) {
        return null;
    }
    if (left === null) {
        return right;
    }
    if (right === null) {
        return left;
    }
    return root;
}



/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reverseList = function(head) {
    var cur = head;
    var prev = null;
    while(cur !== null) {
        var tmp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = tmp;
    }
    return prev;
};

var reverseList = function(head) {
    return recur(head, null);
}
var recur = function(cur, prev) {
    if (cur === null) {
        return prev;
    }
    var res = recur(cur.next, cur);
    cur.next = prev;
    return res;
}


var copyRandomList = function(head) {
    if (head === null) {
        return null;
    }
    var cur = head;
    var map = new Map();
    while(cur !== null) {
        map.set(cur, cur.val);
        cur = cur.next;
    }
    cur = head;
    while(cur !== null) {
        map.get(cur).next = map.get(cur.next);
        map.get(cur).random = map.get(cur.random);
        cur = cur.next;
    }
    return map.get(head);
};



var maxSlidingWindow = function(nums, k) {
    if(nums.length === 0 || k === 0) {
        return [];
    }
    var res = [];
    var deque = [];
    // 未形成窗口
    for (var i = 0; i < k; i++) {
        while(deque.length > 0 && deque[deque.length - 1] < nums[i]) {
            deque.pop();
        }
        deque.push(nums[i]);
    }
    res.push(deque[0]);
    // 形成窗口
    for (var j = k; j < nums.length; j++) {
        if (deque[0] === nums[j - k]) {
            deque.shift();
        }
        while(deque.length > 0 && deque[deque.length - 1] < nums[j]) {
            deque.pop();
        }
        deque.push(nums[j]);
        res.push(deque[0]);
    }
    return res;
}



/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    var m = grid.length;
    var n = grid[0].length;
    var memb = Array(m).fill().map(() => Array(n).fill(-1));
    // var memb = Array.from({ length: m }, () => Array.from({ length: n }, () => -1));

    var dp = function(m, n) {
        if (m === 0 && n === 0) {
            return grid[0][0];
        }
        if (m < 0 || j < 0) {
            return Number.MIN_SAFE_INTEGER;
        }
        if (memb[m][n] !== -1) {
            return memb[m][n];           
        }
        memb[m][n] = Math.max(
            dp(m - 1, n),
            dp(m, n - 1)
        ) + grid[m][n];
        return memb[m][n];
    }
    

    return dp(m - 1, n - 1);
};



/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    var a = 0;
    var b = 0;
    var c = 0;
    var dp = [1];
    for (var i = 1; i < n; i++) {
        // debugger;
        var n2 = dp[a] * 2;
        var n3 = dp[b] * 3;
        var n5 = dp[c] * 5;
        dp[i] = Math.min(Math.min(n2, n3), n5);
        if (dp[i] === n2) {
            a++;
        }
        if (dp[i] === n3) {
            b++;
        }
        if (dp[i] === n5) {
            c++;
        }
    }
    return dp[n - 1];
};



/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    var dp = [0, 0];
    var min = prices[0];
    var len = prices.length;
    for (var i = 1; i < len; i++) {
        if (prices[i] > prices[i - 1]) {
            if (prices[i] - min > dp[i - 1]) {
                dp[i] = prices[i] - min;  
            } else {
                dp[i] = dp[i - 1];
            }
        } else {
            dp[i] = dp[i - 1];
            if (prices[i] < min) {
                min = prices[i];
            }
        }
    }
    return dp[len - 1] ? dp[len - 1] : 0;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    var cost = Number.MAX_SAFE_INTEGER;
    var profit = 0;
    prices.forEach(price => {
        cost = Math.min(cost, price);
        profit = Math.max(profit, price - cost);
    });
    return profit;
};
// console.log(maxProfit([1,7]));
// console.log(maxProfit([7,1,5,3,6,4]));
// console.log(maxProfit([3,2,6,5,0,3]));



/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {

    var recur = function(root, left, right) {
        if (left > right) {
            return null;
        }
        var val = preorder[root];
        var node = new TreeNode(val);
        var i = inorder.indexOf(val);
        node.left = recur(root + 1, left, i - 1);
        node.right = recur(root + i - left + 1, i + 1, right);
        return node;
    }

    return recur(0, 0, inorder.length - 1);
};
// console.log(buildTree([3,9,20,15,7],[9,3,15,20,7]));
// console.log(buildTree([1,2],[1,2]));



/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (x === 0 && n === 0) {
        return 1;
    }
    if (x === 0) {
        return 0;
    }
    let res = 1;
    let num = n;
    if (num < 0) {
        num = -num;
        x = 1 / x;
    }
    while (num) {
        if (num & 1) {
            res *= x;
        }
        x *= x;
        num >>>= 1;
    }
    return res;
};

 

/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function(postorder) {
    var recur = function(postorder, i, j) {
        if (i >= j) {
            return true;
        }
        var p = i;
        // 找到第一个大于根节点的节点m
        while (postorder[p] < postorder[j]) {
            p++;
        }
        var m = p;
        // m之后的节点都需要大于根节点
        while (postorder[p] > postorder[j]) {
            p++;
        }
        // 判断左子树区间和右子树区间是否满足条件
        return p === j && recur(postorder, i, m - 1) && recur(postorder, m, j - 1);
    }
    return recur(postorder, 0, postorder.length - 1);
};
// console.log(verifyPostorder([4, 8, 6, 12, 16, 14, 10]));



/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var isStraight = function(nums) {
//     var repeat = new Set();
//     var max = 0;
//     var min = 14;
//     for (var i = 0; i < nums.length; i++) {
//         var num = nums[i];
//         if (num === 0) {
//             continue;
//         }
//         max = Math.max(max, num);
//         min = Math.min(min, num);
//         if (repeat.has(num)) {
//             return false;
//         }
//         repeat.add(num);
//     }
//     return max - min < 5;
// };
var isStraight = function(nums) {
    nums.sort();
    var joker = 0;
    for (var i = 0; i < 4; i++) {
        if (nums[i] === 0) {
            joker++;
        } else if (nums[i] === nums[i + 1]) {
            return false;
        }
    }
    return nums[4] - nums[joker] < 5;
}
// console.log(isStraight([1,2,3,4,5]));
// console.log(isStraight([1,2,3,4,6]));
// console.log(isStraight([0,0,1,2,5]));



/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    var repeat = new Set();
    for (var i = 0; i < nums.length; i++) {
        if (repeat.has(nums[i])) {
            return nums[i];
        }
        repeat.add(nums[i]);
    }
    return -1;
};
// console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));



/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    var i = matrix.length - 1;
    var j = 0;
    while (i >= 0 && j < matrix[0].length) {
        if (matrix[i][j] > target) {
            i--;
        } else if (matrix[i][j] < target) {
            j++;
        } else {
            return true;
        }
    }
    return false;
};
// console.log(findNumberIn2DArray([
//     [1,   4,  7, 11, 15],
//     [2,   5,  8, 12, 19],
//     [3,   6,  9, 16, 22],
//     [10, 13, 14, 17, 24],
//     [18, 21, 23, 26, 30]
// ], 5));
// console.log(findNumberIn2DArray([
//     [1,   4,  7, 11, 15],
//     [2,   5,  8, 12, 19],
//     [3,   6,  9, 16, 22],
//     [10, 13, 14, 17, 24],
//     [18, 21, 23, 26, 30]
// ], 20));



/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    var i = 0;
    var j = numbers.length - 1;
    var m;
    while (i < j) {
        m = Math.floor((i + j) / 2);
        if (numbers[m] > numbers[j]) {
            i = m + 1;
        } else if (numbers[m] < numbers[j]) {
            j = m;
        } else {
            // j--;
            var x = i;
            for (var k = i + 1; k < j; k++) {
                if(numbers[k] < numbers[x]) {
                    x = k;
                }
            }
            return numbers[x];
        }
    }
    return numbers[i];
};
// console.log(minArray([1,3,5]));
// console.log(minArray([3,1,1,1,1]));
// console.log(minArray([3,1,1]));
// console.log(minArray([3,2]));
// console.log(minArray([3,4,5,1,2]));
// console.log(minArray([4,5,1,2,3]));
// console.log(minArray([3,4,5,6,7,1,2]));
// console.log(minArray([2,2,2,0,1]));



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return helper(nums, target) - helper(nums, target - 1);
};
var helper = function(nums, target) {
    var i = 0;
    var j = nums.length - 1;
    var m;
    while (i <= j) {
        m = Math.floor((i + j) / 2);
        if (nums[m] <= target) {
            i = m + 1;
        } else {
            j = m - 1;
        }
    }
    return i;
};
// console.log(search([5,7,7,8,8,8,10], 6));
// console.log(search([5,7,7,8,8,8,10], 10));
// console.log(search([5,7,8,8,8,8,8], 8));



/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    var i = 0;
    var j = nums.length - 1;
    var m; 
    while (i <= j) {
        m = Math.floor((i + j) / 2);
        if (nums[m] <= m) {
           i = m + 1; 
        } else {
            j = m - 1;
        }
    }
    return i;
};
// console.log(missingNumber([0,1,3]));
// console.log(missingNumber([0,1,2,3,4,5,6,7,9]));



/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(arr, val) {
    var list = new LinkedList();
    for (var i = 0; i < arr.length; i++) {
        list.append(arr[i]);
    }
    var head = list.head;
    
    if (head.val === val) {
        return head.next;
    }
    var pre = head;
    var cur = head.next;
    while (pre !== null && cur.val !== val) {
        pre = cur;
        cur = cur.next;
    }
    if (cur !== null) {
        pre.next = cur.next;
    }
    return head;
};
// console.log(deleteNode([4,5,1,9], 4));
// console.log(deleteNode([4,5,1,9], 5));
// console.log(deleteNode([4,5,1,9], 1));



/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
    var i = 0;
    var j = nums.length - 1;
    while (i < j) {
        while (i < j && nums[i] % 2 === 1) {
            i++;
        }
        while (i < j && nums[j] % 2 === 0) {
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
};
// console.log(exchange([1,2,3,4]));



/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(arr, k) {
    var list = new LinkedList();
    for (var i = 0; i < arr.length; i++) {
        list.append(arr[i]);
    }

    var head = list.head;
    var former = head;
    var latter = head;
    while (k > 0) {
        former = former.next;
        k--;
    }
    console.log(former);
    while (former !== null) {
        former = former.next;
        latter = latter.next;
    }

    return latter;
};
// console.log(getKthFromEnd([1,2,3,4], 2));



/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(arr1, arr2) {
    var l1 = new LinkedList();
    var l2 = new LinkedList();
    for (var i = 0; i < arr1.length; i++) {
        l1.append(arr1[i]);
    }
    for (var i = 0; i < arr2.length; i++) {
        l2.append(arr2[i]);
    }
    
    var node = new ListNode(0);
    var cur = node;
    var head1 = l1.head;
    var head2 = l2.head;

    while (head1 && head2) {
        if (head1.val < head2.val) {
            cur.next = head1;
            head1 = head1.next;
        } else {
            cur.next = head2;
            head2 = head2.next;
        }
        cur = cur.next;
    }
    
    cur.next = head1 ? head1 : head2;
    
    return node.next;
};
// console.log(mergeTwoLists([1,2,4], [1,3,4]));



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var i = 0;
    var j = nums.length - 1;
    var sum;
    while (i < j) {
        sum = nums[i] + nums[j];
        if (sum > target) {
            j--;
        } else if (sum < target) {
            i++;
        } else {
            return [nums[i], nums[j]];
        }
    }
    return [nums[i], nums[j]];
};
// console.log(twoSum([2,7,11,15], 9));
// console.log(twoSum([8,10,26,30,31,33,47,60], 40));



/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    s = s.trim();
    var j = s.length - 1;
    var i = j;
    var res = '';

    while (i >= 0) {
        while (i >= 0 && s.charAt(i) !== ' ') {
            i--;
        }
        res += s.substring(i + 1, j + 1) + ' ';
        while (i >= 0 && s.charAt(i) === ' ') {
            i--;
        }
        j = i;
    }

    return res.trim();
};
// console.log(reverseWords('the sky is blue'));
// console.log(reverseWords('  hello world!  '));
// console.log(reverseWords('a good   example'));



/**
 * @param {number} n - a positive integer
 * @return {number}
 */
// var hammingWeight = function(n) {
//     n = parseInt(n, 2);
//     var res = 0;
//     while (n !== 0) {
//         res += n & 1;
//         n >>>= 1;
//     }
//     return res;
// };
var hammingWeight = function(n) {
    n = parseInt(n, 2);
    var res = 0;
    while (n !== 0) {
        res++;
        n &= (n - 1);
    }
    
    return res;
};
// console.log(hammingWeight('00000000000000000000000000001011'));
// console.log(hammingWeight('00000000000000000000000010000000'));
// console.log(hammingWeight('11111111111111111111111111111101'));



/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
    if (n <= 3) {
        return n - 1;
    }
    var a = Math.floor(n / 3);
    var b = n % 3;
    if (b === 0) {
        return Math.pow(3, a);
    }
    if (b === 1) {
        return Math.pow(3, a - 1) * 4;
    }
    return Math.pow(3, a) * 2;
};
// console.log(cuttingRope(2));
// console.log(cuttingRope(9));
// console.log(cuttingRope(10));



/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    var x = 0;
    var votes = 0;

    // 摩尔投票法
    for (var i = 0; i < nums.length; i++) {
        if (votes === 0) {
            x = nums[i];
        }
        votes += (nums[i] === x ? 1: -1);
    }
    return x;
};
// console.log(majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2]));
// console.log(majorityElement([1, 3, 3, 3, 3, 2, 5, 4, 2, 3, 3]));



/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n) {
    var digit = 1;
    var res = 0;
    var high = Math.floor(n / 10);
    var cur = n % 10;
    var low = 0;
    while (high !== 0 || cur !== 0) {
        if (cur === 0) {
            res += high * digit;
        } else if (cur === 1) {
            res += (high * digit + low + 1);
        } else {
            res += ((high + 1) * digit);
        }
        low += cur * digit;
        cur = high % 10;
        high = Math.floor(high / 10);
        digit *= 10;
    }
    return res;
};
// console.log(countDigitOne(12));
// console.log(countDigitOne(13));
// console.log(countDigitOne(2304));



/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    var digit = 1;
    var start = 1;
    var count = 9;
    while (n > count) {
        n -= count;
        start *= 10;
        digit += 1;
        count = digit * start * 9;
    }
    var num = start + (n - 1) / digit;
    return num.toString().charAt((n - 1) % digit) - '0';
};
// console.log(findNthDigit(3));
// console.log(findNthDigit(11));



/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    var len = a.length;
    if (len === 0) {
        return [];
    }
    var b = [1];
    var tmp = 1;
    for (var i = 1; i < len; i++) {
        b[i] = b[i - 1] * a[i -1];
    }
    for (var j = len - 2; j >= 0; j--) {
        tmp *= a[j + 1];
        b[j] *= tmp;
    }
    return b;
};
// console.log(constructArr([1,2,3,4,5,6]));



/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (matrix === null || matrix.length === 0) {
        return [];
    }
    var res = [];
    res.push(...matrix.shift());
    while (matrix.length > 0) {
        if (matrix[0].length > 0) {
            matrix = rotateMatrix(matrix);
        }
        res.push(...matrix.shift());
    }
    return res;
};
// 旋转矩阵
var rotateMatrix = function(matrix) {
    var newMatrix = [];
    for (var j = matrix[0].length - 1; j >= 0; j--) {
        var tmpMatrix = [];
        for (var i = 0; i < matrix.length; i++) {
            tmpMatrix.push(matrix[i][j]);
        }
        newMatrix.push(tmpMatrix);
    }

    return newMatrix;
};
// console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));
// console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]));



/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
    var stack = [];
    var i = 0;
    for (var j = 0; j < pushed.length; j++) {
        stack.push(pushed[j]);
        while (stack.length > 0 && stack[stack.length - 1] === popped[i]) {
            stack.pop();
            i++;
        }
    }
    return stack.length === 0;
};
// console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1]));
// console.log(validateStackSequences([1,2,3,4,5], [4,3,5,1,2]));
// console.log(validateStackSequences([1,2,3,4,5], [1,2,3,4,5]));
// console.log(validateStackSequences([0,2,1], [0,1,2]));

















































































