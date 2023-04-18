<template>
<!--  html code is here -->
<div class="space"></div>
<div class="top-cate">
    <h2 class="top-title">Top categories</h2>
    <div class="line-1">
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Math</p>
        </div>
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Literature</p>
        </div>
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Physical</p>
        </div>
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Chemistry</p>
        </div>

    </div>
    <div class="line-2">
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Math</p>
        </div>
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Literature</p>
        </div>
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Physical</p>
        </div>
        <div class="cate">
            <img src="../assets/img/address.png" class="cate-img">
            <br/>
            <p class="cate-content">Chemistry</p>
        </div>

    </div>
</div>
</template>

<script>    
import Footer from '../components/Footer.vue'
export default {
    name: 'Home',
    // data() {
	// 	return {

	// 	}
	// },
	// methods: {
	// 	...mapMutations(['scrollToTop'])
	// },
	// computed: {
	// 	...mapState(['user'])
	// }
}

// Logic do in here
</script>

<style lang = "scss" scoped>
@font-face {
   font-family: myFirstFont;
   src: url(../assets/font/Vollkorn-VariableFont_wght.ttf);
}
*{
    position: relative;
    padding: 0;
    margin: 0;
    border-sizing: border-box;
    font-family: myFirstFont;
}

.line-1, .line-2 {
    display: flex;
    margin-top: 15px;
}
.top-title {
    font-size: 1.8rem;
}
.top-cate {
    margin-left: 15px
}
.cate {
    width: 100%;
    display: inline-block;
}
.cate-img {
    text-align: center;
    width: 60%;
    padding: 10%;
    background-color: rgb(0,128,128);
    cursor: pointer;
    border-radius: 10px;
}

.cate-img:hover {
    padding: 3%;
    width: 74%;
}

.cate-content {
    margin: 10px 0;
    font-size: 1.2rem;
    font-weight: 600;
}
.space {
    min-height: 100px;
}


// Style css in here
</style>