<template>
  <div class="div">
    <div class="row mb-3 me-0 bg-white">
      <div class="card card_post">
        <div
          class="card-header bg-white border-bottom-0 d-flex justify-content-between"
        >
          <div class="d-flex align-items-center">
            <div>
            
              <img
            v-if="post.user.has_media_profile === false"
            class="pd-image"
            src="@/assets/img_friends/default1.png"
            alt="Profile image"
          />
          <img
            v-else-if = "post.user.media[0].collection_name === 'profile'"
            :src="post.user.media[0].src_url"
            class="pd-image"
            alt="personal profile image"
          />
          <img
            v-else-if = "post.user.media[1].collection_name === 'profile'"
            :src="post.user.media[1].src_url"
            class="pd-image"
            alt="personal profile image"
          />
            </div>
            <div class="ms-3">
              <p class="mb-0">
                <router-link
                  class="router-link-to-profile"
                  :to="{
                    name: 'profile',
                    params: { id: post.user.id },
                  }"
                  >{{ post.user.first_name }}
                  {{ post.user.last_name }}</router-link
                >
              </p>
              <small class="text-muted" dir="auto">
                {{ format_date(post.created_at) }}
              </small>
            </div>
          </div>
          <div class="d-flex align-items-center right">
            <div class="me-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 5 5"
              >
                <circle
                  id="Ellipse_181"
                  data-name="Ellipse 181"
                  cx="2.5"
                  cy="2.5"
                  r="2.5"
                  fill="#a5a5a5"
                />
              </svg>
            </div>

            <div class="me-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 5 5"
              >
                <circle
                  id="Ellipse_181"
                  data-name="Ellipse 181"
                  cx="2.5"
                  cy="2.5"
                  r="2.5"
                  fill="#a5a5a5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 5 5"
              >
                <circle
                  id="Ellipse_181"
                  data-name="Ellipse 181"
                  cx="2.5"
                  cy="2.5"
                  r="2.5"
                  fill="#a5a5a5"
                />
              </svg>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div style="cursor: pointer" @click="delete_post(post.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.147"
                height="15.147"
                viewBox="0 0 15.147 15.147"
              >
                <g
                  id="Group_184"
                  data-name="Group 184"
                  transform="translate(7.573 -5.632) rotate(45)"
                >
                  <rect
                    id="Rectangle_151"
                    data-name="Rectangle 151"
                    width="18.675"
                    height="2.746"
                    rx="1.373"
                    transform="translate(0 7.964)"
                    fill="#a5a5a5"
                  />
                  <rect
                    id="Rectangle_152"
                    data-name="Rectangle 152"
                    width="18.675"
                    height="2.746"
                    rx="1.373"
                    transform="translate(10.71 0) rotate(90)"
                    fill="#a5a5a5"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div class="card-body" dir="auto">
          <p v-if="post.content" class="card-text">
            {{ post.content }}
          </p>
          <div v-if="post.has_media" class="media_container">
            <div class="media_one" v-if="post.media.length === 1">
              <img
                v-if="post.media[0].media_type.includes('Image')"
                :src="post.media[0].src_url"
                alt=""
              />
              <video v-else controls :src="post.media[0].src_url"></video>
            </div>
            <div
              class="media_two d-flex justify-content-between align-items-center"
              v-if="post.media.length === 2"
            >
              <div class="media_two_box">
                <img
                  v-if="post.media[0].media_type.includes('Image')"
                  :src="post.media[0].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[0].src_url"></video>
              </div>
              <div class="media_two_box">
                <img
                  v-if="post.media[1].media_type.includes('Image')"
                  :src="post.media[1].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[1].src_url"></video>
              </div>
            </div>
            <div class="media_three" v-if="post.media.length === 3">
              <div class="media_three_box">
                <img
                  v-if="post.media[0].media_type.includes('Image')"
                  :src="post.media[0].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[0].src_url"></video>
              </div>
              <div class="media_three_box">
                <img
                  v-if="post.media[1].media_type.includes('Image')"
                  :src="post.media[1].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[1].src_url"></video>
              </div>
              <div class="media_three_box_under">
                <img
                  v-if="post.media[2].media_type.includes('Image')"
                  :src="post.media[2].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[2].src_url"></video>
              </div>
            </div>
            <div class="media_four" v-if="post.media.length === 4">
              <div class="media_four_box">
                <img
                  v-if="post.media[0].media_type.includes('Image')"
                  :src="post.media[0].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[0].src_url"></video>
              </div>
              <div class="media_four_box">
                <img
                  v-if="post.media[1].media_type.includes('Image')"
                  :src="post.media[1].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[1].src_url"></video>
              </div>
              <div class="media_four_box">
                <img
                  v-if="post.media[2].media_type.includes('Image')"
                  :src="post.media[2].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[2].src_url"></video>
              </div>
              <div class="media_four_box">
                <img
                  v-if="post.media[3].media_type.includes('Image')"
                  :src="post.media[3].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[3].src_url"></video>
              </div>
            </div>
            <div class="media_bigger" v-if="post.media.length > 4">
              <div class="media_bigger_box">
                <img
                  v-if="post.media[0].media_type.includes('Image')"
                  :src="post.media[0].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[0].src_url"></video>
              </div>
              <div class="media_bigger_box">
                <img
                  v-if="post.media[1].media_type.includes('Image')"
                  :src="post.media[1].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[1].src_url"></video>
              </div>
              <div class="media_bigger_box">
                <img
                  v-if="post.media[2].media_type.includes('Image')"
                  :src="post.media[2].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[2].src_url"></video>
              </div>
              <div class="media_bigger_box">
                <img
                  v-if="post.media[3].media_type.includes('Image')"
                  :src="post.media[3].src_url"
                  alt=""
                />
                <video v-else controls :src="post.media[3].src_url"></video>
              </div>
              <p
                class="bigger_p d-flex align-items-center justify-content-center"
              >
                <span>+{{ post.media.length - 4 }}</span>
              </p>
            </div>
          </div>
          <div v-if="post.sharing_post != false" class="shared">
            <SharedPostComponent
              v-if="post.shared_post.post"
              :post="post.shared_post.post"
            />
            <SharedPostComponent
              v-if="post.shared_post.post_page"
              :post_page="post.shared_post.post_page"
            />
          </div>
          <div
            class="d-flex justify-content-between align-items-center body_box"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              role="button"
              @click="showinteractionmodel"
              dir="auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.441"
                height="11.567"
                viewBox="0 0 12.441 11.567"
              >
                <path
                  id="like-svgrepo-com"
                  d="M12.42,5.275A3.526,3.526,0,0,0,9.053,1.826,3.347,3.347,0,0,0,6.186,3.478a3.225,3.225,0,0,0-2.8-1.652A3.526,3.526,0,0,0,.021,5.275,3.556,3.556,0,0,0,.127,6.586,5.622,5.622,0,0,0,1.849,9.46l4.334,3.933L10.592,9.46a5.622,5.622,0,0,0,1.722-2.874A3.564,3.564,0,0,0,12.42,5.275Z"
                  transform="translate(0 -1.826)"
                  fill="#f55"
                />
              </svg>
              <span class="ms-2">{{ post.Interactions }}</span>
            </div>
            <InteractionComponent
              v-if="interactionModel && interaction_model"
              v-on:change="change()"
              :id="post.id"
            />
            <div>
              <span>{{ post.comments_count }} {{ $t("comments") }}</span>
            </div>
          </div>
        </div>
        <div class="card-footer bg-white d-flex justify-content-around">
          <div class="d-flex justify-content-center align-items-center">
            <svg
              v-if="post.interacted.length === 0"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#767676"
              />
            </svg>
            <svg
              v-else-if="post.interacted[0].type === 7"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#0000ff"
              />
            </svg>
            <svg
              v-else-if="post.interacted[0].type === 1"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#ff0000"
              />
            </svg>
            <svg
              v-else-if="post.interacted[0].type === 6"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#107300"
              />
            </svg>
            <svg
              v-else-if="post.interacted[0].type === 3"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#FFDF00"
              />
            </svg>
            <svg
              v-else-if="post.interacted[0].type === 5"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#000000"
              />
            </svg>
            <svg
              v-else-if="post.interacted[0].type === 4"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#400BD3"
              />
            </svg>
            <svg
              v-else-if="post.interacted[0].type === 2"
              xmlns="http://www.w3.org/2000/svg"
              width="14.592"
              height="13.567"
              viewBox="0 0 14.592 13.567"
            >
              <path
                id="like-svgrepo-com"
                d="M14.568,5.872a4.136,4.136,0,0,0-3.949-4.045A3.926,3.926,0,0,0,7.256,3.764,3.783,3.783,0,0,0,3.973,1.826,4.136,4.136,0,0,0,.025,5.871,4.171,4.171,0,0,0,.149,7.409a6.594,6.594,0,0,0,2.02,3.371l5.084,4.613,5.171-4.613a6.6,6.6,0,0,0,2.02-3.372A4.181,4.181,0,0,0,14.568,5.872Z"
                transform="translate(0 -1.826)"
                fill="#EC0AA1"
              />
            </svg>

            <small v-if="post.interacted.length === 0" class="addreaction">
              <span @click="addReactionToPost(post.id, 7)">{{
                $t("Like")
              }}</span>
              <div class="box-reaction-items">
                <span @click="addReactionToPost(post.id, 7)">{{
                  $t("Like")
                }}</span>
                <span @click="addReactionToPost(post.id, 1)">{{
                  $t("Love")
                }}</span>
                <span @click="addReactionToPost(post.id, 6)">{{
                  $t("Angry")
                }}</span>
                <span @click="addReactionToPost(post.id, 2)">{{
                  $t("Care")
                }}</span>
                <span @click="addReactionToPost(post.id, 3)">{{
                  $t("HaHaHa")
                }}</span>
                <span @click="addReactionToPost(post.id, 4)">{{
                  $t("WOW")
                }}</span>
                <span @click="addReactionToPost(post.id, 5)">{{
                  $t("Sad")
                }}</span>
              </div>
            </small>
            <small
              v-else
              class="addreaction"
              :class="{
                like: post.interacted[0].type === 7,
                love: post.interacted[0].type === 1,
                angry: post.interacted[0].type === 6,
                HaHaHa: post.interacted[0].type === 3,
                Sad: post.interacted[0].type === 5,
                Care: post.interacted[0].type === 2,
                WOW: post.interacted[0].type === 4,
              }"
            >
              <span
                v-if="post.interacted[0].type === 1"
                @click="addReactionToPost(post.id, null)"
                >{{ $t("Love") }}</span
              >
              <span
                v-else-if="post.interacted[0].type === 6"
                @click="addReactionToPost(post.id, null)"
                >{{ $t("Angry") }}</span
              >
              <span
                v-else-if="post.interacted[0].type === 3"
                @click="addReactionToPost(post.id, null)"
                >{{ $t("HaHaHa") }}</span
              >
              <span
                v-else-if="post.interacted[0].type === 5"
                @click="addReactionToPost(post.id, null)"
                >{{ $t("Sad") }}</span
              >
              <span
                v-else-if="post.interacted[0].type === 2"
                @click="addReactionToPost(post.id, null)"
                >{{ $t("Care") }}</span
              >
              <span
                v-else-if="post.interacted[0].type === 4"
                @click="addReactionToPost(post.id, null)"
                >{{ $t("Wow") }}</span
              >
              <span v-else @click="addReactionToPost(post.id, null)">{{
                $t("Like")
              }}</span>
              <div class="box-reaction-items">
                <span @click="addReactionToPost(post.id, 7)">{{
                  $t("Like")
                }}</span>
                <span @click="addReactionToPost(post.id, 1)">{{
                  $t("Love")
                }}</span>
                <span @click="addReactionToPost(post.id, 6)">{{
                  $t("Angry")
                }}</span>
                <span @click="addReactionToPost(post.id, 3)">{{
                  $t("HaHaHa")
                }}</span>
                <span @click="addReactionToPost(post.id, 5)">{{
                  $t("Sad")
                }}</span>
                <span @click="addReactionToPost(post.id, 2)">{{
                  $t("Care")
                }}</span>
                <span @click="addReactionToPost(post.id, 4)">{{
                  $t("Wow")
                }}</span>
              </div>
            </small>
          </div>

          <div class="d-flex justify-content-center align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="13.301"
              viewBox="0 0 14 13.301"
            >
              <g
                id="_-Product-Icons"
                data-name="🔍-Product-Icons"
                transform="translate(0)"
              >
                <g id="ic_fluent_comment_24_filled" transform="translate(0)">
                  <path
                    id="_-Color"
                    data-name="🎨-Color"
                    d="M4.275,13.5A2.275,2.275,0,0,1,2,11.225V5.275A2.275,2.275,0,0,1,4.275,3h9.45A2.275,2.275,0,0,1,16,5.275v5.95A2.275,2.275,0,0,1,13.725,13.5H9.675L5.9,16.172A.7.7,0,0,1,4.8,15.6V13.5Z"
                    transform="translate(-2 -3)"
                    fill="#767676"
                  />
                </g>
              </g>
            </svg>
            <button class="btn_comment_style" @click="myFunction()">
              {{ $t("Comment") }}
            </button>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11.814"
              height="14.859"
              viewBox="0 0 11.814 14.859"
            >
              <g id="share-svgrepo-com" transform="translate(0)">
                <g
                  id="Group_183"
                  data-name="Group 183"
                  transform="translate(0)"
                >
                  <path
                    id="Path_115"
                    data-name="Path 115"
                    d="M56.469,10.19a2.322,2.322,0,0,0-1.251.364L51.567,8.006a2.332,2.332,0,0,0,0-1.288l3.552-2.48a2.333,2.333,0,1,0-.931-1.408L50.546,5.373a2.334,2.334,0,1,0,0,3.977l3.671,2.563a2.334,2.334,0,1,0,2.253-1.723Z"
                    transform="translate(-46.989)"
                    fill="#767676"
                  />
                </g>
              </g>
            </svg>
            <small>{{ $t("Share") }}</small>
          </div>
        </div>
      </div>
      <!-- add and get comment -->
      <div class="" v-if="enableDisable">
        <div class="some__body">
          <comments-component :postid="post.id"></comments-component>
        </div>
      </div>
      <!-- End Add comment and get comments -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Helpers from "@/services/GlobalServices/Helpers";
import SharedPostComponent from "../HomeComponent/SharedPostComponent.vue";
import InteractionComponent from "../HomeComponent/InteractionComponent.vue";
import CommentsComponent from "../CommentComponent/CommentsComponent.vue";
import postServices from "@/services/HomePage/post.services";
export default {
  data() {
    return {
      interaction_model: null,
      l_comment: false,
      enableDisable: false,
    };
  },
  props: ["post"],
  methods: {
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
    ...mapMutations({
      UPDATE_IS_MODAL_INTERACTION: "profile/UPDATE_IS_MODAL_INTERACTION",
    }),
    ...mapActions({
      UPDATE_POST_TO_LIKE: "profile/UPDATE_POST_TO_LIKE",
      GET_ALL_POSTS: "profile/GET_ALL_POSTS",
    }),
    async addReactionToPost(id, type) {
      postServices.InteractionWithPost(id, type).then((response) => {
        if (response.data.data != null) {
          const data = [id, response.data.data];
          this.UPDATE_POST_TO_LIKE(data);
        } else {
          const data = [id, null];
          this.UPDATE_POST_TO_LIKE(data);
        }
      });
    },

    showinteractionmodel() {
      this.UPDATE_IS_MODAL_INTERACTION();
      this.interaction_model = true;
      if (document.documentElement.style.overflow === "hidden") {
        document.documentElement.style.overflow = "auto";
      } else {
        document.documentElement.style.overflow = "hidden";
      }
    },
    delete_post(id) {
      if (confirm("Do you want to delete this post?") == true) {
        this.delete(id);
      }
    },
    async delete(id) {
      let token = JSON.parse(localStorage.getItem("token"));
      await postServices.deletepost(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.showSuccess({ message: this.$i18n.t("Deleted successfully") });
      this.$store.commit("profile/DELETE_POST", id);
    },
  },
  computed: {
    ...mapGetters({
      USER: "auth/USER",
    }),
    ...mapState("profile", {
      interactionModel: "interactionModel",
    }),
  },
  notifications: {
    showSuccess: {
      // You can have any name you want instead of 'showSuccess'
      title: "Post",
      message: "Deleted successfully",
      type: "success", // You also can use 'VueNotifications.types.error' instead of 'error'
    },
  },
  components: { SharedPostComponent, InteractionComponent, CommentsComponent },
};
</script>
<style lang="scss" scoped>
//
.router-link-to-profile {
  text-decoration: none;
  color: #111;
}
.btn_comment_style {
  background: white;
  border: 0px;
}
.row {
  .card {
    margin-bottom: 0px;
  }

  .card_post {
    padding: 0;

    .card-header {
      img {
        width: 40px;
        border-radius: 50%;
      }
    }

    .card-body {
      padding: 0;
      overflow: hidden;

      p {
        padding-left: 1.2rem;
      }

      .media_container {
        max-height: 700px;
        width: 100% !important;
        overflow: hidden;

        .media_one {
          max-height: 100% !important;
          width: 100% !important;
          overflow: hidden;
          // text-align: center;

          img {
            width: 100% !important;
            height: 100% !important;
            object-fit: fill !important;
          }

          video {
            object-fit: cover;
          }
        }

        .media_two {
          height: 100%;
          width: 100% !important;
          overflow: hidden;

          .media_two_box {
            width: 50%;
            height: 100% !important;
            overflow: hidden;

            img {
              width: 100% !important;
              height: 100%;
              object-fit: contain;
            }

            video {
              width: 100% !important;
              height: 100%;
              object-fit: contain;
            }
          }
        }

        .media_three {
          height: 100%;
          width: 100% !important;
          overflow: hidden;

          .media_three_box {
            width: 50%;
            height: 50% !important;
            display: inline-block;
            overflow: hidden;

            img {
              width: 100% !important;
              height: 100%;
              object-fit: contain;
            }

            video {
              width: 100% !important;
              height: 100%;
              object-fit: cover;
            }
          }

          .media_three_box_under {
            width: 100%;
            height: 50% !important;
            overflow: hidden;

            img {
              width: 100% !important;
              height: 100%;
              object-fit: contain;
            }

            video {
              width: 100% !important;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .media_four {
          height: 100%;
          width: 100% !important;
          overflow: hidden;

          .media_four_box {
            width: 50% !important;
            height: 50% !important;
            display: inline-block;
            overflow: hidden;

            img {
              width: 100% !important;
              height: 100%;
              object-fit: contain;
            }

            video {
              width: 100% !important;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .media_bigger {
          height: 100%;
          width: 100% !important;
          overflow: hidden;
          position: relative;

          .media_bigger_box {
            width: 50% !important;
            height: 50% !important;
            display: inline-block;
            overflow: hidden;

            img {
              width: 100% !important;
              height: 100% !important;
              object-fit: contain;
            }

            video {
              width: 100% !important;
              height: 100%;
              object-fit: cover;
            }
          }

          .bigger_p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bolder;
            font-size: 20px;
            width: 100px;
            height: 100px;
            padding: 0 !important;
            background-color: rgba(119, 119, 119, 0.699);
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }

      .body_box {
        margin-top: 1.5rem !important;
        padding: 0 2rem;
        margin-bottom: 0.5rem;
      }
      .shared {
        padding: 0 1.2rem;
      }
    }

    .card-footer {
      small {
        margin-left: 2.5rem;
      }

      .addreaction {
        .box-reaction-items {
          display: none;
        }
        cursor: pointer;
        position: relative;

        &:hover {
          .box-reaction-items {
            display: block !important;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.548);
            color: white;
            padding: 10px;
            border-radius: 5px;
            top: -40px;
            left: 50%;
            width: auto !important;
            span {
              margin: 0 5px;
            }
          }
        }
      }
      .like {
        color: blue !important;
        font-weight: bold !important;
      }
      .love {
        color: red !important;
        font-weight: bold !important;
      }

      .angry {
        color: green !important;
        font-weight: bold !important;
      }

      .HaHaHa {
        color: #ffdf00 !important;
        font-weight: bold !important;
      }

      .Sad {
        color: black !important;
        font-weight: bold !important;
      }

      .WOW {
        color: rgb(64, 11, 211) !important;
        font-weight: bold !important;
      }

      .Care {
        color: rgb(236, 10, 161) !important;
        font-weight: bold !important;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .card-footer {
    small {
      margin-left: 1rem !important;

      .box-reaction-items {
        display: none;
      }
      cursor: pointer;
      position: relative;

      &:hover {
        .box-reaction-items {
          display: block !important;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.548);
          color: white;
          padding: 10px;
          border-radius: 5px;
          top: -40px;
          left: -100% !important;
          width: auto !important;
          span {
            margin: 0 5px;
            font-size: 10px !important;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .div {
    padding: 0 0.5rem !important;
    .row {
      margin: 0 0 1rem 0 !important;

      .card-header {
        p {
          font-size: 0.8rem !important;
        }

        .right :nth-child(1),
        .right :nth-child(2) {
          margin-right: 0.3rem !important;
        }
      }

      .addreaction {
        .box-reaction-items {
          display: none;
        }
        cursor: pointer;
        position: relative;

        &:hover {
          .box-reaction-items {
            display: inline-block !important;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.548);
            color: white;
            padding: 10px;
            border-radius: 5px;
            top: -40px;
            left: 50%;
            width: 50px !important;
            span {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 300px) {
  .card-footer {
    small {
      margin-left: 0.2rem !important;

      .box-reaction-items {
        display: none;
      }
      cursor: pointer;
      position: relative;

      &:hover {
        .box-reaction-items {
          display: block !important;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.548);
          color: white;
          padding: 10px;
          border-radius: 5px;
          top: -40px;
          left: -150% !important;
          width: auto !important;
          span {
            margin: 0 3px !important;
            font-size: 2px !important;
          }
        }
      }
    }
  }
}
.card-text {
  margin-right: 8px;
}
.card-text:lang(ar) {
  padding-right: 20px;
}

.ms-3:lang(ar) {
  margin-right: 10px;
}
.row .card_post .card-footer .addreaction:hover .box-reaction-items:lang(ar) {
  left: -425%;
}
</style>
