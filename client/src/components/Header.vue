<template>
    <div class="header">
        <RouterLink to="/" @click="scrollToTop()" class="logo"> <img src="../assets/img/logo.png" class="logo" />
        </RouterLink>

        <RouterLink @click="scrollToTop()" to="/courses">
            <Categories class="cate"></Categories>
        </RouterLink>
        <div class="search">
            <form ref="anyName">
                <input type="text" id="searching" class="sub" placeholder="Search for everything ..."
                    @keydown.enter.prevent="handleSearch()" v-model="form.keyw" />
            </form>
            <RouterLink @click="handleSearch()" to="/searching/"><img src="../assets/img/lookup.png" id="lookup" />
            </RouterLink>
        </div>

        <RouterLink v-if="!student.userName" @click="scrollToTop" to="/aboutus">
            <div class="aboutus"> About us</div>
        </RouterLink>
        <div v-if="student.userName" @click="scrollToTop">
            <div class="mycourse" @click="showMyCourses">My courses</div>
        </div>
        <!-- <RouterLink v-if="admin" @click="scrollToTop" to="/admin">Admin Dashboard</RouterLink> -->


        <RouterLink @click="scrollToTop()" to="/login" v-if="!student.userName">
            <div class="become">Become instructor</div>
        </RouterLink>
        <div v-else>
            <div v-if="admin === 'admin'" class="admin" @click="showAdminDashboard">Admin Dashboard</div>
            <div v-else>
                <RouterLink @click="scrollToTop" to="/become/instructor" v-if="!student.checkIns">
                    <div class="become">Become instructor</div>
                </RouterLink>
                <RouterLink @click="scrollToTop" to="/instructor/manage" v-else>
                    <div class="become">Instructor Manage</div>
                </RouterLink>
            </div>
        </div>



        <div v-if="student.userName" class="logged" ref="log">
            <img src="../assets/img/user.png" id="user" @click.prevent="showDropDown">
            <div v-if="dropdownselect" class="drop-down-select" @mouseleave="unshowDropDown">
                <div style="display: flex;" class="top-info">
                    <img src="../assets/img/user.png" alt=""
                        style="width: 100px; height: auto; z-index: 3; padding: 0; margin: 0;">
                    <div>
                        <h5>{{ student.firstName + ' ' + student.lastName }}</h5>
                        <div style="font-size: 23px; font-weight: 500;">
                            <img src="../assets/img/logo.png" alt=""
                                style="width: 25px; z-index: 3; padding: 0; margin: 0;">
                            <span class="coin">{{ student.coin }}</span>
                        </div>
                    </div>
                </div>



                <div>
                    <RouterLink @click.prevent="unshowDropDown" to="/account/info">Account Settings</RouterLink>
                </div>
                <div>
                    <RouterLink @click.prevent="unshowDropDown" to="/cart">My Cart</RouterLink>
                </div>
                <div>
                    <RouterLink v-if="!admin" to="/mycourses" @click.prevent="unshowDropDown">My Courses</RouterLink>
                </div>
                <div>
                    <RouterLink @click.prevent="unshowDropDown" to="/deposit">Deposit</RouterLink>
                </div>
                <div>
                    <RouterLink to="/purchase/history" @click.prevent="unshowDropDown">Purchase History</RouterLink>
                </div>
                <div>
                    <RouterLink to="/help" @click.prevent="unshowDropDown">Help</RouterLink>
                </div>
                <div>
                    <RouterLink @click="handleLogout" to="/">Log out</RouterLink>
                </div>
            </div>
        </div>

        <div class="icons">
            <div class="new" v-if="admin !== 'admin'">
                <img src="../assets/img/new.png" id="new">
            </div>
            <RouterLink @click="scrollToTop()" to="/login" v-if="!student.userName"><img id="cart"
                    style="width: 40px; cursor: pointer;" src="../assets/img/cart.png" alt=""></RouterLink>
            <RouterLink @click="scrollToTop()" to="/cart" v-if="student.userName">
                <MiniCart id="cart"></MiniCart>
            </RouterLink>

        </div>
        <div v-if="!student.userName" class="login">
            <RouterLink @click="scrollToTop()" to="/login">
                <div class="text">
                    <div class="l">Log in </div>
                </div>
            </RouterLink>
        </div>
        <div v-if="!student.userName" class="signup">
            <RouterLink @click="scrollToTop()" to="/signup">
                <div class="text">
                    <div class="ll">Sign up</div>
                </div>
            </RouterLink>
        </div>

        <div v-if="student.userName" class="hello">
            Hello, {{ ' ' + student.lastName }}
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
import Categories from './Categories.vue';
import MiniCart from './MiniCart.vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            dropdownselect: false,
            form: {
                keyw: "",
            },
            searchResult: [],
            coin: 0,
        }
    },
    components: {
        Categories,
        MiniCart
    },
    methods: {
        ...mapMutations(['setStudent', 'setLogged', 'setAdmin']),
        async getStudentCoin() {
            await axios.get('/students/coin', { withCredentials: true })
                .then(respone => {
                    this.student.coin = respone.data.coinOfStudent;
                })

        },
        showDropDown() {
            this.getStudentCoin();
            this.dropdownselect = true
        },
        unshowDropDown() {
            this.dropdownselect = false;
            this.scrollToTop();
        },
        showAdminDashboard() {
            this.$router.push('/admin');
        },
        showMyCourses() {
            this.$router.push('/mycourses');
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        async handleLogout() {
            await axios.post('/logout', {}, { withCredentials: true });
            this.setStudent([]);
            this.setAdmin("");
            this.setLogged(false);
            this.unshowDropDown();
        },
        async handleSearch() {
            this.$refs.anyName.reset();
            this.$router.push(`/searching/${this.form.keyw}`);
        },
    },
    computed: {
        ...mapState(['student', 'admin'])
    },
    created() {
        this.getStudentCoin();
    },
    watch: {
        '$route'() {
            this.$refs.anyName.reset();
        },

    },
}
</script>

<style lang = "scss" scoped>
.header {
    position: relative;
    display: flex;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.065);

    .logo {
        height: 50px;
        margin-top: 2.5px;
        margin-bottom: 5px;
        margin-left: 3px;
    }

    a {
        text-decoration: none;
        font-size: 1.15rem;
        color: #000;
        z-index: 1;

        &:hover {
            color: rgb(52, 73, 94);

        }
    }


    .cate {
        position: absolute;
        font-weight: 500;
        margin-top: 50px;
        margin-left: 2%;
        transform: translateY(-80%);
    }

    .aboutus {
        position: absolute;
        font-weight: 500;
        margin-top: 15px;
        margin-left: 4.25%;
    }

    .mycourse {
        position: absolute;
        font-weight: 500;
        margin-top: 15px;
        margin-left: 3.7%;
        font-size: 1.16rem;
        cursor: pointer;
    }

    .admin {
        position: absolute;
        font-weight: 500;
        margin-top: 15.5px;
        margin-left: 13.5%;
        font-size: 1.16rem;
        cursor: pointer;
    }

    .become {
        position: absolute;
        font-weight: 500;
        margin-top: 15px;
        margin-left: 12.25%;
    }

    .search {
        position: absolute;
        margin-top: 18px;
        margin-left: 10%;
        transform: translateY(-6px);
        position: relative;
        width: 40%;

        .sub {
            border: 1px solid #000;
            padding: 5px 0;
            width: 100%;
            padding-left: 10px;
            padding-right: 35px;
        }

        img {
            position: absolute;
            right: 5px;
            top: 5px;
            height: 25px;
        }
    }

    .logged {
        display: inline-block;
        position: relative;
        width: 1%;

        .top-info {
            .coin {
                padding-top: 10px;
                margin-left: 5px;
            }
        }

        img {
            width: 220%;
            margin-left: 3030%;
            margin-top: 95%;
        }

        .drop-down-select {
            position: absolute;
            margin-left: 3030%;
            left: -300%;
            top: 115%;
            width: 1800%;
            background-color: white;
            padding: .3rem;
            padding-bottom: .3rem;
            padding-left: .5rem;
            // border-radius: 10px;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3);
            opacity: 1;
            transform: translateY(0);
            z-index: 3;

            div {
                cursor: pointer;
                width: 105%;
                border-radius: .25rem;
                margin-top: 5px;
                margin-bottom: 5px;

                &:hover {
                    font-weight: 500;
                }
            }
        }
    }

    .icons {

        #cart {
            position: absolute;
            margin-left: 24%;
            margin-top: 0.78%;
            margin-right: 24%;
            cursor: auto;
            width: 300px;
            color: black;
        }

        #mycart {
            position: absolute;
            margin-left: 25%;
            margin-top: 0.75%;
            margin-right: 24%;
            width: 2.5%;
        }


        #lookup {
            width: 2%;
            position: absolute;
            margin-left: 12%;
            margin-top: 1.5%;
            margin-right: 50%;
        }

        #new {
            position: absolute;
            width: 2%;
            margin-left: 21%;
            margin-top: 0.8%;
        }
    }

    .login {
        position: absolute;
        margin-left: 87.25%;
        margin-top: 11px;
        text-align: center;

        .text {
            width: 116%;
            border: 2px inset black;
            padding: 5px;

            &:hover {
                background-color: rgb(52, 73, 94);
                color: white;
            }
        }

        .l {
            font-weight: 500;
        }
    }

    .signup {
        position: absolute;
        margin-left: 93%;
        margin-top: 10px;

        .text {
            border: 2px inset black;
            padding: 5px;
            background-color: #000;
            color: #fff;

            &:hover {
                color: white;
            }
        }

        .ll {
            font-weight: 500;

        }
    }

    .hello {
        font-weight: 600;
        margin-left: 33.5%;
        font-size: 0.9rem;
        margin-top: 1.3%;
    }


}
</style>