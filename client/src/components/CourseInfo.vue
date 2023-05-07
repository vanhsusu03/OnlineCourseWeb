<!-- When not activated -->
<template>
    <div>
        HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH {{ courseIDShowing }}
        <button v-on:click="getParams()"> CLICK</button>
    </div>
</template>


<script>
import axios from 'axios';
import { mapMutations, mapState, mapGetters } from 'vuex';
import Categories from './Categories.vue';
import MiniCart from './MiniCart.vue';
export default {
    name: 'CourseInfo',
    data() {
        return {
            course: null,
        }
    },
    methods: {
        ...mapGetters(['getCourseIDShowing']),
        //checked OK
        getParams() {
            //Get courseId from URL

            // alert('COURSE ID LA:' + id);
        },
        async getCourseInfo() {
            let id = Number(window.location.href.split('/').slice(-1)[0]);

            axios.get(`/courses/${id}`, { withCredentials: true })
                .then(response => {
                    this.course = response.data.details;
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    },
    computed: {
        ...mapState(['courseIDShowing'])
    },
    mounted() {
        this.getCourseInfo();
    },
}


</script>



<style lang="scss"></style>