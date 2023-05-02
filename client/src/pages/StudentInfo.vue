<template>
<div class="page">
<div class="profilepage">
    <div class="tab">
        <button class="tablinks active" v-on:click="openCity($event,'profile')">Profile</button> <br>
        <button class="tablinks" v-on:click="openCity($event,'changepass')">Change Password</button> <br>
        <button class="tablinks" v-on:click="openCity($event,'mycourse')">My Course</button> <br>
    </div>
    <div id="profile" class="tabcontent">
        <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png">
        <div id="firstname" class="profilecontent">
            First Name: <span>{{ student.firstName }} </span>
        </div>
        <div id="lastname" class="profilecontent">
            Last Name: <span>{{ student.lastName }} </span>
        </div>
        <div id="email" class="profilecontent">
            Email: <span>{{ student.email }}</span>
        </div>
        <div id="username" class="profilecontent">
            Username: <span>{{ student.userName }}</span> 
        </div>
        <div id="phone" class="profilecontent">
            Phone: <span>{{ student.phone }}</span>
        </div>
        <div id="birth" class="profilecontent">
            Date of birth: <span>{{ student.birth }}</span>
        </div>
        <button v-on:click="change=!change">
            <div v-if="!change">Change</div>
            <div v-else>Save</div>
        </button>
    </div>

    <div id="changepass" class="tabcontent" style="display: none;">
        <ChangePass></ChangePass>
    </div>

    <div id="mycourse" class="tabcontent" style="display: none;">
        Hii
    </div>
</div>
</div>
</template>

<script>
import ChangePass from '@/components/ChangePass.vue';
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'StudentInfo',
    components: {
        ChangePass
    },
    data() {
        return {
            firstname: 'Duong Nguyen',
            lastname: 'Viet Anh',
            email: 'dnva@gmail.com',
            username: 'dnvadeptrai',
            password: '********',
            phone: '0987654321',
            birth: new Date(2008, 2, 8),
            change: false
            // birth_day: birth.getDate(),
            // change: {
            //     changeFirstName: false,
            //     changeLastName: false,
            //     changeEmail: false,
            //     changUsername: false,
            //     changePassword: false,
            //     changePhone: false,
            //     changeBirth: false
            // }
        }
    },
    methods: {
        openCity(evt, cityName) {
            // alert('Hello')
            // Declare all variables
            var i, tabcontent, tablinks;
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.remove('active');
            }
            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(cityName).style.display = "block";
            evt.target.classList.add('active');
        },
        ...mapMutations(['setStudent']),
        
    },
    computed: {
        ...mapState(['student'])
    }
}
</script>

<style scoped lang="scss">
.page {
    background-color: rgb(0,128,128);
    padding: 30px 0;
}
.profilepage {
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    // border: 2px solid black;
    border-radius: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 60%;
    min-height: 500px;
    background-color: white;
    display: flex;
    position: relative;
    .tab {
        position: absolute;
        font-size: 1.5vw;
        height: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        border-radius: 12px;
        background-color: #f1f1f1;
        button {
            font-weight: 500;
            width: 100%;
            // display: block;
            background-color: inherit;
            border:none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
            &:hover {
                background-color: #ddd;
            }
        }
        .active {
                background-color: #ccc;
            }
    }
    .tabcontent {
        position: relative;
    }
    #profile {
        margin-top: 20px;
        font-size: 1.5vw;
        margin-left: 40%;
        img {
            max-width: 40%;
            margin-left: 60px;
            border-radius: 50%;
        }
        .profilecontent {
            margin: 10px 0;
            font-weight: 500;
            display: flex;
            position: relative;
            span, input {
                left: 40%;
                position: absolute;
                width: 250px;
                
            }
        }
        button {
            margin-left: 20%;
            padding: 5px;
            min-width: 150px;
            border-radius: 10px;
            margin-bottom: 10px;  
            font-weight: 500;  
        }
    }
    #changepass {
        margin-top: 50px;
        margin-left: 40%;
    }
}
</style>