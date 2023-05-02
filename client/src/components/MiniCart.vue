<template>
    <div class="cart">
        <img class="cart-img" src="../assets/img/cart.png" alt="">
        <div class="cart-content">
            <ul>
                <li v-for="course in courses">
                    <img :src="course.img_url" alt="">
                    <div class="course-content">
                        <h3>{{ course.title }}</h3>
                        <div>{{ course.instructor }}</div>
                        <div>{{ course.course_fee + ' vnd' }}</div>
                    </div>
                </li>
            </ul>
            <h3 class="total"> Total: {{ getTotal() + ' vnd' }}</h3>
            <RouterLink to="/cart"><button>Go To Cart</button></RouterLink>
        </div>
        
    </div>
    </template>
    
    <script>
    export default {
        name: 'MiniCart',
        data() {
            return {
                courses: []
            }
        },
        methods: {
            getTotal() {
                let sum = 0;
                for (let i = 0; i < this.courses.length; i++) {
                    sum += this.courses[i].course_fee;
                }
                return sum;
            }
        },
        created() {
            axios.get(`https://my-json-server.typicode.com/minhdatuet/testdb/cart`)
                .then(response => {
                    this.courses = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
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
            min-width: 300px;
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