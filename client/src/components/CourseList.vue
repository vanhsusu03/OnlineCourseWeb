<template>
<h1>Course List </h1>
<ul v-if="courses && courses.length" class="listCourse">
    <li v-for="course in courses" class="item" >
        <img v-bind:src="course.courseImage" alt="" class="course-img" @click="showCourse(course.courseId)" >
        <div class="course-content">
            <h4 v-bind:title="course.courseTitle">{{ course.courseTitle }}</h4>
            <div v-bind:title="course.courseDescription">{{ course.courseDescription }}</div>
            <div>By {{ course.instructorFirstName + ' ' + course.instructorLastName }}</div>
            <h5>{{ course.courseFee + ' VND' }}</h5>
            <button v-on:click="addToCart(course)">Add To Cart</button>
        </div>
    </li>
</ul>
<div v-if="begin">
    {{ openCity(1) }}
</div>

<div v-if="!isCalc">
    {{ calcNumPages() }}
</div>
<ul v-if="errors && errors.length">
    <li v-for="error of errors">
        {{error.message}}
    </li>
</ul>

<ul class="listPage" >
    <li v-for="page in pages" class="pagelinks" :class="{active:page.status}" v-on:click="scrollToTop() ;this.begin = false; openCity(page.value)">
        {{ page.value }}
    </li>
</ul>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CourseList',
    data() {
        return {
            courses: [],
            errors: [],
            thisPage: 1,
            begin: true,
            isCalc: false,
            pages: [
                {
                    value: 1,
                    status: true
                }
            ],
            limit: 9,
            list: document.getElementsByClassName("item")
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        openCity(page) {
            var tabcontent;
            // Get all elements with class="item" and hide them
            tabcontent = document.getElementsByClassName("item");
            let beginGet = this.limit * (page - 1);
            let endGet = (this.limit * page > tabcontent.length ? tabcontent.length : this.limit * page);
            for (let i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i].status = false
            }
            this.pages[page - 1].status = true
            for (let i = beginGet; i < endGet; i++) {
                tabcontent[i].style.display = "block";
            }
        },
        calcNumPages() {
            let num, tabcontent;
            tabcontent = document.getElementsByClassName("item");
            num = tabcontent.length / this.limit + 1;
            let numPages = parseInt(num);
            numPages = numPages == num ? numPages - 1 : numPages;
            if (numPages > 1) {
                this.isCalc = true;
            }
            for (let i = 2; i <= numPages; i++) {
                this.pages.push({
                    value: i,
                    status: false
                })
            }
            return numPages;
        },
        async showCourse (id) {
            let check = await axios.post(`/course/state/${id}`, {}, {withCredentials: true});
            let states = check.data.msg;
            if(states === 'Unactivated') {
                this.$router.push(`/course/info/${id}`);
            } else if (states === 'Activated') {
                this.$router.push(`/course/detail/${id}`);
            }
        },
        addToCart(course) {
            axios.post('/students/cart/' + course.courseId , course, {withCredentials: true})
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    },

    // lấy dữ liệu khi component được tạo thành công
    created() {
        axios.get('/courses',{withCredentials: true})
            .then(response => {
                this.courses = response.data
            })
            .catch(e => {
                this.errors.push(e)
            });
    }
}
</script>

<style lang="scss" scoped>
h1 {
    margin-left: 50px;
    margin-top: 30px;
    margin-bottom: 20px;
}
.listCourse {
    margin-left: 30px;
    position: relative;
    width: 90%;
    display: flex;
    // width: 100%;
    flex-wrap: wrap;
    // margin-right: 50px;
    justify-content: space-between;

    .item {
        &:hover {
        box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1), 0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
        border: 0.02rem solid rgba($color: #000000, $alpha: 0.05);
        cursor: pointer;
        // padding: 0.05rem 0.05rem 0.05rem 0.05rem;
        // border-radius: 1rem;
        }
    }

    li {
        // margin-bottom: 400px;
        display: none;
        flex-basis: 28%;
        list-style-type: none;
        padding: 0 30px;
        box-sizing: border-box;
        margin-bottom: 30px;
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 100px;
        
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        }
        .course-img {
            // position: relative;
            margin-top:10px;
            width: 90%;
            margin-left: 50%;
            transform: translateX(-50%);
            height: auto;
        }

        .course-content {
            display: block;
            position: relative;

            div, h4 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-bottom: 5px;
            }
            
            button {
                position: absolute;
                font-size: 1.5vw;
                font-weight: 500;
                background-color: rgb(0, 128, 128);
                padding: 10px;
                color: #fff;
                width: 100%;
                top: 200px;
                border: none;
                border-radius: 30px;
                &:hover {
                    background-color: #000000;
                    transform: scale(1.1);
                }
            }
        }
    }
}

.listPage {
    padding: 10px;
    text-align: center;
    list-style: none;

    .active {
        background-color: #ccc;
    }

    li {
        background-color: #ffffffBD;
        padding: 20px;
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;

        &:hover {
            background-color: #ddd;
        }
    }
}
</style>
