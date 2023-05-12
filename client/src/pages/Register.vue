<template>
    <br>
    <br>
    <div class="logo">
        <img src="../assets/img/logo.png" class="log">
    </div>
    <br>
    <div class="register">
        <h1>Sign Up</h1>
        <form @submit="handleSubmit" novalidate autocapitalize="off">
            <label for="firstname" class="info">First Name: </label>
            <br>
            <input type="text" id="firstname" class="sub" placeholder="Enter your first name" v-model="form.firstname"
                required>
            <p class="error" v-if="this.errorObj.firstnameError.length > 0">{{ errorObj.firstnameError[0] }}</p>
            <label for="lastname" class="info">Last Name: </label>
            <input type="text" id="lastname" class="sub" placeholder="Enter your last name" v-model="form.lastname"
                required>
            <p class="error" v-if="errorObj.lastnameError.length > 0">{{ errorObj.lastnameError[0] }}</p>
            <label for="email" class="info">Email: <br /> </label>
            <input type="email" id="email" class="sub" placeholder="Enter email" v-model="form.email" required>
            <p class="error" v-if="errorObj.emailError.length > 0">{{ errorObj.emailError[0] }}</p>

            <label for="username" class="info">Username: <br /> </label>

            <input type="text" id="username" class="sub" placeholder="Enter username" v-model="form.username" required>
            <p class="error" v-if="errorObj.usernameError.length > 0">{{ errorObj.usernameError[0] }}</p>

            <label for="password" class="info">Password: <br /></label>

            <input type="password" id="password" class="sub" placeholder="Enter password" v-model="form.password" required>
            <p class="error" v-if="errorObj.passwordError.length > 0">{{ errorObj.passwordError[0] }}</p>

            <label for="phone" class="info">Phone number: <br /></label>

            <input type="text" class="sub" id="phone" placeholder="0987654321" v-model="form.phone" required>
            <p class="error" v-if="errorObj.phoneError.length > 0">{{ errorObj.phoneError[0] }}</p>

            <label for="birth" class="info">Date of birth: <br /></label>

            <input type="date" class="sub" id="birth" v-model="form.birth" required>
            <p class="error" v-if="errorObj.birthError.length > 0">{{ errorObj.birthError[0] }}</p>

            <button class="info btn" type="submit">Sign Up</button>

        </form>
    </div>
    <br>
</template>
    
<script>
import { mapMutations } from 'vuex';
import axios from "axios";
export default {
    name: "Register",
    data() {
        return {
            form: {
                firstname: "",
                lastname: "",
                email: "",
                username: "",
                password: "",
                phone: "",
                birth: Date
            },
            errorObj: {
                firstnameError: [], lastnameError: [], emailError: [], usernameError: [], passwordError: [],
                phoneError: [], birthError: []
            },
            matchStudent: undefined
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setStudent']),
        async signup() {
            let data = await axios.post('/signup', this.form, { withCredentials: true });
            let err = data.data.msg;
            console.log(data.data);
            if (err === 'Username is already exists') {
                this.errorObj.usernameError.push(err);
            } else if (err === 'Email is already exists') {
                this.errorObj.emailError.push(err);
            } else if (err === 'Phone is already exists') {
                this.errorObj.phoneError.push(err);
            } else {
                this.$router.push('/login');
            }
        },

        resetError() {
            this.errorObj.firstnameError = [];
            this.errorObj.lastnameError = [];
            this.errorObj.emailError = [];
            this.errorObj.usernameError = [];
            this.errorObj.passwordError = [];
            this.errorObj.phoneError = [];
            this.errorObj.birthError = [];
        },

        checkEmptyInput() {
            for (var i in this.errorObj) {
                if (this.errorObj[i].length != 0) {
                    return false;
                }
            }
            return true;
        },

        checkRegister() {
            this.resetError();

            //name validate
            if (!this.form.firstname) {
                this.errorObj.firstnameError.push("Please enter your first name. Ex: Le, etc.");
            } else if (!/^[A-Za-z]+$/.test(this.form.firstname.replace(/\s/g, ""))) {
                this.errorObj.firstnameError.push("Your first name is only contains alphabetic characters!");
            }

            if (!this.form.lastname) {
                this.errorObj.lastnameError.push('Please enter your last name. Ex: Minh Dat, etc.');
            } else if (!/^[A-Za-z]+$/.test(this.form.lastname.replace(/\s/g, ""))) {
                this.errorObj.lastnameError.push('Your last name is only contains alphabetic characters!');
            }

            if (!this.form.email) {
                this.errorObj.emailError.push('Please enter your email');
            } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.form.email)) {
                this.errorObj.emailError.push('Please enter a valid email!');
            }

            //username 
            if (!this.form.username) {
                this.errorObj.usernameError.push('Please enter your username');
            }

            //password
            if (!this.form.password) {
                this.errorObj.passwordError.push('Please enter your password');
            } else if (this.form.password.length < 8) {
                this.errorObj.passwordError.push('Minimum length of password is 8');
            }
            // else if (!/^[A-Z]+$/.test(this.form.password) || !/[a-z]+$/.test(this.form.password)
            //     || !/[0-9]+$/.test(this.form.password)) {
            //     this.errorObj.passwordError.push('Password requires at least one upcase character, one number and one lowcase');
            // }

            //phone 
            if (!this.form.phone) {
                this.errorObj.phoneError.push('Please enter you phone number');
            } else if (!this.form.phone.startsWith('0')) {
                this.errorObj.phoneError.push('Phone number must start with 0');
            } else if (this.form.phone.length != 10) {
                this.errorObj.phoneError.push('Phone number only contains 10 numbers');
            } else if (!/[0-9]{10}/.test(this.form.phone)) {
                this.errorObj.phoneError.push('Phone number will only contains numbers');
            }
        },

        handleSubmit(event) {
            this.checkRegister();

            if (!this.checkEmptyInput()) {
                event.preventDefault();
            } else {
                event.preventDefault();
                this.signup();
            }
        }
    },
    created() {
        this.scrollToTop();
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
    // color: #000;
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
    // position: relative;

    h1 {
        text-align: center;
        color: rgb(0, 128, 128);
        text-transform: uppercase;
        margin-bottom: 20px;
        font-weight: 800;
    }


    form {
        // position: absolute;
        background-color: white;
        top: 30%;
        margin-left: 50%;
        transform: translateX(-50%);
        width: 50%;
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
        margin: 4px 0;
        font-size: 20px;
        font-weight: 500;
    }

    .sub {
        margin-bottom: 10px;
        padding: 5px 5px;
        width: 100%;
        border-radius: 5px;
    }
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
    // transform: translateX(50%);
    background-color: rgb(0, 128, 128);
    color: white;
}

.btn:hover {
    background-color: rgb(0, 128, 128);
    color: white;
}


// }
</style>