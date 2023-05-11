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
                            </div>
                            <span id="num-of-student">
                                Number of students:
                            </span>
                        </div>
                        <div id="created">
                            Created by: <span id="name-author"> {{ this.instructor_fullname }}</span>
                        </div>
                        <div id="last-update">
                            Last update:
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-intro">
                <div id="course-content">
                    Course content
                    <!-- laays tuwngf chapter -->
                    <!-- <li></li> -->
                </div>
            </div>

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
            <div id="fee">{{ course.course_fee + ' VND' }}</div>
            <br>
            <br>
            <div>
                <button id="add-to-cart" @click="addToCart(course)">Add to cart</button>
            </div>
            <br>
            <div>
                <button id="buy-now" v-on:click="openPayment()">Buy now</button>
            </div>
            <br>
            <div id="intro">
                This course include:

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
import { mapMutations } from 'vuex';
import Payment from '@/pages/Payment.vue';
import { shallowReactive } from 'vue';

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
        }
    },
    components: {
        Payment
    },
    methods: {
        ...mapMutations(['scrollToTop']),
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
            let check = await axios.post(`/course/state/${id}`, {}, { withCredentials: true });
            let states = check.data.msg;
            if (states === 'Unactivated') {
                this.$router.push(`/course/info/${id}`);
            } else if (states === 'Activated') {
                this.$router.push(`/course/detail/${id}`);
            }
        },
        async getCourseInfo() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/courses/${id}`, { withCredentials: true });
            this.course = res.data.info;
            this.category = this.course.categories;
            this.id_instructor = this.course.instructor_id;
            this.getInstructorInfo(this.id_instructor);
        },
        async getInstructorInfo(id) {
            let res = await axios.get(`/instructor/info/${id}`, { withCredentials: true });
            this.instructor = res.data.result;
            this.instructor_fullname = this.instructor.student.instructorFullName;
            this.instructor_img = this.instructor.student.image;
            this.instructor_email = this.instructor.student.email;
            this.instructor_bio = this.instructor.instructorBio;

            await axios.get(`/courseof/${id}`, { withCredentials: true })
                .then(respone => {
                    this.courseofAuth = respone.data.courses;
                })

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
            this.checkBought(course.course_id);
            this.convertData();
            setTimeout(() => {
                if (this.isBought === 'Unactivated') {
                    axios.post('/students/cart/' + course.course_id, this.courses[0], { withCredentials: true })
                        .then(response => {
                            alert(response.data.msg);
                        })
                        .catch(e => {
                            this.errors.push(e);
                        })
                } else {
                    alert("You have actived this course before");
                }
            }, 100);
        },
        checkBought(id) {
            axios.post(`/course/state/${id}`, {}, { withCredentials: true })
                .then(response => {
                    this.isBought = response.data.msg;
                });
        },
    },
    watch: {
        '$route'() {
            this.getCourseInfo();
            this.scrollToTop();
        },
    },
    mounted() {
        this.getCourseInfo();
        this.scrollToTop();
    },
    created() {

    }

}


</script>



<style scoped lang="scss">
.all {
    display: inline-flex;


    .inf {
        // position: absolute;
        display: block;


        .box {
            border: 1px solid black;
            background-color: rgb(28, 29, 31);
            color: #fff;
            width: 1532.5px;
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
                            // position: absolute;
                        }

                        #num-of-student {
                            position: absolute;
                            margin-left: 250px;
                        }
                    }

                    #created {
                        // position: absolute;
                        margin-bottom: 10px;

                        #name-author {
                            font-weight: 600;
                            font-size: 1.2rem;
                        }
                    }

                    #last-update {
                        // position: absolute;
                        margin-bottom: 30px;
                    }
                }

                // }

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
                // border: 2px solid black;
                width: 60%;
                &:hover {
                    cursor: pointer;
                }
            }

            #part1 {
                margin-left: 2%;
                text-align: center;

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
                    width: 100%;
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

        #fee {
            position: relative;
            margin-top: 20px;
            font-weight: 700;
            font-size: 2rem;
            margin-left: 20px;
            margin-bottom: 20px;

        }

        #add-to-cart {
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
}</style>