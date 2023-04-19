<template>
    <br>
    <br>
    <div class="logo">
        <img src="../assets/img/logo.png" class="log">
    </div>
    <br>
    <div class="login">
        <h1>Login</h1>
        <form>
            <label for="email" class="info">Email: <br /> </label>
            <br>
            <input type="email" id="email" class="sub" placeholder="Enter email" v-model="form.email" required>
            <br />
            <br>
            <label for="password" class="info">Password: <br /></label>
            <br>
            <input type="password" id="password" class="sub" placeholder="Enter password" v-model="form.password" required>
            <br />
            <p id="msg"></p>
            <br>
            <div class="ques">
                You don't have an account?
                <RouterLink @click="scrollToTop()" to="/signup">
                    <div class="text">
                        <div class="signup">Sign up</div>
                    </div>
                </RouterLink>
            </div>
            <button v-on:click="login" class="info btn" type="button">Login</button>
        </form>
    </div>
    <br>
</template>
    
<script>
export default {
    name: "Register",
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            check: false
        }
    },
    methods: {
        login() {
            if (!this.check) {
                document.getElementById("msg").innerHTML = "Your email or password is invailded"
            }

        }
    }
}
</script>
    
<style lang = "scss" scoped>
@font-face {
    font-family: myFirstFont;
    src: url(../assets/font/Vollkorn-VariableFont_wght.ttf);
}

* {
    margin: 0;
    padding: 0;
    color: #000;
    box-sizing: border-box;
    font-family: myFirstFont;
}

.logo {
    text-align: center;
    img {
        width: 15%;
    }
}

.login {
    position: relative;
    /* text-align: center; */
}

h1 {
    text-align: center;
    color: rgb(0, 128, 128);
    text-transform: uppercase;
    margin-bottom: 20px;
    font-weight: 800;
}

li {
    list-style: none;
}

form {
    position: relative;
    display: inline-block;
    margin-left: 50%;
    transform: translateX(-95%);
}

.info {
    margin: 5px 0;
    font-size: 20px;
    font-weight: 500;
}

.sub {
    margin-bottom: 10px;
    padding: 5px 5px;
    width: 200%;
    border-radius: 5px;
}

.btn {
    cursor: pointer;
    margin-top: 20px;
    padding: 10px 25px;
    margin-left: 50%;
    border-style: none;
    border-radius: 10px;
    transform: translateX(50%);
    background-color: rgb(0, 128, 128);
    color: white;
}

.ques {
    display: flex;
    /* text-align: right; */
    // margin-left: 18%;
    // margin-left: 7%;
    font-size: 14px;

    .text {
        .signup {
            color: rgb(52, 73, 94);
            font-weight: 700;
        }
    }
}

#msg {
    text-align: center;
    font-size: 15px;
    color: red;
}
</style>
    