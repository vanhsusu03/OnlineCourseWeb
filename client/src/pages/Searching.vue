<template >
    <div class="res-search">
        <h1 v-if="this.numSearch != 0">We found {{ this.numSearch + ' ' }} results for "{{ this.keySearch }}"</h1>
        <h1 v-else>No results for "{{ this.keySearch }}"</h1>
        <div class="filter-intro">
            <span id="filter-head">Filter</span>
            <select id="select" v-model="sortBy">
                <option disabled value="" id="def">Sort by price</option>
                <option>Descending</option>
                <option>Ascending</option>
            </select>
            <span id="clear-filter" @click.prevent="clearFilters"> Clear filter</span>
        </div>
        <div class="result">

            <div class="filter">
                <div class="filter-box">
                    <div id="tag">Price</div>
                    <div class="paid">
                        <input type="radio" id="paid" value="paid" name="fil" v-model="paid" @click="setPaid">
                        <label for="paid">Paid</label>
                    </div>
                    <div class="free">
                        <input type="radio" id="free" value="free" name="fil" v-model="free" @click="setFree">
                        <label for="free">Free</label>
                    </div>
                </div>
            </div>
            <div class="res-course">
                <li v-for="res in this.searchResult" @click.prevent="showCourse(res.courseId);" class="item">
                    <div id="img">
                        <span><img :src="res.courseImage" alt=""></span>
                    </div>
                    <div id="content">
                        <div id="title"> {{ res.courseTitle }}</div>
                        <div id="descr">{{ res.courseDescription }}</div>
                        <div id="ins">Created by: <span id="name"> {{ res.instructorFirstName + ' ' + res.instructorLastName
                        }}</span></div>
                        <div class="fee">
                            <div> {{ res.courseFee }} </div>
                            <div id="image"> <img src="../assets/img/logo.png" alt="" id="img-coin"> </div>
                        </div>
                    </div>
                </li>
            </div>
        </div>
        <div v-if="begin">
            {{ openPage(1) }}
        </div>

        <div v-if="!isCalc">
            {{ calcNumPages() }}
        </div>
        <ul class="listPage">
            <li v-for="page in pages" class="pagelinks" :class="{ active: page.status }"
                v-on:click="scrollToTop(); this.begin = false; openPage(page.value)">
                {{ page.value }}
            </li>
        </ul>
    </div>
</template>
    
<script>
import { mapMutations } from 'vuex';
import axios from "axios";
export default {
    name: 'Searching',
    data() {
        return {
            isPaid: false,
            isFree: false,
            keySearch: "",
            numSearch: 0,
            thisPage: 1,
            limit: 8,
            pages: [
                {
                    value: 1,
                    status: true
                }
            ],
            begin: true,
            isCalc: false,
            oldSearchResult: [],
            searchResult: [],
            found: true,
            sortShow: false,
            sortBy: "",
        }
    },
    methods: {
        ...mapMutations(['scrollToTop']),
        openPage(page) {
            var tabcontent;
            // Get all elements with class="item" and hide them
            tabcontent = document.getElementsByClassName("item");
            let beginGet = this.limit * (page - 1);
            let endGet = (this.limit * page > tabcontent.length ? tabcontent.length : this.limit * page);
            for (let i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i].status = false
            }
            this.pages[page - 1].status = true
            for (let i = beginGet; i < endGet; i++) {
                tabcontent[i].style.display = "flex";
            }
        },
        calcNumPages() {
            let num, tabcontent;
            let len = this.pages.length;
            if (len > 1) { this.pages.splice(1, len - 1); };
            // alert("calc" + len);
            tabcontent = document.getElementsByClassName("item");
            // if (tabcontent.length <= this.limit) {
            //     this.isCalc = true;
            //     return 1;
            // }
            num = tabcontent.length / this.limit + 1;
            let numPages = parseInt(num);
            numPages = numPages == num ? numPages - 1 : numPages;
            if (numPages > 1) {
                this.isCalc = true;
            }
            for (let i = 2; i <= numPages; i++) {
                this.pages.push({
                    value: i,
                    status: false
                })
            }
            // alert(numPages);
            // console.warn(numPages);
            return numPages;
        },
        resetPage() {
            this.isCalc = false;
            this.thisPage = 1;
            this.calcNumPages();
            this.openPage(1);
        },
        sortCoursesByFee(courses, ascending = true) {
            courses.sort(function (courseA, courseB) {
                if (ascending) {
                    return courseA.courseFee - courseB.courseFee;
                } else {
                    return courseB.courseFee - courseA.courseFee;
                }
            });
            return courses;
        },
        setSort() {
            if (this.sortBy === 'Descending') {
                this.searchResult = this.sortCoursesByFee(this.searchResult, false);
            } else if (this.sortBy === 'Ascending') {
                this.searchResult = this.sortCoursesByFee(this.searchResult, true);
            }
        },
        clearFilters() {
            this.sortBy = "";
            if (!this.isPaid && !this.isFree) {
                this.getResultSearch();
            }
            else if (this.isPaid) {
                this.setPaid();
            } else {
                this.setFree();
            }
        },
        async setPaid() {
            this.isPaid = true;
            this.isFree = false;
            let id = String(window.location.href.split('/').slice(-1)[0]);
            await axios.get(`/searching/paid/${id}`, {}, { withCredentials: true })
                .then(response => {

                    this.numSearch = response.data.number;
                    this.searchResult = response.data.result;
                    this.searchResult.filter((item, index) => this.searchResult.indexOf(item) === index);
                })
                .catch(e => {
                    this.errors.push(e)
                });
            this.setSort();
            this.resetPage();
        },
        async setFree() {
            this.isFree = true;
            this.isPaid = false;
            let id = String(window.location.href.split('/').slice(-1)[0]);
            await axios.get(`/searching/free/${id}`, {}, { withCredentials: true })
                .then(response => {
                    this.numSearch = response.data.number;
                    this.searchResult = response.data.result;
                    this.searchResult.filter((item, index) => this.searchResult.indexOf(item) === index);
                })
                .catch(e => {
                    this.errors.push(e)
                });
            this.setSort();
            this.resetPage();
        },
        async showCourse(id) {
            let check = await axios.post(`/course/state/${id}`, {}, { withCredentials: true });
            let states = check.data.msg;
            if (states === 'Unactivated') {
                this.$router.push(`/course/info/${id}`);
            } else if (states === 'Activated') {
                this.$router.push(`/study/${id}`);
            }
        },
        async getResultSearch() {
            let id = String(window.location.href.split('/').slice(-1)[0]);
            this.keySearch = id.replace(/%20/g, ' ');
            await axios.get(`/searching/${id}`, { withCredentials: true })
                .then(response => {
                    this.numSearch = response.data.number;
                    this.searchResult = response.data.result;
                    this.searchResult.filter((item, index) => this.searchResult.indexOf(item) === index);
                })
                .catch(e => {
                    this.errors.push(e)
                });
            this.resetPage();
        },
    },
    watch: {
        '$route'() {
            this.getResultSearch();
            this.resetPage();
        },
        sortBy() {
            this.setSort();
        }
    },
    mounted() {
        this.getResultSearch();
        this.scrollToTop();
    },

}
</script>
    
<style lang="scss" scoped>
.res-search {
    h1 {
        font-weight: 800;
        font-size: 3.5rem;
        margin-top: 130px;
        margin-left: 130px;
        margin-bottom: 50px;
        color: rgb(52, 73, 94);
    }

    .filter-intro {
        margin-left: 8.5%;
        border-bottom: 1px solid rgb(230, 230, 230);
        padding-bottom: 0.7rem;
        margin-bottom: 40px;

        select {

            width: 100%;
            padding: 5px;
            font-size: 16px;
            border-radius: 4px;
            border: 1px solid #ccc;
            appearance: none;
            /* Removes default arrow */
            background-image: linear-gradient(45deg, transparent 50%, #ccc 50%), linear-gradient(135deg, #ccc 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
            /* Adds custom arrow */
            background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), 100% 0;
            background-size: 0 0, 0 0, 0 0;
            /* Adjusts arrow size */
            background-repeat: no-repeat;

            &:hover {
                cursor: pointer;
            }

            &:focus {
                outline: none;
                box-shadow: 0 0 2px 1px #ccc;
            }

            option {
                font-size: 16px;
                padding: 10px;
            }
        }

        #filter-head {
            font-weight: 700;
            font-size: 2rem;
            margin-right: 100px;
        }

        #select {
            margin-left: 20px;
            width: 12%;
            margin-right: 20px;
            font-size: 1.2rem;
            border: 1px solid black;

            // border-radius: 10px;
            // height: 50%;
            #def {}

            option {}
        }

        #clear-filter {
            cursor: pointer;
            font-size: 1.1rem;

            &:hover {
                color: rgb(52, 73, 94);
                font-weight: 600;
            }
        }

    }

    .result {
        display: flex;

        .filter {
            margin-left: 8.5%;
            border-right: 2px solid rgb(220, 220, 220);
            padding-right: 80px;

            .filter-box {

                input[type="radio"] {
                    display: none;
                }

                input[type="radio"]+label:before {
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #ccc;
                    margin-right: 10px;
                    cursor: pointer;
                }

                input[type="radio"]:checked+label:before {
                    background-color: rgb(52, 73, 94);

                }

                input[type="radio"]:focus+label:before {
                    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
                }


                .free {}

                #tag {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 10px;
                }

                label {
                    margin-left: 10px;
                    font-size: 1.15rem;
                    color: rgb(52, 73, 94);
                    margin-bottom: 10px;
                }

                #paid {
                    margin-left: 10px;
                }

                #free {
                    margin-left: 10px;
                }

            }
        }

        .res-course {
            // margin-left: 8.5%;
            // border: 2px solid black;
            margin-left: 20px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
            }

            .item {
                display: flex;
            }

            li {
                list-style: none;
                display: flex;
                // border: 2px solid black;
                border-bottom: 1px solid rgb(215, 215, 215);
                padding-bottom: 20px;
                margin-bottom: 20px;
            }

            #content {
                margin-left: 2%;

                #title {
                    font-weight: 600;
                    font-size: 1.25rem;
                    margin-bottom: 10px;
                }

                #descr {
                    font-size: 0.9rem;
                    margin-bottom: 10px;
                }

                #ins {
                    font-size: 0.9rem;

                    #name {
                        font-weight: 500;
                    }

                    margin-bottom: 10px;
                }

                .fee {
                    font-weight: 600;
                    font-size: 1.2rem;
                    display: flex;

                    #image {
                        margin-left: 10px;
                        margin-top: -2px;

                        img {
                            width: 25px;
                            height: auto;
                            border: none;
                        }
                    }

                }
            }

        }
    }

}

.listPage {
    padding: 10px;
    text-align: center;
    list-style: none;

    .active {
        background-color: #ccc;
    }

    li {
        background-color: #ffffffBD;
        padding: 20px;
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;

        &:hover {
            background-color: #ddd;
        }
    }
}
</style>
