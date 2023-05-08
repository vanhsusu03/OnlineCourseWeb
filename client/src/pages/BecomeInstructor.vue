<template>
    <br>
    <br>
    <div class="logo">
        <img src="../assets/img/logo.png" class="log">
    </div>
    <br>
    <div class="register">
        <h1>You want to become instructor?</h1>
        <h3>Provide us with some information about you</h3>
        <form @submit="handleSubmit" novalidate autocapitalize="off">
            

            <label for="intro" class="info">Introduce Yourself <br /> </label>
            <input type="text" id="intro" class="sub" placeholder="Enter your introduce" v-model="form.intro" required>
            <p class="error" v-if="errorObj.introError.length > 0">{{ errorObj.introError[0] }}</p>

            <label for="bankname" class="info">Your Bank:<br /> </label>
            <select id="bankname" class="sub" v-model="form.bankName" required>
                <option>BIDV</option>
                <option>Vietcombank</option>
                <option>Techcombank</option>
                <option>MB Bank</option>
                <option>Agribank</option>
                <option>Vietinbank</option>
                <option>ABBank</option>
                <option>ACB</option>
            </select>
            <p class="error" v-if="errorObj.bankNameError.length > 0">{{ errorObj.bankNameError[0] }}</p>

            <label for="creditnumber" class="info">Your credit number: <br /></label>
            <input type="text" class="sub" id="creditnumber" placeholder="0987654321" v-model="form.creditNumber" required>
            <p class="error" v-if="errorObj.creditNumberError.length > 0">{{ errorObj.creditNumberError[0] }}</p>

            <label for="name" class="info">Name of bank holder: <br /> </label>
            <input type="text" id="name" class="sub" placeholder="Enter name of bank holder" v-model="form.name" required>
            <p class="error" v-if="errorObj.nameError.length > 0">{{ errorObj.nameError[0] }}</p>

            <button class="info btn" type="submit" >Send</button>
        </form>
    </div>
    <br>
</template>
    
<script>
import { mapMutations } from 'vuex';
import axios from "axios";
export default {
    name: "BecomeInstructor",
    data() {
        return {
            form: {
                intro: "",
                bankName: '',
                creditNumber: "",
                name: ""
            },
            data: {
                qualification: "",
                introduction_brief: "",
                transfer_info: ""
            },
            errorObj: {
                introError: [], bankNameError: [], creditNumberError: [], nameError: []
            },
            matchStudent: undefined
        }
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setStudent']),
        async send() {
            this.convertData();
            let data = await axios.post('/teaching', this.data, { withCredentials: true });
            let err = data.data.msg;
            console.log(data.data);
            if (err === "You need to log in first") {
                this.errorObj.nameError.push(err);
            } else {
                // this.setStudent(data.data);
                // this.scrollToTop();
                this.$router.push('/');
                this.scrollToTop();
            }
        },
        
        convertData() {
            this.form.name = this.form.name.replace(/\s+/g, '');
            this.data.introduction_brief = this.form.intro;
            this.data.transfer_info = this.form.bankName + '_' + this.form.creditNumber + '_' + this.form.name;
        },

    resetError() {
        this.errorObj.bankNameError = [];
        this.errorObj.creditNumberError = [];
        this.errorObj.introError = [];
        this.errorObj.nameError = [];
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
        if (!this.form.name) {
            this.errorObj.nameError.push("Please enter name of bank holder");
        }

        //name validate
        if (!this.form.intro) {
            this.errorObj.introError.push("Please enter your intro");
        }

        if (!this.form.bankName) {
            this.errorObj.bankNameError.push("Please choose your bank");
        }

        if (!this.form.creditNumber) {
            this.errorObj.creditNumberError.push('Please enter your credit number');
        } else if (!/[0-9]/.test(this.form.creditNumber)) {
            this.errorObj.creditNumberError.push('Credit number will only contains numbers');
        }


        
    },

    handleSubmit(event) {
        this.checkRegister();

        if (!this.checkEmptyInput()) {
            event.preventDefault();
        } else {
            event.preventDefault();
            this.send();
        }
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

    h3 {
        text-align: center;
        margin-bottom: 20px;
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