<template>
    <div class="col-lg-2">
        <div class="mobile">
            <button class="btn btn-success" style="border-radius: 50%;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <font-awesome-icon icon="plus" />
            </button>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28.616" viewBox="0 0 25 28.616">
                        <g id="pages-svgrepo-com" transform="translate(0.5)">
                            <path id="Path_113" data-name="Path 113" d="M18.769.5H6.115A3.626,3.626,0,0,0,2.5,4.115V20.385A3.626,3.626,0,0,0,6.115,24H18.769a3.626,3.626,0,0,0,3.615-3.615V4.115A3.626,3.626,0,0,0,18.769.5Z" transform="translate(1.615 0)" fill="#00a79d" stroke="#00a79d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Path_114" data-name="Path 114" d="M4.115,2.5A3.626,3.626,0,0,0,.5,6.115V20.577A5.326,5.326,0,0,0,5.923,26H16.769a3.626,3.626,0,0,0,3.615-3.615" transform="translate(0 1.615)" fill="none" stroke="#00a79d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                    </svg>
                    <h5 class="offcanvas-title fw-bold" id="offcanvasExampleLabel">{{ $t("Page Managment") }}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div  class="d-flex mt-5 justify-content-center">
                    
                    <button v-if="page_details != null" @click="editepagedetail()" class="text-center btn btn-success">{{ $t("edit page detail") }}</button>
                    <button v-else-if="page_details === null" @click="addpagedetail()" class="text-center btn btn-primary">{{ $t("add page detail") }}</button>
                </div>

                <PageHourDetail v-if="!edit && (page_details != null)" :detail="page_details"/>
                <EditePageDetail v-if="edit"  :detail="page_details" v-on:editepagedetail="editepagedetail()" :id="id"/>
                <AddPageDetail v-if="add"   v-on:addpagedetail="addpagedetail()" :id="id"/>
                </div>
        </div>
        <div class="  left" >
            <div class="row align-items-center">
                <div class="col-md-2 left_box_img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28.616" viewBox="0 0 25 28.616">
                        <g id="pages-svgrepo-com" transform="translate(0.5)">
                            <path id="Path_113" data-name="Path 113" d="M18.769.5H6.115A3.626,3.626,0,0,0,2.5,4.115V20.385A3.626,3.626,0,0,0,6.115,24H18.769a3.626,3.626,0,0,0,3.615-3.615V4.115A3.626,3.626,0,0,0,18.769.5Z" transform="translate(1.615 0)" fill="#00a79d" stroke="#00a79d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Path_114" data-name="Path 114" d="M4.115,2.5A3.626,3.626,0,0,0,.5,6.115V20.577A5.326,5.326,0,0,0,5.923,26H16.769a3.626,3.626,0,0,0,3.615-3.615" transform="translate(0 1.615)" fill="none" stroke="#00a79d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                    </svg>

                </div>
                <div class="col-md-8 offset-lg-2  left_box_info ">
                    <p class="fw-bold">{{ $t("Page Managment") }}</p>
                </div>
            </div>

            <div  class="d-flex mt-5 justify-content-center">
                
                <button v-if="page_details != null" @click="editepagedetail()" class="text-center btn btn-success">{{ $t("edit page detail") }}</button>
                <button v-else-if="page_details === null" @click="addpagedetail()" class="text-center btn btn-primary">{{ $t("add page detail") }}</button>
            </div>

            <PageHourDetail v-if="!edit && (page_details != null)" :detail="page_details"/>
            <EditePageDetail v-if="edit"  :detail="page_details" v-on:editepagedetail="editepagedetail()" :id="id"/>
            <AddPageDetail v-if="add"   v-on:addpagedetail="addpagedetail()"  :id="id"/>
        


        </div>
    </div>
</template>

<script>
import PageHourDetail from "./PageHourDetail.vue"
import EditePageDetail from "./EditePageDetail.vue"
import AddPageDetail from "./AddPageDetail.vue"
import pageServices from "@/services/Pages/page.services"
export default {
    name: "LeftPageComponent",
    data() {
        return {
            page_details: [],
            edit: null,
            add: null,
            
        };
    },
    props: ["id"],
    methods: {
        async getpagedetail(id) {
            await pageServices.GetPageDetail(id).then(
                response => {
                    this.page_details = response.data.data.page_details
                }
            )
        },
        editepagedetail() {
            this.edit = ! this.edit
        },
        addpagedetail(){
            this.add = ! this.add
        }
    },
    computed: {},
    created() {
        this.getpagedetail(this.id);
    },
    components: { PageHourDetail, EditePageDetail, AddPageDetail }
}
</script>

<style lang="scss" scoped>
    .left {
        min-height: 100vh;
        padding: 4rem 1rem !important;

        .left_box_info {
            p {
                font-size: 20px !important;
            }
        }
    
    }

    .mobile {
        display: none !important;
    }
    

    @media screen and (max-width: 992px) {
        .left {
            display: none !important;
        }
        .mobile {
            display: block !important;
            position: fixed !important;
            z-index: 99999 !important;
            top: 15px;
            left: 43%;
            

            #offcanvasExample {
            
                width: 100% !important;
                position: fixed;
                z-index: 222232 !important;
                top: 0px !important;
                left: 0 !important;
                padding: 1rem !important;
                overflow: scroll !important;
                padding-bottom: 2rem !important;

                
            }
        }
    }

    @media screen and (min-width: 1280px) and (max-width: 1600px){
        .left {
            background-color:#F3F3F3; 
            min-height: 100vh;
            padding: 2rem 1rem;

            .left_box {
                margin-bottom: 2rem;

                .left_box_img {
                    text-align: center;
                }

                .left_box_info {
                    margin-left: 2.1rem;
                    width: 60% !important;
                    font-size: 15px;
                }
            }
        }
    }

    @media screen and (min-width: 993px) and (max-width: 1279px){
        .left {
            // background-color:#F3F3F3; 
            min-height: 100vh;
            padding: 2rem 1rem;

            .left_box_info {
                p {
                    font-size: 15px !important;
                }
            }

            button {
                font-size: 13px !important;
            }
            
        }
    }



</style>
    
