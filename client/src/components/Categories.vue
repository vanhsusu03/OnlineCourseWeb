Skip to content
Search or jump to…
Pulls
Issues
Codespaces
Marketplace
Explore
 
@minhdatuet 

 GitHub users are now required to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before May 04, 2023, or be restricted from account actions.

vanhsusu03
/
OnlineCourseWeb
Private
Fork your own copy of vanhsusu03/OnlineCourseWeb
Code
Issues
Pull requests
3
Actions
Projects
Security
More
Beta Try the new code view
OnlineCourseWeb/client/src/components/Categories.vue
@minhdatuet
minhdatuet update cart, profile, header
Latest commit 2f1c75e 3 days ago
 History
 1 contributor
118 lines (110 sloc)  2.63 KB
 

<template>
<div class="cate">
    <div class="content">
        Categories
        <ul class="subnav">
            <li v-for="item in cates" class="itemfirst">
                {{ item.name }}
                <img src="../assets/img/right_arrow.png" alt="">
                <ul class="subnavsecond">
                    <li v-for="i in item.data" class="itemsecond">
                        {{ i }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    
</div>
</template>

<script>
export default {
    name: 'Categories',
    data() {
        return {
            cates : [
                {
                    name: 'Math',
                    data: [
                        'math1',
                        'math2',
                        'math3'
                    ]
                },
                {
                    name: 'Develope',
                    data: [
                        'dev1',
                        'dev2'
                    ]
                },
                {
                    name: 'Music',
                    data: [
                        'music1',
                        'music2'
                    ]
                }
            ]
        }
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
</style>
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
OnlineCourseWeb/Categories.vue at minhdat · vanhsusu03/OnlineCourseWeb