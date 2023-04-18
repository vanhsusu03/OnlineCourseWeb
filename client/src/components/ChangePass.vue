<template>
<div class="change-pass">
    <h1>Change Password</h1>
    <form>
        <label for="curr-password" class="info">Current Password: <br /></label>
        <input type="password" id="curr-password" class="sub" placeholder="Enter current password" v-model="form.currpass" required>
        <br />
        <label for="new-password" class="info">New Password: <br /></label>
        <input type="password" id="new-password" class="sub" placeholder="Enter new password" v-model="form.newpass" required>
        <br />
        <label for="password" class="info">Password: <br /></label>
        <input type="password" id="cf-password" class="sub" placeholder="confirm password" v-model="form.cfpass" required>
        <br />
        <p id="msg"></p>
        <button v-on:click="login" class="info btn" type="button">Login</button>
    </form>
</div>
</template>

    
<script>
export default {
    name: "ChangePass",
    data() {
        return {
            form: {
                currpass:'',
                newpass:'',
                cfpass:''
            }
        }
    },
    methods: {
        login() {
            alert("fda")
            if (this.newpass !== this.cfpass) {
                document.getElementById("msg").innerHTML = "Your confirm password is false"
            }
            console.warn(this.form)
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

.sign-up {
    color: blue;
}
</style>
