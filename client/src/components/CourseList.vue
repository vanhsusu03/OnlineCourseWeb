<template>
<h1>Course List</h1>
<ul v-if="courses && courses.length" class="listCourse">
    <li v-for="course of courses" class="item">
        <img v-bind:src="course.img_url" alt="" class="course-img">
        <div class="course-content">
            <h2>{{ course.title }}</h2>
            <div>{{ course.instructor }}</div>
            <h4>{{ course.course_fee + ' VND' }}</h4>
            <button v-on:click="addToCart(course.id - 1)">Add To Cart</button>
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
    <li v-for="page in pages" class="pagelinks" :class="{active:page.status}" v-on:click="this.begin = false; openCity(page.value)">
        {{ page.value }}
    </li>
</ul>
</template>

<script>
import axios from 'axios';
import { onBeforeMount } from 'vue';
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
            limit: 6,
            list: document.getElementsByClassName("item")
        }
    },
    methods: {
        async retrieveCourses() {
            let data = await axios.get('/courses')
            this.courses = data.data
            .catch(e => {
            console.log(e);
            });
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
        addToCart(id) {
            axios.post(`https://my-json-server.typicode.com/minhdatuet/testdb/cart`, {
                id: this.courses[id].id,
                title: this.courses[id].title,
                instructor: this.courses[id].instructor,
                description: this.courses[id].description,
                course_fee: this.courses[id].course_fee,
                img_url: this.courses[id].img_url
            })
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
        axios.get(`https://my-json-server.typicode.com/minhdatuet/testdb/courses`)
            .then(response => {
                this.courses = response.data
            })
            .catch(e => {
                this.errors.push(e)
            })
        // this.retrieveCourses();
    }
}
</script>

<style lang="scss" scoped>
.listCourse {
    display: flex;
    flex-wrap: wrap;
    // margin-right: 50px;
    justify-content: space-between;

    li {
        display: none;
        flex-basis: 30%;
        list-style-type: none;
        padding: 0 30px;
        box-sizing: border-box;
        margin-bottom: 30px;

        .course-img {
            max-width: 100%;
            height: auto;
        }

        .course-content {
            display: block;

            button {
                font-size: 1.5vw;
                font-weight: 500;
                background-color: rgb(0, 128, 128);
                padding: 10px;
                color: #fff;
                width: 100%;
                border: none;
                border-radius: 30px;
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
