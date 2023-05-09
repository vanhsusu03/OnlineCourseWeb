<!-- When not activated -->
<template>
    <div class="all">
        <div class="inf">
            <div class="box">
                <div class="info-box">
                    <div class="category">
                        <span id="text"> Category:</span>
                        <span v-for="namee in this.category" id="category">
                                <a>{{ ' ' + namee.name + ' - ' }}</a>
                        </span>
                    </div>
                    <div id="name">
                        <div>
                            {{ course.title }} {{ course.course_id }}
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
                        Created by:
                    </div>
                    <div id="last-update">
                        Last update:
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
                <div id="name">{{ course.instructor }}</div>
                <div id="bio"> Bio of instructor</div>
                <div id="qualifi">Qualification of instructor</div>
            </div>

            <div class="related-course">
                Related Courses
            </div>
        </div>
        <div class="short-info">
            <img :src="course.image" alt="" id="img">
            <div id="fee">{{ course.course_fee + ' VND' }}</div>
            <br>
            <br>
            <div>
                <button id="add-to-cart">Add to cart</button>
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
            <p><Payment :numOfCourses="courses.length" :courses="courses" :isInCart="false"></Payment></p>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Payment from '@/pages/Payment.vue';

export default {
    name: 'CourseInfo',
    data() {
        return {
            course: Object,
            courses: [{
                courseId: Number,
                courseImage: "",
                courseTitle: "",
                courseFee: Number,
                instructorFirstName: "",
                instructorLastName: ""
            }],
            category: [],
        }
    },
    components: {
        Payment
    },
    methods: {
        async getCourseInfo() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/courses/${id}`, { withCredentials: true });
            this.course = res.data.info;
            this.category = this.course.categories;
            // alert("HE" + this.course.courseId);
        },
        openPayment() {
            let modal = document.getElementById("myModal");
            this.courses[0].courseId = this.course.course_id;
            this.courses[0].courseTitle = this.course.title;
            this.courses[0].courseImage = this.course.image;
            this.courses[0].courseFee = this.course.course_fee;
            this.courses[0].instructorFirstName = this.course.instructor;
            // alert("hio");
            modal.style.display = "block";
            this.openingPayment = true;
        },
        closePayment() {
            let modal = document.getElementById("myModal");
            modal.style.display = "none";
            this.openingPayment = false;
        },
    },
    computed: {
    },
    mounted() {
        this.getCourseInfo();
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


            .info-box {

                display: block;
                // border: 1px solid white;
                width: 1000px;
                margin-left: 7%;

                .category {
                    margin-top: 20px;
                    #text {
                        text-decoration: underline;
                        font-style: italic;
                    }
                    #category {
                        font-weight: 650;
                    }

                }
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
                }

                #last-update {
                    // position: absolute;
                    margin-bottom: 30px;
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
            margin-top: 40px;
            margin-left: 7%;
            font-size: 2.3rem;
            font-weight: 700;
        }



    }

    .short-info {
        position: absolute;
        margin-top: 100px;
        left: 67%;
        width: 22%;
        background-color: #fff;
        z-index: 2;
        box-shadow: 0.5rem 0.5rem 0.5rem 0.5rem rgba(0,0,0,0.1);
        display: block;

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
            background-color: rgb(52,73,94);
            color: #fff;
            font-size: 1.25rem;
            font-weight: 600;
            border-radius: 5px;
        }

        #buy-now {
            width: 70%;
            height: 50px;
            margin-left:50%;
            transform: translateX(-50%);
            background-color: rgb(52,73,94);
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
}
</style>