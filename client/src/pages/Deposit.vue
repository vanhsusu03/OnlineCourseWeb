<template>
    <div class="page">
        <div class="deposit">
            <h1>Deposit</h1>
            <h2>Online banking</h2>
            <div>You need to transfer to account number 108875750229 Viettinbank account owner is Duong Nguyen Viet Anh with the content of your username then wait for us to add virtual money to your account</div>
            <div>Example: </div>
            <img src="https://scontent.fhph1-2.fna.fbcdn.net/v/t1.15752-9/344305526_1352843661962399_2674289858324245203_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=L9TLcS1S4LsAX9CWE5b&_nc_ht=scontent.fhph1-2.fna&oh=03_AdSToaJSScenf-ayXsJvcSRGGbJjbP7Dft7Lalsr_cZUZg&oe=64772DC4" alt="">
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Deposit'
}
</script>

<style scoped lang = "scss">
    .page {
        background-color: rgb(0,128,128);
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
        // h1 {
        //     margin-left: 50%;
        //     transform: translateX(-40%);
        // }
        // h2 {
        //     margin-left: 50%;
        //     transform: translateX(-50%);
        // }
        h1, h2 {
            text-align: center;
            margin: 10px 0;
        }
        div {
            margin: 10px 0;
        }
        img {
            width: 100%;
        }
    }
</style>