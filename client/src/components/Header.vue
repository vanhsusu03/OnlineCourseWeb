<template>
    <div class="header">
        <RouterLink to="/" @click="scrollToTop()" class="logo"> <img src="../assets/img/logo.png" class="logo" />
        </RouterLink>

        <RouterLink @click="scrollToTop()" to="/catergories">
            <div class="cate">Categories</div>
        </RouterLink>
        <div class="search">
            <form ref="anyName">
                <!-- <label for="searching" class="info"><br /></label> -->
                <input type="text" id="searching" class="sub" placeholder="Searching for everything ..."
                    @keyup.enter="redirectToLogin()" />
            </form>
            <RouterLink @click="scrollToTop()" to="/searching"><img src="../assets/img/lookup.png" id="lookup" />
            </RouterLink>
        </div>

        <div class="icons">
            <RouterLink @click="scrollToTop()" to="/cart"><img src="../assets/img/cart.png" id="cart"></RouterLink>
            <!-- <RouterLink @click="scrollToTop()" to="/searching"><img src="../assets/img/lookup.png" id="lookup" />
            </RouterLink> -->
        </div>

        <div class="login">
            <RouterLink @click="scrollToTop()" to="/login">
                <div class="text">
                    <div class="l">Log in</div>
                </div>
            </RouterLink>
        </div>
        <div class="signup">
            <RouterLink @click="scrollToTop()" to="/signup">
                <div class="textt">
                    <div class="ll">Sign up</div>
                </div>
            </RouterLink>
        </div>
    </div>
</template> 

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Header',
    methods: {
        ...mapMutations(['setUser', 'setAdmin', 'setLogged']),

        showMenu() {
            let nav_bar = document.querySelector('.header .navbar');
            nav_bar.classList.toggle('active');
        },
        scrollToTop() {
            let nav_bar = document.querySelector('.header .navbar');
            nav_bar.classList.remove('active');
            window.scrollTo(0, 0);
        },
        async handleLogout() {
            await axios.post('/logout', {}, { withCredentials: true });
            this.setUser([]);
            this.setAdmin(null);
            this.setLogged(false);
        },
        redirectToLogin() {
            this.$router.push('/login');
            this.submitForm();
        },
        submitForm() {
            this.$refs.anyName.reset();
        },
        computed: {
            ...mapState(['user', 'admin'])
        }
    }
}
</script>

<style lang = "scss" scoped>
.header {
    position: relative;
    display: flex;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0,0, 0.065);
    .logo {
        height: 50px;
        margin: 5px 5px;
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
        font-weight: 500;
        margin-top: 50%;
        transform: translateY(-80%);
    }

    .search {
        margin-top: 18px;
        margin-left: 5%;
        position: relative;
        width: 40%;

        .sub {
            border: 1px solid #000;
            border-radius: 10px;
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

    .icons {

        #cart {
            position: absolute;
            margin-left: 21%;
            margin-top: 1.1%;
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
    }

    //         .login{
    //             position: absolute;
    //             margin-left: 119%;;
    //             padding: 0;
    //             // border: 2px inset black;
    //             // border-width: 10px;;
    //             .text {
    //                 position: relative;
    //                 width: 350%;
    //                 height: 40px;
    //                 border: 1px solid black;
    //                 justify-content: center;
    //                 align-items: center;
    //                 border-radius: 10px 10px 10px 10px;
    //                 &:hover {
    //                     background-color: rgb(52,73,94);
    //                     color: white;
    //                 }
    //                 .l {
    //                     font-weight: 500;
    //                     position: absolute;
    //                     top: 15%;
    //                     left: 20%;
    //                 }
    //             }
    //         }

    .login {
        position: absolute;
        margin-left: 82%;
        // margin-left: ;
        margin-top: 16px;
        // margin-right: 7%;
        // width: 6%;
        // height: 5%;
        // font-size: 100%;
        .text {
            border: 2px inset black;
            padding: 5px;
            border-radius: 10px;

            &:hover {
                background-color: rgb(52, 73, 94);
                color: white;
            }
        }

        .l {
            font-weight: 500;
            // margin: 0 8px;
        }
    }

    .signup {
        position: absolute;
        margin-left: 88%;
        margin-top: 16px;
        .textt {
            border: 2px inset black;
            padding: 5px;
            border-radius: 10px;
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

}
</style> 
