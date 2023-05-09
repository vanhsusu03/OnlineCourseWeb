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
    setMiniCart(state,miniCart){
      state.miniCart = miniCart;
    },
    setCourseIDShowing(state, courseIDshowing) {
      state.courseIDshowing = courseIDshowing;
    }
  };