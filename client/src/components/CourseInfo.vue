<!-- When not activated -->
<template>
    <div class="all">
        <div class="inf">
            <div class="box">
                <div class="info-box">
                    <div class="top">
                        <div class="category">
                            <span id="text"> Category:</span>
                            <span v-for="namee in this.category" id="category">
                                <a>{{ ' ' + namee.name + ' - ' }}</a>
                            </span>
                        </div>
                    </div>
                    <div class="bottom">
                        <div id="name">
                            <div>
                                {{ course.title }}
                            </div>
                        </div>
                        <div class="description">
                            <div id="text"></div> Description:
                            <span id="cont"> {{ course.description }}</span>
                        </div>
                        <div class="insight">
                            <div id="rating">
                                Rating:
                                <span id="rate"> {{ averageRating }}</span>
                                <span id="star"><img src="../assets/img/star.png" alt=""></span>
                            </div>
                            <span id="num-of-student">
                                Number of students:
                                {{ numOfStudents }}
                            </span>
                        </div>
                        <div id="created">
                            Created by: <span id="name-author"> {{ this.instructor_fullname }}</span>
                        </div>
                        <div id="last-update">
                            Release date: {{ course.release_date }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-intro">
                <div id="course-content">
                    <div class="tab">
                        <h1 style="padding: 10px 0; background-color: white; font-weight: 700; ">Course Contents:</h1>
                        <div v-for="(chapter, index) in courseDetail" class="tab-content">

                            <div class="sub-title" v-on:click="openTabs(chapter.chapterId);">
                                <div class="limit chapter-title">{{ index + 1 }}. {{ chapter.chapterTitle }}</div>
                                <div class="container" :class="{ change: openTab[chapter.contents[0].contentId] }">
                                    <div class="bar1"></div>
                                    <div class="bar2"></div>
                                    <div class="bar3"></div>
                                </div>
                            </div>
                            <button class="tablinks"
                                :class="{ active: openContent[cont.contentId], open: openTab[cont.contentId] }"
                                v-for="(cont, index) in chapter.contents" v-on:click=" openChapter(cont.contentId)">
                                <div class="limit">
                                    {{ index + 1 }}. {{ cont.contentTitle }}
                                </div>
                                <div class="time-course">
                                    {{ parseInt(cont.timeRequiredInSec / 60) }} min {{ cont.timeRequiredInSec - parseInt(
                                        cont.timeRequiredInSec / 60) * 60 }} s
                                </div>
                            </button>
                        </div>

                        <!-- {{ openChapter($even, 1) }} -->
                    </div>
                </div>
            </div>
            <br>
            <div class="instructor-info">
                <div id="title">Instructor info</div>
                <div class="inf">
                    <span id="part1" @click="redirectInstructor(this.course.instructor_id)">
                        <img :src="instructor_img" alt="">
                        <div id="name">{{ instructor_fullname }}</div>
                    </span>
                    <span id="part2">
                        <div class="bio"> {{ instructor.instructorBio }}</div>
                        <input class="expand-text" type="checkbox">
                        <!-- <div id="qualifi">Qualification of instructor</div> -->
                    </span>
                </div>
            </div>

            <div class="student-review">
                <div id="head">Student thinks about this course</div>
                <div class="show-feedbacks">
                    <li v-for="feedback in this.feedbackDetails">
                        <div id="image">
                            <img :src="feedback.studentImage" alt="">
                        </div>
                        <div id="content">
                            <div id="name"> {{ feedback.studentFirstName + ' ' + feedback.studentLastName }}
                                <div id="rating">{{ feedback.feedbackRating + ' ' }} <img src="../assets/img/star.png"
                                        alt="">
                                </div>
                            </div>
                            <!-- <div id="rating">{{ feedback.feedbackRating + ' ' }} <img src="../assets/img/star.png" alt="">
                                </div> -->
                            <div id="detail">{{ feedback.feedbackDetail }}</div>
                            <div id="time">Created at:{{ ' ' + feedback.feedbackLastUpdateTime.slice(0, 10) }}</div>
                        </div>
                    </li>
                </div>
            </div>

            <div class="related-course">
                <div class="head">
                    Courses of <span id="inss">{{ instructor_fullname }}</span></div>
                <div class="show-course">
                    <li v-for="course in this.courseofAuth" @click.prevent="showCourse(course.course_id)" class="item">
                        <div id="img">
                            <span><img :src="course.image" alt=""></span>
                        </div>
                        <div id="content">
                            <div id="title"> {{ course.title }}</div>
                            <div id="descr">{{ course.description }}</div>
                            <div id="ins">Created by: <span id="name"> {{ instructor_fullname }}</span></div>
                            <div id="release-date">Release date: <span id="date">{{ course.release_date }}</span></div>
                            <div id="fee">{{ course.course_fee + ' VND' }}</div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
        <div class="short-info">
            <img :src="course.image" alt="" id="img">
            <div class="fee">
                <div> {{ course.course_fee }}</div>
                <div id="image"><img src="../assets/img/logo.png" alt=""></div>
            </div>
            <br>
            <div>
                <button id="add-to-cart" @click="addToCart(course)" v-if="!checkBought(course.course_id)">Add to cart</button>
                <button id="study-button" v-else @click="redirectStudy(course.course_id)">Study</button>
            </div>
            <br>
            <div>
                <button id="buy-now" v-on:click="openPayment()">Buy now</button>
            </div>
            <br>
            <div id="intro">
                This course include:
                <div class="time">
                    <span id="img"><img src="../assets/img/vid.png" alt=""></span>
                    <span id="duration">{{ time_hour + ' hours ' + time_minute + ' mins ' + time_second + ' secs' }}</span>
                </div>
                <div class="content">
                    <span id="img"><img src="../assets/img/chapter.png" alt=""></span>
                    <span id="total-content">{{ this.numOfChapters + ' chapters, ' + this.numOfContents + ' articles'
                    }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="myModal">
        <div class="modal-content">
            <span class="close" v-on:click="closePayment()">&times;</span>
            <p>
                <Payment :numOfCourses="courses.length" :courses="courses" :isInCart="false"></Payment>
            </p>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios';
import {
    mapMutations,
    mapState
} from 'vuex';
import Payment from '@/pages/Payment.vue';
import {
    shallowReactive
} from 'vue';

export default {
    name: 'CourseInfo',
    data() {
        return {
            course: Object,
            courses: [{
                courseId: Number,
                courseTitle: "",
                courseDescription: "",
                courseImage: "",
                courseFee: Number,
                instructorFirstName: "",
                instructorLastName: ""
            }],
            category: [],
            id_instructor: 5,
            instructor: Object,
            instructor_fullname: "",
            instructor_img: "",
            instructor_email: "",
            instructor_bio: "",
            courseofAuth: [],
            isBought: "",
            courseDetail: [],
            numOfStudents: 0,
            numOfChapters: 0,
            numOfContents: 0,
            numOfFeedback: 0,
            averageRating: 0,
            totalTime: 0,
            time_hour: 0,
            time_minute: 0,
            time_second: 0,
            feedbackDetails: [],
            begin: true,
            openTab: [],
            openContent: [],
            content: [],
            myCart: []
        }
    },
    components: {
        Payment
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setMiniCartChange']),
        redirectStudy(id) {
            this.$router.push('/study/'+id);
        },
        openChapter(content_id) {
            document.querySelectorAll('video').forEach(vid => {
                vid.currentTime = 0;
                vid.pause();
            });
            for (let i = 0; i < this.openContent.length; i++) {
                this.openContent[i] = false;
                if (i === content_id) {
                    this.openContent[i] = true;
                }
            }
            // tabcontent[chapter_id - 1].style.display = "block";
        },
        myFunction(evt) {
            evt.target.classList.add('change');
        },
        openTabs(id) {
            // alert("hi");
            // alert(id);
            var i;
            for (let j = 0; j < this.courseDetail.length; j++) {
                // alert(j);
                if (this.courseDetail[j].chapterId === id) {
                    // alert(j);
                    for (i = 0; i < this.courseDetail[j].contents.length; i++) {
                        // alert(i);
                        this.openTab[this.courseDetail[j].contents[i].contentId] = !this.openTab[this.courseDetail[j].contents[i].contentId];
                    }
                }
            }
        },
        fillOpenArray() {
            for (let j = 0; j < 200; j++) {
                this.openContent.push(false);
                this.openTab.push(false);
            }
        },
        onScroll(event) {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition > 200) {
                this.isBoxVisible = true;
            } else {
                this.isBoxVisible = false;
            }
        },
        redirectInstructor(id) {
            this.$router.push(`/instructor/info/show/${id}`);
        },
        async showCourse(id) {
            let check = await axios.post(`/course/state/${id}`, {}, {
                withCredentials: true
            });
            let states = check.data.msg;
            if (states === 'Unactivated') {
                this.$router.push(`/course/info/${id}`);
            } else if (states === 'Activated') {
                this.$router.push(`/course/detail/${id}`);
            }
        },
        async getCourseInfo() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/courses/${id}`, {
                withCredentials: true
            });
            this.course = res.data.info;
            this.category = this.course.categories;
            this.id_instructor = this.course.instructor_id;
            this.numOfStudents = res.data.numOfStudents,
                this.numOfChapters = res.data.numOfChapters,
                this.numOfContents = res.data.numOfContents,
                this.numOfFeedback = res.data.feedbackCount,
                this.averageRating = res.data.averageRating,
                this.getInstructorInfo(this.id_instructor);
        },
        async getInstructorInfo(id) {
            let res = await axios.get(`/instructor/info/${id}`, {
                withCredentials: true
            });
            this.instructor = res.data.result;
            this.instructor_fullname = this.instructor.student.instructorFullName;
            this.instructor_img = this.instructor.student.image;
            this.instructor_email = this.instructor.student.email;
            this.instructor_bio = this.instructor.instructorBio;

            await axios.get(`/courseof/${id}`, {
                withCredentials: true
            })
                .then(respone => {
                    this.courseofAuth = respone.data.courses;
                })

        },
        getTimeTotal() {
            for (let i = 0; i < this.courseDetail.length; i++) {
                let res = this.courseDetail[i].contents;
                for (let j = 0; j < res.length; j++) {
                    this.totalTime += res[j].timeRequiredInSec;
                }
            }
            this.time_hour = Math.floor(this.totalTime / 3600);
            this.time_minute = Math.floor((this.totalTime - this.time_hour * 3600) / 60)
            this.time_second = this.totalTime - 3600 * this.time_hour - 60 * this.time_minute;
        },
        async getCourseDetails() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let content = await axios.get(`/courses/${id}/contents`, {
                withCredentials: true
            });
            this.courseDetail = content.data.contents;
            this.getTimeTotal();
        },
        async getFeedbackOfCourse() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/courses/${id}/reviews`, {
                withCredentials: true
            });
            this.feedbackDetails = res.data.feedbacks;

        },
        convertData() {
            this.courses[0].courseId = this.course.course_id;
            this.courses[0].courseTitle = this.course.title;
            this.courses[0].courseImage = this.course.image;
            this.courses[0].courseFee = this.course.course_fee;
            this.courses[0].instructorFirstName = this.instructor_fullname;
            this.courses[0].courseDescription = this.course.description;
        },
        openPayment() {
            this.checkBought(this.course.course_id);
            if (this.isBought === 'Activated') {
                alert("You have actived this course before.");
                return;
            };
            if (this.checkInCart(this.course.course_id)) {
                return;
            }
                let modal = document.getElementById("myModal");
                this.convertData();
                modal.style.display = "block";
                this.openingPayment = true;
        },
        closePayment() {
            let modal = document.getElementById("myModal");
            modal.style.display = "none";
            this.openingPayment = false;
        },
        addToCart(course) {
            this.checkBought(this.course.course_id);
            this.convertData();
            setTimeout(() => {
                if (this.isBought === 'Unactivated') {
                    axios.post('/students/cart/' + course.course_id, this.courses[0], {
                        withCredentials: true
                    })
                        .then(response => {
                            alert(response.data.msg);
                            this.setMiniCartChange("change");
                        })
                        .catch(e => {
                            this.errors.push(e);
                        })
                } else if (this.isBought === 'Activated') {
                    alert("You have actived this course before");
                }
            }, 100);
        },
        checkBought(id) {
            axios.post(`/course/state/${id}`, {}, {
                withCredentials: true
            })
                .then(response => {
                    this.isBought = response.data.msg;
                });
            // alert(this.isBought);
            if(this.isBought === 'Unactivated') return false;
            return true;
        },
        checkInCart(id) {
            axios.get('/students/cart/', {
                withCredentials: true
            })
                .then(response => {
                    this.myCart = response.data.coursesInCart
                })
                .catch(e => {
                    this.errors.push(e)
                })
            setTimeout(() => {
                for (let i = 0; i < this.myCart.length; i++) {
                    if (this.myCart[i].courseId === id) {
                        alert("This course has been in your cart");
                        this.$router.push('/cart');
                        return true;
                    }
                }
                return false;
            }, 100);
        }
    },
    computed: {
        ...mapState(['miniCartChange']),
    },
    watch: {
        '$route'() {
            this.getCourseInfo();
            this.scrollToTop();
        },
    },
    mounted() {
        this.getCourseInfo();
        this.getFeedbackOfCourse();
        this.scrollToTop();
    },
    created() {
        this.getCourseDetails();
        this.getFeedbackOfCourse();
        this.fillOpenArray();
    }

}
</script>
    
<style lang="scss" scoped>
.all {
    display: inline-flex;

    .inf {

        display: block;

        .box {
            border: 1px solid black;
            background-color: rgb(28, 29, 31);
            color: #fff;
            width: 1519px;
            margin-top: 50px;
            background-image: linear-gradient(to bottom, rgb(52, 73, 94) 10%, #000 80%);

            // rgb(72,82,104)
            .info-box {

                display: block;
                width: 1100px;

                .category {
                    margin-top: 20px;
                    margin-left: 10%;

                    // background-color: white;
                    #text {
                        text-decoration: underline;
                        font-style: italic;
                    }

                    #category {
                        font-weight: 650;
                    }

                }

                .bottom {
                    margin-left: 10%;

                    #name {
                        // position: absolute;
                        font-size: 3rem;
                        font-weight: 700;
                        // border: 1px solid white;
                        width: 85%;
                        margin-top: 22px;
                        margin-bottom: 40px;
                    }

                    .description {
                        // position: absolute;
                        font-weight: 650;
                        width: 85%;

                        #text {
                            text-decoration: underline;
                            font-weight: 900;
                        }

                        #cont {
                            font-style: italic;
                            font-weight: none;
                        }

                        margin-bottom: 30px;
                    }

                    .insight {
                        position: relative;
                        display: flex;
                        margin-bottom: 10px;

                        #rating {

                            #star {
                                margin-left: 20px;

                                img {
                                    margin-top: -10px;
                                    width: auto;
                                    height: 30px;
                                }
                            }
                        }

                        #num-of-student {
                            position: absolute;
                            margin-left: 250px;
                        }
                    }

                    #created {

                        margin-bottom: 10px;

                        #name-author {
                            font-weight: 600;
                            font-size: 1.2rem;
                        }
                    }

                    #last-update {

                        color: #fff;
                        margin-bottom: 30px;
                    }
                }

            }
        }

        .body-intro {
            margin-top: 40px;
            margin-left: 7%;

            #course-content {
                font-size: 2.3rem;
                font-weight: 700;
            }

        }

        .instructor-info {
            margin-top: 40px;
            margin-left: 7%;

            // display: flex;
            .inf {
                display: flex;
                width: 60%;

                &:hover {
                    cursor: pointer;
                }
            }

            #part1 {
                margin-left: 2%;
                text-align: center;
                margin-top: 3.5%;

                #name {
                    font-weight: 700;

                    &:hover {
                        color: rgb(52, 73, 94);
                        cursor: pointer;
                    }
                }
            }

            #part2 {
                margin-left: 50px;

                .bio {
                    text-indent: 2rem;
                    // width: 75%;
                    display: flex;
                    --max-lines: 6;
                    --line-height: 2.4;

                    max-height: calc(var(--max-lines) * 1em * var(--line-height));
                    line-height: var(--line-height);
                    // display: -webkit-box;
                    overflow: hidden;
                    // -webkit-box-orient:vertical;
                    position: relative;
                    // -webkit-line-clamp: var(--max-lines);
                }

                .bio:has(+ .expand-text:not(:checked))::before {
                    content: "";
                    position: absolute;
                    height: calc(1em * var(--line-height));
                    width: 100%;
                    bottom: 0;
                    pointer-events: none;
                    background: linear-gradient(to bottom, transparent, white);

                }

                .expand-text {
                    appearance: none;
                    // border: 1px solid black;
                    padding: .5em;
                    border-radius: .25em;
                    cursor: pointer;
                    margin-top: -10px;
                    margin-left: 37%;
                    font-style: italic;
                }

                .expand-text:hover {
                    background-color: white;
                    font-weight: 600;
                }

                .expand-text::before {
                    content: "Show full";

                }

                .expand-text:checked::before {
                    content: "Close";
                    color: #000;
                }

                .bio:has(+ .expand-text:checked) {
                    max-height: none;

                }
            }

            img {
                clip-path: circle(80px at 50% 50%);
                border: 1.5px solid rgb(52, 73, 94);
            }

            #title {
                font-size: 2.3rem;
                font-weight: 700;
            }

            #name {
                font-size: 1.3rem;

            }

            #bio {
                font-size: 1.3rem;

            }

            #qualifi {
                font-size: 1.3rem;

            }
        }

        .student-review {

            margin-left: 7%;

            // margin-top: 5%;
            #head {
                margin-top: 40px;
                font-size: 2.3rem;
                font-weight: 700;
                margin-bottom: 40px;
            }

            li {
                list-style: none;
                display: flex;
                margin-bottom: 50px;

            }

            .show-feedbacks {

                #image {
                    margin-left: 10%;

                    img {
                        clip-path: rectangle();
                        width: 50%;
                        height: auto;
                    }
                }

                #content {
                    margin-left: -5%;
                    margin-top: 2px;

                    #name {
                        font-size: 1.1rem;
                        font-weight: 600;
                        display: flex;
                        margin-bottom: 10px;

                        #rating {
                            margin-left: 10px;

                            img {
                                width: 3%;
                                margin-top: -5px;
                            }
                        }
                    }

                    #detail {
                        margin-bottom: 10px;
                        font-style: italic;
                    }

                    #time {}
                }
            }

        }

        .related-course {
            margin-left: 7%;
            margin-bottom: 100px;

            .head {
                margin-top: 40px;
                font-size: 2.3rem;
                font-weight: 700;
                margin-bottom: 40px;
            }

            .show-course {
                cursor: pointer;
                margin-left: 4%;

                img {
                    width: 15vw;
                    height: 100%;
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
                        font-size: 1.25rem;
                        margin-bottom: 8px;
                    }

                    #descr {
                        font-size: 0.9rem;
                        margin-bottom: 8px;
                        font-style: italic;
                    }

                    #ins {
                        font-size: 0.9rem;

                        #name {
                            font-weight: 500;
                        }

                        margin-bottom: 8px;
                    }

                    #release-date {
                        margin-bottom: 8px;
                    }

                    #fee {
                        font-weight: 600;
                        font-size: 1.2rem;
                    }
                }
            }

        }

    }

    .short-info {
        position: absolute;
        margin-top: 100px;
        left: 70%;
        width: 22%;
        background-color: #fff;
        z-index: 2;
        box-shadow: 0.25rem 0.5rem 0.5rem 0.15rem rgba(0, 0, 0, 0.2);
        display: block;
        border-radius: 10px;

        img {
            width: 100%;
            padding: 0.15rem 0.15rem 0.15rem 0.15rem;
        }

        .fee {
            position: relative;
            margin-top: 20px;
            font-weight: 700;
            font-size: 2rem;
            margin-left: 50%;
            transform: translateX(-50%);
            margin-bottom: 10px;
            display: flex;

            #image {
                img {
                    margin-left: 5px;
                    margin-top: -10px;
                    width: 55px;
                    height: auto;
                }
            }
        }

        #add-to-cart, #study-button {
            width: 70%;
            height: 50px;
            margin-left: 50%;
            transform: translateX(-50%);
            background-color: rgb(52, 73, 94);
            color: #fff;
            font-size: 1.25rem;
            font-weight: 600;
            border-radius: 5px;
        }

        #buy-now {
            width: 70%;
            height: 50px;
            margin-left: 50%;
            transform: translateX(-50%);
            background-color: rgb(52, 73, 94);
            color: #fff;
            font-size: 1.25rem;
            font-weight: 600;
            border-radius: 5px;
        }

        #intro {
            margin-top: 20px;
            margin-left: 20px;
            font-size: 1rem;
            font-weight: 700;

            .time {
                margin-top: 20px;
                margin-bottom: 10px;
                margin-left: 30px;

                #img {
                    img {
                        width: 40px;
                    }
                }

                #duration {
                    margin-top: 8px;
                    margin-left: 8px;
                }
            }

            .content {
                margin-bottom: 30px;
                margin-left: 30px;

                #img {
                    img {
                        width: 40px;
                    }
                }

                #total-content {
                    margin-top: 8px;
                    margin-left: 8px;
                }
            }
        }

    }
}

/* The Modal (background) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 3;
    /* Sit on top */
    padding-top: 100px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    // float: right;
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.limit {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.title {
    margin: 20px 0;
    margin-left: 20px;
}

* {
    box-sizing: border-box
}

body {
    font-family: "Lato", sans-serif;
}

/* Style the tab */
.tab {
    // float: left;

    background-color: #f1f1f1;
    width: 60%;
    height: 100%;
    position: relative;
    h1 {
        font-size: 36px;
        margin-bottom: 0;
    }

    .tab-content {
    border: 1px solid #ccc;
    // pading-top:5px;
    }

    .sub-title {
        display: flex;
        // margin-left: -50px;
        // padding-left: 0;
        padding: 5px 0;
        cursor: pointer;

        .container {
            // position: abs;
            margin-left: 92%;
        }

        .chapter-title {
            position: absolute;
            // margin-left: -40px;
            width: 90%px;
            margin-left: 10px;
            // margin-top: 5px;
            padding: 5px;
            font-weight: 500;
            font-size: 18px;
        }
    }
}

/* Style the buttons inside the tab */
.tab button {
    display: none;
    background-color: white;
    color: black;
    padding: 8px 24px;
    padding-right: 10px;
    width: 100%;
    // height: 100px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    text-align: left;
    cursor: pointer;
    font-size: 17px;
    // margin-left: 5px;

    .time-course {
        position: absolute;
        // float: right;
        left: 80%;
        font-size: 14px;
        margin-left: 18px;
    }
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}


.tabcontent.active {
    display: block;

    button {
        font-weight: 500;
    }
}

.tablinks.open {
    display: flex;
}

/* Style the tab content */
.tabcontent {
    float: left;
    // padding: 0px 12px;
    border: 1px solid #ccc;
    width: 80%;
    border-left: none;
    height: auto;
    display: none;

    .video {
        width: 100%;
        background-color: black;
    }

    h2 {
        margin: 20px 80px;
    }
}

/* Clear floats after the tab */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.container {
    width: 50px;
    display: inline-block;
    cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
}

.change .bar1 {
    transform: translate(0, 11px) rotate(-45deg);
}

.change .bar2 {
    opacity: 0;
}

.change .bar3 {
    transform: translate(0, -11px) rotate(45deg);
}

.course-video {
    position: relative;
    margin-top: 10px;
    // margin: 10px 0;
    margin-left: 50%;
    transform: translateX(-50%);
}</style>
    