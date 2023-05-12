<template>
    <h1 class="web-title">Web Controller</h1>
    <!-- {{ openChapter($event, 1) }} -->

    <div class="tab">
        <button class="tablinks" v-on:click="openChapter($event, 'account')">Accounts Control</button>
        <button class="tablinks" v-on:click="openChapter($event, 'course')">Courses Control</button>
        <button class="tablinks" v-on:click="openChapter($event, 'instructor')">Instructors Control</button>
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
                    <td v-else><input type="number" v-model="account.coin"></td>
                    <td>
                        <button class="change" v-on:click="changeCoin[account.student_id] = !changeCoin[account.student_id]">
                            <div v-if="!changeCoin[account.student_id]">Change Coin</div>
                            <div v-else v-on:click="changeAccount(account.student_id)">Save</div>
                        </button>
                    </td>
                    <td><button class="remove" @click="removeAccount(account.student_id)">Delete</button></td>
                </tr>
            </table>

        </div>

    </div>
    <div class="tabcontent" id="course">
        <div style="display: flex;">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Instrutor</th>
                    <th>Fee</th>
                    <th>Delete</th>
                </tr>
                <tr v-for="course in courses">
                    <td>{{ course.courseId }}</td>
                    <td>{{ course.courseTitle }}</td>
                    <td>{{ course.instructorFirstName }} {{ course.instructorLastName }}</td>
                    <td>{{ course.courseFee }}</td>
                    <td><button class="remove" @click="removeCourse(course.courseId)">Delete</button></td>
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
                    <th>Number of courses</th>
                    <th>Delete</th>
                </tr>
                <tr v-for="account in instructors">
                    <td>{{ account.student_id }}</td>
                    <td>{{ account.first_name }} {{ account.last_name }}</td>
                    <td>{{ account.username }}</td>
                    <td>{{ account.email }}</td>
                    <td class="change-coin" v-if="!changeCoin[account.student_id]">{{ account.coin }}</td>
                    <td v-else><input type="number" v-model="account.coin"></td>
    
                    <td>
                        <button class="change" v-on:click="changeCoin[account.student_id] = !changeCoin[account.student_id]">
                            <div v-if="!changeCoin[account.student_id]">Change Coin</div>
                            <div v-else v-on:click="changeAccount(account.student_id)">Save</div>
                        </button>
                    </td>
                    <td class="num-course">{{ account.numOfStudents }}</td>
                    <td><button class="remove" @click="removeAccount(account.student_id)">Delete</button></td>
                </tr>
            </table>

        </div>
    </div>
    <div class="tabcontent" id="order">
        Hello 3
    </div>
    <div class="clearfix"></div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Admin',
    methods: {
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
            axios.post(`admin/change/${id}/${this.accounts[id - 1].coin}`, {}, {
                withCredentials: true
            })
        },
        removeAccount(id) {
            axios.post(`admin/delete/${id}`, {}, {
                withCredentials: true
            })
        },
        removeCourse(id) {
            axios.post(`admin/delete/course/${id}`, {}, {
                withCredentials: true
            })
        },
        fillArrayChange() {
            for (let i = 0; i < this.accounts.length; i++) {
                this.changeCoin.push(false);
            }
        }
    },
    data() {
        return {
            accounts: [],
            courses: [],
            instructors: [],
            orders: [],
            changeCoin: [],
        }
    },
    created() {
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
    color: rgb(52,73,94);
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
    background-color: #f1f1f1;
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
    color: black;
    padding: 22px 16px;
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    font-size: 1.3rem;
    border-bottom: 1px inset black;
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
    position: relative;

    #change-coin {
        position: absolute;
        right: 80px;
        top: 60px;
    }
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
    background-color: #dddddd;
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
</style>
