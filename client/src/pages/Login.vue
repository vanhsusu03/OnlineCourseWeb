<template>
    <br>
    <br>
    <div class="logo">
        <img src="../assets/img/logo.png" class="log">
    </div>
    <br>
    <div class="login">
        <h1>Login</h1>
        <form @submit="handleSubmit" novalidate autocomplete="off">
            <!-- <div v-if="errors.length" class="error-box">
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </div> -->

            <label for="username" class="info">Username: <br /> </label>
            <br>
            <input type="text" id="username" class="sub" placeholder="Enter username" v-model="form.username" required>
            <p class="error" v-if="usernameError.length > 0">{{ usernameError[0] }}</p>
            <label for="password" class="info">Password: <br /></label>
            <br>
            <input type="password" id="password" class="sub" placeholder="Enter password" v-model="form.password" required>
            <p class="error" v-if="passwordError.length > 0">{{ passwordError[0] }}</p>
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
            <button class="info btn" type="submit">Login</button>
        </form>
    </div>
    <br>
</template>
    
<script>

import { mapMutations } from 'vuex';
import axios from 'axios';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            matchStudent: undefined,
            usernameError: [],
            passwordError: []
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setStudent', 'setLogged']),
        async login() {
            // eslint-disable-next-line no-undef
            let data = await axios.post('/login', this.form, { withCredentials: true });
            let err = data.data.msg;
            if (err === 'Invalid username') {
                this.usernameError.push(err);
            } else if (err === 'Invalid password') {
                this.passwordError.push(err);
            }
            else {
                this.setStudent(data.data);
                this.setLogged(true);
                this.$router.push('/');
            }
        },
        async getCart() { },
        async handleSubmit(event) {
    
            this.usernameError = [];
            this.passwordError = [];

            //email validate
            if (!this.form.username) {
                this.usernameError.push('Please enter your username');
            }

            //password validate
            if (!this.form.password) {
                this.passwordError.push('Please enter your password');
            }
            if (!this.usernameError.length == 0 || !this.passwordError.length == 0) {  
                event.preventDefault();
            }
            else {
                event.preventDefault();
                await this.login();
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
    .error-box{
        border: 1px solid red;
        background-color: rgb(255,106,106);
        position: absolute;
        margin-top: -20%;
        margin-left: 50%;
        transform: translateX(-50%);
    }
}

h1 {
    text-align: center;
    color: rgb(0, 128, 128);
    text-transform: uppercase;
    margin-bottom: 21px;
    font-weight: 800;
}

li {
    list-style: none;
}

form {
    background-color: white;
        top: 30%;
        margin-left: 50%;
        transform: translateX(-50%);
        width: 30%;
        box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1), 0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
        border: 0.1rem solid rgba($color: #000000, $alpha: 0.05);
        padding: 2rem;
        border-radius: 1rem;
        animation: fadeUp 0.4s linear;
        .error {
          font-size: 1.1rem;
          color: rgba($color: #f32f2f, $alpha: 1.0);
          font-weight: 600;
        }
}

.info {
    margin: 5px 0;
    font-size: 20px;
    font-weight: 500;
}

.sub {
    margin-bottom: 10px;
    padding: 5px 5px;
    width: 24vw;
    border-radius: 5px;
}

.btn {
    cursor: pointer;
    margin-top: 20px;
    padding: 10px 25px;
    margin-left: 50%;
    border-style: none;
    border-radius: 10px;
    transform: translateX(-50%);
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
    text-align: left;
    font-size: 15px;
    color: red;
}
</style>
    