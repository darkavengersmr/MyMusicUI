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
    setRegister(state, payload) {
        state.register = payload;
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
    setPlayback(state, payload) {
        state.playback = payload;
    },
    setFilters(state, payload) {
        state.filters = payload;
    },
    setNowPlay(state, payload) {
        state.now_play = payload;
    },
    setGenres(state, payload) {
        state.genres = payload;
    },
    setArtistsByGenre(state, payload) {
        state.artists_by_genre = payload;
    },
    setYears(state, payload) {
        state.years = payload;
    },
    setLike(state, payload) {
        state.like = payload;
    },
    setPrefs(state, payload) {
        state.like = payload;
    },
}