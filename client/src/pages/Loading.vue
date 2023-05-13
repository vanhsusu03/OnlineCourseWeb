<template>
    <div id="loading">
        <img class="img" src="../assets/img/logo.png" alt="loading..." width="200" />
        <div id="head">Welcome to DNA!</div>
        <div class="loader-line"></div>
    </div>
</template>
  
<script>
export default {
    name: "Loading",
};
</script>
<style scoped lang="scss">
#loading {
    position: absolute;
    z-index: 1000;
    background-color: rgb(52,73,94);
    height: 100vh;
    width: 100vw;
    text-align: center;
    #head {
        font-size: 1.75rem;
        font-weight: 650;
        color: rgb(235,235,235);
    }
    .loader-line {
        width: 500px;
        height: 3px;
        position: relative;
        overflow: hidden;
        background-color: #ddd;
        margin: 100px auto;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
    }

    .loader-line:before {
        content: "";
        position: absolute;
        left: -50%;
        height: 5px;
        width: 40%;
        background-color: rgb(52,73,94);
        -webkit-animation: lineAnim 3s linear infinite;
        -moz-animation: lineAnim 3s linear infinite;
        animation: lineAnim 3s linear infinite;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
    }

    @keyframes lineAnim {
        0% {
            left: -40%;
        }

        50% {
            left: 20%;
            width: 80%;
        }

        100% {
            left: 100%;
            width: 100%;
        }
    }

}

.img {
    margin-top: 16%;
    position: relative;
    // margin: auto;
    width: 60px;
    // margin-top: 20%;
    animation: rotate 2s linear infinite;
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(180deg);
        }
    }
    margin-bottom: 20px;
}

</style>