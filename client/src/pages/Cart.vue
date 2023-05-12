<template>
<h1 class="pagetitle">Shopping Cart</h1>
<div style="margin-left: 50px;" v-if="checkNoCart()">
    <h2>You don't have any courses in your cart. You can refer to some of the courses below:</h2>
    <ul v-if="listCourses && listCourses.length">
        <li v-for="course of listCourses" style="display: flex; margin: 20px 0">
                <div>
                    <RouterLink :to="{path: '/course/info/' + course.courseId}" class="course-img">
                        <img v-bind:src="course.courseImage" alt="" class="course-img">
                    </RouterLink>
                </div>
            
            <div style="margin-left: 10px;">
                <h4 v-bind:title="course.courseTitle">{{ course.courseTitle }}</h4>
                <!-- <div>{{ course.instructor }}</div> -->
                <div class="desc" v-bind:title="course.courseDescription">{{course.courseDescription}}</div>
                <div>{{ course.courseFee }} VND</div>
                <div>By <span style="font-weight: 500;">{{ course.instructorFirstName }} {{ course.instructorLastName }}</span></div>
            </div>
        </li>
    </ul>
</div>
    
<div class="content" v-else>
    <div>
        <h5>{{ courses.length }} Course in Cart</h5>
        <div class="cart">
            <div class="cart-content">
                <ul>
                    <li v-for="course in courses">
                        <img :src="course.courseImage" alt="">
                        <div class="course-content">
                            <h3>{{ course.courseTitle }}</h3>
                            <div>By {{ course.instructorFirstName + ' ' + course.instructorLastName }}</div>
                            <div>{{ course.courseDescription}}</div>
                        </div>
                        <div class="buy-button">
                            <button v-on:click="removeCourse(course.courseId)">Remove</button><br>
                            <button v-on:click="moveToSave(course.courseId)">Save For Later</button>
                        </div>
                        <div class="cost">{{ course.courseFee }} VND</div>
                    </li>
                </ul>
            </div>
        </div>
        <br>
        <h5>Saved for later</h5>
        <div class="cart">
            <div class="cart-content">
                <ul>
                    <li v-for="course in saved">
                        <img :src="course.courseImage" alt="">
                        <div class="course-content">
                            <h3>{{ course.courseTitle }}</h3>
                            <div>By {{ course.courseInstructor }}</div>
                            <div>{{ course.courseDescription}}</div>
                        </div>
                        <div class="buy-button">
                            <button v-on:click="removeCourse(course.courseId)">Remove</button><br>
                            <button v-on:click="moveToCart(course.courseId)">Move To Cart</button>
                        </div>
                        <div class="cost">{{ course.courseFee }} VND</div>
                    </li>
                </ul>
            </div>
        </div>
        <br>
    </div>
    <div class="total">
        <h3 class="total-title">Total:</h3>
        <h2>{{ getTotal() }} VND</h2>
        <button v-on:click="openPayment()">Payment</button>
    </div>
</div>
<!-- <div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
    </div>

</div> -->
<div class="modal" id="myModal">
    <div class="modal-content">
        <span class="close" v-on:click="closePayment()">&times;</span>
        <p><Payment :numOfCourses="courses.length" :courses="courses" :saved="saved" :isInCart="true"></Payment></p>
    </div>
</div>
</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex';
import Payment from './Payment.vue';
import MiniCart from '@/components/MiniCart.vue';
import axios from 'axios';
export default {
    name: 'Cart',

    data() {
        return {
            courses: [],
            saved: [],
            openingPayment: false,
            listCourses: [],
            randomCourses: []
        }
    },
    components: {
        Payment
    },
    methods: {
        ...mapMutations(['scrollToTop', 'setMiniCart']),
        openPayment() {
            let modal = document.getElementById("myModal");
            // alert("hio");
            modal.style.display = "block";
            this.openingPayment = true;
        },
        closePayment() {
            let modal = document.getElementById("myModal");
            modal.style.display = "none";
            this.openingPayment = false;
        },
        getRandomCourse() {
            let coursesCopy = [...this.listCourses]; // create a copy of the array to avoid modifying the original
            // loop 8 times or until there are no more elements to choose from
                for (let i = 0; i < 8 && coursesCopy.length > 0; i++) {
                    let randomIndex = Math.floor(Math.random() * coursesCopy.length); // choose a random index
                    this.randomCourses.push(coursesCopy[randomIndex]); // add the chosen element to the randomCourses array
                    coursesCopy.splice(randomIndex, 1); // remove the chosen element from the coursesCopy array
                }
                this.listCourses = this.randomCourses;
            },
        getTotal() {
            let sum = 0;
            for (let i = 0; i < this.courses.length; i++) {
                sum += this.courses[i].courseFee;
            }
            return sum;
        },
        moveToSave(id) {
            for (let i = 0; i < this.courses.length; i++) {
                if (this.courses[i].courseId === id) {
                    this.saved.push(this.courses[i])
                    this.courses.splice(i, 1)
                }
            }
        },
        async removeCourse(id) {
            await axios.post(`/students/cart/${id}/delete`, {}, {
                withCredentials: true
            });
            this.getInfo();
            // this.setUpdateMiniCart(true);
            this.$router.push('/cart');

        },
        moveToCart(id) {
            for (let i = 0; i < this.saved.length; i++) {
                if (this.saved[i].courseId === id) {
                    this.courses.push(this.saved[i])
                    this.saved.splice(i, 1)
                }
            }
        },
        getInfo() {
            axios.get('/students/cart/', {
                    withCredentials: true
                })
                .then(response => {
                    this.courses = response.data.coursesInCart
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        checkNoCart() {
            if (this.courses.length === 0) return true;
            return false;
        }
    },
    created() {
        this.getInfo();
        axios.get('/courses', { withCredentials: true })
            .then(response => {
                this.listCourses = response.data;
                this.getRandomCourse();
            })
            .catch(e => {
                this.errors.push(e)
            });
    },
    computed: {
        ...mapState(['student', 'admin', 'miniCart'])
    },
    
}
</script>

<style lang="scss" scoped>
.pagetitle {
    margin-left: 50px;
    margin-top: 30px;
    margin-bottom: 20px;
}

.content {
    display: flex;
    margin-left: 50px;
    width: 750px;

    .total {
        margin-left: 100px;
        margin-top: 50px;

        .total-title {
            color: gray;
            // text-align: center;
        }

        button {
            font-size: 1.5vw;
            font-weight: 500;
            background-color: rgb(0, 128, 128);
            padding: 10px;
            color: #fff;
            width: 200px;
            border: none;
            border-radius: 30px;
        }
    }
}

.cart {
    // max-width: 40px;
    width: 100%;
    position: relative;

    &:hover {
        .cart-content {
            display: block;
        }
    }

    .cart-content {
        position: relative;
        // z-index: 1;
        display: block;
        background-color: white;
        // margin: 10px 0;
        // min-width: 200px;
        width: 100%;
        padding: 5px 10px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

        ul {
            padding-left: 0;
            // border-bottom: 1px solid gray;
        }

        li {
            display: flex;
            list-style: none;
            margin: 10px 0;

            img {
                width: 200px;
                height: auto;
            }

            .course-content {
                margin-left: 20px;
                width: 500px;
            }
        }

        .total {
            text-align: center;
        }

        button {
            border: none;
            background-color: white;
            margin: 5px 0;
            margin-left: 20px;
            color: rgb(0, 128, 128);
            font-weight: 500;
            width: 150px;
        }

        .cost {
            margin-left: 100px;
            margin-top: 15px;
            font-size: 20px;
            color: rgb(0, 128, 128);
            font-weight: 500;
        }
    }

}

/* The Modal (background) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
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
