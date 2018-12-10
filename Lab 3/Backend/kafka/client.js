var rpc = require('./kafkarpc');
var topicRPC = [];
//make request to kafka
function make_request(queue_name, response_queue_name, msg_payload, callback) {
	console.log('in make request');
	console.log(msg_payload);
	return new Promise((resolve, reject) => {
	getTopicRPC(queue_name).makeRequest(queue_name, response_queue_name, msg_payload, function (err, response) {
		let responseCallback = null;
			if (err) {
				console.log('In RPC: ' + err);
				responseCallback = callback(err, null);
			}
			else {
				console.log("response", response);
				responseCallback = callback(null, response);
			}
			resolve(responseCallback);
		});
	});
}

function getTopicRPC(topic) {
	let isPresent = false;
	let RPC = null;
	topicRPC.map((topic_rpc) => {
		if (topic_rpc.name === topic) {
			isPresent = true;
			RPC = topic_rpc.rpc;
			return;
		}
	});
	if (!isPresent) {
		let newRPC = {
			name: topic,
			rpc: new rpc()
		}
		topicRPC.push(newRPC);
		RPC = newRPC.rpc;
	}
	return RPC;
}


exports.make_request = make_request;