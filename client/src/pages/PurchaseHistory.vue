<template>
    <h2>Your Purchased History</h2>
<table>
    <tr>
        <th>ID</th>
        <th>Order Date</th>
        <th>Order Time</th>
        <th>Course</th>
        <th>Cost</th>
        <th>Sum</th>
    </tr>
    <tr v-for="order in orders">
        <td class="counterCell"></td>
        <td>{{ order.orderTime.substring(0,10) }}</td>
        <td>{{ order.orderTime.substring(11,19) }}</td>
        <td class="course"><div v-for="detail in order.order_details">{{ detail.course.courseTitle }} <br></div></td>
        <td><div v-for="detail in order.order_details">{{ detail.payment.amount }} <br></div></td>
        <td>{{ getTotal(order) }}</td>
    </tr>
</table>
</template>

<script>
import axios from 'axios';
export default {
    name: 'PurchaseHistory',
    data() {
        return {
            orders: [],
            id: 1
        }
    },
    methods: {
        getTotal(order) {
            let sum = 0;
            for (let i = 0; i < order.order_details.length; i++) {
                sum += order.order_details[i].payment.amount;
            }
            return sum;
        }
    },
    created() {
        axios.get('/student/orders', {withCredentials: true})
        .then(res => {
            this.orders = res.data.orders;
        });
    }
}
</script>

<style scoped lang="scss">
h2 {
    text-align: center;
    margin: 10px 0;
}
table {
//   font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 70%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 30px;
  margin-bottom: 30px;
  counter-reset: tableCount;     
}

td, th {
  border: 1.5px solid black;
  text-align: left;
  padding: 8px;
  text-align: center;
//   position: relative;
}

div {
    position: relative;
    &::after {
        position: absolute;
        content: '';
        background: black;
        height: 2px;
        top: 20px;
    }
}


tr:nth-child(even) {
  background-color: #dddddd;
}

.counterCell:before {              
    content: counter(tableCount); 
    counter-increment: tableCount; 
}

.course {
    text-align: left;
    padding-left: 20px;
}
</style>