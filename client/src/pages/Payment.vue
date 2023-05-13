<template>
<h4>You want to pay for {{ numOfCourses }} 
    <span v-if="courses.length > 1">courses:</span>
    <span v-else>course:</span>
</h4>
<div class="content">
    <div class="cart-content">
        <ul>
            <li v-for="course in courses">
                <img :src="course.courseImage" alt="">
                <div class="course-content">
                    <h5>{{ course.courseTitle }}</h5>
                    <div>By {{ course.instructorFirstName + ' ' + course.instructorLastName }}</div>
                </div>
            </li>
        </ul>
    </div>
    <div class="total">
        <h3 class="title">Total: {{ getTotal() }} <img src="../assets/img/logo.png" alt=""></h3>
        <h3 class="balance">Account balance: {{ student.coin }}</h3>
        <button v-on:click="pay(student.coin)">Pay</button>
        <!-- {{ savingCourseIds }} -->
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapMutations,mapState } from 'vuex';
export default {
    name: 'Payment',
    data() {
        return {
            savingCourseIds: []
        }
    },
    props: {
        numOfCourses: Number,
        courses: [],
        saved: [],
        isInCart: true
    },
    methods: {
        ...mapMutations(['setStudentCoinChange']),
        getSavingIds() {
            for (let i = 0; i < this.saved.length; i++) {
                this.savingCourseIds.push(this.saved[i].courseId);
            }
        },
        getTotal() {
            let sum = 0;
            for (let i = 0; i < this.courses.length; i++) {
                sum += this.courses[i].courseFee;
            }
            return sum;
        },
        pay(student_coin) {
            // alert("das");
            // console.log(this.savingCourseIds);
            if (this.isInCart) {
                this.getSavingIds();
                let total = this.getTotal();
                if (student_coin < total) {
                    alert("Your balance is not enough to pay");
                } else if(confirm("Are you sure to pay for these courses?")){
                    
                    axios.post('/students/payment/cart', this.savingCourseIds, {withCredentials: true});
                    this.setStudentCoinChange("change");
                    this.$router.push('/');
                }
            } else {
                if (student_coin < this.courses[0].courseFee) {
                    alert("Your balance is not enough to pay");
                } else if(confirm("Are you sure to pay for this courses?")){
                    // alert("OK");
                    axios.post('/students/payment/course',this.courses[0], {withCredentials: true});
                    this.setStudentCoinChange("change");
                    this.$router.push('/');
                }
            }
            
            
        }
    },
    computed: {
        ...mapState(['student','studentCoinChange'])
    },
    created() {
        axios.get('/students/coin', {
                    withCredentials: true
                })
    }
}
</script>

<style lang="scss" scoped>
h4 {
    margin-bottom: 20px;
    font-weight: 650;
    color: rgb(52,73,94);
}
.content {
    display: flex;
    // margin-left: 50px;

    .total {
        margin-left: 80px;
        margin-top: 0px;

        .title {
            width: 100%;
            color: #880000;
            img {
                width: 40px;
            }
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
.cart-content {
    // padding-left: 30px;
    img {
        margin-right: 10px;
    }
    h5 {
        margin-top: 20px;
        
        font-size: 1rem;
    }
    ul {
        padding: 5px 5px;
        padding-right: 30px;
        width: 700px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

        li {
            margin: 15px 0;
            display: flex;

            img {
                height: 70px;
            }

            .course-content {
                margin-left: 5px;
                font-size: 0.9rem;
            }
        }
    }
}
</style>
