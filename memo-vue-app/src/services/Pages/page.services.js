import authHeader from '../auth-header';
import Api from "@/apis/Api";

const END_POINT = "/pages/v1/";

class PageService {

    getAllPagesPosts(param) {
        return Api.get(END_POINT + 'getpostsfrompages', { headers: authHeader(), params: {page: param} }).then(
            response => {
                return response;
            }
        );
    }

    getAllPages() {
        return Api.get(END_POINT + 'userpages', { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }

    InteractionWithPagePost(id, type) {
        return Api.get(END_POINT + 'interacting/' + id, { headers: authHeader(), params: {type: type} }).then(
            response => {
                return response;
            }
        );
    }

    getInteractionWithPagePost(id, type) {
        return Api.get(END_POINT + 'interactions/' + id, { headers: authHeader(), params: {type: type} }).then(
            response => {
                return response;
            }
        );
    }

    GetPageDetail(id) {
        return Api.get(END_POINT + 'getpagedata/' + id, { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }

    GetPagePosts(id) {
        return Api.get(END_POINT + 'getpostspage/' + id, { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }

    AddPostInPage(id,data) {
        return Api.post(END_POINT + 'addpostinpage/' + id, data, { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }

    AddPage(data, name, category) {
        return Api.post(END_POINT + 'addpage' , data, { headers: authHeader(), params: {name: name, category: category} } ).then(
            response => {
                return response;
            }
        );
    }

    AddPageDetail(id, data) {
        return Api.post(END_POINT + 'addpagedetail/' + id , data, { headers: authHeader() }).then(
            response => {
                return response;
            }
        ).catch((error) => {
            return error.response.data;
        });
    }

    EditePageDetail(id, data) {
        return Api.post(END_POINT + 'editepagedetail/' + id , data, { headers: authHeader() }).then(
            response => {
                return response;
            }
        ).catch((error) => {
            return error.response.data;
        });
    }

    DeletePostInPage(id) {
        return Api.get(END_POINT + 'destroypostinpage/' + id , { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }
}

export default new PageService();