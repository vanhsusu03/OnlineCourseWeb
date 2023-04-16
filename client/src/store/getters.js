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
    }
  
  }