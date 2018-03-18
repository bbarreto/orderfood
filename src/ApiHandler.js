var apiEndpoint = 'https://api-vanhack-event-sp.azurewebsites.net/api/v1'

var User = {

  auth: (email, password) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var formData  = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return fetch(apiEndpoint+'/Customer/auth', {
      method: 'post',
      body: formData
    }).then(function(response) {
      if (response.status === 200) {
        return response.text().then(text => {
          return text
        })
      } else {
        return response.text().then(text => {
            return Promise.reject(JSON.parse(text))
        });
      }
    })
  },

  signup: (user) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return fetch(apiEndpoint+'/Customer', {
      method: 'post',
      body: JSON.stringify(user),
      headers: headers
    }).then(function(response) {
      if (response.status === 200) {
        return response.text().then(text => {
          return text
        })
      } else {
        return response.text().then(text => {
            return Promise.reject(JSON.parse(text))
        });
      }
    })
  }

}

var Cuisines = {

  get: (q) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var endpoint = apiEndpoint+'/Cousine';
    if (!isNaN(q)) {
      endpoint += '/'+q+'/stores';
    }
    return fetch(endpoint, {
      method: 'get'
    }).then(function(response) {
      return response.text().then(text => {
        return JSON.parse(text)
      })
    })
  }

}

var Stores = {

  getByCuisineId: (cuisineId) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var endpoint = apiEndpoint+'/Cousine';
    if (!isNaN(cuisineId)) {
      endpoint += '/'+cuisineId+'/stores';
    }
    return fetch(endpoint, {
      method: 'get'
    }).then(function(response) {
      return response.text().then(text => {
        return JSON.parse(text)
      })
    })
  },

  getById: (storeId) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var endpoint = apiEndpoint+'/Store/'+storeId;

    return fetch(endpoint, {
      method: 'get'
    }).then(function(response) {
      return response.text().then(text => {
        return JSON.parse(text)
      })
    })
  },

  getProducts: (storeId) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var endpoint = apiEndpoint+'/Store/'+storeId+'/products';

    return fetch(endpoint, {
      method: 'get'
    }).then(function(response) {
      return response.text().then(text => {
        return JSON.parse(text)
      })
    })
  },

  getProductById: (id) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var endpoint = apiEndpoint+'/Product/'+id;

    return fetch(endpoint, {
      method: 'get'
    }).then(function(response) {
      return response.text().then(text => {
        return JSON.parse(text)
      })
    })
  }

}

var Orders = {

  create: (order) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer "+localStorage.token);

    return fetch(apiEndpoint+'/Order', {
      method: 'post',
      body: JSON.stringify(order),
      headers: headers
    }).then(function(response) {
      if (response.status === 401) {
        return Promise.reject({'error': 'You need to authenticate before placing this order.'})
      } else if (response.status === 200) {
        return response.text().then(text => {
          return JSON.parse(text)
        })
      } else {
        return response.text().then(text => {
          return Promise.reject(JSON.parse(text))
        })
      }
    })
  }

}

export { User, Cuisines, Stores, Orders }
