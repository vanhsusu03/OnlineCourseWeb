
<template>
<div class="cate">
    <div class="content">
        Categories
        <ul class="subnav">
            <li v-for="item in cates" class="itemfirst">
                <RouterLink :to="{path: '/searching/' + item.name}" class="link">{{ item.name }}</RouterLink>
            </li>
        </ul>
    </div>
    
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Categories',
    data() {
        return {
            cates : [
            ]
        }
    },
    created() {

        axios.get('/categories', {
                    withCredentials: true
                })
                .then(response => {
                    this.cates = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
    }
}
</script>

<style lang="scss" scoped>
.cate {
    position: relative;
    .content {
        position: relative;
        display: block;
        padding-bottom: 15px;
    }
    .subnav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background-color: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        .itemfirst{
            list-style-type: none;
            padding: 5px 0;
            position: relative;
            display: flex;
            .subnavsecond {
                display: none;
                position: absolute;
                margin-left: 2px;
                top: 0;
                left: 100%;
                min-width: 200px;
                background-color: white;
                box-shadow: 0 0 10px rgba(0,0,0,0.2);
                .itemsecond {
                    list-style-type: none;
                    padding: 5px 0;
                    color: black;
                }
            }
        }
        img {
            max-width: 25px;
            position: absolute;
            right: 10px;
        }
    }
    .content:hover {
        .subnav {
            display: block;
        }
        .itemfirst:hover {
            color: #0000ff;
            .subnavsecond {
                display: block;
            }
            .itemsecond:hover {
                color: #0000ff;
            }
        }
    }
}
.link {
    text-decoration: none;
    color: #000;
    &:hover {
        transform: scale(1.15); 
        color: rgb(0,128,128);
    }
}
</style>