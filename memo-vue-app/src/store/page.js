import pageServices from "@/services/Pages/page.services";

export default {

    namespaced: true,
    state: {
        postpageData: [],
        mypages: [],
        isModal: null,
        interactionpageModel : null,
        page:1,
        lastpage : null,

    },
    getters: {},
    mutations: {
        UPDATE_IS_MODAL(state) {
            state.isModal = !state.isModal;
        },
        UPDATE_IS_MODAL_INTERACTION(state) {
            state.interactionpageModel = !state.interactionpageModel;
        },
        SET_POST_PAGE_DATA(state, payload) {
            state.postpageData.push(payload);
        },
        SET_PAGE_DATA(state, payload) {
            state.mypages.push(payload);
        },
        UPDATE_POST_PAGE_TO_LIKE(state, payload) {
            state.postpageData.forEach((post) => {
                if (post.id === payload[0]) {
                    if (payload[1] != null) {
                        if(post.interacted.length > 0){
                            post.interacted[0].type = payload[1].type
                        }else {
                            post.interacted.push(payload[1]);
                            post.Interactions ++;
                        }
                    } else {
                        post.interacted = [];
                        post.Interactions --;
                    }
                }
            });
        },
        INCREMENT_PAGE(state){
            state.page++;
        }
    },
    actions: {
        async GET_ALL_PAGES_POSTS({ commit, state }) {
            await pageServices.getAllPagesPosts(state.page).then(
                response => {
                    let result = response.data.data;
                    state.last_page = result.last_page;
                    result.items.forEach((doc) => {
                        if(!state.postpageData.some(post => post.id === doc.id)) {
                            commit("SET_POST_PAGE_DATA", doc);
                        }
                    });
            });
        },

        async GET_NEXT({commit, state, dispatch}){
            commit('INCREMENT_PAGE');
            if(state.page <= state.last_page ) {
                await dispatch("GET_ALL_PAGES_POSTS");
            }else{
                state.page = 1
                await dispatch("GET_ALL_PAGES_POSTS");
            }
            
        },
        
        async UPDATE_POST_PAGE_TO_LIKE({ commit }, data) {
            await commit("UPDATE_POST_PAGE_TO_LIKE", data);
            
        },

        async getmypages({ commit, state }) {
            await pageServices.getAllPages().then(
                response => {
                    let result = response.data.data;
                    state.mypages = [];
                    result.forEach((doc) => {
                        commit("SET_PAGE_DATA", doc);
                    })
                }
            )
        },
    },

};
