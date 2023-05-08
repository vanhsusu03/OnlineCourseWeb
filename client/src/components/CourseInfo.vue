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
                <button id="buy-now">Buy now</button>
            </div>
            <br>
            <div id="intro">
                This course include:

            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'CourseInfo',
    data() {
        return {
            course: Object,
            category: [],
        }
    },
    methods: {
        async getCourseInfo() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/courses/${id}`, { withCredentials: true });
            this.course = res.data.info;
            this.category = this.course.categories;
            // alert("HE" + this.course.courseId);
        }
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
</style>