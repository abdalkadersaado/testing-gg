import storyServices from "@/services/story/story.services";
export default {
    namespaced: true,
    state: {
        stories: [],
        isLoading: true
    },
    getters: {
        User_Stories(state) {
            return state.stories;
        },
        isLoading_status(state) {
            return state.isLoading;
        },
        Get_User(state) {
            if (state.stories[0])
                return state.stories[0].user;
            else return null;
        }
    },
    mutations: {
        SET_USER_STORYIES(state, data) {
            state.stories = data;
            state.isLoading = false;
        },
        Claer_USER_STORIES(state) {
            state.stories = [];
            state.isLoading = true;
        }
    },
    actions: {
        getStories({ commit }, user_id) {
            commit("Claer_USER_STORIES");
            return storyServices.getUserStories(user_id).then(
                response => {
                    console.log(response.data.data);
                    commit("SET_USER_STORYIES", response.data.data)
                }
            )
        }

    }

};