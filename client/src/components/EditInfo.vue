<template>
    <div id="profile" class="tabcontent">
        <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png">
        <div class="profilecontent">
            Username:
            <span>
               {{student.userName}}
            </span>
        </div>
        <div class="profilecontent">
            Email:
            <span>
                {{student.email}}
            </span>
        </div>
        <div class="profilecontent">
            First Name:
            <span>
                <form>
                    <input type="text" id="firstname" class="sub" v-bind:placeholder="student.firstName"
                        v-model="form.firstname">

                </form>
            </span>

        </div>
        <div class="profilecontent">
            Last Name:


            <span>
                <form>
                    <input type="text" id="lastname" class="sub" v-bind:placeholder="student.lastName"
                        v-model="form.lastname">

                </form>
            </span>

        </div>
        <div class="profilecontent">
            Phone:


            <span>
                <form>
                    <input type="text" id="phone" class="sub" v-bind:placeholder="student.phone" v-model="form.phone">

                </form>
            </span>

        </div>
        <div class="profilecontent">
            Birthday:
            <span>
                {{student.birth}}
            </span>

        </div>
        <button @click="handleUpdateInfo" id="upd">
            <div>Save</div>
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'EditInfo',
    data() {
        return {
            form: {
                firstname: "",
                lastname: "",
                phone: "",
            },
            matchStudent: undefined,
            errorObj: {
                firstnameError: [], lastnameError: [],
                phoneError: [],
            },
        }
    },
    methods: {

        ...mapMutations(['setStudent', 'scrollToTop']),
        async edit() {
            let data = await axios.get('/account/info', { withCredentials: true });
            
            if (!this.form.firstname) {
                this.form.firstname = data.data.firstname;
            }
            if (!this.form.lastname) {
                this.form.lastname = data.data.lastname;
            }
            if (!this.form.phone) {
                this.form.phone = data.data.phone;
            }
            
            let res = await axios.post('/edit/info', this.form, { withCredentials: true });
            let err = res.data.msg;
            if(err === 'Update info successful') {

            
            // if (err === 'Username is already exists' || err === 'Email is already exists'
            //     || err === 'Phone number is already exists') {
            //     this.clearForms();
            //     alert(err);

            // } else {
                alert(err);
                this.updateInfos();
                this.$router.push('/');
            }
            // }
        },

        clearForms() {
            this.form.firstname = "";
            this.form.lastname = "";
            this.form.phone = "";
        },
        updateInfos() {
            this.student.firstName = this.form.firstname;
            this.student.lastName = this.form.lastname;
            this.student.phone = this.form.phone;
        },
        resetError() {
            this.errorObj.firstnameError = [];
            this.errorObj.lastnameError = [];
            this.errorObj.phoneError = [];
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
            if (this.form.firstname && !/^[A-Za-z]+$/.test(this.form.firstname.replace(/\s/g, ""))) {
                alert("Your first name is only contains alphabetic characters!");
            }

            if (this.form.lastname && !/^[A-Za-z]+$/.test(this.form.lastname.replace(/\s/g, ""))) {
                alert('Your last name is only contains alphabetic characters!');
            }

            if (this.form.phone) {
                //phone 
                if (!this.form.phone.startsWith('0')) {
                    alert('Phone number must start with 0');
                } else if (this.form.phone.length != 10) {
                    alert('Phone number only contains 10 numbers');
                } else if (!/[0-9]{10}/.test(this.form.phone)) {
                    alert('Phone number will only contains numbers');
                }
            }


        },
        handleUpdateInfo(event) {
            this.checkUpdate();

            if (!this.checkEmptyError()) {
                event.preventDefault();
            } else {
                event.preventDefault();
                this.edit();
            }
        }
    },
    computed: {
        ...mapState(['student'])
    }
}
</script>

<style scoped lang="scss">
#profile {
    margin-top: 20px;
    font-size: 1.2vw;
    margin-left: 40%;

    img {
        max-width: 40%;
        margin-left: 60px;
        border-radius: 50%;
    }

    .profilecontent {
        margin: 10px 0;
        // font-weight: 500;
        display: flex;
        position: relative;
        font-weight: 500;

        span {
            left: 40%;
            position: absolute;
            width: 250px;

        }

        form {
            left: 18%;
        }


        .error {
            font-size: 1.1rem;
            color: rgba($color: #f32f2f, $alpha: 1.0);
            font-weight: 600;
        }
    }

    button {
        font-size: 1.1vw;
        position: absolute;
        margin-left: 23.5%;
        margin-top: 0.75%;
        padding: 4px;
        min-width: 50px;
        border-radius: 10px;
        margin-bottom: 10px;
        font-weight: 500;
    }

}
</style>