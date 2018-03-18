var apiEndpoint = 'https://api-vanhack-event-sp.azurewebsites.net/api/v1'

var User = {

  auth: (email, password) => {

    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      var formData  = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      fetch(apiEndpoint+'/Customer/auth', {
        method: 'post',
        body: formData
      }).then(function(response) {
        if (response.status === 200) {
          response.text().then(text => resolve(text))
        } else {
          response.text().then(text => {
              reject(JSON.parse(text))
          });
        }
      }).catch(function(err) {
        reject(err)
      });
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
          response.text().then(text => {
              reject(JSON.parse(text))
          });
        }
      }).catch(function(err) {
        reject(err)
      });
    })
  }

}

var Cuisines = {

  get: (q) => {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var endpoint = apiEndpoint+'/Cousine';
      if (!isNaN(q)) {
        endpoint += '/'+q+'/stores';
      }
      fetch(endpoint, {
        method: 'get'
      }).then(function(response) {
        return response.text().then(text => {
          resolve(JSON.parse(text))
        })
      }).catch(function(err) {
        reject(err)
      });
    })
  }

}

var Stores = {

  getByCuisineId: (cuisineId) => {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var endpoint = apiEndpoint+'/Cousine';
      if (!isNaN(cuisineId)) {
        endpoint += '/'+cuisineId+'/stores';
      }
      fetch(endpoint, {
        method: 'get'
      }).then(function(response) {
        return response.text().then(text => {
          resolve(JSON.parse(text))
        })
      }).catch(function(err) {
        reject(err)
      });
    })
  },

  getById: (storeId) => {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var endpoint = apiEndpoint+'/Store/'+storeId;

      fetch(endpoint, {
        method: 'get'
      }).then(function(response) {
        return response.text().then(text => {
          resolve(JSON.parse(text))
        })
      }).catch(function(err) {
        reject(err)
      });
    })
  },

  getProducts: (storeId) => {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var endpoint = apiEndpoint+'/Store/'+storeId+'/products';

      fetch(endpoint, {
        method: 'get'
      }).then(function(response) {
        return response.text().then(text => {
          resolve(JSON.parse(text))
        })
      }).catch(function(err) {
        reject(err)
      });
    })
  },

  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var endpoint = apiEndpoint+'/Product/'+id;

      fetch(endpoint, {
        method: 'get'
      }).then(function(response) {
        return response.text().then(text => {
          resolve(JSON.parse(text))
        })
      }).catch(function(err) {
        reject(err)
      });
    })
  }

}

export { User, Cuisines, Stores }
