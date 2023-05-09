<template>
    <h1 class="pagetitle">Shopping Cart</h1>
    <div class="content">
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
                            <div class="button">
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
                            <div class="button">
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
            <h3 class="title">Total:</h3>
            <h2>{{ getTotal() }} VND</h2>
            <RouterLink to="/payment"><button>Payment</button></RouterLink>
        </div>
    </div>
    </template>
    
    <script>
    import { mapMutations, mapState } from 'vuex';
    import MiniCart from '@/components/MiniCart.vue';
    import axios from 'axios';
    export default {
        name: 'Cart',
        
        data() {
            return {
                courses: [],
                saved: [],
    
            }
        },
        methods: {
            ...mapMutations(['scrollToTop','setMiniCart']),
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
                await axios.post(`/students/cart/${id}/delete`, {}, {withCredentials: true});
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
                axios.get('/students/cart/', {withCredentials: true})
                .then(response => {
                    this.courses = response.data.coursesInCart
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }
        },
        created() {
            this.getInfo()
        },
        computed: {
            ...mapState(['student', 'admin','miniCart'])
        }
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
        .total {
            margin-left: 100px;
            margin-top: 50px;
    
            .title {
                color: gray;
            }
    
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
                margin-left: 150px;
                color: rgb(0, 128, 128);
                font-weight: 500;
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
    </style>
    