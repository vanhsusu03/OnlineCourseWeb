export default {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    setStudent(state, matchStudent) {
      state.user = matchStudent;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setLogged(state, isLogin) {
      state.isLogin = isLogin;
    }
  };