'use strict'

class MeController {

    async me( { response, transform, auth } ) {
        
        var test = {
            msg: "Test API OK"
        }

        return response.send(test)
    }

}

module.exports = MeController
