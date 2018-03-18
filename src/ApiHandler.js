import axios from 'axios';

var apiEndpoint = 'http://api-vanhack-event-sp.azurewebsites.net/api/v1'



var User = {

  auth: (email, password) => {

    return new Promise(resolve, reject) {
      axios.post(apiEndpoint+'/Customer/auth', {
        email: email,
        password: password
      })
      .then(function (response) {
        console.log('success', response);
        try {
          console.log(response.response.data)
          return JSON.parse(response.response.data)
        } catch (err) {
          console.log(err)
        }
      })
      .catch(function (error) {
        console.log('error', error.response)
        if (error.response) {
          try {
            return JSON.parse(error.response.data)
          } catch (err) {
            console.log(err)
          }
        } else {
          return false;
        }
      })
    }


  }

}

export { User }
