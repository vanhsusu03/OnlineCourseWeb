export default {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    setStudent(state, matchStudent) {
      state.student = matchStudent;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setLogged(state, isLogin) {
      state.isLogin = isLogin;
    },
    setMiniCartChange(state,miniCartChange){
      state.miniCartChange = miniCartChange;
    },
    setAdminChange(state, adminChange) {
      state.adminChange = adminChange;
    },
   
  }