<template>
    <div v-if="begin">
        {{ openTabs(content[0].chapterId) }}
        {{ openChapter(content[0].contents[0].contentId) }}
        {{ this.begin = false }}
    </div>

    <div class="tab">
        <h5 style="padding: 10px 10px; background-color: white;">Contents of course:</h5>
        <div v-for="(chapter, index) in content" :key="chapter.chapterId">
            <div class="sub-title">
                <div class="limit chapter-title">{{ index + 1 }}. {{ chapter.chapterTitle }}</div>
                <div class="container" :class="{ change: openTab[chapter.contents[0].contentId] }"
                    v-on:click="openTabs(chapter.chapterId);">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
            </div>
            <button class="tablinks" :class="{ active: openContent[cont.contentId], open: openTab[cont.contentId] }"
                v-for="(cont, index) in chapter.contents" v-on:click=" openChapter(cont.contentId)">
                <div class="limit">
                    {{ index + 1 }}. {{ cont.contentTitle }}
                </div>
                <div class="time">
                    {{ parseInt(cont.timeRequiredInSec / 60) }}:{{ cont.timeRequiredInSec - parseInt(
                        cont.timeRequiredInSec / 60) * 60 }}
                </div>
            </button>
        </div>

        <!-- {{ openChapter($even, 1) }} -->
    </div>

    <div v-for="chapter in content">
        <div v-for="cont in chapter.contents" class="tabcontent" :class="{ active: openContent[cont.contentId] }">
            <div class="video">
                <video width="900" controls style="" class="course-video">
                    <source :src="cont.link" type="video/mp4">
                    Your browser does not support the video tag.
                </video>

            </div>
            <h2>{{ cont.contentTitle }}</h2>
        </div>
    </div>
    <div class="think">
        <div class="your-revieww">
            <div id="head">How do you feel about this course? Let us know:</div>
            <div class="rating">
                <div id="tit">Rating score:</div>
                <div class="inp">
                    <form @submit="handleSubmitFeedback" novalidate autocomplete="off">
                        <input type="text" v-model="form.feedbackScore" required>
                        <p class="error" v-if="this.errorObj.feedbackScoreError.length > 0">{{
                            errorObj.feedbackScoreError[0] }}</p>
                        <div id="tit">Comment:</div>
                        <input type="text" v-model="form.feedbackComment">
                        <div id="btn">
                            <button type="submit" id="submit-fb">Submit feedback</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="student-review">
            <div id="head">Some feedbacks of courses</div>
            <div class="your-review-show" v-if="this.yourFeedback != null">
                <div class="box-fb">
                    <div id="image">
                        <img :src="yourFeedback.studentImage" alt="">
                    </div>
                    <div id="content">
                        <div id="name"> You <div id="rating">{{
                            yourFeedback.feedbackRating + ' ' }} <img src="../assets/img/star.png" alt="">
                            </div>
                        </div>

                        <div id="detail">{{ yourFeedback.feedbackDetail }}</div>
                        <div id="time">Created at:{{ ' ' + yourFeedback.feedbackLastUpdateTime.slice(0, 10) }}</div>
                    </div>
                    <div id="edit"></div>
                </div>
            </div>
            <div class="show-feedbacks">
                <li v-for="feedback in this.feedbackDetails.slice(0, 3)" class="box-fb">
                    <div id="image">
                        <img :src="feedback.studentImage" alt="">
                    </div>
                    <div id="content">
                        <div id="name"> {{ feedback.studentFirstName + ' ' + feedback.studentLastName }} <div id="rating">{{
                            feedback.feedbackRating + ' ' }} <img src="../assets/img/star.png" alt="">
                            </div>
                        </div>

                        <div id="detail">{{ feedback.feedbackDetail }}</div>
                        <div id="time">Created at:{{ ' ' + feedback.feedbackLastUpdateTime.slice(0, 10) }}</div>
                    </div>
                </li>
            </div>
        </div>
    </div>

    <div class="instructor-info">
        <div id="title">Instructor info</div>
        <div class="inf">
            <span id="part1" @click="redirectInstructor(this.course.instructor_id)">
                <img :src="instructor.image" alt="">
                <div id="name">{{ instructor.instructorFullName }}</div>
            </span>
            <span id="part2">
                <div class="bio"> {{ instructor_bio }}</div>
                <input class="expand-text" type="checkbox">
                <!-- <div id="qualifi">Qualification of instructor</div> -->
            </span>
        </div>
    </div>
    <div class="related-course">
        <div class="head">
            Other courses of <span id="inss">{{ instructor.instructorFullName }}</span></div>
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



    <div class="clearfix"></div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name: 'StudyPage',
    data() {
        return {
            instructor: Object,
            instructor_bio: "",
            courseofAuth: [],
            courseId: 0,
            begin: true,
            openTab: [],
            openContent: [],
            content: [],
            feedbackDetails: [],
            yourFeedback: Object,
            form: {
                feedbackScore: "",
                feedbackComment: "",
            },
            errorObj: {
                feedbackScoreError: []
            },
        }
    },
    methods: {
        async getInstructorInfo() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/instructor/info/study/${id}`, { withCredentials: true });
            this.instructor_bio = res.data.result.instructorBio;
            this.instructor = res.data.result.student;
            this.courseId = res.data.result.student.student_id;
            await axios.get(`/courseof/${res.data.result.student.student_id}`, { withCredentials: true })
                .then(respone => {
                    this.courseofAuth = respone.data.courses;
                })

        },
        async showCourse(id) {
            this.$router.push(`/course/info/${id}`);
        },
        async getFeedbackOfCourse() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/courses/${id}/reviews`, { withCredentials: true });
            this.feedbackDetails = res.data.feedbacks;

        },
        resetForm() {
            this.form.feedbackScore = "";
            this.form.feedbackComment = "";
        },
        resetError() {
            this.errorObj.feedbackScoreError = [];
        },
        checkFeedback() {
            this.resetError();
            if (!this.form.feedbackScore) {
                this.errorObj.feedbackScoreError.push("Please enter your feedback score, ex: 5,4,..");
            } else if (/^[A-Za-z]+$/.test(this.form.feedbackScore.replace(/\s/g, ""))) {
                this.errorObj.feedbackScoreError.push("Your feedback score must be a number!");
            } else if (Number(this.form.feedbackScore) > 5) {
                this.errorObj.feedbackScoreError.push("Your feedback score must smaller than 5!");
            }
        },
        checkEmptyError() {
            if (this.errorObj.feedbackScoreError.length != 0) {
                return false;
            }
            return true;
        },
        async submitFeedback() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let data = await axios.post(`/courses/${id}/students/review`, this.form, { withCredentials: true });
            let err = data.data.msg;
            if (err === 'You can only submitt feedback one time!') {
                this.errorObj.feedbackScoreError.push(err);
            } else if (err === 'Add success!') {
                alert('Add feedbacks successful');
                this.getYourFeedback();
                this.resetForm();
                this.resetError();

            }
        },
        handleSubmitFeedback(event) {
            this.checkFeedback();

            if (!this.checkEmptyError()) {
                event.preventDefault();
            } else {
                event.preventDefault();
                this.submitFeedback();
            }
        },
        redirectInstructor(id) {
            this.$router.push(`/instructor/info/show/${id}`);
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
            for (let j = 0; j < this.content.length; j++) {
                // alert(j);
                if (this.content[j].chapterId === id) {
                    // alert(j);
                    for (i = 0; i < this.content[j].contents.length; i++) {
                        // alert(i);
                        this.openTab[this.content[j].contents[i].contentId] = !this.openTab[this.content[j].contents[i].contentId];
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
        async getYourFeedback() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);
            let res = await axios.get(`/courses/${id}/students/review`, { withCredentials: true });
            this.yourFeedback = res.data.feedback;
        }
    },
    computed: {
        ...mapState(['student'])
    },
    created() {
        let id = Number(window.location.href.split('/').slice(-1)[0]);
        // alert(id);
        axios.get(`/courses/${id}/students/contents`, {
            withCredentials: true
        })
            .then(response => {
                this.content = response.data.contents;
                this.fillOpenArray();
            })
            .catch(e => {
                this.errors.push(e)
            })
        this.getInstructorInfo();
        this.getFeedbackOfCourse();
        this.getYourFeedback();
    }
}
</script>

<style lang="scss" scoped>
.limit {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

// // html {
// //     padding: 0;

// // }
// .title {
//     margin: 20px 0;
//     margin-left: 20px;
// }

* {
    box-sizing: border-box;
}

body {
    font-family: "Lato", sans-serif;
    width: 100%;
}

/* Style the tab */
.tab {
    float: right;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 20%;
    height: 100%;
    position: relative;

    h5 {
        font-size: 1.5rem;
        color: rgb(42, 62, 84);
        font-weight: 700;
    }

    .sub-title {
        display: flex;
        // margin-left: -50px;
        // padding-left: 0;
        padding: 5px 0;

        .container {
            // position: abs;
            margin-left: 240px;
        }

        .chapter-title {
            position: absolute;
            // margin-left: -40px;
            width: 240px;
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

    .time {
        font-size: 14px;
        margin-left: 18px;
    }
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current "tab button" class */
button.active {
    background-color: #ccc;
}

.tabcontent.active {
    display: block;

    button {
        font-weight: 500;
    }
}

.tablinks.open {
    display: block;
}

/* Style the tab content */
.tabcontent {
    float: left;
    margin-top: 30px;
    // padding: 0px 12px;
    border: 1px solid #ccc;
    width: 80%;
    border-left: none;
    height: auto;
    display: none;

    .video {
        width: 100%;
        background-image: linear-gradient(to top, rgb(52, 73, 94) 50%, rgb(230, 230, 230) 90%);
        // background-color: rgb(52,73,94);
    }

    h2 {
        margin: 20px 13%;
        font-weight: 800;
        color: rgb(42, 62, 84);
        font-size: 3.5rem;
        -webkit-text-stroke: 1px inset #000;
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
    // position: relative;
    margin-top: 20px;
    // margin: 10px 0;
    margin-left: 50%;
    transform: translateX(-50%);
}

.think {
    display: inline-block;
}

.your-revieww {
    margin-left: 7%;
    float: left;
    color: #880000;
    font-style: italic;

    #head {
        font-size: 2.3rem;
        font-weight: 700;
        margin-bottom: 40px;
    }

    .rating {
        margin-left: 50%;
        transform: translateX(-50%);

        #tit {
            font-size: 1.3rem;
            margin-bottom: 20px;
            font-style: italic;
        }

        .error {
            color: rgb(52, 73, 94);
            font-weight: 700;
            font-size: 1.1rem;
        }

        .inp {
            display: inline-block;

            #tit {}

            input {
                margin-bottom: 10px;
                width: 200%;
                padding: 20px 20px 20px 20px;
            }

            #submit-fb {
                width: 100%;
                padding: 10px 10px 10px 10px;

                &:hover {
                    background-color: rgb(52, 73, 94);
                    color: #fff;
                    border: 0.5px inset white;
                }
            }

            #btn {
                margin-top: 10px;
                width: 100%;
            }
        }
    }
}

.student-review {

    margin-left: 7%;
    float: left;

    // margin-top: 5%;
    // width: 100%;
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

    .your-review-show {
        margin-left: 34%;
        width: 110%;
        margin-bottom: 40px;

        // .box-fb {
        //     border-bottom: 1px solid rgb(230, 230, 230);
        //     padding-bottom: 20px;

        // }

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

    .show-feedbacks {
        width: 110%;

        .box-fb {
            border-bottom: 1px solid rgb(230, 230, 230);
            padding-bottom: 20px;

        }

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

.instructor-info {
    margin-top: 40px;
    margin-left: 7%;
    float: left;

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

.related-course {
    margin-left: 7%;
    margin-bottom: 100px;
    float: left;

    .head {
        margin-top: 40px;
        font-size: 2.3rem;
        font-weight: 700;
        margin-bottom: 40px;
    }

    .show-course {
        cursor: pointer;
        margin-left: 4%;
        width: 150%;

        img {
            width: 100%;
            height: 100%;
        }

        .item {
            display: flex;
            border-bottom: 1px solid rgb(230, 230, 230);
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

}</style>
