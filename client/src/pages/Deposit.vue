<template>
    <div class="page" id="2802">
        <div class="deposit">
            <h1>Deposit</h1>
            <h2>Online banking</h2>
            <div>Choose amount of money you want to transfer to DNA coins, and pay for it by online banking.</div>
            <div> 1 VND = 1 <img src="../assets/img/_logo.png" alt=""></div>
            <div class="example">Choose amount of money: </div>
            <span>
                <select id="select" v-model="amount">
                    <option disabled value="" id="def">Amount</option>
                    <option>10.000</option>
                    <option>20.000</option>
                    <option>50.000</option>
                    <option>100.000</option>
                    <option>200.000</option>
                    <option>300.000</option>
                    <option>400.000</option>
                    <option>500.000</option>
                </select>
                <span>VND</span>
            </span>
            <p class="error" v-if="this.amountError.length > 0">{{ amountError[0] }}</p>
            <div>

            </div>
            <div class="button">
                <button @click="this.checkDeposit(student.id)">Confirm deposit</button>
            </div>
            <div></div>
            <div v-if="this.qrCode" class="button">
                <qrcode-vue :value=this.qrCode level="H" />
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import QrcodeVue from 'qrcode.vue'
export default {
    name: 'Deposit',
    data() {
        return {
            amount: 0,
            amountError: [],
            qrCode: '',
        }
    },
    methods: {
        async deposit(id) {
            const YOUR_DOMAIN = 'http://localhost:8080';
            const body = {
                orderCode: Number(String(Date.now()).slice(-6)),
                amount: Number(this.amount) * 1000,
                description: `Student id ${id} deposit`,
                returnUrl: `${YOUR_DOMAIN}`,
                cancelUrl: `${YOUR_DOMAIN}`,
            };
            const depositLinkRespone = await axios.post('/deposit/create', body, { withCredentials: true });
            window.location.href= depositLinkRespone.data.data.checkoutUrl
            
        },

        checkDeposit(id) {
            this.amountError = [];
            if (this.amount == 0) {
                this.amountError.push("Please choose amount of money!")
            } else {
                alert("Đã vào")
                this.deposit(id);
            }
        }
    },
    components: {
        QrcodeVue,
    },
    computed: {
        ...mapState(['student'])
    },
    mounted() {

    }
}

</script>

<style scoped lang="scss">
.page {
    background-color: rgb(0, 128, 128);
    padding: 20px 0;
}

.deposit {
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    max-width: 500px;
    margin-left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    // margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;

    .error {
        font-size: 1.1rem;
        color: rgba($color: #f32f2f, $alpha: 1.0);
        font-weight: 600;
    }

    // h1 {
    //     margin-left: 50%;
    //     transform: translateX(-40%);
    // }
    // h2 {
    //     margin-left: 50%;
    //     transform: translateX(-50%);
    // }
    h1,
    h2 {
        text-align: center;
        margin: 10px 0;
        font-weight: 700;
        color: rgb(52, 73, 94);
    }

    div {
        margin: 10px 0;
        font-size: 18.5px;

    }

    .example {
        font-size: 20px;
        font-weight: 500;
    }

    #select {
        margin-left: 20px;
        // width: 12%;
        margin-right: 20px;
        font-size: 1.2rem;
        border: 1px solid black;

        // border-radius: 10px;
        // height: 50%;
        #def {}

        option {}
    }

    button {
        margin-top: 50px;
        margin-left: 35%;
        margin-right: 25%;
        background-color: transparent;
        color: #000;
        font-size: 1.1rem;
        padding: 8px;
        border: 3px inset #000;


        &:hover {
            font-weight: 500;
            border: 3px solid #000;
        }
    }
}
</style>