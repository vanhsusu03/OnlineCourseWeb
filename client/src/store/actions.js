import router from "@/routes/router";
import axios from "axios"

export default {
  async getProducts(context) {
    await axios.get('products', {withCredentials: true})
    .then((res) => {
      context.commit("setFoods", res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },

  async checkLogin(context) {
    let res = await axios.get("/login", { withCredentials: true });
    if (res.data.cookie) {
      if (router.currentRoute.value.path == "/login") {
        router.push("/");
      }

      // let data = await axios.get("info", { withCredentials: true });

      context.commit("setStudent", data.data);
      context.commit("setLogged", true);

      // if (data.data.role) {
      //   context.commit("setAdmin", "admin");
      // }
      // else {
        // if (router.currentRoute.value.path == "/admin") {
        //   router.push('/');
        // }
      // }
    }
  }
}