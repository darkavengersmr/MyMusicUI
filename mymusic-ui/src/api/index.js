import axios from "axios";

export default {
  registerNewUser(obj) {    
    return axios({
      method: 'post',
      url: '/register',
      headers: {
          "accept": "application/json"          
      },
     data: obj 
    })
  },
  readToken({username, password}) {    
    return axios({
      method: 'post',
      url: '/auth',
      headers: {
          "accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      data: 'username=' + username + '&password=' + password,
  })
  },
  readStatus({token, params}) {
    return axios({
      method: 'get',
      url: '/playback',
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
  })
  },
  readObject({token, url, params}) {
    return axios({
      method: 'get',
      url: url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
  })
  },
  createObject({token, url, params}) {
    return axios({
      method: 'post',
      url: url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })
  },
  deleteObject({token, url}) {
    return axios({
      method: 'delete',
      url: url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },      
    })
  },
}