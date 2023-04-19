<template>
    <br>
    <br>
    <div class="logo">
        <img src="../assets/img/logo.png" class="log">
    </div>
    <br>
    <div class="register">
        <h1>Sign Up</h1>
        <form>

            <label for="name" class="info">Name: <br /></label>
            <br>
            <input type="text" id="name" class="sub" placeholder="Enter your name" v-model="form.name" required>
            <br />
            <label for="email" class="info">Email: <br /> </label>
            <br>
            <input type="email" id="email" class="sub" placeholder="Enter email" v-model="form.email" required>
            <br />
            <label for="password" class="info">Password: <br /></label>
            <br>
            <input type="password" id="password" class="sub" placeholder="Enter password" v-model="form.password" required>
            <br />
            <p class="info">Gender:
                <br>
                <span>
                    <label for="male">Male </label>
                    <input type="radio" name="gender" value="male" id="male" v-model="form.gender" required>
                    <label for="female"> Female </label>
                    <input type="radio" name="gender" value="female" id="female" v-model="form.gender" required>
                </span>
            </p>
            <label for="phone" class="info">Phone number: <br /></label>
            <br>
            <input type="text" class="sub" id="phone" v-model="form.phone" required>
            <br />
            <label for="birth" class="info">Date of birth: <br /></label>
            <br>
            <input type="date" class="sub" id="birth" v-model="form.birth" required>
            <br />
            <button v-on:click="signUp" class="info btn" type="submit">Sign Up</button>
            <br>
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
                name: '',
                email: '',
                password: '',
                gender: '',
                phone: '',
                birth: Date
            }
        }
    },
    methods: {
        signUp() {
            console.warn(this.form)
        }
    }
}
</script>

<style lang="scss" scoped>
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

.register {
    position: relative;
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
    margin: 4px 0;
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
    width: 100%;
    cursor: pointer;
    margin-top: 20px;
    padding: 10px 25px;
    // position: absolute;
    margin-left: 0%;
    border-style: none;
    border-radius: 10px;
    transform: translateX(50%);
    background-color: rgb(0, 128, 128);
    color: white;
}
</style>
