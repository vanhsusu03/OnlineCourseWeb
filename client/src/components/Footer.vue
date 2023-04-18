<template>
<footer>
    <div class="main-content">
        <div class="left box">
            <h2 class="head-content">About us</h2>
            <div class="content">
                <p>Day la page hoc tap la page hoc tap la page hoc tap la page hoc tap la page hoc tap la page hoc tap la page hoc tap</p>
                <div class="social">
                    <a href="https://www.facebook.com/messages/t/100012917022374"><img src="../assets/img/face.png" class="fab"></a>
                    <a href="#"><img src="../assets/img/twitter.png" class="fab"></a>
                    <a href="#"><img src="../assets/img/youtube.png" class="fab"></a>
                    <a href="#"><img src="../assets/img/insta.png" class="fab"></a>
                </div>
            </div>
        </div>

        <div class="center box">
            <h2>Address</h2>
            <div class="content">
                <div class="place">
                    <img src="../assets/img/address.png" class="fas">
                    <span class="text">144, Xuan Thuy, Cau Giay, Ha Noi</span>
                </div>
                <div class="phone">
                    <img src="../assets/img/phone.png" class="fas">
                    <span class="text">0393516203</span>
                </div>
                <div class="email">
                    <img src="../assets/img/mail.png" class="fas">
                    <span class="text">minhdatuet@gmail.com</span>
                </div>
            </div>
        </div>

        <div class="right box">
            <h2>Contact us</h2>
            <div class="content">
                <form action="#">
                    <div class="email">
                        <div class="text">Email *</div>
                        <input type="email" required>
                    </div>
                    <div class="msg">
                        <div class="text">Message *</div>
                        <textarea cols="25" rows="2" required></textarea>
                    </div>
                    <div class="btn">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="bottom">
        <center>
            <span class="credit">Created By <a href="#">DNATeam</a> | 2022</span>

        </center>
    </div>
</footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
@font-face {
   font-family: myFirstFont;
   src: url(../assets/font/Vollkorn-VariableFont_wght.ttf);
}
* {
    margin: 0;
    padding: 0;
    color: #d9d9d9;
    box-sizing: border-box;
    font-family: myFirstFont;
}

footer {
    position: relative;
    bottom: 0px;
    width: 100%;
    background: #111;
}

.main-content {
    display: flex;
}

.main-content .box {
    flex-basis: 50%;
    padding: 10px 20px;
}

.box h2 {
    font-size: 1.125rem;
    font-weight: 600;
    text-transform: uppercase;
}

.box .content {
    position: relative;
    margin: 20px 0 0 0;
}

.box .content:before{
    position:absolute;
    content:'';
    top: -10px;
    height: 2px;
    width: 100%;
    background: #1a1a1a;
}
.box .content:after{
    position:absolute;
    content:'';
    top: -10px;
    height: 2px;
    width: 15%;
    background: #f12020;
}
.left .content p {
    text-align: justify;
}

.left .content .social {
    margin: 20px 0 0 0;
}

.left .content .social a {
    padding: 0 25px 0 0;
}

.left .content .social a img {
    padding: 5px;
    height: 30px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    transition: 0.3s;
}

.left .content .social a img:hover {
    background: #f12020;
}

.center .content .fas {
    background: #fff;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    transition: 0.3s;
    cursor: pointer;
    margin-top: 15px;
    margin-right: 15px;
    padding: 5px;
    position: relative;
}

.center .content .fas:hover {
    background: #f12020;
}

.center .content .text {
    line-height: 30px;
    font-size: 1.0625rem;
    font-weight: 500;
    position: absolute;
     /* display: inline-block;  */
    margin-top: 15px
}

.right form .text {
    font-size: 1.0625rem;
    margin-bottom: 2px;
    color: #656565;
}

.right form .msg {
    margin-top: 10px;
}

.right form input,
.right form textarea {
    width: 100%;
    font-size: 1.0625rem;
    background: #151515;
    padding-left: 10px;
    border: 1px solid #222222;
}

.right form input:focus,
.right form textarea:focus {
    outline-color: #3498db;
}

.right form input {
    height: 35px;
}

.right form .btn {
    margin-top: 10px;
}

.right form .btn button {
    height: 40px;
    width: 100%;
    border:none;
    outline: none;
    background: #f12020;
    font-size: 1.25rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;

}
.right form .btn button:hover {
    background: #000;
}

.bottom center {
    padding: 5px;
    font-size: 0.9375rem;
    background: #151515;
}

.bottom center span {
    color: #656565;
}

.bottom center a {
    color: #f12020;
    text-decoration: none;
}

.bottom center a:hover {
    text-decoration: underline;
} 
</style>
