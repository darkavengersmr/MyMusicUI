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
  readObject({token, user_id, url, params}) {
    return axios({
      method: 'get',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
  })
  },
  createObject({token, user_id, url, obj}) {
    return axios({
      method: 'post',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
     data: obj 
    })
  },
  deleteObject({token, user_id, url, params}) {
    return axios({
      method: 'delete',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })
  },
  updateObject({token, user_id, url, obj}) {
    return axios({
      method: 'delete',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      data: obj
    })
  },
}