<template>
    <div class="login">
        <h1>Login</h1>
        <form>
            <label for="email" class="info">Email: <br /> </label>
            <input type="email" id="email" class="sub" placeholder="Enter email" v-model="form.email" required>
            <br />
            <label for="password" class="info">Password: <br /></label>
            <input type="password" id="password" class="sub" placeholder="Enter password" v-model="form.password" required>
            <br />
            <p id="msg"></p>
            <p class="ques">You don't have an account? <a href="#" class="sign-up">Sign Up</a></p>
            <button v-on:click="login" class="info btn" type="button">Login</button>
        </form>
    </div>
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
                    document.getElementById("msg").innerHTML="Your email or password is invailded"
                }
                
            }
        }
    }
    </script>
    
    <style scoped>
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
    
    .login {
        position: relative;
    }
    
    h1 {
        text-align: center;
        color: rgb(0, 128, 128);
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    
    li {
        list-style: none;
    }
    
    form {
        position: relative;
        display: inline-block;
        margin-left: 50%;
        transform: translateX(-48%);
    }
    
    .info {
        margin: 5px 0;
        font-size: 20px;
        font-weight: 500;
    }
    
    .sub {
        margin-bottom: 10px;
        padding: 5px 5px;
        width: 250px;
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
        text-align: right;
        font-size: 13px;
    }

    #msg {
        text-align: right;
        font-size: 15px;
        color: red;
    }

    .sign-up {
        color: blue;
    }
    </style>
    