const { promises: Fs } = require('fs')

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