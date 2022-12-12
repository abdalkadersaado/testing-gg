<template>
    <div class="col-lg-10  right" >
        <div v-if="pagedetail != null" class="page-media">
            <div  >
                <img class="page-cover" v-if="pagedetail.has_media_cover === false" src="@/assets/img_friends/default1.png" alt="">
                <img class="page-cover" v-else-if="pagedetail.media[0].collection_name === 'cover'" :src="pagedetail.media[0].src_url" alt="">
                <img class="page-cover" v-else-if="pagedetail.media[1].collection_name === 'cover'" :src="pagedetail.media[1].src_url" alt="">
            
                <img class="page-profile" v-if="pagedetail.has_media_profile === false" src="@/assets/img_friends/default1.png" alt="">
                <img class="page-profile" v-else-if="pagedetail.media[0].collection_name === 'profile'" :src="pagedetail.media[0].src_url" alt="">
                <img class="page-profile" v-else-if="pagedetail.media[1].collection_name === 'profile'" :src="pagedetail.media[1].src_url" alt="">
                
                <div class="info" >
                    <h1 class="title">{{ pagedetail.name }}</h1>
                </div>
            </div>
            <div class="mt-2 ps-3">
                <AddpostComponent :img="pagedetail.media" :id="id" v-on:getpostsinpage="getpostsinpage(id)"/>
            </div>
            <div v-if="loadingposts">
                <PostComponent class="ps-3"  v-for="(post, index) in pageposts" :key="index" :pagedetail="pagedetail" :post="post" v-on:getpostsinpage="getpostsinpage(id)"/>
            </div>
            <div
                v-else
                
            >
                <skelton-component />
            </div>
        </div>

        
      
        <div
            v-else
            class="col-md-12 col-lg-8 center_loading pe-5 pt-5 justify-content-center d-flex align-items-center"
        >
            <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        

    </div>
</template>

<script>
import AddpostComponent from "@/components/PageComponent/MyPageComponent/AddpostComponent.vue"
import PostComponent from "./PostComponent.vue";
import SkeltonComponent from '@/components/HomeComponent/SkeltonComponent.vue';
import pageServices from "@/services/Pages/page.services";
    export default {
    name: "RightPageComponent",
    props:["id"],
    data() {
        return {
            pagedetail: null,
            pageposts: [],
            loadingposts: null,
        };
    },
    methods: {
        async getpagedetail(id) {
            await pageServices.GetPageDetail(id).then(
                response => {
                    this.pagedetail = response.data.data
                }
            )
        },
        async getpostsinpage(id) {
            await pageServices.GetPagePosts(id).then(
                response => {
                    this.pageposts = []
                    response.data.data.items.forEach((doc)=> {
                        this.pageposts.push(doc)
                    })
                    this.loadingposts = true
                    
                }
            )
        }
    },
    created() {
        this.getpagedetail(this.id)
        this.getpostsinpage(this.id)
        
    },
    computed: {

    },
    components: { AddpostComponent , PostComponent, SkeltonComponent }
}
</script>

<style lang="scss" scoped>
    .right {
        padding: 2rem 0.5rem 0 2.5rem !important;
        min-height: 100vh !important;
        // position: relative;
        // overflow:auto;
        // position: fixed;
        // top: 5%;
        // right: 0;
        // bottom: 0;
        // width: 83%;
        // min-height: 100vh !important;
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
            width: 100% !important;

        }
    }

    @media screen and (max-width: 300px) {
        .right {
            padding: 2rem 0.5rem 0 0.5rem !important;
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
    .page-profile:lang(ar){
        direction: ltr;
    }
    .right .page-media .page-profile:lang(ar){
    right: 80%;
    position: absolute;
    top: 250px;
    width: 100px;
    height: 90px;
    border-radius: 50%;
}
</style>
    
