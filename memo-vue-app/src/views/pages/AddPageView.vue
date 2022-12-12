<template>
  <div
    dir="auto"
    class="row m-0 p-0 justify-content-center"
    style="background-color: #f3f3f3; min-height: calc(100vh - 72px) !important"
  >
    <div class="col-lg-2 left">
      <div class="row d-flex align-items-center">
        <div class="col-md-2 left_box_img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="28.616"
            viewBox="0 0 25 28.616"
          >
            <g id="pages-svgrepo-com" transform="translate(0.5)">
              <path
                id="Path_113"
                data-name="Path 113"
                d="M18.769.5H6.115A3.626,3.626,0,0,0,2.5,4.115V20.385A3.626,3.626,0,0,0,6.115,24H18.769a3.626,3.626,0,0,0,3.615-3.615V4.115A3.626,3.626,0,0,0,18.769.5Z"
                transform="translate(1.615 0)"
                fill="#00a79d"
                stroke="#00a79d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
              />
              <path
                id="Path_114"
                data-name="Path 114"
                d="M4.115,2.5A3.626,3.626,0,0,0,.5,6.115V20.577A5.326,5.326,0,0,0,5.923,26H16.769a3.626,3.626,0,0,0,3.615-3.615"
                transform="translate(0 1.615)"
                fill="none"
                stroke="#00a79d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </g>
          </svg>
        </div>
        <div class="col-md-8 offset-lg-2 left_box_info">
          <h5>{{ $t("Information") }}</h5>
        </div>
      </div>
      <form action="">
        <div class="row mt-3">
          <h5>{{ $t("Name") }} :</h5>
          <input type="text" dir="auto" v-model="name" required />
        </div>
        <div class="row mt-3">
          <h5>{{ $t("Category") }} :</h5>
          <input type="text" dir="auto" required v-model="category" />
        </div>
        <div class="row mt-3">
          <h5>{{ $t("Page Cover") }} :</h5>
          <div class="mt-2" v-if="!cover_url">
            <label
              style="cursor: pointer"
              for="upload"
              class="d-flex align-items-center justify-content-center"
            >
              {{ $t("Upload Page Cover") }}
              <font-awesome-icon class="icon ms-2" icon="fas fa-file-upload" />
            </label>
            <input
              type="file"
              id="upload"
              ref="cover"
              @change="onCoverFileChange"
              hidden
              accept="image/*"
            />
          </div>
          <div
            v-else
            class="d-flex justify-content-center mt-2"
            style="cursor: pointer"
            @click="deletephotocover()"
          >
            <button class="btn btn-sm btn-danger">
              {{ $t("delete photo") }}
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <h5>{{ $t("Page Profile") }} :</h5>
          <div class="mt-2" v-if="!profile_url">
            <label
              style="cursor: pointer"
              for="upload1"
              class="d-flex align-items-center justify-content-center"
            >
              {{ $t("Upload Page Profile") }}
              <font-awesome-icon class="icon ms-2" icon="fas fa-file-upload" />
            </label>
            <input
              type="file"
              id="upload1"
              ref="profile"
              @change="onProfileFileChange"
              hidden
              accept="image/*"
            />
          </div>
          <div
            v-else
            class="d-flex justify-content-center mt-2"
            style="cursor: pointer"
            @click="deletephotoprofile()"
          >
            <button class="btn btn-sm btn-danger">
              {{ $t("delete photo") }}
            </button>
          </div>
        </div>
        <div v-if="!loading" class="row mt-3">
          <button
            class="btn btn-success"
            @click.prevent="submit()"
            :disabled="!this.name || !this.category"
            type="submit"
          >
            {{ $t("Create") }}
          </button>
        </div>
        <div
          v-else
          class="row mt-3 pe-5 justify-content-center d-flex align-items-center"
        >
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </form>
    </div>

    <div class="col-lg-10 right">
      <div class="page-media">
        <div dir="auto">
          <img
            class="page-cover"
            v-if="!cover_url"
            src="@/assets/page/pagecover.png"
            alt=""
          />
          <img class="page-cover" v-if="cover_url" :src="cover_url" />
          <img
            class="page-profile"
            v-if="!profile_url"
            src="@/assets/page/pageprofile.png"
            alt=""
          />
          <img
            class="page-profile"
            v-if="profile_url"
            :src="profile_url"
            alt=""
          />
          <div class="info">
            <h1 v-if="!name" class="title">PAGE_NAME</h1>
            <h1 v-else class="title">{{ name }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageServices from "@/services/Pages/page.services";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuid } from "vue-uuid";
export default {
  name: "PageView",

  data() {
    return {
      name: null,
      cover_url: null,
      profile_url: null,
      category: null,
      image_cover: null,
      image_profile: null,
      loading: null,
      datasender: {},
    };
  },

  methods: {
    onCoverFileChange(e) {
      const file = e.target.files[0];
      this.cover_url = URL.createObjectURL(file);
      this.image_cover = this.$refs.cover.files[0];
    },
    onProfileFileChange(e) {
      const file = e.target.files[0];
      this.profile_url = URL.createObjectURL(file);
      this.image_profile = this.$refs.profile.files[0];
    },
    deletephotocover() {
      this.cover_url = null;
      this.image_cover = null;
    },
    deletephotoprofile() {
      this.profile_url = null;
      this.image_profile = null;
    },

    async submit() {
      this.loading = true;
      if (this.cover_url != null) {
        let item = null
        let storage = getStorage();
        let unique_number = this.image_cover.name +  uuid.v4()
        let storageRef = ref(storage, unique_number);
        await uploadBytes(storageRef, this.image_cover).then((snapshot) => {
            
            let meme = snapshot.metadata.contentType.split('/');
            item = {
                "size" : snapshot.metadata.size,
                "media_type" : meme[0],
                "mime_type" : meme[1],
            }
            
        });
        await getDownloadURL(storageRef).then((url) => {
                item.src_url = url;
                item.src_thum = url;
                item.src_icon = url;
            });
            this.datasender.page_cover = item

      }
      if (this.profile_url != null) {
        let storage = getStorage();
        let item1 = null
        let unique_number = this.image_profile.name +  uuid.v4()
        let storageRef = ref(storage, unique_number);
        await uploadBytes(storageRef, this.image_profile).then((snapshot) => {
            
            let meme = snapshot.metadata.contentType.split('/');
            item1 = {
                "size" : snapshot.metadata.size,
                "media_type" : meme[0],
                "mime_type" : meme[1],
            }
            
        });
        await getDownloadURL(storageRef).then((url) => {
                item1.src_url = url;
                item1.src_thum = url;
                item1.src_icon = url;
            });
            this.datasender.page_profile = item1
      }
      await pageServices.AddPage(this.datasender, this.name, this.category).then((response) => {
        this.name = null;
        this.category = null;
        this.loading = null;
        this.datasender = {}
        console.log(response.errorCode);
        this.$router.push({ name: "pages" });
      });
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.left {
  min-height: 100vh;
  padding: 2rem 0 0 2.5rem;
}

.right {

  .page-media {
    width: 100%;
    position: relative;

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
.left:lang(ar) {
  min-height: 100vh;
  padding: 2rem 20px 0px 2.6rem;
}
</style>