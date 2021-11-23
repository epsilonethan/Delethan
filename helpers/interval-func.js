module.exports={
	messageCheck: function() {
		const intervalObj = setInterval((rule) => {
			console.log("Checking messages");
		}, 10000)
	},
	rulesCheck: function() {
		const constintervalObj = setInterval((path) => {
			console.log("Checking rules config file");
		}, 10000)
	}
}