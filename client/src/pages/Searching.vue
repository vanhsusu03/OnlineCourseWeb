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
                    <div>
                        <input type="radio" id="paid" value="paid" name="fil" v-model="paid" @click="setPaid">
                        <label for="paid">Paid</label>
                    </div>
                    <div>
                        <input type="radio" id="free" value="free" name="fil" v-model="free" @click="setFree">
                        <label for="free">Free</label>
                    </div>
                </div>
            </div>
            <div class="res-course">
                <li v-for="res in this.searchResult" @click.prevent="showCourse(res.courseId)">
                    <div id="img">
                        <span><img :src="res.courseImage" alt=""></span>
                    </div>
                    <div id="content">
                        <div id="title"> {{ res.courseTitle }}</div>
                        <div id="descr">{{ res.courseDescription }}</div>
                        <div id="ins">Created by: <span id="name"> {{ res.instructorFirstName + ' ' + res.instructorLastName
                        }}</span></div>
                        <div id="fee">{{ res.courseFee + ' VND' }}</div>
                    </div>
                </li>
            </div>
        </div>
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
            oldSearchResult: [],
            searchResult: [],
            found: true,
            sortShow: false,
            sortBy: "",
        }
    },
    methods: {
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
            if(!this.isPaid && !this.isFree) {
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
                })
                .catch(e => {
                    this.errors.push(e)
                });
                this.setSort();
        },
        async setFree() {
            this.isFree = true;
            this.isPaid = false;
            let id = String(window.location.href.split('/').slice(-1)[0]);
            await axios.get(`/searching/free/${id}`, {}, { withCredentials: true })
                .then(response => {
                    this.numSearch = response.data.number;
                    this.searchResult = response.data.result;
                })
                .catch(e => {
                    this.errors.push(e)
                });
                this.setSort();
        },
        async showCourse(id) {
            let check = await axios.post(`/course/state/${id}`, {}, { withCredentials: true });
            let states = check.data.msg;
            if (states === 'Unactivated') {
                this.$router.push(`/course/info/${id}`);
            } else if (states === 'Activated') {
                this.$router.push(`/course/detail/${id}`);
            }
        },
        async getResultSearch() {
            let id = String(window.location.href.split('/').slice(-1)[0]);
            this.keySearch = id;
            await axios.get(`/searching/${id}`, { withCredentials: true })
                .then(response => {
                    this.numSearch = response.data.number;
                    this.searchResult = response.data.result;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        },
    },
    watch: {
        '$route'() {
            this.getResultSearch();
        },
        sortBy() {
            this.setSort();
        }
    },
    mounted() {
        this.getResultSearch();
    },

}
</script>
    
<style lang="scss" scoped>
.res-search {
    h1 {
        font-weight: 700;
        font-size: 3rem;
        margin-top: 130px;
        margin-left: 130px;
        margin-bottom: 50px;
    }

    .filter-intro {
        margin-left: 8.5%;
        border-bottom: 1px solid rgb(230, 230, 230);
        padding-bottom: 0.7rem;
        margin-bottom: 40px;

        #filter-head {
            // font-weight: 600;
            font-size: 2.25rem;
            // border: 1px solid black;
            margin-right: 100px;
        }

        #select {
            margin-left: 20px;
            width: 12%;
            margin-right: 20px;
            font-size: 1.2rem;
            border: 2px solid black;

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

                #tag {
                    font-size: 2rem;
                    font-weight: 600;
                }

                label {
                    margin-left: 10px;
                    font-size: 1.5rem;
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

                #fee {
                    font-weight: 600;
                    font-size: 1.2rem;
                }
            }

        }
    }

}
</style>
