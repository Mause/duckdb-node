const { parentPort, isMainThread, threadId, workerData } = require('worker_threads');

console.log({isMainThread, threadId, workerData, parentPort});

const duckdb = require('..'); // The presence of this line alone causes the issue

new duckdb.Database(":memory:").all("SELECT 42 AS answer", function (err, res) {
    parentPort.postMessage(JSON.stringify({workerData, pid: process.pid, err, res}));
});
