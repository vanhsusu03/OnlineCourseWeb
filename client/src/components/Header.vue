<template>
    <div class="header">
        <RouterLink to="/" @click= "scrollToTop()" class="logo"> <img src="../assets/img/logo.png" /></RouterLink>

        <nav class="navbar">
            <RouterLink @click="scrollToTop()" to="/catergories">
            <div class="cate">Categories</div>
            </RouterLink>
        <div class="search">
            <RouterLink @click="scrollToTop()" to="/searching"><img src="../assets/img/lookup.png" /></RouterLink>
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
        <!-- WHEN LOGIN AND NOT LOGIN -->
<!--         
        <div v-if="!user.userName" class="account">
        <div class="login">
            <RouterLink @click="scrollToTop()" to="/login">Login</RouterLink>
        </div>
        <div class="signup">
            <RouterLink @click="scrollToTop()" to="/signup">Sign Up</RouterLink>
        </div>  
        </div>

        <div v-if="!user.userName" class="account">
        <div class="login">
            <RouterLink @click="scrollToTop()" to="/login">Login</RouterLink>
        </div>
        <div class="signup">
            <RouterLink @click="scrollToTop()" to="/signup">Sign Up</RouterLink>
        </div>  
        </div> -->
        


        </nav>

        <div class="icons">
            <RouterLink @click="scrollToTop()" to="/cart"><img src="../assets/img/cart.png"></RouterLink>
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
    await axios.post('/logout',{},  {withCredentials: true});
    this.setUser([]);
    this.setAdmin(null);
    this.setLogged(false);
},
computed: {
		...mapState(['user', 'admin'])
	}
    }
}
</script>

<style lang = "scss" scoped>


.header {
    position:relative;
    top: 0;
    left:0;
    right: 0;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 1rem 1rem rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    // justify-content: space-between;
    padding: 0;
    margin: 0;
    height: 80px;

// HEADER LOGO
    .logo {
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bolder;
        color: black;
        display: flex;
        align-items: center;
        // margin-top: px;
        img {
            padding-right: 0.25rem;
            width: 70px;
        }
    }  
    // Header nav-bar
	.navbar {
        
        img {
            width: 20px;
            margin-top: 9px;
            margin-left: -8px;
        }
		a {
            text-decoration: none;
			font-size: 1.15rem;
			margin: 0 1.5rem;
			color: #000;
			z-index: 1;
			&:hover {
				color: rgb(52,73,94);
			}
		}
        .cate {
            font-weight: 500;
        }
        .search {
            border: 1px solid black;
            border-radius: 10px 10px 10px 10px;
            width: 820px;
            height: 40px;
            margin-right: 90px;
        }
        .login{
            position: absolute;
            margin-left: 119%;;
            padding: 0;
            // border: 2px inset black;
            // border-width: 10px;;
            .text {
                position: relative;
                width: 350%;
                height: 40px;
                border: 1px solid black;
                justify-content: center;
                align-items: center;
                border-radius: 10px 10px 10px 10px;
                &:hover {
                    background-color: rgb(52,73,94);
                    color: white;
                }
                .l {
                    font-weight: 500;
                    position: absolute;
                    top: 15%;
                    left: 20%;
                }
            }
        }

        .signup{
            position: absolute;
            margin-left: 128%;
            padding: 0;
            .textt {
                position: relative;
                width: 350%;
                height: 40px;
                border: 2px solid black;
                justify-content: center;
                align-items: center;
                background-color: #000;
                border-radius: 10px 10px 10px 10px;
                color:#fff;
                &:hover {
                    // background-color: rgb(52,73,94);
                    color: white;
                }
                .ll {
                    font-weight: 500;
                    position: absolute;
                    top: 15%;
                    left: 13%;
                }
            }
        }

	}

}


.icons {
    img {
        width: 2.3%;
        position: absolute;
        cursor: pointer;
        left: 82%;
        top: 30%;
    }
}
/*
@media (min-width: 769px) {
	.header .icons .account:hover .drop-down-select {
    display: block;
  }
}

@media (max-width: 768px) {
	.header {
		.navbar {
			position: absolute;
			top: 99%;
			left: 0;
			right: 0;
			background: #fff;
			border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
			border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
			clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
			a {
				font-size: 2rem;
				margin: 1rem; 
				display: block;
			}
            login {
                font-size: 2rem;
				margin: 1rem; 
            }
		}
		.navbar.active {
			clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
			display: flex;
			justify-content: space-evenly;
		}
	}
	.icons {
		display: inline-block;
	}
}
@media (max-width: 576px) {
	.header .navbar a {
		font-size: 1.5rem;
		margin: 0;
	}

	.header .icons .account .drop-down-select {
		margin-left: -50px;
	}
}
*/
</style> 

