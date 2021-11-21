const { promises: Fs } = require('fs');
const fs = require('fs');

module.exports = {
	exists: async function(path){
		try {
			await Fs.access(path)
			return true
		  } catch {
			return false
		  }
	}
}