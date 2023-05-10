<template>
<h1 class="title">Studying</h1>
<!-- {{ content }} -->
<!-- {{ openChapter($event, 1) }} -->
<div v-if="begin">
    {{ openTabs(content[0].chapterId) }}
    {{ openChapter(content[0].contents[0].contentId) }}
    {{ this.begin = false }}
</div>

<div class="tab">
    <div v-for="chapter in content">
        <div class="sub-title">
            <div class="container" :class="{ change: openTab[chapter.contents[0].contentId] }" v-on:click="openTabs(chapter.chapterId);">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
            <h5 class="limit">{{chapter.chapterTitle}}</h5>
        </div>
        <button class="tablinks" :class="{ active: openContent[cont.contentId], open: openTab[cont.contentId]}" v-for="cont in chapter.contents" v-on:click=" openChapter(cont.contentId)"><div class="limit">{{ cont.contentTitle }}</div></button>
    </div>

    <!-- {{ openChapter($even, 1) }} -->
</div>

<div v-for="chapter in content">
    <div v-for="cont in chapter.contents" class="tabcontent" :class="{ active: openContent[cont.contentId]}">
        <div>
            <video width="1000" controls style="" class="course-video">
                <source :src="cont.link" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h2 style="margin-left: 80px;">{{cont.contentTitle}}</h2>
        </div>
    </div>
</div>



<div class="clearfix"></div>
</template>

<script>
export default {
    name: 'StudyPage',
    methods: {
        openChapter(content_id) {

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
        axios.post(`/courses/${id}/students/contents`, {}, {
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
    float: left;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 20%;
    height: 100%;
    position: relative;

    .sub-title {
        display: flex;
        // margin-left: -50px;
        padding-left: 0;

        .container {
            margin-left: 0;
        }

        h5 {
            position: absolute;
            // margin-left: -40px;
            margin-left: 60px;
            margin-top: 5px;
        }
    }
}

/* Style the buttons inside the tab */
.tab button {
    display: none;
    background-color: inherit;
    color: black;
    padding: 22px 16px;
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    font-size: 17px;
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
}

.tablinks.open {
    display: block;
}

/* Style the tab content */
.tabcontent {
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 80%;
    border-left: none;
    height: auto;
    display: none;
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
    margin: 10px 0;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>
