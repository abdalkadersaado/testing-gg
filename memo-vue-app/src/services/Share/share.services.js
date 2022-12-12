import authHeader from '../auth-header';
import Api from "@/apis/Api";

const END_POINT = "/share/v1/";

class ShareService {

    //Share personal_post on my profile

    sharePersonalPostOnMyProfile(data) {
            return Api.post(END_POINT + 'share-post-on-timeline', data,  { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }

    sharePersonalPostOnMyPage(data) {
            return Api.post(END_POINT + 'share-post-on-page', data,  { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }

    sharePagePostOnMyProfile(data) {
            return Api.post(END_POINT + 'share-post-page-on-timeline', data,  { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }

    sharePagePostOnMyPage(data) {
            return Api.post(END_POINT + 'share-post-page-on-other-page', data,  { headers: authHeader() }).then(
            response => {
                return response;
            }
        );
    }


}

export default new ShareService();