<template >
    <div class="res-search">
        <h1 v-if="this.numSearch != 0">{{ this.numSearch + ' ' }} results for "{{ this.keySearch }}"</h1>
        <h1 v-else>No results for "{{ this.keySearch }}"</h1>
        <div class="filter-intro">
            <button id="filter"> Filter</button>
            <button @click="toggleDropDown" id="sort-by-price"> Sort by price
                <img src="../assets/img/drop-down.png" alt="">
                <ul v-if="this.sortShow" id="sort-engine">
                    <li id="z-a">Ascending</li>
                    <li id="a-z">Descending</li>
                </ul>
            </button>
        </div>
        <div class="result">

            <div class="filter">
                Filter is in here
            </div>
            <div class="res-course">
                <ul>
                    <li v-for="res in this.searchResult">
                        <span> {{ res.courseId }}</span>
                        <span>{{ res.courseTitle }}</span>
                        <span>{{ res.courseFee }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
    
<script>

export default {
    name: 'Searching',
    data() {
        return {
            keySearch: "",
            numSearch: 0,
            searchResult: [],
            found: true,
            sortShow: false,
        }
    },
    methods: {
        toggleDropDown() {
            this.sortShow = !this.sortShow;
        },
        selectSort(item) {
            this.selectedSort = item;
            this.sortShow = false;
        },
        async getResultSearch() {
            let id = String(window.location.href.split('/').slice(-1)[0]);
            this.keySearch = id;
            await axios.get(`/searching/${id}`, id, { withCredentials: true })
                .then(response => {
                    this.numSearch = response.data.number;
                    this.searchResult = response.data.result;
                })
                .catch(e => {
                    this.errors.push(e)
                });
            // this.$router.push(`/searching/${this.form.keyw}`);
        }

    },
    watch: {
        '$route'() {
            this.getResultSearch();
        }
    },
    mounted() {
        this.getResultSearch();

    },
    update() {
        this.getResultSearch();
    }
}
</script>
    
<style lang="scss" scoped>
.res-search {
    h1 {}

    .filter-intro {
        #filter {
            margin-right: 20px;
        }
        #sort-by-price {
           
            align-items: center;
            justify-content: center;
            justify-items: center;
            img {
                width: 20px;
            }
            #sort-engine {
                list-style: none;
                #z-a{
                    border: 2px solid black;
                }
                #a-z{

                }
            }
        }
    }

    .result {
        display: flex;

        .filter {}

        .res-course {}
    }

}
</style>
