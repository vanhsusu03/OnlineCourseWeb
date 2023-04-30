<template>
    <div class="header">
        <RouterLink to="/" @click="scrollToTop()" class="logo"> <img src="../assets/img/logo.png" class="logo" />
        </RouterLink>

        <RouterLink @click="scrollToTop()" to="/catergories">
            <div class="cate">Categories</div>
        </RouterLink>
        <div class="search">
            <form ref="anyName">
                <input type="text" id="searching" class="sub" placeholder="Searching for everything ..."
                    @keyup.enter="redirectToLogin()" />
            </form>
            <RouterLink @click="scrollToTop()" to="/searching"><img src="../assets/img/lookup.png" id="lookup" />
            </RouterLink>
        </div>

        <div class="icons">
            <RouterLink @click="scrollToTop()" to="/login" v-if="!student.userName"><img src="../assets/img/cart.png" id="cart"></RouterLink>
            <RouterLink @click="scrollToTop()" to="/cart" v-if="student.userName"><img src="../assets/img/cart.png" id="mycart"></RouterLink>
            <div v-if="student.userName" class="logged" >
                <img src="../assets/img/user.png" id="user" @click.prevent="showDropDown" >
                <div v-if="dropdownselect" class="drop-down-select" @mouseleave="unshowDropDown">
                    <div>
                        <RouterLink  @click.prevent="unshowDropDown" to="/login">Account Settings</RouterLink>
                    </div>
                    <div>
                        <RouterLink @click.prevent="unshowDropDown" to="/searching">Quản lý</RouterLink>
                    </div>
                    <div>
                        <RouterLink to="/signup" @click.prevent="unshowDropDown">Đơn hàng</RouterLink>
                    </div>
                    <div>
                        <RouterLink @click="handleLogout" to="/">Đăng xuất</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!student.userName" class="login">
            <RouterLink @click="scrollToTop()" to="/login/">
                <div class="text">
                    <div class="l">Log in</div>
                </div>
            </RouterLink>
        </div>
        <div v-if="!student.userName" class="signup">
            <RouterLink @click="scrollToTop()" to="/signup/">
                <div class="text">
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
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            dropdownselect: false
        }
    },
    methods: {
        ...mapMutations(['setStudent', 'setLogged']),

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
        redirectToLogin() {
            this.$router.push('/login');
            this.submitForm();
        },
        submitForm() {
            this.$refs.anyName.reset();
        },
    },
    computed: {
        ...mapState(['student', 'admin'])
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
        .logged {
            display: inline-block;
            position: relative;

            // margin-left: 95%;
            // margin-right: 20%;
            // width: 5%;
            img {
                width: 7%;
                margin-left: 80%;
                margin-top: 3.5%;
            }

            .drop-down-select {
                position: absolute;
                margin-left: 80%;
                top: 115%;
                background-color: white;
                padding: .5rem;
                border-radius: 10px;
                box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3);
                opacity: 1;
                transform: translateY(0);
                // text-align: center;
                z-index: 3;

                div {
                    cursor: pointer;
                    width: 105%;
                    border-bottom: 2px solid rgb(52, 73, 94);
                    border-radius: .25rem;
                    margin-top: 5px;
                    margin-bottom: 5px;

                    &:hover {
                        font-weight: 500;
                        //WHY IT DOESN"T WORK?
                        color: white;
                    }
                }
            }
        }

        #cart {
            position: absolute;
            margin-left: 21%;
            margin-top: 1.1%;
            margin-right: 24%;
            width: 2.5%;
        }
        #mycart {
            position: absolute;
            margin-left: 33%;
            margin-top: 1.15%;
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

        // .user {
        //     img {
        //         border: 2px solid black;
        //         border-radius: 10px;
        //     }
        //     .drop-down-select {
        //         display: none;
        // 		padding: 0;
        // 		position: absolute;
        // 		margin-left: 25%;
        //         margin-top: 5%;
        // 		list-style-type: none;
        // 		border: 2px solid #27ae60;
        // 		border-radius: 10px;
        // 		a {
        // 			text-decoration: none;
        // 			color: #27ae60;
        // 			font-size: 15px;
        // 			font-weight: 300;
        // 			float: left;
        // 			width: 100px;
        // 			border-radius: 8px;
        // 		}
        //     }
        //     &:hover {
        // 		border:2px solid #27ae60;
        // 		.drop-down-select {
        //             position: absolute;
        // 			display: block;
        // 			a {
        // 				background-color: #f7f7f7;
        // 				&:hover {
        // 					background-color: #f38609;
        // 					color: white;
        // 				}
        // 			}
        // 		}
        // 	}
        // }

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
    //         
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

        .text {
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

}</style> 
