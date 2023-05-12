<template>
<footer>
    <div class="main-content">
        <div class="left footer-box">
            <h2 class="head-content">About us</h2>
            <div class="body-content">
                <p>Our online learning websites have become a popular way for people to access education on a variety of subjects. They offer a flexible and convenient way for learners to study at their own pace and from anywhere in the world. Online learning provides access to high-quality education that may not be available in traditional classroom settings. Learners can benefit from interactive tools and resources that enhance their understanding of the course material.</p>
                <div class="social">
                    <a href="https://www.facebook.com/vietanh.duongnguyen.7" target="_blank"><img src="../assets/img/face.png" class="fab"></a>
                    <a href="#" target="_blank"><img src="../assets/img/twitter.png" class="fab"></a>
                    <a href="https://www.youtube.com/@vietanhduongnguyen8174" target="_blank"><img src="../assets/img/youtube.png" class="fab"></a>
                    <a href="https://www.instagram.com/vanhsusu/" target="_blank"><img src="../assets/img/insta.png" class="fab"></a>
                </div>
            </div>
        </div>

        <div class="center footer-box">
            <h2>Address</h2>
            <div class="body-content">
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
                    <span class="text">dnateam@gmail.com</span>
                </div>
            </div>
        </div>

        <div class="right footer-box">
            <h2>Contact us</h2>
            <div class="body-content">
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

.main-content .footer-box {
    flex-basis: 50%;
    padding: 10px 20px;
}

.footer-box h2 {
    font-size: 1.125rem;
    font-weight: 600;
    text-transform: uppercase;
}

.footer-box .body-content {
    position: relative;
    margin: 20px 0 0 0;
}

.footer-box .body-content:before{
    position:absolute;
    content:'';
    top: -10px;
    height: 2px;
    width: 100%;
    background: #1a1a1a;
}
.footer-box .body-content:after{
    position:absolute;
    content:'';
    top: -10px;
    height: 2px;
    width: 15%;
    background: white;
}
.left .body-content p {
    text-align: justify;
}

.left .body-content .social {
    margin: 20px 0 0 0;
}

.left .body-content .social a {
    padding: 0 25px 0 0;
}

.left .body-content .social a img {
    padding: 5px;
    height: 30px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    transition: 0.3s;
}

.left .body-content .social a img:hover {
    background: #f12020;
}

.center .body-content .fas {
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

.center .body-content .fas:hover {
    background: #f12020;
}

.center .body-content .text {
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
