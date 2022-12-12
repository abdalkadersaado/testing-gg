<template>
    <div class="col-10 p-0 m-0 right"  >
            
        <div v-if="!loading">
            <PostComponent v-for="(post, index) in postpageData" :key="index" :post="post"/>
            
        </div>
        <div
            v-else
        >
            <SkeltonComponent />
        </div>
        

    </div>
</template>

<script>
import PostComponent from "./PostComponent.vue";
import SkeltonComponent from "@/components/HomeComponent/SkeltonComponent.vue"
import { mapActions, mapState } from 'vuex';
    export default {
    name: "RightPageComponent",
    data() {
        return {
            loading: null
        };
    },
    methods: {
        ...mapActions({
            GET_ALL_PAGES_POSTS: "page/GET_ALL_PAGES_POSTS",
            GET_NEXT: "page/GET_NEXT",
        }),
        async get_all(){
            this.loading = true
            await this.GET_ALL_PAGES_POSTS()
            this.loading = null
        },
        getNextData() {
            window.onscroll = () => {
                let bottomOfWindow = (document.documentElement.offsetHeight) === (document.documentElement.scrollTop + window.innerHeight) ;
                if (bottomOfWindow) {
                    this.GET_NEXT()
                }
            }
      }
    },
    created() {
        this.get_all();
        // console.log(this.postpageData)
    },
    computed: {
        ...mapState(('page'), {
            postpageData: "postpageData",
            isModal:  "isModal",
        }),
    },
    components: { PostComponent, SkeltonComponent },
    mounted() {
      this.getNextData();
    },
}
</script>


<style lang="scss" scoped>
    .right {
        padding: 1rem 0 1rem 2rem !important;
        // position: relative;
        // overflow:auto;
        // position: fixed;
        // top: 5%;
        // right: 0;
        // bottom: 0;
        // width: 83%;
        .page-media {
            width: 100%;
            position: relative;
            //height: 300px;
            

            .page-cover {
                width: 100%;
                object-fit: cover;
                height: 300px !important;
                border-radius: 10px !important;
            }

            .page-profile {
                position: absolute;
                top: 250px;
                right: 50px;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                object-fit: cover;
                z-index: 999;
            }

            .title {
                font-style: italic;
            }
        }
    }

    @media screen and (max-width: 992px) {
        .right {
            padding: 2rem 0.5rem 0 0.5rem !important;
            position: relative;
            overflow:auto;
            position: fixed;
            top: 5%;
            right: 0;
            bottom: 0;
            width: 100% !important;

    }
    }

    @media screen and (max-width: 300px) {
        .right {
            padding: 2rem 0.5rem 0 0.5rem !important;
            position: relative;
            overflow:auto;
            position: fixed;
            top: 5%;
            right: 0;
            bottom: 0;
            width: 100% !important;

        .page-media {
            width: 100%;
            position: relative;
            //height: 300px;
            

            .page-cover {
                width: 100%;
                object-fit: cover;
                height: 300px !important;
                border-radius: 10px !important;
            }

            .page-profile {
                position: absolute;
                top: 250px;
                right: 20px !important;
                width: 70px !important;
                height: 70px !important;
                border-radius: 50%;
                object-fit: cover;
                z-index: 999;
            }

            .title {
                font-style: italic;
            }
        }
    }
    }
</style>
    