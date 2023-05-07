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
                    @keydown.enter="handleSearch()" v-model="form.keyw"/>
            </form>
            <RouterLink @click="scrollToTop()" to="/searching/"><img src="../assets/img/lookup.png" id="lookup" />
            </RouterLink>
        </div>

        <RouterLink v-if="!student.userName" @click="scrollToTop" to="/aboutus">
            <div class="aboutus"> About us</div>
        </RouterLink>   
        <RouterLink v-if="student.userName" @click="scrollToTop" to="/mycourses">
            <div class="mycourse">My courses</div>
        </RouterLink>

        <RouterLink @click="scrollToTop" to="/become/instructor">
            <div class="become">Become instructor</div>
        </RouterLink>
        <div v-if="student.userName" class="logged">
            <img src="../assets/img/user.png" id="user" @click.prevent="showDropDown">
            <div v-if="dropdownselect" class="drop-down-select" @mouseleave="unshowDropDown">
                <div>
                    <RouterLink @click.prevent="unshowDropDown" to="/account/info">Account Settings</RouterLink>
                </div>
                <div>
                    <RouterLink @click.prevent="unshowDropDown" to="/cart">My Cart</RouterLink>
                </div>
                <div>
                    <RouterLink to="/mycourses" @click.prevent="unshowDropDown">My Courses</RouterLink>
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
            <div class="new">
                <img src="../assets/img/new.png" id="new">
            </div>
            <RouterLink @click="scrollToTop()" to="/login" v-if="!student.userName"><img id="cart" style="width: 40px; cursor: pointer;" src="../assets/img/cart.png" alt=""></RouterLink>
            <RouterLink @click="scrollToTop()" to="/cart" v-if="student.userName"><MiniCart id="cart"></MiniCart></RouterLink>

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
            searchResult: []
        }
    },
    components: {
        Categories,
        MiniCart
    },
    methods: {
        ...mapMutations(['setStudent', 'setLogged','setMiniCart']),

        showMenu() {
            let nav_bar = document.querySelector('.header .navbar');
            nav_bar.classList.toggle('active');
        },
        showDropDown() {
            this.dropdownselect = true
        },
        unshowDropDown() {
            this.dropdownselect = false;
            this.scrollToTop();
        },
        scrollToTop() {
            let nav_bar = document.querySelector('.header .navbar');
            nav_bar.classList.remove('active');
            window.scrollTo(0, 0);
        },
        async handleLogout() {
            await axios.post('/logout', {}, { withCredentials: true });
            this.setStudent([]);
            this.setAdmin(null);
            this.setLogged(false);
            this.unshowDropDown();
        },
        async handleSearch() {
            alert('DA DONE');
            await axios.get('/searching', this.form.keyw, {withCredentials: true})
            .then(response => {
                console.log('HHDHGDHGDHGDH');
                    this.searchResult = response.data;
                })
                .catch(e => {
                    console.log('HHDHGDHGDHGDH');
                    this.errors.push(e)
                });
            alert('DONE');
            // this.$router.push(`/searching/${this.form.keyw}`);
        },
    },
    computed: {
        ...mapState(['student', 'admin','miniCart'])
    }
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

        img {
            width: 220%;
            margin-left: 3030%;
            margin-top: 95%;
        }

        .drop-down-select {
            position: absolute;
            margin-left: 3030%;
            top: 115%;
            width: 1450%;
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

}</style> 
