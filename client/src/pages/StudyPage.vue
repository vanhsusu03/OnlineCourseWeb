<template>
<h1 class="title">{{ course.courseTitle }}</h1>
<!-- {{ openChapter($event, 1) }} -->
<div class="tab">
    <div class="sub-title">
        <div class="container" :class="{ change: openTab }" v-on:click="openTabs(); openTab=!openTab; ">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        <h5 class="tablinks">Chapters in this course:</h5>
    </div>
    <button class="tablinks" v-for="chapter in course.chapters" v-on:click="openChapter($event, chapter.chapter_id)">{{ chapter.chapter_id }}. {{ chapter.title }}</button>
    <!-- {{ openChapter($even, 1) }} -->
</div>

<div v-for="chapter in course.chapters" class="tabcontent">
    <div>
    <video width="1000" controls style="" class="course-video">
      <source :src="chapter.link" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<div class="clearfix"></div>
</template>

<script>
export default {
    name: 'StudyPage',
    methods: {
        openChapter(evt, chapter_id) {
            // alert('Hello')
            // Declare all variables
            var i, tabcontent, tablinks;
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.remove('active');
            }
            // Show the current tab, and add an "active" class to the button that opened the tab
            tabcontent[chapter_id - 1].style.display = "block";
            evt.target.classList.add('active');
        },
        myFunction(evt) {
            evt.target.classList.add('change');
        },
        openTabs() {
            // alert("hi");
            var i, tabcontent, tablinks, tab;
            tablinks = document.getElementsByClassName("tablinks");
            tab = document.getElementsByClassName("tab");
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tablinks.length; i++) {
                if (this.openTab === true) {
                    tablinks[i].style.display = "none";
                    if (i>0) {tabcontent[i-1].style.width = "96%";}
                    tab[0].style.width = "4%";
                }
                else {
                    tablinks[i].style.display = "block";
                    if (i>0) {tabcontent[i-1].style.width = "80%";}
                    tab[0].style.width = "20%";
                }
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
            openTab: true,
            video: "https://www.w3schools.com/tags/movie.mp4",
            videoLink: 'http://techslides.com/demos/sample-videos/small.mp4'
        }
    }
}
</script>

<style lang="scss" scoped>
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
    display: block;
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
.tab button.active {
    background-color: #ccc;
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

.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  transform: translate(0, 11px) rotate(-45deg);
}

.change .bar2 {opacity: 0;}

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
