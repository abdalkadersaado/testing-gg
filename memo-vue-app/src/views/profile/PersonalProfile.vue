<template>
  <!-- profile -->
  <div class="profile-container">
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              {{ $t(`Update Profile's Information`) }}
            </h5>
            <div class="close-dir">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div class="modal-body">
            <form class="p-3">
              <div class="mt-3">
                <label for="first_name" class="d-flex align-items-center">
                  {{ $t("First Name") }}
                </label>
                <div class="vcomments__add-block">
                  <input
                    dir="auto"
                    class="vcomments__add-input"
                    id="first_name"
                    :placeholder="$t('First Name')"
                    type="text"
                    :value="auth_user_info.first_name"
                    @input="form_update.first_name = $event.target.value"
                  />
                </div>
              </div>

              <div class="mt-3">
                <label for="middle_name" class="d-flex align-items-center">
                  {{ $t("Middle Name") }}
                </label>
                <div class="vcomments__add-block">
                  <input
                    dir="auto"
                    class="vcomments__add-input"
                    :placeholder="$t('Middle Name')"
                    type="text"
                    id="middle_name"
                    :value="auth_user_info.middle_name"
                    @input="form_update.middle_name = $event.target.value"
                  />
                </div>
              </div>
              <div class="mt-3">
                <label for="last_name" class="d-flex align-items-center">
                  {{ $t("Last Name") }}
                </label>
                <div class="vcomments__add-block">
                  <input
                    dir="auto"
                    class="vcomments__add-input"
                    :placeholder="$t('Last Name')"
                    type="text"
                    id="last_name"
                    :value="auth_user_info.last_name"
                    @input="form_update.last_name = $event.target.value"
                  />
                </div>
              </div>

              <div class="row mt-3">
                <button
                  v-if="!loading_update"
                  class="btn btn-lg btn-light w-100 text-dark fw-bold"
                  @click.prevent="update_profile()"
                  type="submit"
                >
                  {{ $t("Save Updating") }}
                </button>

                <button
                  v-else
                  class="btn btn-lg btn-light w-100 text-dark fw-bold d-flex align-items-center justify-content-center"
                  type="submit"
                >
                  Loading ...
                  <div class="spinner-border text-dark ms-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="cover-profile">
      <img
        v-if="this.auth_user_info.has_media_cover === false"
        class="cover-img"
        src="@/assets/cover/images.jpg"
        alt="User Profile Image"
      />
      <img
        v-else-if="this.auth_user_info.media[0].collection_name === 'cover'"
        class="cover-img"
        :src="this.auth_user_info.media[0].src_url"
        alt="Cover Profile Image"
      />
      <img
        v-else-if="this.auth_user_info.media[1].collection_name === 'cover'"
        class="cover-img"
        :src="this.auth_user_info.media[1].src_url"
        alt="Cover Profile Image"
      />

      <button
        v-if="!loading_cover_image"
        class="btn-edit-cover"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdropCover"
      >
        {{ $t("Edit Cover") }}
      </button>
      <button class="btn-edit-cover" v-else>
        {{ $t("Please Waite ...") }}
      </button>
      <div
        class="modal fade"
        id="staticBackdropCover"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content" dir="auto">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                {{ $t("Update Cover Image") }}
              </h5>
              <div class="close-dir">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="deletepagecover()"
                ></button>
              </div>
            </div>
            <div class="modal-body">
              <div class="mt-3 text-center">
                <label
                  for="uploadcoverimage"
                  class="d-flex align-items-center justify-content-center"
                  style="cursor: pointer; !important"
                >
                  {{ $t("Upload Media") }}
                  <font-awesome-icon class="icon" icon="fas fa-file-upload" />
                </label>
                <input
                  type="file"
                  id="uploadcoverimage"
                  ref="coverfile"
                  @change="uploadCoverFile"
                  hidden
                  style="cursor: pointer; !important"
                  accept=" image/*"
                />
              </div>
              <div class="mt-3 text-center">
                <div
                  v-if="this.cover_image_url != null"
                  style="display: inline-block; position: relative"
                >
                  <button
                    type="button"
                    class="btn-close"
                    :disabled="this.isloading"
                    aria-label="Close"
                    style="position: absolute; top: 2px; right: 2px"
                    @click="deletepagecover()"
                  ></button>
                  <img
                    :src="this.cover_image_url"
                    style="
                      width: 75px;
                      height: 75px;
                      margin: 2px;
                      border: 1px solid #777;
                    "
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button "
                data-bs-dismiss="modal"
                aria-label="Close"
                :disabled="this.cover_image === null"
                @click="UpdateCoverImage()"
                class="btn btn-sm btn-info"
              >
                {{ $t("Save Cover") }}
              </button>
              <!-- <button
                type="button"
                class="btn btn-sm btn-info"
                data-bs-dismiss="modal"
              >
                {{ $t("Close") }}
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-details">
      <div class="pd-left">
        <div class="pd-row" style="position: relative">
          <img
            v-if="this.auth_user_info.has_media_profile === false"
            class="pd-image"
            src="@/assets/img_friends/default1.png"
            alt="Profile image"
          />
          <img
            v-else-if="
              this.auth_user_info.media[0].collection_name === 'profile'
            "
            :src="this.auth_user_info.media[0].src_url"
            class="pd-image"
            alt="personal profile image"
          />
          <img
            v-else-if="
              this.auth_user_info.media[1].collection_name === 'profile'
            "
            :src="this.auth_user_info.media[1].src_url"
            class="pd-image"
            alt="personal profile image"
          />
          <button
            v-if="!loading_profile_image"
            style="
              position: absolute;
              bottom: -20px;
              border: 1px solid #777;
              cursor: pointer;
              font-size: 12px;
              padding: 0 5px;
              background-color: #777;
              color: white;
            "
            class="btn btn_ar"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropProfile"
          >
            {{ $t("Edit Profile") }}
          </button>
          <button
            style="
              position: absolute;
              bottom: -20px;
              border: 1px solid #777;
              cursor: pointer;
              font-size: 12px;
              padding: 0 5px;
              background-color: #777;
              color: white;
            "
            class="btn btn_ar"
            v-else
          >
            {{ $t("Please Waite ...") }}
          </button>
          <div
            class="modal fade"
            id="staticBackdropProfile"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content" dir="auto">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    {{ $t("Update Profile Image") }}
                  </h5>
                  <div class="close-dir">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      @click="deletepageprofile()"
                    ></button>
                  </div>
                </div>
                <div class="modal-body">
                  <div class="mt-3 text-center">
                    <label
                      for="uploadprofileimage"
                      class="d-flex align-items-center justify-content-center"
                      style="cursor: pointer; !important"
                    >
                      {{ $t("Upload Media") }}
                      <font-awesome-icon
                        class="icon"
                        icon="fas fa-file-upload"
                      />
                    </label>
                    <input
                      type="file"
                      id="uploadprofileimage"
                      ref="profilefile"
                      @change="uploadProfileFile"
                      hidden
                      style="cursor: pointer; !important"
                      accept=" image/*"
                    />
                  </div>
                  <div class="mt-3 text-center">
                    <div
                      v-if="this.profile_image_url != null"
                      style="display: inline-block; position: relative"
                    >
                      <button
                        type="button"
                        class="btn-close"
                        :disabled="this.isloading"
                        aria-label="Close"
                        style="position: absolute; top: 2px; right: 2px"
                        @click="deletepageprofile()"
                      ></button>
                      <img
                        :src="this.profile_image_url"
                        style="
                          width: 75px;
                          height: 75px;
                          margin: 2px;
                          border: 1px solid #777;
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    :disabled="this.profile_image === null"
                    @click="UpdateProfileImage()"
                    class="btn btn-sm btn-info"
                  >
                    {{ $t("Save") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>{{ this.auth_user_info.full_name }}</h3>
            <p>{{ this.friends.length }} Friends - 20 mutual</p>
          </div>
        </div>

        <!--  -->
        <div
          class="container"
          v-show="loading_info == null"
          v-if="this.profile_details.length != 0"
        >
          <ul class="tabs-choose">
            <li
              @click="activeTab = '1'"
              :class="[activeTab === '1' ? 'active' : '']"
            >
              {{ $t("Timeline") }}
            </li>
            <span @click="this.a_Get_my_jobs()">
              <li
                @click="activeTab = '2'"
                :class="[activeTab === '2' ? 'active' : '']"
              >
                {{ $t("About") }}
              </li>
            </span>

            <li
              @click="activeTab = '3'"
              :class="[activeTab === '3' ? 'active' : '']"
            >
              {{ $t("Friends") }}
            </li>
            <li
              @click="activeTab = '4'"
              :class="[activeTab === '4' ? 'active' : '']"
            >
              {{ $t("Photos") }}
            </li>
            <li
              @click="activeTab = '5'"
              :class="[activeTab === '5' ? 'active' : '']"
            >
              {{ $t("Videos") }}
            </li>
          </ul>
        </div>
        <!--  -->
      </div>

      <div class="pd-right">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <img src="@/assets/images/edit_mode_icon.png" alt="" />
          {{ $t(`Update Profile's Information`) }}
        </button>

        <button type="button">
          <img src="@/assets/images/add_icon.png" alt="" />
          {{ $t("Add Story") }}
        </button>
        <br />
        <a href=""><img src="@/assets/images/more.png" alt="" /></a>
      </div>
    </div>
    <div class="tabs-content">
      <div class="content-one" v-if="activeTab === '1'">
        <div class="profile-info">
          <div class="info-col">
            <about-profile></about-profile>
            <div class="profile-intro">
              <div class="title-box">
                <h3>{{ $t("Photos") }}</h3>
                <a href="">{{ $t("All Photos") }}</a>
              </div>

              <div class="photo-box">
                <div><img src="@/assets/cover/2.jpg" alt="" /></div>
                <div><img src="@/assets/cover/2.jpg" alt="" /></div>
                <div><img src="@/assets/cover/2.jpg" alt="" /></div>
                <div><img src="@/assets/cover/2.jpg" alt="" /></div>
                <div><img src="@/assets/cover/2.jpg" alt="" /></div>
                <div><img src="@/assets/cover/2.jpg" alt="" /></div>
              </div>
            </div>
            <friends-component></friends-component>
          </div>

          <div class="post-col">
            <div class="write-post-container">
              <!-- Start Modal -->
              <div class="modal-vue-post">
                <!-- button show -->

                <!-- overlay -->
                <div
                  class="overlay-post"
                  v-if="showModal"
                  @click="showModal = false"
                ></div>

                <!-- modal -->
                <div class="modal-post" v-if="showModal">
                  <form class="p-3">
                    <div class="d-flex justify-content-between">
                      <h3>{{ $t("Add New Post") }}</h3>
                      <button class="close" @click="showModal = false">
                        x
                      </button>
                    </div>
                    <div class="user-profile">
                      <img
                        v-if="!auth_user_info.media[0]"
                        class="pd-image"
                        src="@/assets/img_friends/default1.png"
                        alt="Card image"
                      />
                      <img
                        v-else
                        :src="this.auth_user_info.media[0].src_url"
                        class="pd-image"
                        alt="personal profile image"
                      />
                      <div>
                        <p>
                          {{ auth_user_info.first_name }}
                          {{ auth_user_info.last_name }}
                        </p>
                        <small
                          >{{ $t("public") }} <i class="fas fa-caret-down"></i
                        ></small>
                      </div>
                    </div>

                    <form class="p-3">
                      <textarea
                        class="vcomments__add-input ar_vcomment"
                        v-model="content"
                        name="content"
                        id=""
                        cols="30"
                        rows="10"
                        :placeholder="$t(`what are you thinking about?`)"
                      ></textarea>
                      <div class="mt-3 text-center">
                        <label
                          for="upload"
                          class="d-flex align-items-center justify-content-center"
                        >
                          {{ $t("Upload Media") }}
                          <font-awesome-icon
                            class="icon"
                            icon="fas fa-file-upload"
                          />
                        </label>
                        <input
                          type="file"
                          id="upload"
                          ref="file"
                          @change="uploadFile"
                          hidden
                          accept="video/*, image/*"
                          multiple
                        />
                      </div>
                      <div class="mt-3 text-center">
                        <div
                          v-for="(img, index) in postsmedia"
                          :key="index"
                          style="display: inline-block; position: relative"
                        >
                          <button
                            type="button"
                            class="btn-close"
                            :disabled="this.isloading"
                            aria-label="Close"
                            style="position: absolute; top: 2px; right: 2px"
                            @click="deleteitem(index)"
                          ></button>
                          <img
                            v-if="img.type.includes('image')"
                            :src="img.url"
                            style="
                              width: 75px;
                              height: 75px;
                              margin: 2px;
                              border: 1px solid #777;
                            "
                          />
                          <video
                            v-if="img.type.includes('video')"
                            :src="img.url"
                            style="
                              vertical-align: middle;
                              margin: 2px;
                              width: 75px;
                              height: 75px;
                              border: 1px solid #777;
                            "
                          ></video>
                        </div>
                      </div>
                    </form>

                    <!-- <textarea
                      dir="auto"
                      class="vcomments__add-input ar_vcomment"
                      :placeholder="$t(`what are you thinking about?`)"
                      v-model="content"
                      @input="resize()"
                      ref="textarea"
                    ></textarea>
                    <div class="mt-3 text-center">
                      <label
                        for="upload"
                        class="d-flex align-items-center justify-content-center"
                      >
                        {{ $t("Upload Media") }}
                        <font-awesome-icon
                          class="icon"
                          icon="fas fa-file-upload"
                        />
                      </label>
                      <input
                        type="file"
                        id="upload"
                        ref="file"
                        @change="uploadFile"
                        hidden
                        accept="video/*, image/*"
                        multiple
                      />
                    </div> -->
                    <div class="row mt-3">
                      <button
                        v-if="!isloading"
                        class="btn btn-lg btn-light w-100 text-dark fw-bold"
                        @click.prevent="submitFile"
                        :disabled="!this.content && this.media.length <= 0"
                        type="submit"
                      >
                        {{ $t("Add Post") }}
                      </button>

                      <button
                        v-else
                        class="btn btn-lg btn-light w-100 text-dark fw-bold d-flex align-items-center justify-content-center"
                        type="submit"
                      >
                        {{ $t("Loading ...") }}
                        <div
                          class="spinner-border text-dark ms-2"
                          role="status"
                        >
                          <span class="visually-hidden">{{
                            $t("Loading ...")
                          }}</span>
                        </div>
                      </button>
                      <button class="btn" @click="this.showModal = false">
                        {{ $t("Cancel") }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <!-- End Modal -->
              <div class="user-profile">
                <img
                  v-if="this.auth_user_info.has_media_profile === false"
                  class="pd-image"
                  src="@/assets/img_friends/default1.png"
                  alt="Profile image"
                />
                <img
                  v-else-if="
                    this.auth_user_info.media[0].collection_name === 'profile'
                  "
                  :src="this.auth_user_info.media[0].src_url"
                  class="pd-image"
                  alt="personal profile image"
                />
                <img
                  v-else-if="
                    this.auth_user_info.media[1].collection_name === 'profile'
                  "
                  :src="this.auth_user_info.media[1].src_url"
                  class="pd-image"
                  alt="personal profile image"
                />
                <div>
                  <p>{{ auth_user_info.full_name }}</p>
                  <small
                    >{{ $t("public") }} <i class="fas fa-caret-down"></i
                  ></small>
                </div>
              </div>
              <div class="post-input-container">
                <form @click.prevent="showModal = true">
                  <textarea
                    rows="3"
                    :placeholder="$t(`what's on your mind?`)"
                    v-model="content"
                  ></textarea>
                </form>

                <!-- <div class="add-post-links">
              <a href="#"
                ><img src="@/assets/images/live-video.png" alt="" />Live
                video</a
              >
              <a href=""
                ><img src="@/assets/images/photo.png" alt="" />Photo/Video</a
              >
              <a href=""
                ><img
                  src="@/assets/images/feeling.png"
                  alt=""
                />Feeling/Activity</a
              >
            </div> -->
              </div>
            </div>
            <div class="write-post-container">
              <div v-if="!loading_post">
                <div v-for="(post, index) in my_post" :key="index">
                  <PostComponent :post="post"></PostComponent>
                </div>
              </div>
              <div v-else>
                <skelton-post-profile></skelton-post-profile>
              </div>
              <div v-show="!my_post.length" class="text-center">
                {{ $t("No Found Any Post Yet") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-two" v-if="activeTab === '2'">
        <div class="profile-info">
          <div class="info-col">
            <div class="profile-intro">
              <h3>{{ $t("About") }}</h3>
              <div class="container-sidebar">
                <ul class="tabs-choose">
                  <li
                    @click="activeTabSidebar = '1'"
                    :class="[activeTabSidebar === '1' ? 'active' : '']"
                  >
                    {{ $t("Biography") }} - {{ $t("Location") }}
                  </li>
                  <li
                    @click="activeTabSidebar = '2'"
                    :class="[activeTabSidebar === '2' ? 'active' : '']"
                  >
                    {{ $t("Job") }}
                  </li>
                  <div @click="a_get_my_studies()">
                    <li
                      @click="activeTabSidebar = '3'"
                      :class="[activeTabSidebar === '3' ? 'active' : '']"
                    >
                      {{ $t("Study") }}
                    </li>
                  </div>
                  <li
                    @click="activeTabSidebar = '4'"
                    :class="[activeTabSidebar === '4' ? 'active' : '']"
                  >
                    {{ $t("Relationships") }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="post-col">
            <div class="tabs-content">
              <div class="content-job" v-if="activeTabSidebar === '2'">
                <JobsComponent></JobsComponent>
              </div>
              <div class="content-study" v-if="activeTabSidebar === '3'">
                <StudiesComponent></StudiesComponent>
              </div>
              <div
                class="content-biography-location"
                v-if="activeTabSidebar === '1'"
              >
                <StaticDetails></StaticDetails>
              </div>
              <div
                class="content-relationships"
                v-if="activeTabSidebar === '4'"
              >
                <div class="write-post-container">
                  {{ $t("Relationships") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-friends" v-if="activeTab === '3'">
        <friends-tab></friends-tab>
      </div>
      <div class="content-photos" v-if="activeTab === '4'">
        {{ $t("Photos") }}
      </div>
      <div class="content-videos" v-if="activeTab === '5'">
        {{ $t("Videos") }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import FriendsComponent from "@/components/ProfileComponent/FriendsComponent.vue";
import AboutProfile from "@/components/ProfileComponent/AboutProfile.vue";
import FriendsTab from "@/components/ProfileComponent/FriendsTab.vue";
import Helpers from "@/services/GlobalServices/Helpers";
import PostComponent from "@/components/ProfileComponent/PostComponent.vue";
import ProfileService from "@/services/Profile/ProfileService";
import SkeltonPostProfile from "@/components/ProfileComponent/skelton/SkeltonPostProfile.vue";
import postServices from "@/services/HomePage/post.services";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuid } from "vue-uuid";
import StaticDetails from "@/components/ProfileComponent/StaticDetails/StaticDetails.vue";
import StudiesComponent from "@/components/ProfileComponent/studies/StudiesComponent.vue";
import JobsComponent from "@/components/ProfileComponent/job/JobsComponent.vue";
export default {
  components: {
    FriendsComponent,
    AboutProfile,
    FriendsTab,
    PostComponent,
    SkeltonPostProfile,
    StaticDetails,
    StudiesComponent,
    JobsComponent,
  },
  data() {
    return {
      showModal: false,

      cover: [],
      activeTab: "1",
      activeTabSidebar: "1",
      content: null,
      media: [],
      postsmedia: [],
      datasender: [],
      isloading: false,
      isModalLoading: null,

      cover_image: null,
      loading_cover_image: null,
      cover_image_url: null,
      datasender_image_cover: null,
      loading_profile_image: null,
      profile_image: null,
      profile_image_url: null,
      datasender_image_profile: null,

      form_update: {
        first_name: null,
        middle_name: null,
        last_name: null,
      },
      loading_update: false,
    };
  },
  created() {
    this.Get_my_post();
    this.a_Get_my_jobs();
    this.a_get_my_studies();
  },
  methods: {
    async UpdateProfileImage() {
      this.loading_profile_image = true;
      let storage = getStorage();
      let unique_number1 = this.profile_image.name + uuid.v4();
      let storageRef = ref(storage, unique_number1);
      await uploadBytes(storageRef, this.profile_image)
        .then((snapshot) => {
          let meme = snapshot.metadata.contentType.split("/");
          this.datasender_image_profile = {
            size: snapshot.metadata.size,
            media_type: meme[0],
            mime_type: meme[1],
          };
        })
        .catch((error) => {
          this.showFaild({ message: error.message });
        });

      await getDownloadURL(storageRef).then((url) => {
        this.datasender_image_profile.src_url = url;
        this.datasender_image_profile.src_thum = url;
        this.datasender_image_profile.src_icon = url;
      });
      let raw = JSON.stringify({ media: this.datasender_image_profile });

      try {
        await ProfileService.update_profile_image(raw).then((response) => {
          console.log(response);
          this.datasender_image_profile = null;
          this.profile_image_url = null;
          this.profile_image = null;
          this.loading_profile_image = null;
          this.showSuccess({ message: "Update Profile Image successfully" });
          this.$store.commit("auth/UPDATE_INFO_PROFILE", response.data.data);
        });
      } catch (error) {
        console.log(error);
        this.showFaild({ message: error.message });
        this.loading_profile_image = null;
      }
    },
    deletepageprofile() {
      this.profile_image_url = null;
      this.profile_image = null;
    },
    uploadProfileFile() {
      this.profile_image = this.$refs.profilefile.files[0];
      this.profile_image_url = URL.createObjectURL(
        this.$refs.profilefile.files[0]
      );
    },

    async UpdateCoverImage() {
      this.loading_cover_image = true;
      let storage = getStorage();
      let unique_number1 = this.cover_image.name + uuid.v4();
      let storageRef = ref(storage, unique_number1);
      await uploadBytes(storageRef, this.cover_image)
        .then((snapshot) => {
          let meme = snapshot.metadata.contentType.split("/");
          this.datasender_image_cover = {
            size: snapshot.metadata.size,
            media_type: meme[0],
            mime_type: meme[1],
          };
        })
        .catch((error) => {
          this.showFaild({ message: error.message });
        });

      await getDownloadURL(storageRef).then((url) => {
        this.datasender_image_cover.src_url = url;
        this.datasender_image_cover.src_thum = url;
        this.datasender_image_cover.src_icon = url;
      });
      let raw = JSON.stringify({ media: this.datasender_image_cover });

      try {
        await ProfileService.update_cover_image(raw).then((response) => {
          console.log(response);
          this.datasender_image_cover = null;
          this.cover_image_url = null;
          this.cover_image = null;
          this.loading_cover_image = null;
          this.showSuccess({ message: "Update Cover Image successfully" });
          this.$store.commit("auth/UPDATE_INFO_PROFILE", response.data.data);
        });
      } catch (error) {
        console.log(error);
        this.loading_cover_image = null;
        this.showFaild({ message: error.message });
      }
    },
    deletepagecover() {
      this.cover_image_url = null;
      this.cover_image = null;
    },
    uploadCoverFile() {
      this.cover_image = this.$refs.coverfile.files[0];
      this.cover_image_url = URL.createObjectURL(this.$refs.coverfile.files[0]);
    },
    ...mapActions({
      Get_my_post: "profile/Get_my_post",
      a_Get_my_jobs: "profile/a_Get_my_jobs",
      a_get_my_studies: "profile/a_get_my_studies",
      GET_NEXT: "profile/GET_NEXT",
    }),
    uploadFile() {
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.media.push(this.$refs.file.files[i]);
        this.postsmedia.push({
          type: this.$refs.file.files[i].type,
          url: URL.createObjectURL(this.$refs.file.files[i]),
        });
      }
    },
    deleteitem(index) {
      this.postsmedia.splice(index, 1);
      this.media.splice(index, 1);
    },
    close() {
      (this.content = null), (this.media = []);
      this.postsmedia = [];
    },
    async submitFile() {
      this.isloading = true;
      for (let k = 0; k < this.media.length; k++) {
        let storage = getStorage();
        let unique_number = this.media[k].name + uuid.v4();
        let storageRef = ref(storage, unique_number);
        let item = null;
        await uploadBytes(storageRef, this.media[k]).then((snapshot) => {
          let meme = snapshot.metadata.contentType.split("/");
          item = {
            size: snapshot.metadata.size,
            media_type: meme[0],
            mime_type: meme[1],
          };
          this.datasender.push(item);
        });
        await getDownloadURL(storageRef).then((url) => {
          item.src_url = url;
          item.src_thum = url;
          item.src_icon = url;
        });
      }
      let raw = JSON.stringify({ media: this.datasender });
      await postServices.AddPost(raw, this.content).then(() => {
        this.Get_my_post();
        this.content = null;
        this.media = [];
        this.postsmedia = [];
        this.datasender = [];
        this.isloading = null;
        this.showModal = false;
      });
    },

    format_date(date) {
      return Helpers.format_date(date);
    },
    myFunction: function () {
      if (this.enableDisable) {
        this.enableDisable = false;
      } else {
        this.enableDisable = true;
      }
    },
    change() {
      this.interaction_model = null;
    },
    async update_profile() {
      this.loading_update = true;
      ProfileService.update_profile(this.form_update)
        .then((res) => {
          this.$store.commit("auth/UPDATE_INFO_PROFILE", res.data.data);
          this.loading_update = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resize() {
      let element = this.$refs["textarea"];

      element.style.height = "11px";
      element.style.height = element.scrollHeight + "px";
    },
  },
  notifications: {
    showSuccess: {
      // You can have any name you want instead of 'showSuccess'
      title: "Image",
      message: "Update successfully",
      type: "success",
    },
    showFaild: {
      // You can have any name you want instead of 'showFaild'
      title: "Error",
      message: "Network Error",
      type: "error",
    },
  },

  computed: {
    ...mapGetters({
      my_post: "profile/my_post",
      loading_post: "profile/loading_post",
      my_jobs: "profile/my_jobs",
      my_studies: "profile/my_studies",
      auth_user_info: "auth/auth_user_info",
      friends: "friendships/friends",
      loading_info: "profile/loading_info",
      profile_details: "profile/profile_details",
    }),
    ...mapState("profile", {
      informationModel: "informationModel",
      isModal: "isModal",
    }),
  },
};
</script>
<style lang="scss" scoped>
/* tab's style  */
.create-job {
  color: #0790e7;
  cursor: pointer;
}
.container-sidebar {
  .tabs-choose {
    li {
      display: block;
      padding: 10px 20px;
      background-color: #eee;
      cursor: pointer;
      opacity: 0.3;
      &.active {
        opacity: 1;
      }
    }
  }
  .tabs-content {
    background-color: #eee;
    margin: 0 auto;
    padding: 20px;
  }
}
.container {
  margin: 20px auto;
  // width: 1200px;
  .tabs-choose {
    margin-bottom: 0;
    li {
      display: inline-block;
      padding: 10px 20px;
      background-color: #eee;
      cursor: pointer;
      opacity: 0.3;
      &.active {
        opacity: 1;
      }
    }
  }
  .tabs-content {
    background-color: #eee;
    margin: 0 auto;
    padding: 20px;
  }
}

.links-urls {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  .link {
    padding: 10px 20px;
    display: block;
    background-color: #eee;
    margin-bottom: 10px;
    text-decoration: none;
    color: #777;
  }
}
.post-col ul li {
  list-style: none;
  font-size: 15px;
  margin: 15px 0;
  align-items: center;
}
.post-col ul li img {
  width: 26px;
  margin-right: 10px;
}
/*  */
/* profile page */
.profile-container {
  padding: 20px 15%;
  background: #ddd;
}

.cover-img {
  width: 100%;
  height: 25rem;
  border-radius: 6px;
  margin-bottom: 14px;
}

.profile-details {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pd-row {
  display: flex;
  align-items: flex-start;
}

.pd-image {
  width: 100px;
  margin-right: 20px;
  border-radius: 6px;
}

.pd-row div h3 {
  font-size: 25px;
  font-weight: 600;
  margin: 5px;
}

.pd-row div p {
  font-size: 13px;
  margin: 2px;
}

.pd-row div img {
  width: 25px;
  border-radius: 50%;
  margin-top: 12px;
}

.pd-right button {
  background: #1876f2;
  border: 0;
  outline: 0;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  color: #fff;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
  margin: 2px;
}

.pd-right button img {
  height: 15px;
  margin-right: 10px;
}

.pd-right button:first-child {
  background: #e4e6eb;
  color: #000;
}

.pd-right {
  text-align: right;
}

.pd-right a {
  background: #e4e6eb;
  border-radius: 3px;
  padding: 12px;
  display: inline-flex;
  margin-top: 30px;
}

.pd-right a img {
  width: 20px;
}

.profile-info {
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  margin-top: 20px;
}

.info-col {
  flex-basis: 33%;
}

.post-col {
  flex-basis: 65%;
}

.write-post-container {
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  color: #626262;
  margin-bottom: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
}

.post-input-container {
  padding-left: 55px;
  padding-top: 20px;
}

.post-input-container textarea {
  width: 100%;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ccc;
  background: transparent;
  resize: none;
}
textarea {
  width: 100%;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ccc;
  background: transparent;
  resize: none;
}

.add-post-links {
  display: flex;
  margin-top: 10px;
}

.add-post-links a {
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #626262;
  margin-right: 30px;
  font-size: 13px;
}

.add-post-links a img {
  width: 20px;
  margin-right: 10px;
}

.user-profile img {
  width: 45px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-profile p {
  margin-bottom: -5px;
  font-weight: 500;
  color: #626262;
}

.user-profile small {
  font-size: 12px;
}

.profile-intro {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.profile-intro h3 {
  font-weight: 600;
}

.intro-text {
  text-align: 10px 0;
  font-size: 15px;
}

.intro-text img {
  width: 15px;
  margin-bottom: -3px;
}

.profile-intro hr {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 24px 0;
}

.profile-intro ul li {
  list-style: none;
  font-size: 15px;
  margin: 15px 0;
  display: flex;
  align-items: center;
}

.profile-intro ul li img {
  width: 26px;
  margin-right: 10px;
}

.title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -7px 0px -8px 0px;
}

.title-box a {
  text-decoration: none;
  color: #1876f2;
  font-size: 14px;
}

.photo-box {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10px;
  margin-top: 15px;
}

.photo-box div img {
  width: 100%;
  cursor: pointer;
}

.profile-intro p {
  font-size: 14px;
}

.friends-box {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 15px;
  margin: top 15px;
}

.friends-box div img {
  width: 100%;
  cursor: pointer;
  padding-bottom: 20px;
}

.friends-box div {
  position: relative;
}

.friends-box p {
  position: absolute;
  bottom: -18px;
  left: 0;
}

/* media query for personal profile page */

@media (max-width: 900px) {
  .profile-container {
    padding: 20px 5%;
  }
  .cover-img {
    height: 20rem;
  }
  .profile-details {
    flex-wrap: wrap;
  }

  .pd-right {
    text-align: left;
    margin-top: 15px;
  }
  .pd-right:lang(ar) {
    text-align: right;
    margin-top: 15px;
  }

  .pd-right button {
    margin-left: 10px;
  }

  .pd-right div h3 {
    font-size: 16px;
  }

  .profile-info {
    flex-wrap: wrap;
  }

  .info-col,
  .post-col {
    flex-basis: 100%;
  }
}
@media (max-width: 454px) {
  .pd-right button {
    margin: 3px;
  }
}
@media (max-width: 600px) {
  .pd-row div h3 {
    font-size: 18px;
  }
}

//
.modal-vue-post .overlay-post {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue-post .modal-post {
  position: relative;
  width: 100%;
  z-index: 9999;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 12px;
  height: 75vh;
}
.img-modal {
  width: 60px;
}
.modal-vue-post .close-post {
  position: absolute;
  top: 10px;
  right: 10px;
  background: lightgray;
  border: none;
}

.modal-post form label {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
}
//update
.modal-vue-update .overlay-update {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue-update .modal-update {
  position: relative;
  width: 100%;
  z-index: 9999;
  margin: -150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 12px;
  height: 75vh;
}
.img-modal {
  width: 60px;
}
.modal-vue-update .close-update {
  position: absolute;
  top: 10px;
  right: 10px;
  background: lightgray;
  border: none;
}

.modal-update form label {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
}
.profile-details:lang(ar) {
  direction: rtl;
}

.profile-intro:lang(ar) {
  direction: rtl;
}
.profile-info:lang(ar) {
  // text-align: right;
  direction: rtl;
}
.pd-right:lang(ar) {
  direction: ltr;
}
.modal:lang(ar) {
  direction: rtl;
}
.vcomments__add-input:lang(ar) {
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border: 1px solid #eee;
  padding: 10px 17px 10px 15px;
  border-radius: 40px;
  transition: all 0.2s ease-out;
}
.close-dir:lang(ar) {
  direction: ltr;
}
.pd-row div img:lang(ar) {
  margin: 2px 10px;
}
.pd-row div h3:lang(ar) {
  margin: 2px 10px;
}
.pd-row div p:lang(ar) {
  margin: 2px 10px;
}
.mb-0:lang(ar) {
  margin-right: 5px;
}
.text-muted:lang(ar) {
  margin-right: 10px;
}
.user-profile p:lang(ar) {
  margin-right: 10px;
}
.user-profile small:lang(ar) {
  margin-right: 10px;
}
//
textarea {
  width: 100%;
  height: 150px;
  padding: 2px;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 4px;
  font-family: "Inconsolata", monospace;
  font-size: 1rem;
  color: #000;
}

textarea:focus {
  outline: none;
}

.ar_vcomment:lang(ar) {
  padding: 11px 14px 10px 3px;
  height: 145px;
  resize: none;
}
button.btn-edit-cover {
  position: relative;
  float: right;
  margin: -59px 36px;
  border: 1px;
  border-radius: 7px;
  background: aliceblue;
}
.btn_ar:lang(ar) {
  right: 0;
}
.vcomments {
  $this: &;
  &__add-input {
    box-sizing: border-box;
    width: 100%;
    outline: none;
    border: 1px solid #eee;
    padding: 10px 75px 10px 15px;
    border-radius: 40px;
    transition: all 0.2s ease-out;
    &:focus {
      border-color: #00a79d;
      & + #{$this} {
        &__add-button {
          background: #00a79d;
          color: white;
          transition: all 0.2 ease-in;
        }
      }
    }
  }
  &__add-block {
    margin-top: 15px;
    position: relative;
  }
}
</style>
