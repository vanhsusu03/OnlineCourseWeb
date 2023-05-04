<template>
    <div class="change-pass">
        <h1>Change Password</h1>
        <form>
            <label for="curr-password" class="info">Current Password: <br /></label>
            <input type="password" id="curr-password" class="sub" placeholder="Enter current password"
                v-model="form.curPass" required>
            <p class="error" v-if="this.errorObj.curPassError.length > 0">{{ errorObj.curPassError[0] }}</p>
            <br />
            <label for="new-password" class="info">New Password: <br /></label>
            <input type="password" id="new-password" class="sub" placeholder="Enter new password" v-model="form.newPass"
                required>
            <p class="error" v-if="this.errorObj.newPassError.length > 0">{{ errorObj.newPassError[0] }}</p>
            <br />
            <label for="password" class="info">Repeat Password: <br /></label>
            <input type="password" id="cf-password" class="sub" placeholder="confirm password" v-model="form.cfPass"
                required>
            <p class="error" v-if="this.errorObj.repeatPassError.length > 0">{{ errorObj.repeatPassError[0] }}</p>
            <br />
            <p id="msg"></p>
            <button @click="handleUpdatePass" class="info btn" type="button">Save</button>
        </form>
    </div>
</template>

    
<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
export default {
    name: "ChangePass",
    data() {
        return {
            form: {
                curPass: "",
                newPass: "",
                cfPass: "",
            },
            errorObj: {
                curPassError: [], newPassError: [], repeatPassError: [],
            },
        }
    },
    methods: {
        ...mapMutations(['scrollToTop']),
        async changePass() {
            let data = await axios.post('/change/password', this.form, { withCredentials: true });
            let err = data.data.msg;
            if (err === 'Current password is not correct') {
                this.errorObj.curPassError.push(err);
            } else if (err === 'New password and current password must not be the same') {
                this.errorObj.newPassError.push(err);
            } else {
                alert(data.data.msg);
                this.$router.push('/');
            }
        },
        resetError() {
            this.errorObj.curPassError = [];
            this.errorObj.newPassError = [];
            this.errorObj.repeatPassError = [];
        },

        checkEmptyError() {
            for (var i in this.errorObj) {
                if (this.errorObj[i].length != 0) {
                    return false;
                }
            }
            return true;
        },
        checkUpdate() {

            this.resetError();

            //name validate
            if (!this.form.curPass) {
                this.errorObj.curPassError.push('Enter current password!');
            }
            else if (!this.form.newPass) {
                this.errorObj.newPassError.push('Enter new password!');
            } else if (this.form.newPass.length < 8) {
                this.errorObj.newPassError.push('Minimum length of password is 8');
            }
            if (this.form.cfPass != this.form.newPass) {
                this.errorObj.repeatPassError.push('Confirm password is not correct');
            }
        },
        handleUpdatePass(event) {
            this.checkUpdate();

            if (!this.checkEmptyError()) {
                event.preventDefault();
            } else {
                event.preventDefault();
                this.changePass();
            }
        }
    },
    computed: {
        ...mapState(['student'])
    }
}
</script>

    
<style scoped lang="scss">
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

h1 {
    text-align: center;
    color: rgb(0, 128, 128);
    text-transform: uppercase;
    margin-bottom: 20px;
    font-weight: 600;
}

li {
    list-style: none;
}

form {
    position: relative;
    display: block;
    margin-left: 48%;
    transform: translateX(-48%);

    .error {
        position: absolute;
        font-weight: 600;
        color: red;
        font-size: 1.2vw;

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
</style>
