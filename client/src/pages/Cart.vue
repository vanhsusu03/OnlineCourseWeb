<template>
<div class="cart">
    <img class="cart-img" src="../assets/img/cart.png" alt="">
    <div class="cart-content">
        <ul>
            <li v-for="course in courses">
                <img :src="course.imgSrc" alt="">
                <div class="course-content">
                    <h3>{{ course.name }}</h3>
                    <div>{{ course.courseInstructor }}</div>
                    <div>{{ course.cost + ' vnd' }}</div>
                </div>
            </li>
        </ul>
        <h3 class="total"> Total: {{ getTotal() + ' vnd' }}</h3>
        <button>Payment</button>
    </div>
    
</div>
</template>

<script>
export default {
    name: 'Cart',
    data() {
        return {
            courses: [
                {
                    name: 'Math 1',
                    courseInstructor: 'Viet Anh',
                    imgSrc: 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg?w=2000',
                    cost: 500000
                },
                {
                    name: 'Math 2',
                    courseInstructor: 'Hoang Duy',
                    imgSrc: 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg?w=2000',
                    cost: 400000
                }
            ]
        }
    },
    methods: {
        getTotal() {
            let sum = 0;
            for (let i = 0; i < this.courses.length; i++) {
                sum += this.courses[i].cost;
            }
            return sum;
        }
    }
}
</script>

<style scoped lang="scss">
.cart {
    width: 300px;
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
        left: -100px;
        // margin: 10px 0;
        max-width: 300px;
        padding: 5px 10px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        ul {
            padding-left: 0;
            border-bottom: 1px solid gray;
        }
        li {
            display: flex;
            list-style: none;
            margin: 10px 0;
            img {
                max-width: 120px;
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
            background-color: rgb(0,128,128);
            color: white;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 10px;
        }
    }
    
}
</style>