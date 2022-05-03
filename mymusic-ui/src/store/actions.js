import VueCookies from "vue-cookies";

import api from "../api";

export default {
    registerUser(context, obj) {
        api.registerNewUser(obj)
            .then(response => {
                context.commit('setUser', response.data);
                context.dispatch("getToken", { username: obj.username, password: obj.password });
            })
    },
    async getToken(context, { username, password }) {
        api.readToken({ username: username, password: password })
            .then(function (response) {
                if (response != undefined && response.status === 200) {
                    context.commit("setAuthorized", true);
                    context.commit("setUsername", username);
                    context.commit("setPassword", password);
                    context.commit("setToken", response.data.access_token);
                    if (response.data.access_token.length > 10) {
                        VueCookies.set("username", username, -1);
                        VueCookies.set("token", response.data.access_token, -1);
                        context.commit("setToken", response.data.access_token);

                        context.dispatch("updatePeriod");
                        context.dispatch("refreshFlows");
                        
                        if (username == "demo") {
                          context.commit("setIsDemo", true);              
                        }            
                    }
                    context.commit("setLoginOrRegistrationError", "");
                }
            })
            .catch(function () {
                context.commit("setLoginOrRegistrationError", "Имя пользователя или пароль некорректны");
                context.commit("setAuthorized", false);
            });
    },
    getTokenFromCookie(context) {
        let token;
        if (this.state.auth.token == "") {
            token = VueCookies.get("token");            
        }        
        if (token) {
            context.commit("setToken", token);            
        }
        return token
    },
    getUserId(context, token) {        
        return api.readUserId(token).then((user) => {
            context.commit("setUser", user.data);
            
            context.commit("setAuthorized", true);
            context.dispatch("updatePeriod");
            context.dispatch("refreshFlows");
            
            if (this.state.user.username == "demo") {
              context.commit("setIsDemo", true);              
            }            

            return user;               
        }).catch((error) => error)      
    },
    getObj(context, { url, storepoint, params }) {
        if (this.state.user.id != undefined) {
            return api.readObject({ token: this.state.auth.token, user_id: this.state.user.id, url: url, params: params })
                .then(response => {
                    context.commit(storepoint, response.data);
                    return response;
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                        return error;
                    }
                });
        }
        else {
            return api.readUserId(this.state.auth.token).then((user) => {
                context.commit("setUser", user.data);
                return api.readObject({ token: this.state.auth.token, user_id: user.data.id, url: url, params: params })
            }).then(response => {
                context.commit(storepoint, response.data);
                return response;
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                        return error;
                    }
                });
        }
    },
    createObj(context, { url, storepoint, obj }) {
        if (this.state.user.id != undefined) {
            api.createObject({ token: this.state.auth.token, user_id: this.state.user.id, url: url, obj: obj })
                .then(response => {
                    context.commit(storepoint, response.data);
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);                        
                    }
                });
        }
        else {
            api.readUserId(this.state.auth.token).then((user) => {
                context.commit("setUser", user.data)
                return api.createObject({ token: this.state.auth.token, user_id: this.state.user.id, url: url, obj: obj })
            }).then(response => {
                context.commit(storepoint, response.data);
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                    }
                });
        }
    },
    deleteObj(context, { url, storepoint, id, params }) {
        if (this.state.user.id != undefined) {
            api.deleteObject({ token: this.state.auth.token, user_id: this.state.user.id, url: url, params: params })
                .then(() => {
                    context.commit(storepoint, id);
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);                        
                    }
                });
        }
        else {
            api.readUserId(this.state.auth.token).then((user) => {
                context.commit("setUser", user.data)
                return api.deleteObject({ token: this.state.auth.token, user_id: this.state.user.id, url: url, params: params })
            }).then(() => {
                context.commit(storepoint, id);
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                    }
                });
        }
    },
    updateObj(context, { url, storepoint, id, obj }) {
        if (this.state.user.id != undefined) {
            api.updateObject({ token: this.state.auth.token, user_id: this.state.user.id, url: url, obj: obj })
                .then(() => {
                    context.commit(storepoint, id);
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);                        
                    }
                });
        }
        else {
            api.readUserId(this.state.auth.token).then((user) => {
                context.commit("setUser", user.data)
                return api.updateObject({ token: this.state.auth.token, user_id: this.state.user.id, url: url, obj: obj })
            }).then(() => {
                context.commit(storepoint, id);
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);                        
                    }
                });
        }
    },
    
    refreshMostPopular(context) {
        if (this.state.authorized) {

            const params = {
                date_in: this.state.calendar.dateIn,
                date_out: this.state.calendar.dateOut,
            };

            context.dispatch("getObj", {
                url: "/most_popular/",
                storepoint: "setMostPopular",
                params: params,
            });
        }
    },
    refreshFlows(context) {
        if (this.state.authorized) {

            const params = {
                date_in: this.state.calendar.dateIn,
                date_out: this.state.calendar.dateOut,
            };

            context.dispatch("getObj", {
                url: "/inflow/",
                storepoint: "setInflow",
                params: params,
            });

            context.dispatch("getObj", {
                url: "/outflow/",
                storepoint: "setOutflow",
                params: params,
            });

            context.dispatch("getObj", {
                url: "/most_popular/",
                storepoint: "setMostPopular",
                params: params,
            });

            context.dispatch("getObj", { url: "/inflow_regular/", storepoint: "setInflowRegular" });
            context.dispatch("getObj", { url: "/outflow_regular/", storepoint: "setOutflowRegular" });
        }
    },
    refreshAssets(context) {
        if (this.state.authorized) {
            var params = {};
            if (this.state.calendar.dateAdd) {
                params = { date: this.state.calendar.dateAdd };
            }
            context.dispatch("getObj", { url: "/assets/", storepoint: "setAssets", params: params });
        }
    },
    refreshLiabilities(context) {
        if (this.state.authorized) {
            var params = {};
            if (this.state.calendar.dateAdd) {
                params = { date: this.state.calendar.dateAdd };
            }
            context.dispatch("getObj", { url: "/liabilities/", storepoint: "setLiabilities", params: params });
        }
    },
    refreshFlowsAll(context) {
        if (this.state.authorized) {

            const params = {
                date_in: "1970-01-01T00:00:00",
                date_out: "2295-12-31T23:59:59",
            };

            context.dispatch("getObj", {
                url: "/inflow/",
                storepoint: "setInflowAll",
                params: params,
            });

            context.dispatch("getObj", {
                url: "/outflow/",
                storepoint: "setOutflowAll",
                params: params,
            });

            context.dispatch("getObj", {
                url: "/reports/",
                storepoint: "setAssetsAll",
            });
        }
    },
    refreshCategories(context) {
        if (this.state.authorized) {
            context.dispatch("getObj", {
                url: "/categories/",
                storepoint: "setCategories",
            });
        }
    },
    exportToExcel(context, { url }) {
        if (this.state.user.id != undefined) {
            api.downloadFile({ token: this.state.auth.token, user_id: this.state.user.id, url: url })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    let date = new Date();
                    let filename = 'cashflow' + date.toISOString().split('T')[0] + ".xlsx";
                    link.setAttribute("download", filename);
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);                        
                    }
                });
        }
    },
}