export default {
    getAdmin(state) {
      return state.admin;
    },
  
    getLogged(state) {
      return state.isLogin;
    },
  
    getStudent(state) {
      return state.student;
    },

    getInstructor(state) {
        return state.instructor;
    },

    getMiniCart(state) {
      return state.miniCart;
    },

    getCourseIDShowing(state) {
      return state.courseIDShowing;
    }
  
  }