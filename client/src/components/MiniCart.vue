<template>
    <div class="cart">
        <img class="cart-img" src="../assets/img/cart.png" alt="">
        <div class="cart-content">
            <ul>
                <li v-for="course in courses">
                    <img :src=course.courseImage alt="">
                    <div class="course-content">
                        <h3>{{ course.courseTitle }}</h3>
                        <div>{{ course.instructorFirstName + ' ' + course.instructorLastName }}</div>
                        <div>{{ course.courseFee + ' vnd' }}</div>
                    </div>
                </li>
            </ul>
            <h3 class="total"> Total: {{ getTotal() + ' vnd' }}</h3>
            <RouterLink to="/cart"><button>Go To Cart</button></RouterLink>
        </div>

    </div>
</template>
    
<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'MiniCart',
    data() {
        return {
            courses: []
        }
    },
    methods: {
        ...mapMutations(['setMiniCart']),
        getTotal() {
            let sum = 0;
            for (let i = 0; i < this.courses.length; i++) {
                sum += this.courses[i].courseFee;
            }
            return sum;
        },
        getCourseInfo() {
            axios.get('/students/cart', { withCredentials: true })
                .then(response => {
                    this.courses = response.data.coursesInCart
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    },
    created() {
            this.getCourseInfo()
    },
    compyted: {
        ...mapState(['miniCart']),
    },
}

</script>
    
<style scoped lang="scss">
.cart {
    max-width: 40px;
    position: relative;

    &:hover {
        .cart-content {
            display: block;
        }
    }

    .cart-img {
        max-width: 40px;
        cursor: pointer;
        position: relative;
        margin-bottom: 5px;
    }

    .cart-content {
        position: absolute;
        z-index: 1;
        display: none;
        background-color: white;
        left: -200px;
        // margin: 10px 0;
        min-width: 350px;
        padding: 5px 10px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

        h3 {
            font-size: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        ul {
            padding-left: 0;
            border-bottom: 1px solid gray;
        }

        li {
            display: flex;
            list-style: none;
            margin: 10px 0;

            img {
                width: 120px;
                height: auto;
            }

            .course-content {
                margin-left: 20px;
            }
        }

        .total {
            text-align: center;
        }

        button {
            width: 90%;
            padding: 5px 0;
            margin-left: 50%;
            transform: translateX(-50%);
            border: none;
            border-radius: 5px;
            background-color: rgb(0, 128, 128);
            color: white;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 10px;
        }
    }

}</style>