// https://mp.weixin.qq.com/s/auLUlisGahUQQ1xL43-RVw

function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

Node.prototype.show = function() {
  return this.data;
}

function BST() {
  this.root = null;
}

BST.prototype.insert = function(data) {
  var node = new Node(data, null, null);
  if (this.root == null) {
    this.root = node;
  } else {
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current == null) {
          parent.left = node;
          break;
        }
      } else {
        current = current.right;
        if (current == null) {
          parent.right = node;
          break;
        }
      }
    }
  }
}

//测试数据
var bst = new BST();
var nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];
for (var i = 0; i < nums.length; i++) {
  bst.insert(nums[i]);
}

// 前序遍历
BST.prototype.perOrder = function(node) {
  if (node) {
    console.log(node.show() + " ");
    this.perOrder(node.left);
    this.perOrder(node.right);
   }
}
bst.perOrder(bst.root);

// 中序遍历
BST.prototype.inOrder = function(node) {
  if (node) {
    this.inOrder(node.left);
    console.log(node.show() + " ");
    this.inOrder(node.right);
  }
}
bst.inOrder(bst.root);

// 后序遍历
BST.prototype.postOrder = function(node) {
  if (node) {
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.show() + " ");
  }
}
bst.postOrder(bst.root);

// 查找二叉树最小值
var minNode = function(node) {
  if (node) {
    while (node.left !== null) {
      return minNode(node.left);
    }
    return node.data;
  }
  return null;
}
BST.prototype.findMin = function(root) {
  return minNode(root);
}
bst.findMin(bst.root);

// 查找二叉树最大值
var maxNode = function(node) {
  if (node) {
    while (node.right !== null) {
      return maxNode(node.right);
    }
    return node.data;
  }
  return null;
}
BST.prototype.findMax = function(root) {
  return maxNode(root);
}
bst.findMax(bst.root);

// 删除二叉树最小值
BST.prototype.delMinNode = function(root) {
  if (!root) {
    return false;
  }
  var current = root;
  if (current.left == null) {
    var rightNode = current.right;
    return rightNode;
  }
  current.left = this.delMinNode(current.left);
  return current;
}
bst.delMinNode(bst.root);

// 删除二叉树最大值
BST.prototype.delMaxNode = function(root) {
  if (!root) {
    return false;
  }
  var current = root;
  if (current.right == null) {
    var leftNode = current.left;
    return leftNode;
  }
  current.right = this.delMaxNode(current.right)
  return current;
}
bst.delMaxNode(bst.root);

// 判断二叉树是否存在某值
var searchNode = function(key, node) {
  if (node == null) {
    return false;
  }
  if (node.data > key) {
    return searchNode(key, node.left);
  } else if (node.data < key) {
    return searchNode(key, node.right);
  } else {
    return true;
  }
}
BST.prototype.search = function (key, root) {
  return searchNode(key, root);
}
bst.search(3, bst.root);

// 求二叉树节点个数
BST.prototype.sizeOfTree = function(root) {
  if (!root) {
    return 0;
  }
  return 1 + this.sizeOfTree(root.left) + this.sizeOfTree(root.right);
}
bst.sizeOfTree(bst.root);

// 求二叉树层级
BST.prototype.heightOfTree = function(root) {
  if (!root) {
    return 0;
  }
  return Math.max(this.heightOfTree(root.left), this.heightOfTree(root.right)) + 1;
}
bst.heightOfTree(bst.root);

// 求二叉树第K层的节点个数
BST.prototype.numOfKthLevel = function(root, k) {
  if (k < 0) {
    return 0;
  }
  if (root === null) {
    return 0;
  }
  if (root !== null && k === 1) {
    return 1;
  }
  return this.numOfKthLevel(root.left, k - 1) + this.numOfKthLevel(root.right, k - 1);
}
bst.numOfKthLevel(bst.root,3);

// 求二叉树是否相同
BST.prototype.compareStruct = function(root1, root2) {
  if (root1 === null && root2 === null) {
    return true;
  }
  if ((root1 !== null && root2 === null) || (root1 === null && root2 !== null)) {
    return false;
  }
  return (this.compareStruct(root1.left, root2.left) && this.compareStruct(root1.right, root2.right));
}
bst.compareStruct(bst.root, bst.root);

// 测试数据
var bst = new BST();
var nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];
for (var i = 0; i < nums.length; i++) {
  bst.insert(nums[i]);
}
console.log('bst', bst);

// 判断BST的合法性
var isValidBST = function(root) {
  return validBST(root, null, null);
};
var validBST = function(root, min, max) {
  if (root === null) {
    return true;
  }
  if (min !== null && root.val <= min.val) {
    return false;
  }
  if (max !== null && root.val >= max.val) {
    return false;
  }
  return validBST(root.left, min, root)
    && validBST(root.right, root, max);
} 














