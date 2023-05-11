<template>
    <div class="aboutus">
        <h1 class="title">About us</h1>
        <h4 class="sub-title">Meet the DNATeam</h4>
        <ul>
            <li v-for="member in teams">
                <div class="info">
                    <div class="text">
                        <div class="res">{{ member.responsible }}</div>
                        <div class="name">{{ member.name }} <br> </div>
                        MSV: {{ member.msv }} <br>
                        D.O.B: {{ member.birth }}
                    </div>
                </div>
                <div class="img">
                    <img v-bind:src="member.img" alt="">
                </div>
            </li>
        </ul>
    </div>

    <div class="aboutweb">
        <h2 class="title">About our website</h2>
        <div class="content">Introducing a dynamic and innovative big exercise group dedicated to exploring online learning
            websites, specifically within the domain of software technology. Comprised of four passionate individuals, this
            group brings together a diverse range of expertise and experiences in the field. With a shared enthusiasm for
            both education and technology, they embark on a collaborative journey to delve deep into the realm of online
            learning platforms. Their goal is to analyze, evaluate, and optimize the effectiveness of these websites in
            delivering software technology education. By leveraging their collective knowledge, the group investigates
            various platforms, examining their course offerings, interactive features, and technical resources. Through
            rigorous testing and meticulous evaluation, they aim to identify the most efficient and user-friendly platforms
            that cater to the specific needs of software technology learners. The group's dynamic discussions and
            brainstorming sessions provide a fertile ground for exchanging ideas, sharing insights, and refining their
            understanding of the digital learning landscape. By synergizing their skills and experiences, they strive to
            create a comprehensive report outlining their findings, recommendations, and innovative approaches for utilizing
            online learning websites in the software technology domain. As they navigate this big exercise together, this
            group envisions not only enhancing their own knowledge but also contributing to the broader software technology
            community by providing valuable insights and resources for learners and educators alike.</div>
    </div>
</template>

<script>
export default {
    name: 'AboutUs',
    data() {
        return {
            teams: [{
                name: 'Le Minh Dat',
                msv: 21020297,
                responsible: 'Frontend',
                birth: '13/10/2003',
                img: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/52501595_793648261012338_4544737335232692224_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6kYtGskUxVsAX8edQUq&_nc_ht=scontent.fhan19-1.fna&oh=00_AfBgvrYwD8-Agypf103jL4qSOaFzHhMKQErYaTqGeqFh9g&oe=647F329C'
            },
            {
                name: 'Duong Nguyen Viet Anh',
                msv: 21020273,
                responsible: 'Leader',
                birth: '8/2/2003',
                img: 'https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/327322072_856442842057571_1490245459825342229_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WVTLsOPcpgAAX9pZP3v&_nc_ht=scontent.fhan19-1.fna&oh=00_AfBtfZByr6ZcVT8wRO1cUnzLIs66F5W3L6IK-eMAeaW6_A&oe=645D378F'
            },
            {
                name: 'Hoang Van Nguyen',
                msv: 21020370,
                responsible: 'Backend',
                birth: '17/01/2003',
                img: 'https://vn.japo.news/contents/wp-content/uploads/2017/09/MeoMappuChin-21.jpg'
            },
            {
                name: 'Nguyen Hoang Duy',
                msv: 21020755,
                responsible: 'Backend',
                birth: '20/04/2003',
                img: 'https://progameguides.com/wp-content/uploads/2021/03/Genshin-Impact-Character-Ayaka-1.jpg?fit=875%2C915'
            },
            ]
        }

    }
}
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    margin-top: 20px;
}

.sub-title {
    text-align: center;
    margin: 30px 0;
    position: relative;

    &::after {
        position: absolute;
        // border-bottom: 2px solid white;
        content: '';
        // top: -10px;
        top: 35px;
        left: 50%;
        transform: translateX(-50%);
        height: 4px;
        width: 5%;
        background: rgb(0, 128, 128);
        border-radius: 2px;
    }
}

ul {
    display: flex;

    li {
        position: relative;
        list-style-type: none;

        &:hover .info {
            opacity: 1;
        }

        img {
            display: block;
            width: 350px;
            height: 400px;
        }

        .info {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: .5s ease;
            background-color: rgba(0, 0, 0, 0.5);

            .text {
                width: 100%;
                color: white;
                font-size: 20px;
                font-weight: 400;
                position: absolute;
                margin-top: 150px;
                margin-left: 25px;

                // text-align: center;
                .name {
                    font-size: 26px;
                    font-weight: 500;
                }

                .res {
                    font-size: 40px;
                    font-weight: 500;
                    margin-bottom: 15px;

                    &::after {
                        position: absolute;
                        // border-bottom: 2px solid white;
                        content: '';
                        // top: -10px;
                        top: 55px;
                        left: 0;
                        height: 4px;
                        width: 25%;
                        background: white;
                    }
                }
            }
        }
    }
}

.aboutweb {
    margin-top: 50px;

    .content {
        width: 65%;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-bottom: 50px;
    }
}</style>
