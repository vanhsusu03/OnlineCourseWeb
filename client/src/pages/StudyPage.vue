<template>
<div v-if="begin">
    {{ openTabs(content[0].chapterId) }}
    {{ openChapter(content[0].contents[0].contentId) }}
    {{ this.begin = false }}
</div>

<div class="tab">
    <h5 style="padding: 10px 10px; background-color: white;">Contents Of Course:</h5>
    <div v-for="(chapter,index) in content" :key="chapter.chapterId">
        <div class="sub-title">
            <div class="limit chapter-title">{{ index + 1 }}. {{chapter.chapterTitle}}</div>
            <div class="container" :class="{ change: openTab[chapter.contents[0].contentId] }" v-on:click="openTabs(chapter.chapterId);">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
        </div>
        <button class="tablinks" :class="{ active: openContent[cont.contentId], open: openTab[cont.contentId]}" v-for="(cont,index) in chapter.contents" v-on:click=" openChapter(cont.contentId)">
            <div class="limit">
                {{index + 1}}. {{ cont.contentTitle }}
            </div>
            <div class="time">
                {{ parseInt( cont.timeRequiredInSec / 60 ) }}:{{ cont.timeRequiredInSec - parseInt( cont.timeRequiredInSec / 60 )*60 }}
            </div>
        </button>
    </div>

    <!-- {{ openChapter($even, 1) }} -->
</div>

<div v-for="chapter in content">
    <div v-for="cont in chapter.contents" class="tabcontent" :class="{ active: openContent[cont.contentId]}">
        <div class="video">
            <video width="1000" controls style="" class="course-video">
                <source :src="cont.link" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            
        </div>
        <h2>{{cont.contentTitle}}</h2>
    </div>
</div>



<div class="clearfix"></div>
</template>

<script>
export default {
    name: 'StudyPage',
    methods: {
        openChapter(content_id) {
            document.querySelectorAll('video').forEach(vid => {
                vid.currentTime=0;
                vid.pause();});
            for (let i = 0; i < this.openContent.length; i++) {
                this.openContent[i] = false;
                if (i === content_id) {
                    this.openContent[i] = true;
                }
            }
            // tabcontent[chapter_id - 1].style.display = "block";
        },
        myFunction(evt) {
            evt.target.classList.add('change');
        },
        openTabs(id) {
            // alert("hi");
            // alert(id);
            var i;
                for (let j=0; j<this.content.length; j++) {
                    // alert(j);
                    if (this.content[j].chapterId === id) {
                        // alert(j);
                        for (i = 0; i < this.content[j].contents.length; i++) {
                            // alert(i);
                            this.openTab[this.content[j].contents[i].contentId] = !this.openTab[this.content[j].contents[i].contentId];
                        }
                    }
                }
        },
        fillOpenArray() {
                for (let j = 0; j < 200; j++) {
                    this.openContent.push(false);
                    this.openTab.push(false);
                }
        }
    },
    data() {
        return {
            course: {
                courseTitle: 'Learn Thai Yoga Massage',
                chapters: [{
                        chapter_id: 1,
                        title: 'Body Mechanics',
                        link: 'https://www.w3schools.com/tags/movie.mp4'
                    },
                    {
                        chapter_id: 2,
                        title: 'Body Mechanics 2',
                        link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    },
                    {
                        chapter_id: 3,
                        title: 'Body Mechanics 3',
                        link: 'https://www.w3schools.com/tags/movie.mp4'
                    }
                ],
            },
            begin:true,
            openTab: [],
            openContent: [],
            content: [],

        }
    },
    created() {
        let id = Number(window.location.href.split('/').slice(-1)[0]);
        // alert(id);
        axios.get(`/courses/${id}/students/contents`, {
                withCredentials: true
            })
            .then(response => {
                this.content = response.data.contents;
                this.fillOpenArray();
            })
            .catch(e => {
                this.errors.push(e)
            })
    }
}
</script>

<style lang="scss" scoped>
.limit {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.title {
    margin: 20px 0;
    margin-left: 20px;
}

* {
    box-sizing: border-box
}

body {
    font-family: "Lato", sans-serif;
}

/* Style the tab */
.tab {
    float: right;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 20%;
    height: 100%;
    position: relative;

    .sub-title {
        display: flex;
        // margin-left: -50px;
        // padding-left: 0;
        padding: 5px 0;

        .container {
            // position: abs;
            margin-left: 240px;
        }

        .chapter-title {
            position: absolute;
            // margin-left: -40px;
            width: 240px;
            margin-left: 10px;
            // margin-top: 5px;
            padding: 5px;
            font-weight: 500;
            font-size: 18px;
        }
    }
}

/* Style the buttons inside the tab */
.tab button {
    display: none;
    background-color: white;
    color: black;
    padding: 8px 24px;
    padding-right: 10px;
    width: 100%;
    // height: 100px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    text-align: left;
    cursor: pointer;
    font-size: 17px;
    // margin-left: 5px;

    .time {
        font-size: 14px;
        margin-left: 18px;
    }
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current "tab button" class */
button.active {
    background-color: #ccc;
} 

.tabcontent.active {
    display: block;
    button {
        font-weight: 500;
    }
}

.tablinks.open {
    display: block;
}

/* Style the tab content */
.tabcontent {
    float: left;
    // padding: 0px 12px;
    border: 1px solid #ccc;
    width: 80%;
    border-left: none;
    height: auto;
    display: none;
    .video {
        width: 100%;
        background-color: black;
    }
    h2 {
        margin:20px 80px;
    }
}

/* Clear floats after the tab */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.container {
    width: 50px;
    display: inline-block;
    cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
}

.change .bar1 {
    transform: translate(0, 11px) rotate(-45deg);
}

.change .bar2 {
    opacity: 0;
}

.change .bar3 {
    transform: translate(0, -11px) rotate(45deg);
}

.course-video {
    position: relative;
    margin-top: 10px;
    // margin: 10px 0;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>
