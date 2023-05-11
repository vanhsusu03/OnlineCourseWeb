<template>
    <!--  html code is here -->
    <!-- BACK GR -->
    <div class="home">
        <div class="part1">
            <div class="box">
                <img src="../assets/img/bgr.jpg" alt="" class="top">
                <img src="../assets/img/bgr1.jpg" alt="" class="bottom">
            </div>
            <div class="content">
                <img src="../assets/img/logo.png" alt="">
                <div class="quote-line-1"> OWN YOUR FUTURE BY</div>
                <!-- <img src="../assets/img/logo.png" alt=""> -->
                <div class="quote-line-2">LEARNING SKILLS</div>
                <div class="button">
                    <button id="view-all-course">View all courses</button>
                    <button id="sign-up">Sign Up</button>
                </div>
                <div class="intro">By @DNA team, UET 21-25</div>
            </div>
        </div>
        <br>
        <br>

        <!-- INTRO -->
        <div class="intro">
            <div v-if="student.userName" class="hello">
                <div class="hi">Hi,</div>
                <div class="body">
                    {{ student.lastName + ' ' + student.firstName + '!' }}
                </div>
            </div>
        </div>

        <!-- TOP CATE -->
        <div class="top-cate">
            <h2 class="top-title">Explore 1000+ courses in DNA</h2>
            <div class="underline"></div>
            <br>
            <div class="line-1">
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <img src="../assets/img/math.png" class="cate-img">
                        <br />
                    </div>
                    <p class="cate-content">Math</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/des.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Design</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/dev.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Development</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/psy.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Psychology</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/music.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Music</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/health.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Health</p>
                </div>
            </div>
            <div class="line-2">
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/lifestyle.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Lifestyle</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/media.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Media</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/it.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">IT</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/economic.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Economic</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/chemistry.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Chemistry</p>
                </div>
                <div class="sub" @click="redirectSearching">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/physic.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Physics</p>
                </div>
            </div>
        </div>
        <br>
        <br>
        <!-- REASONS FOR DNA -->
        <div class="reasons">
            <h2 class="top-title">WHY CHOOSING DNA?</h2>
            <br>
            <div class="line-1">
                <div class="sub">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/highquality.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">High quality</p>
                </div>
                <div class="sub">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/remote.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Remote studying</p>
                </div>
                <div class="sub">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/diver.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Courses diverse</p>
                </div>
                <div class="sub">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/com.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">Large community</p>
                </div>
            </div>
            <div class="line-1">
                <div class="sub">
                    <div class="cate">
                        <!-- <div class="math"> -->
                        <img src="../assets/img/instructor.png" class="cate-img">
                        <!-- </div> -->
                        <br />
                    </div>
                    <p class="cate-content">'Open' Instructor</p>
                </div>
            </div>
        </div>
        <br>
        <br>
    </div>
</template>


<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations(['scrollToTop']),
        getText(event) {
            const clickedElement = event.target;
            const subDiv = clickedElement.closest(".sub");
            let pTag = subDiv.querySelector(".cate-content");
            let text = pTag.textContent;
            return text;
        },
        redirectSearching(event) {
            let id = this.getText(event);
            this.$router.push(`/searching/${id}`);
        }
    },
    computed: {
        ...mapState(['student'])
    }
}
</script>

<style lang = "scss" scoped>
@font-face {
    font-family: fontt;
    src: url(../assets/font/Novecento\ WideDemiBold.ttf);
    // font-family: font_text;
    // src: url(../assets/font/Georgia.ttf);
}

* {
    position: relative;
    padding: 0;
    margin: 0;
}

.home {
    position: relative;

    // background-image: linear-gradient(to top, rgb(52, 73, 94) 20%, #fff 80%);
    .part1 {
        position: relative;

        .box {
            position: relative;
        }

        img {
            width: 100%;
        }

        @keyframes FadeOut {
            0% {
                opacity: 1;
            }

            45% {
                opacity: 1;
            }

            55% {
                opacity: 0;
            }

            100% {
                opacity: 0;
            }
        }

        .top {
            position: relative;
            animation-name: FadeOut;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-duration: 5s;
            animation-direction: alternate;
        }

        @keyframes FadeIn {
            0% {
                opacity: 0;
            }

            45% {
                opacity: 0;
            }

            55% {
                opacity: 1;
            }

            100% {
                opacity: 1;
            }
        }

        .bottom {
            position: absolute;
            top: 0; 
            left: 0;
            animation-name: FadeIn;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-duration: 5s;
            animation-direction: alternate;
        }


        .content {
            text-align: center;
            position: absolute;
            top: 0;
            border: 2px solid black;
            width: 100%;
            height: 100%;
            display: block;
            color: #fff;
            // background-color: rgba(0,0,0,0.5);
            background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75) 15%, rgba(0, 0, 0, 0.3) 90%);

            img {
                margin-top: 20%;
                width: 150px;
            }

            .quote-line-1 {
                // margin-top: 20%;
                font-size: 4.5rem;
                -webkit-text-stroke: 0.6px #000000;
                font-weight: 900;
                animation: move-text 2s linear infinite;
            }

            @keyframes move-text {
                0% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(3%);
                }

                100% {
                    transform: translateY(0);
                }
            }

            .quote-line-2 {
                // margin-top: 20%;
                font-size: 3rem;
                -webkit-text-stroke: 0.6px #000000;
                font-weight: 500;
                animation: move-text 2s linear infinite;
            }

            .button {
                margin-top: 50px;

                #view-all-course {
                    background-color: transparent;
                    color: #fff;
                    font-size: 1.1rem;
                    padding: 8px;
                    border: 3px inset #fff;
                    margin-right: 80px;

                    width: 10%;

                    &:hover {
                        font-weight: 500;
                        border: 3px solid #fff;
                    }
                }

                #sign-up {
                    background-color: transparent;
                    color: #fff;
                    font-size: 1.1rem;
                    padding: 8px;
                    width: 10%;
                    border: 3px inset #fff;

                    &:hover {
                        font-weight: 500;
                        border: 3px solid #fff;
                    }
                }
            }

            .intro {
                color: #fff;
                left: -45px;
                margin-top: 12.5%;
                font-size: 1.1rem;
                font-weight: 500;
            }
        }
    }
}

.top-title {
    margin-left: 30px;
}

.box {
    border-radius: 5px;
    box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1), 0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
    background-color: rgb(245, 255, 250);
}

// BACKGROUND ANIMATION
.bgr {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;

    .top {
        position: relative;
        top: 0;
        left: 0;
        display: inline-flex;

        img {
            margin-left: 5%;
            clip-path: inset(40px);
            width: 90%;
            height: 60%;
            padding: 0 0 0 0;
            // opacity: 0.2;
        }

        .box {
            text-align: center;
            position: absolute;
            top: 60%;
            left: 45%;
            width: 35%;
            height: 20%;
            background-color: white;
            box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.5);

            .text {
                position: relative;

                .heading {
                    position: absolute;
                    font-size: 1.4vw;
                    font-style: bold;
                    font-weight: 1000;
                    width: 100%;
                    height: 25%;
                    margin-top: 5%;
                }

                .body {
                    position: absolute;
                    font-size: 1.7vw;
                    font-style: bold;
                    font-weight: 500;
                    margin-top: 17%;
                    margin-left: 18%;
                }
            }
        }
    }


    .bottom {
        position: absolute;
        top: 0;
        left: 0;

        img {
            clip-path: inset(40px);
            width: 100%;
            height: 60%;
            // margin-left: 180px;
            // margin-right: 40px;
        }

        .box {
            text-align: center;
            position: absolute;
            top: 10%;
            left: 45%;
            width: 35%;
            height: 20%;
            background-color: white;
            box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.5);

            .text {
                position: relative;

                .heading {
                    position: absolute;
                    font-size: 1.4vw;
                    font-style: bold;
                    font-weight: 1000;
                    width: 100%;
                    height: 25%;
                    margin-top: 5%;
                }

                .body {
                    position: absolute;
                    font-size: 1.7vw;
                    font-style: bold;
                    font-weight: 500;
                    margin-top: 17%;
                    margin-left: 18%;
                }
            }
        }
    }

    @keyframes FadeOut {
        0% {
            opacity: 1;
        }

        45% {
            opacity: 1;
        }

        55% {
            opacity: 0;
        }

        100% {
            opacity: 0;
        }
    }

    .top {
        animation-name: FadeOut;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-duration: 5s;
        animation-direction: alternate;
    }

    @keyframes FadeIn {
        0% {
            opacity: 0;
        }

        45% {
            opacity: 0;
        }

        55% {
            opacity: 1;
        }

        100% {
            opacity: 1;
        }
    }

    .bottom {
        animation-name: FadeIn;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-duration: 5s;
        animation-direction: alternate;
    }

}

.line-1,
.line-2 {
    // width: 100%;
    // height: 100%;
    position: relative;
    display: flex;
    margin-top: 15px;
    justify-content: space-evenly;
}

.intro {
    color: rgb(52, 73, 94);
    margin-bottom: 8%;
    margin-left: 7%;
    margin-top: -3%;

    .hello {
        display: flex;

        .hi {
            font-weight: 550;
            font-size: 2.2rem;
            left: 50px;

        }

        .body {
            font-weight: 600;
            font-size: 2.2rem;
            margin-left: 5px;
            left: 50px;
            color: rgb(160, 82, 45);
        }
    }

    // .content {
    //     margin-top: 18px;
    //     font-size: 1.5rem;
    // }

    // .ins {
    //     position: absolute;
    //     border: 2px solid black;
    //     height: 200%;
    //     width: 94.5%;
    // }
}

.top-cate {
    margin-left: 80px;
    margin-right: 50px;
    margin-top: -90px;

    .top-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: rgb(52, 73, 94);
        // div {border-bottom: 2px solid rgb(52,73,94);}
        // font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    }

    .sub {
        text-align: center;

        .cate {
            width: 80%;
            height: 80%;
            display: inline-block;
            background-color: rgb(250, 250, 250);
            border: 1px solid black;
            cursor: pointer;
            border-radius: 10px;

            .cate-img {
                width: 75%;
                top: 10%;
                padding: 10%;
            }

            .cate-img:hover {
                transform: scale(1.05);
            }
        }

        .cate-content {
            margin: 10px 0;
            font-size: 1.3vw;
            font-weight: 600;
        }
    }
}

.reasons {
    margin-left: 80px;
    margin-right: 50px;

    .top-title {
        font-size: 1.8rem;
        font-weight: 800;
        color: rgb(52, 73, 94);
    }

    .sub {
        text-align: center;

        .cate {
            width: 14vw;
            height: 14vw;
            display: inline-block;
            background-color: rgb(255, 250, 240);
            border: 1px solid rgb(207, 207, 207);
            cursor: pointer;
            border-radius: 50%;

            .cate-img {
                width: 75%;
                top: 10%;
                padding: 10%;
            }

            .cate-img:hover {
                transform: scale(1.05);
            }
        }

        .cate-content {
            margin: 10px 0;
            font-size: 1.4vw;
            font-weight: 300;
        }
    }
}

.space {
    min-height: 100px;
}
</style>