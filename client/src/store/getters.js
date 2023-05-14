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

    getMiniCartChange(state) {
      return state.miniCartChange;
    },

    getAdminChange(state) {
      return state.adminChange;
    },
  }