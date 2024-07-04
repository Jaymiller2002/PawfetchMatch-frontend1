import axios from 'axios'

// const baseUrl = (function() {
//   if (NODE_ENV === 'development') {
//     console.log('dev env')
//     return 'http://127.0.0.1:8000'
//   } else {
//     console.log('prod')
//     return 'https://pawfetchmatch-backend2-aged-sunset-9663.fly.dev'
//   }
// })

export const baseUrl = import.meta.env.VITE_BASE_URL

console.log(baseUrl)

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

// Get All Profile's
export const fetchAllProfiles = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/profiles/`, // Adjust the endpoint URL to match your API endpoint for fetching all profiles
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'application/json', // Adjust the content type if needed
    }
  }).then(response => {
    console.log('ALL PROFILES: ', response.data); // Log the response data
    return response.data; // Return the response data
  }).catch(error => {
    console.log('ERROR: ', error); // Log any errors
    if (error.response && error.response.status === 401) {
      auth.setAccessToken(undefined); // Clear access token on 401 Unauthorized error
    }
    throw error; // Re-throw the error to handle it further if needed
  });
};


// Create User API
export const createUser = ({ username, password, firstName, lastName, bio, image, auth }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      image: image,
    },
  }).then(response => {
    console.log('CREATE USER: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}

// Update User API
export const updateUser = ({  
  firstName, 
  lastName, 
  bio, 
  image, 
  auth 
}) => {
  const formData = new FormData();
  console.log('FORM DATA FOR UPDATE USER: ', formData)
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('bio', bio);
  formData.append('image', image);

  return axios({
    method: 'put',
    url: `${baseUrl}/update-user/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  }).then(response => {
    console.log("UPDATED USER: ", response)
    return response
  }).catch(error => {
    console.log("ERROR UPDATING USER: ", error)
    throw error; // Rethrow the error to handle it in the calling code
  })
}

// Delete User API
export const deleteUser = ({ auth}) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-user/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    console.log("DELTED USER: ", response)
    return response
  }).catch(error => {
    console.log("ERROR DELETING USER: ", error)
  })
}

// Create Listing API
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


// Update Listing API
export const updateListing = ({ title, description, price, quantity, image, auth }) => {
  const formData = new FormData();
  console.log('FORM DATA FOR UPDATE LISTING: ', formData)
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('quantity', quantity);
  formData.append('image', image);
  
  return axios({
    method: 'put',
    url: `${baseUrl}/update-listing/`, // Assuming the endpoint is 'update-listing'
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
  .then(response => {
    console.log("UPDATED LISTING: ", response);
    return response;
  })
  .catch(error => {
    console.log("ERROR UPDATING LISTING: ", error);
    throw error;
  });
};

// Delete Listing API
export const deleteListing = ({ id, auth }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-listing/${id}`, // Assuming the endpoint is 'delete-listing'
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
  .then(response => {
    console.log("Listing deleted:", response);
    return response;
  })
  .catch(error => {
    console.error("Error deleting listing:", error);
    throw error ;
  });
};

// Get Listing API
export const getListing = () => {
  return axios.get(`${baseUrl}/get-listing/`)
    .then(response => {
      console.log("GOT LISTINGS: ", response);
      return response.data;
    })
    .catch(error => {
      console.log("ERROR FETCHING LISTINGS: ", error);
      throw error; // Re-throw the error to be handled by the caller
    });
};

// Create Message API
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

// Update Message API
export const updateMessage = ({ id, content, image, auth }) => {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('image', image); // Assuming 'image' is a file or blob

  return axios({
    method: 'put',
    url: `${baseUrl}/update-message/${id}`, // Assuming the endpoint is 'update-message'
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
  .then(response => {
    console.log("Message updated:", response.data);
    return response;
  })
  .catch(error => {
    console.error("Error updating message:", error);
    throw error;
  });
};

// Delete Message API
export const deleteMessage = ({ id, auth }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-message/${id}`, // Assuming the endpoint is 'delete-message'
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
  .then(response => {
    console.log("Message deleted:", response.data);
    return response;
  })
  .catch(error => {
    console.error("Error deleting message:", error);
    throw error;
  });
};


// Get Messages API
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

// Logout API
export const logout = ({ auth }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/logout/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
  }).then(response => {
    console.log("LOGGED OUT: ", response.data)
    return response.data
  }).catch(error => {
    console.log("ERROR LOGGING OUT: ", error)
  })
}
