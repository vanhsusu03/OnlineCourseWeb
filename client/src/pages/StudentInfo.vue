<template>
    <div class="page">
        <div class="profilepage">
            <div class="tab">
                <button class="tablinks active" v-on:click="openCity($event, 'profile')"
                    @click="setButtonTrue">Profile</button>
                <br>
                <button class="tablinks" v-on:click="openCity($event, 'changepass')" @click="setButtonFalse">Change
                    Password</button> <br>
                
            </div>
            <div v-if="this.isInProfilePage">
                <div v-if="!this.showEditInfo" class="inf">

                    <div id="profile" class="tabcontent">
                        <img
                            src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png">

                        <div class="profilecontent">
                            Username: <span>{{ student.userName }}</span>
                        </div>
                        <div class="profilecontent">
                            Email: <span>{{ student.email }}</span>
                        </div>


                        <div class="profilecontent">
                            First Name: <span>{{ student.firstName }} </span>
                        </div>

                        <div class="profilecontent">
                            Last Name: <span>{{ student.lastName }} </span>

                        </div>
                        <div class="profilecontent">
                            Phone: <span>{{ student.phone }}</span>
                        </div>

                        <div class="profilecontent">
                            Birthday: <span>{{ student.birth }}</span>
                        </div>

                    </div>
                    <button v-if="this.playButton" @click.prevent="setShowEditInfo" id="upd">
                        <div>Change</div>
                    </button>
                </div>
                <div id="updateInfos">
                    <EditInfo v-if="this.showEditInfo">
                    </EditInfo>
                </div>
            </div>

            <div id="changepass" class="tabcontent" style="display: none;">
                <ChangePass></ChangePass>
            </div>
        </div>
    </div>
</template>

<script>
import ChangePass from '@/components/ChangePass.vue';
import EditInfo from '@/components/EditInfo.vue';
import MyCourses from '@/components/MyCourses.vue';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'StudentInfo',
    components: {
    EditInfo,
    ChangePass,
    MyCourses
},
    data() {
        return {
            reqUpdateInfo: false,
            isInProfilePage: true,
            playButton: true,
            showEditInfo: false,
            showEditPass: false,
        }
    },
    methods: {

        ...mapMutations(['setStudent']),
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
        handleStateInfo() {
            this.reqUpdateInfo = true;
        },
        setButtonFalse() {
            this.playButton = false;
            
        },
        setButtonTrue() {
            this.playButton = true;
            this.showEditInfo = false;
        },
        setShowEditInfo() {
            this.showEditInfo = !this.showEditInfo;
        },
        setShowEditPass() {
            this.showEditPass = !this.showEditPass;
        }
    },
    computed: {
        ...mapState(['student'])
    }
}
</script>

<style scoped lang="scss">
.page {
    background-color: rgb(52,73,94);
    padding: 30px 0;
}

.inf {

    button {
        position: absolute;
        margin-left: 54%;
        margin-top: 0.5%;
        padding: 5px;
        min-width: 50px;
        border-radius: 10px;
        margin-bottom: 10px;
        font-weight: 500;
    }

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
            border: none;
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
                font-weight: 350 !important;
            }

        }
    }

    #updateInfos {
        width: 100%;
    }

    #changepass {
        margin-top: 20px;
        margin-left: 40%;
    }

}
</style>