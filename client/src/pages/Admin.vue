<template>
    <h1 class="web-title">Web Controller</h1>
    <!-- {{ openChapter($event, 1) }} -->

    <div class="tab">
        <button class="tablinks" v-on:click="openChapter($event, 'account')">Accounts Control</button>
        <button class="tablinks" v-on:click="openChapter($event, 'course')">Courses Control</button>
        <button class="tablinks" v-on:click="openChapter($event, 'instructor')">Instructors Control</button>
        <button class="tablinks" v-on:click="openChapter($event, 'deposit')">Deposit History</button>
        <button class="tablinks" v-on:click="openChapter($event, 'order')">Orders Detail</button>
    </div>

    <div class="tabcontent" id="course">
        <button class="add-course btn" @click="openPayment(1)">Add Course</button>
        <div style="display: flex;">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Instrutor</th>
                    <th>Fee</th>
                    <th>Delete</th>
                    <th>Change</th>
                </tr>
                <tr v-for="course in courses">
                    <td>{{ course.courseId }}</td>
                    <td>{{ course.courseTitle }}</td>
                    <td>{{ course.instructorFirstName }} {{ course.instructorLastName }}</td>
                    <td>{{ course.courseFee }}</td>
                    <td><button class="remove" @click="removeCourse(course.courseId)">Delete</button></td>
                    <td><button class="remove" @click=" openPayment(2); dataAddChapter.addChapterId = course.courseId; getChapter(course.courseId)">Change</button>
                    </td>
                </tr>
            </table>

        </div>
    </div>
    <div class="modal" id="myModal1">
        <div class="modal-content">
            <span class="close" v-on:click="closePayment(1)">&times;</span>
            <h2 style="text-align: center;">Add your course</h2>
            <div class="add-content">
                <form>
                    <div class="course-title info">
                        <h5 class="title-txt">Title: </h5>
                        <input required class="sub" type="text" v-model="course.courseTitle">
                    </div>
                    <div class="course-desc info">
                        <h5 class="desc-txt">Description: </h5>
                        <input required class="sub" type="text" v-model="course.courseDescription">
                    </div>
                    <div class="course-image info">
                        <h5 class="img-txt">Image Link: </h5>
                        <input required class="sub" type="text" v-model="course.courseImage">
                    </div>
                    <div class="course-fee info">
                        <h5 class="fee-txt">Course Fee: </h5>
                        <input required class="sub" type="number" v-model="course.courseFee">
                    </div>
                    <div class="course-ins info">
                        <h5 class="ins-txt">Instructor ID: </h5>
                        <input required class="sub" type="number" v-model="course.instructorId">
                    </div>
                </form>
                <button class="add-button btn" @click="addCourse()">Add Course</button>
            </div>
        </div>
    </div>
    <div class="modal" id="myModal2">
        <div class="modal-content">
            <span class="close" v-on:click="closePayment(2)">&times;</span>
            <button class="btn" @click="dataAddChapter.isAddChapter = !dataAddChapter.isAddChapter">Add Chapter</button>
            <div class="input-cont" v-if="dataAddChapter.isAddChapter">
                <div class="info">
                    <h5>Chapter Title:</h5>
                    <input required class="sub" type="text" v-model="dataAddChapter.chapterTitle">
                    <button type="submit" class="btn" @click="addChapter(dataAddChapter.addChapterId);">Add</button>
                </div>
            </div>

            <button class="btn" @click="dataAddContent.isAddContent = !dataAddContent.isAddContent">Add Content</button>
            <div v-if="dataAddContent.isAddContent" class="input-cont">
                <div class="info">
                    <h5>Chapter Id:</h5>
                    <input required class="sub" type="number" v-model="dataAddContent.chapterId">
                </div>
                <div class="info">
                    <h5>Content Title:</h5>
                    <input required class="sub" type="text" v-model="dataAddContent.contentTitle">
                </div>
                <div class="info">
                    <h5>Time Required In Sec:</h5>
                    <input required class="sub" type="number" v-model="dataAddContent.timeRequiredInSec">
                </div>
                <div class="info">
                    <h5>Content Link:</h5>
                    <input required class="sub" type="text" v-model="dataAddContent.contentLink">
                </div>
                <button class="btn" @click="addContents()">Add</button>

            </div>
            <div class="change-course">
                <div v-for="(chapter, index) in content">
                    {{ index + 1 }}. ID: {{ chapter.chapterId }} Title: {{ chapter.chapterTitle }}
                    <div v-for="(cont, index) in chapter.contents" style="margin-left: 20px;">
                        {{ index + 1 }}. {{ cont.contentTitle }} <br>
                        Link: {{ cont.contentLink }}
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="tabcontent" id="account">
            <div style="display: flex;">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Coin</th>
                        <th class="change-coin">Change Coin</th>
                        <th>Delete</th>
                    </tr>
                    <tr v-for="account in accounts">
                        <td>{{ account.student_id }}</td>
                        <td>{{ account.first_name }} {{ account.last_name }}</td>
                        <td>{{ account.username }}</td>
                        <td>{{ account.email }}</td>
                        <td class="change-coin" v-if="!changeCoin[account.student_id]">{{ account.coin }}</td>
                        <td v-else><input required type="number" v-model="account.coin"></td>
                        <td>
                            <button class="change"
                                v-on:click="changeCoin[account.student_id] = !changeCoin[account.student_id]">
                                <div v-if="!changeCoin[account.student_id]">Change Coin</div>
                                <div v-else v-on:click="changeAccount(account.student_id)">Save</div>
                            </button>
                        </td>
                        <td><button class="remove" @click="removeAccount(account.student_id)">Delete</button></td>
                    </tr>
                </table>

            </div>

        </div>

        <div class="tabcontent" id="instructor">
            <div style="display: flex;">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Coin</th>
                        <th class="change-coin">Change Coin</th>

                        <th>Delete</th>
                    </tr>
                    <tr v-for="account in instructors">
                        <td>{{ account.student_id }}</td>
                        <td>{{ account.first_name }} {{ account.last_name }}</td>
                        <td>{{ account.username }}</td>
                        <td>{{ account.email }}</td>
                        <td class="change-coin" v-if="!changeCoin[account.student_id]">{{ account.coin }}</td>
                        <td v-else><input required type="number" v-model="account.coin"></td>

                        <td>
                            <button class="change"
                                v-on:click="changeCoin[account.student_id] = !changeCoin[account.student_id]">
                                <div v-if="!changeCoin[account.student_id]">Change Coin</div>
                                <div v-else v-on:click="changeAccount(account.student_id)">Save</div>
                            </button>
                        </td>

                        <td><button class="remove" @click="removeAccount(account.student_id)">Delete</button></td>
                    </tr>
                </table>

            </div>
        </div>
        <div class="tabcontent" id="deposit">
            <div style="display: flex;">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>userId</th>
                        <th>Amount</th>
                        <th>Deposit Time</th>
                    </tr>
                    <tr v-for="deposit in deposits">
                        <td>{{ deposit.deposit_id }}</td>
                        <td>{{ deposit.customer_id }}</td>
                        <td>{{ deposit.amount }}</td>
                        <td>{{ deposit.deposit_time.slice(0, 10) }}</td>
                    </tr>
                </table>

            </div>
        </div>
        <div class="tabcontent" id="order">
            <div style="display: flex;">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>userId</th>
                        <th>Name</th>
                        <th>username</th>
                        <th>orderDetails (id)</th>
                        <th>Amount</th>
                        <th>Order Time</th>
                    </tr>
                    <tr v-for="order in orders">
                        <td>{{ order.orderId }}</td>
                        <td>{{ order.studentId }}</td>
                        <td>{{ order.studentFirstName + order.studentLastName }}</td>
                        <td>{{ order.studentUsername }}</td>
                        <td id="detail">
                            <div v-for="detail in order.order_details">{{ detail.course.courseId }}</div>
                        </td>
                        <td>
                            <div v-for="det in order.order_details">{{ det.payment.amount }}</div>
                        </td>
                        <td>{{ order.orderTime.slice(0, 10) }}</td>
                    </tr>
                </table>

            </div>
        </div>

        <div class="modal" id="myModal1">
            <div class="modal-content">
                <span class="close" v-on:click="closePayment(1)">&times;</span>
                <div class="add-content">
                    <form>
                        <div class="course-title" style="display: flex;">
                            <h5 class="title-txt">Title: </h5>
                            <input required type="text" v-model="course.courseTitle">
                        </div>
                        <div class="course-desc" style="display: flex;">
                            <h5 class="desc-txt">Description: </h5>
                            <input required type="text" v-model="course.courseDescription">
                        </div>
                        <div class="course-image" style="display: flex;">
                            <h5 class="img-txt">Image Link: </h5>
                            <input required type="text" v-model="course.courseImage">
                        </div>
                        <div class="course-fee" style="display: flex;">
                            <h5 class="fee-txt">Course Fee: </h5>
                            <input required type="number" v-model="course.courseFee">
                        </div>
                        <div class="course-ins" style="display: flex;">
                            <h5 class="ins-txt">Instructor ID: </h5>
                            <input required type="number" v-model="course.instructorId">
                        </div>
                    </form>
                    <button class="add-button" @click="addCourse()">Add Course</button>
                </div>
            </div>
        </div>
        <div class="modal" id="myModal2">
            <div class="modal-content">
                <span class="close" v-on:click="closePayment(2)">&times;</span>
                <button @click="dataAddChapter.isAddChapter = !dataAddChapter.isAddChapter">Add Chapter</button>
                <div v-if="dataAddChapter.isAddChapter" style="display: flex;">
                    <h5>Chapter Title:</h5>
                    <input required type="text" v-model="dataAddChapter.chapterTitle">
                    <button @click="addChapter(dataAddChapter.addChapterId);">Add</button>
                </div>
                <button @click="dataAddContent.isAddContent = !dataAddContent.isAddContent">Add Content</button>
                <div v-if="dataAddContent.isAddContent">
                    <div style="display: flex;">
                        <h5>Chapter Id:</h5>
                        <input required type="number" v-model="dataAddContent.chapterId">
                    </div>
                    <div style="display: flex;">
                        <h5>Content Title:</h5>
                        <input required type="text" v-model="dataAddContent.contentTitle">
                    </div>
                    <div style="display: flex;">
                        <h5>Time Required In Sec:</h5>
                        <input required type="number" v-model="dataAddContent.timeRequiredInSec">
                    </div>
                    <div style="display: flex;">
                        <h5>Content Link:</h5>
                        <input required type="text" v-model="dataAddContent.contentLink">
                    </div>
                    <button @click="addContents()">Add</button>

                </div>
                <div class="change-course">
                    <div v-for="(chapter, index) in content">
                        {{ index + 1 }}. ID: {{ chapter.chapterId }} Title: {{ chapter.chapterTitle }}
                        <div v-for="(cont, index) in chapter.contents" style="margin-left: 20px;">
                            {{ index + 1 }}. {{ cont.contentTitle }} <br>
                            Link: {{ cont.contentLink }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
    name: 'Admin',
    data() {
        return {
            accounts: [],
            courses: [],
            instructors: [],
            orders: [],
            deposits: [],
            changeCoin: [],
            IdsOfChapter: [],
            course: {
                courseTitle: "",
                courseDescription: "",
                courseImage: "",
                courseFee: 0,
                instructorId: Number
            },
            content: [],
            dataAddChapter: {
                addChapterId: Number,
                chapterTitle: "",
                isAddChapter: false,
            },
            dataAddContent: {
                chapterId: Number,
                contentTypeId: 1,
                contentTitle: "",
                timeRequiredInSec: Number,
                isOpenForFree: 0,
                contentLink: "",
                isAddContent: false,
            }

        }
    },
    methods: {
        ...mapMutations(['setAdminChange']),
        ...mapGetters(['getAdminChange']),
        adminChange() {
            return this.getAdminChange;
        },
        getIdsOfChapter(course) {
            this.IdsOfChapter = [];
            for (let i=0; i < course.length; i++) {
                this.IdsOfChapter.push(course[i].chapterId);
            }
        },
        checkAddContentId() {
            for (let i = 0; i < this.IdsOfChapter.length; i++) {
                if (this.dataAddContent.chapterId === this.IdsOfChapter[i]) {
                    return true;
                }
            }
            return false;
        },
        openChapter(evt, nameTab) {
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
            document.getElementById(nameTab).style.display = "block";
            evt.target.classList.add('active');
        },
        changeAccount(id) {
            let accCoin;
            for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].student_id === id) {
                    accCoin = this.accounts[i].coin;
                }
            }
            axios.post(`admin/change/${id}/${accCoin}`, {}, {
                withCredentials: true
            })
        },
        removeAccount(id) {
            axios.delete(`admin/delete/${id}`, {
                withCredentials: true
            })
            .then(res=>{
                alert(res.data.msg);
            });
            setTimeout(() =>{
                axios.get('/admin/accounts', {
                withCredentials: true
            })
                .then(response => {
                    this.accounts = response.data;
                    this.fillArrayChange();
                })
                .catch(e => {
                    this.errors.push(e)
                });

                axios.get('/admin/instructors', {
                withCredentials: true
            })
                .then(response => {
                    this.instructors = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
            },500);
        },
        removeCourse(id) {
            axios.delete(`admin/delete/course/${id}`, {
                withCredentials: true
            })
            .then(res=>{
                alert(res.data.msg);
            });
            setTimeout(() =>{
                axios.get('/admin/courses', {
                withCredentials: true
            })
                .then(response => {
                    this.courses = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },500);
        },
        fillArrayChange() {
            for (let i = 0; i < this.accounts.length; i++) {
                this.changeCoin.push(false);
            }
        },
        openPayment(num) {
            var modal
            if (num === 1) {
                modal = document.getElementById("myModal1");
            } else if (num === 2) {
                modal = document.getElementById("myModal2");
            }

            // alert("hio");
            modal.style.display = "block";
            this.openingPayment = true;
        },
        closePayment(num) {
            var modal
            if (num === 1) {
                modal = document.getElementById("myModal1");
                this.resetCourse();
            } else if (num === 2) {
                modal = document.getElementById("myModal2");
                this.resetAddChapter();
                this.resetAddContent();
            }
            modal.style.display = "none";
            this.openingPayment = false;
        },
        addCourse() {
            if (this.course.courseDescription && this.course.courseTitle && this.course.courseImage && this.course.courseTitle) {
                axios.post('courses/create', this.course, { withCredentials: true })
                .then(res => {
                    alert(res.data.msg);
                    this.setAdminChange("change");
                    this.closePayment(1);
                });
                setTimeout(() =>{
                    axios.get('/admin/courses', {
                withCredentials: true
            })
                .then(response => {
                    this.courses = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },500);
            } else {
                alert("Content of course can't be null");
            }
            
        },
        getChapter(id) {
            axios.get(`/courses/${id}/contents`, {}, {
                withCredentials: true
            })
                .then(response => {
                    this.content = response.data.contents;
                    this.getIdsOfChapter(this.content);
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        addChapter(id) {
            if (this.dataAddChapter.chapterTitle) {
                axios.post(`/course/${id}/create`, this.dataAddChapter, { withCredentials: true })
                .then(res => {
                    alert(res.data.msg);
                    // this.dataAddChapter.chapterTitle = "";
                    // location.reload();

                    this.resetAddChapter();

                });
                setTimeout(() =>{
                    this.getChapter(id);
            },500);
            } else {
                alert("Chapter Title can't be null");
            }
            
        },
        addContents() {
            // alert("ok");
            if (this.dataAddContent.chapterId && this.dataAddContent.contentLink && this.dataAddContent.contentTitle && this.dataAddContent.timeRequiredInSec)
            {
                if (this.checkAddContentId()) {
                    axios.post('/chapter/contents/create', this.dataAddContent, { WithComponent: true })
                .then(res => {
                    alert(res.data.msg);
                    // this.dataAddChapter.chapterTitle = "";
                    this.resetAddContent();
                    // location.reload();
                });
                setTimeout(() =>{
                    this.getChapter(this.dataAddChapter.addChapterId);
            },500);
                } else {
                    alert("This Chapter Id isn't in this course");
                }
                
            } else {
                alert("Chapter Content can't be null");
            }
            
        },
        resetAddContent() {
            this.dataAddContent.chapterId = Number,
                this.dataAddContent.contentTypeId = 1,
                this.dataAddContent.contentTitle = "",
                this.dataAddContent.timeRequiredInSec = Number,
                this.dataAddContent.isOpenForFree = 0,
                this.dataAddContent.contentLink = "",
                this.dataAddContent.isAddContent = false
        },
        resetAddChapter() {
            //    this.dataAddChapter.addChapterId = Number,
            this.dataAddChapter.chapterTitle = "",
                this.dataAddChapter.isAddChapter = false
        },
        getAllInfo() {
            axios.get('/admin/accounts', {
                withCredentials: true
            })
                .then(response => {
                    this.accounts = response.data;
                    this.fillArrayChange();
                })
                .catch(e => {
                    this.errors.push(e)
                })

            axios.get('/admin/courses', {
                withCredentials: true
            })
                .then(response => {
                    this.courses = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })

            axios.get('/admin/instructors', {
                withCredentials: true
            })
                .then(response => {
                    this.instructors = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })

            axios.get('/orders', { withCredentials: true })
                .then(respone => {
                    this.orders = respone.data.orders;
                })
                .catch(e => {
                    this.errors.push(e)
                })

            axios.get('/deposits', { withCredentials: true })
                .then(respone => {
                    this.deposits = respone.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        resetCourse() {
            this.course.courseTitle = "",
                this.course.courseDescription = "",
                this.course.courseImage = "",
                this.course.courseFee = 0,
                this.course.instructorId = Number
        },
    },

    computed: {
        ...mapState(['adminChange'])
    },
    watch: {
        adminChange(newValue) {
            console.log(`miniCartChange changed to ${newValue}`);
            this.getAllInfo();
            // alert('Add successful');
            this.$store.commit('setAdminChange', '');
        }
    },
    created() {
        this.getAllInfo();
    }
}
</script>

<style lang="scss" scoped>
.web-title {
    margin: 20px 0;
    text-align: center;
}

* {
    box-sizing: border-box
}

h1 {
    color: rgb(52, 73, 94);
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 100px;
}

body {
    font-family: "Lato", sans-serif;
}


/* Style the tab */
.tab {
    float: left;
    border: 1px solid #ccc;
    background-color: rgb(52, 73, 94);

    width: 15%;
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

    margin-bottom: 50px;
}

/* Style the buttons inside the tab */
.tab button {
    display: block;
    background-color: inherit;
    color: rgb(230, 230, 230);
    -webkit-text-stroke: 2px inset;
    padding: 22px 16px;
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    font-size: 1.3rem;
    border-bottom: 1px inset black;
    font-weight: 600;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
    color: black;
}

/* Create an active/current "tab button" class */
.tab button.active {
    background-color: rgb(240, 240, 240);
    color: #000;
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
    position: relative;

    #change-coin {
        position: absolute;
        right: 80px;
        top: 60px;
    }

    // td {

    //     .change,
    //     .remove {
    //         background-color: #fff;
    //     }
    // }

}

/* Clear floats after the tab */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
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

td,
th {
    border: 1.5px solid black;
    text-align: left;
    padding: 8px;
    text-align: center;
    //   position: relative;
}

tr:nth-child(even) {
    background-color: rgb(230, 230, 230);
    -webkit-text-stroke: 2px inset;

}

.remove,
.change {
    // background-color: none;
    border: none;
    background: none;
    color: #0000ff;
    text-decoration: underline;

}


.change-coin {
    width: 200px;
}

/* The Modal (background) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    padding-top: 0px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    // float: right;
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

form,
.input-cont {
    background-color: white;
    top: 30%;
    margin: 20px 0;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 30%;
    box-shadow: -0.5rem -0.5rem 1rem rgba($color: #000000, $alpha: 0.1), 0.5rem 0.5rem 1rem rgba($color: #000000, $alpha: 0.1);
    border: 0.1rem solid rgba($color: #000000, $alpha: 0.05);
    padding: 2rem;
    border-radius: 1rem;
    animation: fadeUp 0.4s linear;

    .error {
        position: absolute;
        font-weight: 600;
        color: red;
        font-size: 1.2vw;

    }
}

.info {
    margin: 5px 0;
    font-size: 20px;
    font-weight: 500;
}

.sub {
    margin-bottom: 10px;
    padding: 5px 5px;
    width: 250px;
    border-radius: 5px;
}

.btn {
    margin-top: 20px;
    padding: 10px 25px;
    margin-left: 50%;
    font-size: 20px;
    font-weight: 500;
    border-style: none;
    border-radius: 10px;
    transform: translateX(-50%);
    background-color: rgb(0, 128, 128);
    color: white;

    &:hover {

        margin-top: 20px;
        padding: 10px 25px;
        margin-left: 50%;
        font-size: 20px;
        font-weight: 500;
        border-style: none;
        border-radius: 10px;
        transform: translateX(-50%);
        background-color: rgb(0, 128, 128);
        // transform: scale(1.1);
    }
}</style>
