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
                    <button id="view-all-course" @click.prevent="redirectViewCourses">View all courses</button>
                    <button id="sign-up" @click.prevent="redirectSignUp">Sign Up</button>
                </div>
                <div class="intro-1">By @DNA team, UET 21-25</div>
            </div>
        </div>
        <br>
        <div class="intro">
            <div v-if="student.userName" class="hello">Hello {{ student.lastName + ' ' + student.firstName + '!' }}, a
                passionate learner of DNA!</div>
            <div v-else class="hello">Hello, a passionate learner! <img src="../assets/img/wave.png" alt=""></div>
            <!-- <div id="tit">WHO ARE WE?</div> -->
            <div class="body">
                <span id="logo"><img src="../assets/img/logo.png" alt=""></span>
                <span id="intro">We are <strong>DNA team</strong>, the authors of the online courses website you're in.
                    Learning is so interesting, it can help you know more about the world around, discover your ability on
                    learning and find out your own lovely course here.
                    <br>
                    <br>
                    We can show you many courses in many amazing categories (like: <strong>LifeStyle,
                        Healthcare,...</strong>) or in academic categories like <strong> Math, Development,
                        Software,...</strong>
                    <br>
                    <br>
                    Come to join with us: <strong id="slogan">Own your future by Learning skills!</strong>
                </span>
            </div>
        </div>

        <!-- TOP CATE -->
        <div class="top-cate">
            <div class="top-title">Some categories for you:</div>
            <div class="underline"></div>
            <br>
            <div class="line-1">
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
            </div>
        </div>
        <br>
        <br>

        <div class="view">
            <div id="view-head">Students are viewing</div>
            <div class="res-course">
                <li v-for="course in courses.slice(0, 8)" @click.prevent="showCourse(course.courseId);" class="item">
                    <div id="img">
                        <span><img :src="course.courseImage" alt=""></span>
                    </div>
                    <div id="content">
                        <div id="title"> {{ course.courseTitle }}</div>
                        <div id="descr">{{ course.courseDescription }}</div>
                        <div id="ins">Created by: <span id="name"> {{ course.instructorFirstName + ' ' +
                            course.instructorLastName
                        }}</span></div>
                        <div id="fee">{{ course.courseFee + ' VND' }}</div>
                    </div>
                </li>

            </div>
        </div>

        <!-- REASONS FOR DNA -->
        <div class="addition">
            <h2 class="titlee">Become an instructor</h2>
            <div class="boxx">
                <span id="introo">
                    <div>Instructors from around the world teach millions of students on DNA. We provide the tools and
                        skills to teach what you love. Wanna join with us?</div>
                    <button id="sign-up" @click.prevent="redirectSignUp">Sign Up</button>
                </span>
                <span id="img"><img src="../assets/img/ins.png"></span>
            </div>

        </div>
        <br>
        <br>
    </div>
</template>


<script>
import _ from 'lodash';
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    data() {
        return {
            courses: [],
            randomCourses: [],
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
        },
        redirectSignUp() {
            this.$router.push('/signup');
        },
        redirectViewCourses() {
            this.$router.push('/courses');
        },
        getRandomCourse() {
            let coursesCopy = [...this.courses]; // create a copy of the array to avoid modifying the original
            // loop 8 times or until there are no more elements to choose from
            for (let i = 0; i < 8 && coursesCopy.length > 0; i++) {
                let randomIndex = Math.floor(Math.random() * coursesCopy.length); // choose a random index
                this.randomCourses.push(coursesCopy[randomIndex]); // add the chosen element to the randomCourses array
                coursesCopy.splice(randomIndex, 1); // remove the chosen element from the coursesCopy array
            }
            this.courses = this.randomCourses;
        },
        async showCourse(id) {
            let check = await axios.post(`/course/state/${id}`, {}, { withCredentials: true });
            let states = check.data.msg;
            if (states === 'Unactivated') {
                this.$router.push(`/course/info/${id}`);
            } else if (states === 'Activated') {
                this.$router.push(`/course/detail/${id}`);
            }
        },
    },
    computed: {
        ...mapState(['student'])
    },
    created() {
        axios.get('/courses', { withCredentials: true })
            .then(response => {
                this.courses = response.data
                this.getRandomCourse();
            })
            .catch(e => {
                this.errors.push(e)
            });

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
    // background-color: rgb(52,73,94);
    // background-image: linear-gradient(to top, rgb(52, 73, 94) 28%, rgb(230, 230, 230) 50%);

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

            50% {
                opacity: 1;
            }

            75% {
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

            50% {
                opacity: 0;
            }

            75% {
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

            .intro-1 {
                margin-top: 12%;
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

        }
    }

    .intro {
        color: #000;
        left: 20px;
        margin-top: 4%;
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 160px;
        width: 90%;
        .hello {
            font-size: 2.4rem;
            font-weight: 650;
            margin-bottom: 80px;
            color: #880000;

            img {
                width: 60px;
                // height: 50%;
                // margin-bottom: 20px;
            }
        }

        #tit {
            font-size: 2.4rem;
            font-weight: 700;
            margin-bottom: 25px;
        }

        img {
            width: 200px;
        }

        .body {
            width: 90%;
            display: flex;
            font-size: 1.2rem;

            #logo {}

            #intro {
                margin-left: 20px;

                strong {
                    font-style: italic;
                }

                #slogan {
                    color: #880000;
                }
            }
        }
    }

}

.top-title {
    margin-left: 50px;
    font-size: 3rem;
}

.box {
    border-radius: 5px;
    box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1), 0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
    background-color: rgb(245, 255, 250);
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

        .body {
            font-weight: 600;
            font-size: 2.2rem;
            margin-left: 5px;
            left: 50px;
            color: rgb(160, 82, 45);
        }
    }

}

.top-cate {
    margin-left: 80px;
    margin-right: 50px;
    margin-top: -90px;

    .top-title {
        font-size: 1.7rem;
        font-weight: 650;
        color: rgb(52, 73, 94);
    }

    .sub {
        text-align: center;

        .cate {
            width: 65%;
            height: 70%;
            display: inline-block;
            // background-color: rgb(248,248,248);
            // background-color: rgb(52,73,94);
            border: 0.5px inset rgb(230, 230, 230);

            cursor: pointer;
            // border-radius: 10px;

            .cate-img {
                width: 75%;
                top: -3.5%;
                padding: 15%;
                left: 0%;
            }

            .cate-img:hover {
                transform: scale(1.05);
            }
        }

        .cate-content {
            margin: 10px 0;
            font-size: 1.3vw;
            font-weight: 650;
            line-height: 2;
            color: rgb(52, 73, 94);
        }
    }
}

.view {
    margin-left: 130px;
    top: -20px;

    #view-head {
        font-size: 1.8rem;
        font-weight: 650;
        color: rgb(52, 73, 94);
        margin-bottom: 20px;
    }

    .res-course {
        // margin-left: 8.5%;
        // border: 2px solid black;
        margin-left: 20px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            border: 2px inset black;
        }

        .item {
            display: flex;
        }

        li {
            list-style: none;
            display: flex;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }

        #content {
            margin-left: 2%;

            #title {
                font-weight: 600;
                font-size: 1.15rem;
                margin-bottom: 10px;
            }

            #descr {
                font-size: 0.9rem;
                margin-bottom: 10px;
            }

            #ins {
                font-size: 0.9rem;

                #name {
                    font-weight: 500;
                }

                margin-bottom: 10px;
            }

            #fee {
                font-weight: 600;
                font-size: 1.2rem;
            }
        }

        #line {
            border: 2px solid black;
        }
    }
}

.addition {
    margin-left: 130px;
    margin-right: 50px;
    margin-top: 50px;
    .titlee {
        font-size: 1.8rem;
        font-weight: 650;
        color: rgb(52, 73, 94);
        margin-bottom: 20px;
    }

    .boxx {
        display: flex;

        #introo {
            margin-left: 50px;
            width: 50%;
            margin-top: 11%;
            font-size: 1.4rem;
            font-weight: 700;
            color: rgb(52, 73, 94);
            display: block;

            #sign-up {
                margin-left: 50%;
                transform: translateX(-60%);
                margin-top: 10%;
                background-color: transparent;
                color: #000;
                font-size: 1.1rem;
                font-weight: 600;
                padding: 8px;
                width: 30%;
                border: 3px inset rgb(52, 73, 94);

                &:hover {
                    font-weight: 500;
                    background-color: rgb(52, 73, 94);
                    color: #fff;
                }
            }
        }

        #img {}
    }

}

.space {
    min-height: 100px;
}</style>