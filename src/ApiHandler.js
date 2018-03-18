import axios from 'axios';

var apiEndpoint = 'http://api-vanhack-event-sp.azurewebsites.net/api/v1'

var User = {

  auth: (email, password) => {
    return new Promise((resolve, reject) => {
      axios.post(apiEndpoint+'/Customer/auth?email='+encodeURI(email)+'&password='+encodeURI(password))
      .then(function (response) {
        if (response.response) {
          resolve(response.response.data)
        } else {
          reject({ error: 'Unable to understand the answer from server. Try again.' })
        }
      })
      .catch(function (error) {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({error: 'Unable to connect to backend.'})
        }
      })
    })
  },

  signup: (user) => {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      fetch(apiEndpoint+'/Customer', {
        method: 'post',
        body: JSON.stringify(user),
        headers: headers
      }).then(function(response) {
        if (response.status === 200) {
          response.text().then(text => resolve(text))
        } else {
          var text = response.text().then(text => {
              reject(JSON.parse(text))
          });
        }
      }).catch(function(err) {
        reject(err)
      });
    })
  }

}

export { User }
