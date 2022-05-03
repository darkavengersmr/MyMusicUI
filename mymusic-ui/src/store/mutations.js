export default {
    setIsMobile(state, payload) {
        state.isMobile = payload;
    },
    setIsDemo(state, payload) {
        state.isDemo = payload;
    },
    setAuthorized(state, payload) {
        state.authorized = payload;
    },
    setUsername(state, payload) {
        state.auth.username = payload;
    },
    setPassword(state, payload) {
        state.auth.password = payload;
    },
    setToken(state, payload) {
        state.auth.token = payload;
    },
    setUser(state, payload) {
        state.user = payload;
    },    
    setLoginOrRegistrationError(state, payload) {
        state.loginOrRegistrationError = payload;
    },
}