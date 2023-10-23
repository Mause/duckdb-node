const { parentPort, workerData } = require('worker_threads');

const duckdb = require('..'); // The presence of this line alone causes the issue

if (!parentPort) {
	throw new Error('This script must be run as a worker thread.');
}

new duckdb.Database(":memory:").all("SELECT 42 AS answer", function (err, res) {
    parentPort.postMessage(JSON.stringify({workerData, pid: process.pid, err, res}));
});
