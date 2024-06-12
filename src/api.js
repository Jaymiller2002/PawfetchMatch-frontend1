import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"

export const getToken = ({ auth, username, password }) => {
  axios.post(`${baseUrl}/token/`, {
    username: username,
    password: password
  }).then(response => {
    console.log('RESPONSE: ', response)
    auth.setAccessToken(response.data.access)
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
  })
}

export const fetchUser = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/profile/`, 
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    console.log('PROFILE: ', response)
    return response
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
  })
}

export const createUser = ({ username, password, firstName, lastName, auth }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName
    },
  }).then(response => {
    console.log('CREATE USER: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}

export const createListing = ({ title, description, price, quantity, image, auth}) => {
  console.log("AUTH TOKEN: ", auth)
  return axios({
    method: 'post',
    url: `${baseUrl}/create-listing/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      image: image,
    },
  }).then(response => {
    console.log("CREATED LISTING: ", response)
    return response
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}

export const getListing = ({ title, description, price, quantity, image, auth}) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-listing/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      image: image
    },
  }).then(response => {
    console.log("GOT LISTINGS: ", response)
    return response
  }).catch(error => {
    console.log("ERROR FETCHING LISTINGS: ", error)
  })
}

export const createMessage = ({ sender, receiver, content, image, auth}) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-message/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      sender: sender,
      receiver: receiver,
      content: content,
      image: image
    },
  }).then(response => {
    console.log("CREATED MESSAGE: ", response)
    return response
  }).catch(error => {
    console.log("ERROR CREATING MESSAGE: ", error)
  })
}

export const getMessages = ({ sender, receiver, content, image, auth}) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-message/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      sender: sender,
      receiver: receiver,
      content: content,
      image: image
    },
  }).then(response => {
    console.log("GOT MESSAGES: ", response)
    return response
  }).catch(error => {
    console.log("ERROR GETTING MESSAGES: ", error)
  })
}