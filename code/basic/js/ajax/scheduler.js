class Scheduler {
  constructor() {
    this.tasks = [];
    this.concurrent = 0;
  }
  add(promiseCreateor) {
    return new Promise((resolve) => {
      this.tasks.push(() => promiseCreateor().then(resolve));
      this.runTask();
    })
  }
  runTask() {
    if (this.concurrent >= 2) {
      return;
    }
    const task = this.tasks.shift();
    if (task) {
      this.concurrent++;
      task().then(() => {
        this.concurrent--;
        this.runTask();
      });
    }
  }
}

const timeout = timer => new Promise((resolve) => {
  setTimeout(resolve, timer);
});
const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => {
    console.log(order);
  });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(100, "4");
addTask(400, "5");

// output: 2 3 1 4
