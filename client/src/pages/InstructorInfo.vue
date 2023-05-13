<template>
    <div class="title"> INSTRUCTOR INFO</div>
    <div class="content">
        <span id="part1">
            <div class="name">{{ instructor.instructorFullName }}</div>
            <div class="cert">
                <div id="online-edu">DNA Online Education</div>
                <div id="ins-of-dna">Instructor of DNA</div>
            </div>
            <div class="details">
                <span id="total-students">
                    <div id="head"> Total students</div>
                    <div id="num-stu">2,147,694</div>
                </span>
                <span id="reviews">
                    <div id="head"> Courses's reviews</div>
                    <div id="num-review">580,146</div>
                </span>
            </div>
            <div class="body">
                <div class="show-self">
                    <div id="about-tag">About me</div>
                    <div id="bio"> {{ instructor_bio }}</div>
                </div>
                <div class="course-me">
                    <div id="course-tag">My Courses</div>
                    <div class="show-course">
                        <li v-for="course in this.courseofAuth" @click.prevent="showCourse(course.course_id)" class="item">
                            <div id="img">
                                <span><img :src="course.image" alt=""></span>
                            </div>
                            <div id="content">
                                <div id="title"> {{ course.title }}</div>
                                <div id="descr">{{ course.description }}</div>
                                <div id="ins">Created by: <span id="name"> {{ instructor.instructorFullName }}</span></div>
                                <div id="release-date">Release date: <span id="date">{{ course.release_date }}</span></div>
                                <div id="fee">{{ course.course_fee + ' VND' }}</div>
                            </div>
                        </li>
                    </div>
                </div>

            </div>
        </span>

        <span id="part2">
            <div class="image">
                <img :src="instructor.image" alt="">
            </div>
        </span>
    </div>
</template>


<script>
import { mapMutations } from 'vuex';
export default {
    name: 'InstructorInfo',
    data() {
        return {
            instructor: Object,
            instructor_bio: "",
            courseofAuth: [],
        }
    },
    methods: {
        ...mapMutations(['scrollToTop']),
        async getInstructorInfo() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/instructor/info/${id}`, { withCredentials: true });
            this.instructor_bio = res.data.result.instructorBio;
            this.instructor = res.data.result.student;
            await axios.get(`/courseof/${id}`, { withCredentials: true })
                .then(respone => {
                    this.courseofAuth = respone.data.courses;
                })

        },
        async showCourse(id) {
            this.$router.push(`/course/info/${id}`)
        },
    },
    mounted() {
        this.getInstructorInfo();
        this.scrollToTop();
    }
}

</script>


<style scope lang="scss">
.title {
    margin-top: 80px;
    margin-left: 11%;
    font-weight: 900;
    color: rgb(110, 110, 110);
    text-decoration: underline;
}

.content {
    display: flex;

    #part1 {
        margin-top: 15px;
        width: 75%;
        // border-right: 2px solid rgb(190, 190, 190);

        // margin-left: 16%;
        .name {
            font-size: 5rem;
            font-weight: 800;
            color: rgb(52, 73, 94);
            text-align: center;
            transform: translateX(-3%);
        }

        .cert {
            margin-top: 25px;
            margin-left: 20%;
            margin-bottom: 50px;

            #online-edu {
                margin-bottom: 30px;
                font-weight: 700;
                font-size: 1.1rem;
            }

            #ins-of-dna {
                border: 1px solid black;
                width: 14%;
                text-align: center;
                font-weight: 600;
                font-size: 0.9rem;
                color: white;
                background-color: rgb(52, 73, 94);
            }
        }

        .details {
            display: inline-flex;
            margin-left: 30%;
            margin-bottom: 80px;

            #total-students {
                margin-right: 150px;
                text-align: center;

                #head {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: rgb(110, 110, 110);
                    margin-bottom: 10px;
                }

                #num-stu {
                    font-size: 1.1rem;
                }
            }

            #reviews {
                text-align: center;

                #head {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: rgb(110, 110, 110);
                    margin-bottom: 10px;
                }

                #num-review {
                    font-size: 1.1rem;
                }
            }
        }

        .body {
            width: 72%;
            margin-left: 20%;

            .show-self {
                margin-bottom: 30px;

                #about-tag {
                    font-size: 2rem;
                    font-weight: 700;
                    color: rgb(52, 73, 94);
                    margin-bottom: 20px;
                }

                #bio {
                    margin-left: 4%;
                    text-indent: 2rem;
                    font-size: 1.1rem;
                    --line-height: 2.3;
                    line-height: var(--line-height);
                }
            }

            .course-me {

                #course-tag {
                    font-size: 2rem;
                    font-weight: 700;
                    color: rgb(52, 73, 94);
                    margin-bottom: 30px;
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
                            font-size: 1rem;
                            margin-bottom: 8px;
                        }

                        #descr {
                            font-size: 0.7rem;
                            margin-bottom: 8px;
                            font-style: italic;
                        }

                        #ins {
                            font-size: 0.8rem;

                            #name {
                                font-weight: 500;
                            }

                            margin-bottom: 8px;
                        }

                        #release-date {
                            font-size: 0.8rem;
                            margin-bottom: 8px;
                        }

                        #fee {
                            font-weight: 600;
                            font-size: 1rem;
                        }
                    }

                }
            }

        }

    }

    #part2 {
        margin-left: -80px;
        text-align: center;

        .image {
            border-radius: 4px;
            margin-bottom: 50px;
        }
    }
}
</style>