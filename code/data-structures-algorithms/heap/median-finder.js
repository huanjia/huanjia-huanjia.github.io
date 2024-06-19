var MedianFinder = function () {
  this.maxHeap = new Heap();
  this.minHeap = new Heap((x, y) => x < y);
};

MedianFinder.prototype.addNum = function (num) {
  this.maxHeap.insert(num);
  this.minHeap.insert(this.maxHeap.top());
  this.maxHeap.extract();

  if (this.maxHeap.container.length < this.minHeap.container.length) {
    this.maxHeap.insert(this.minHeap.top());
    this.minHeap.extract();
  }
};

MedianFinder.prototype.findMedian = function () {
  return this.maxHeap.container.length > this.minHeap.container.length
    ? this.maxHeap.top()
    : (this.maxHeap.top() + this.minHeap.top()) / 2;
};

// var obj = new MedianFinder();
// console.log(obj.findMedian());
// obj.addNum(5);
// console.log(obj.findMedian());
// obj.addNum(2);
// console.log(obj.findMedian());
// obj.addNum(4);
// console.log(obj.findMedian());
// obj.addNum(3);
// console.log(obj.findMedian());
// obj.addNum(1);
// console.log(obj.findMedian());
// obj.addNum(6);
// console.log(obj.findMedian());
