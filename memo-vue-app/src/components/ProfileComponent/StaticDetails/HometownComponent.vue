<template>
  <div class="write-post-container">
    <ul>
      <h3>{{ $t("Hometown") }}</h3>
      <div>
        <h6
          class="create-job"
          @click="this.HometownToggle()"
          v-if="this.profile_details[1].details.value == null"
        >
          <img src="@/assets/images/add_icon.png" alt="" class="image-create" />
          {{ $t("Create Hometown") }}
        </h6>
        <div v-else>
          {{ this.profile_details[1].details.value }}
          <h6 class="create-job" @click="this.UpdateHometownToggle()">
            <img
              src="@/assets/images/add_icon.png"
              alt=""
              class="image-create"
            />
            {{ $t("Update Hometown") }}
          </h6>
        </div>
        <div class="input-job" v-if="enableDisableHometown">
          <div class="vcomments__add-block">
            <input
              class="vcomments__add-input"
              placeholder="details id"
              type="hidden"
              v-model="formHometown.detail_id"
            />
          </div>
          <div class="vcomments__add-block">
            <textarea
              dir="auto"
              class="vcomments__add-input ar_vcomment"
              :placeholder="$t('Hometown')"
              type="text"
              v-model="formHometown.value"
            ></textarea>
          </div>

          <div class="vcomments__add-block">
            <select class="vcomments__add-input" v-model="formHometown.privacy">
              <option value="public">{{ $t("public") }}</option>
              <option value="friends">{{ $t("friends") }}</option>
              <option value="just_me">{{ $t("just me") }}</option>
              <option value="specific_friends">
                {{ $t("specific friends") }}
              </option>
              <option value="all_friends_except">
                {{ $t("all friends except") }}
              </option>
            </select>
          </div>
          <br />
          <div class="form-group">
            <button
              v-if="!isloading"
              class="btn btn-primary btn-block"
              @click="this.a_store_public_information(this.formHometown)"
              :disabled="!this.formHometown.value || !this.formHometown.privacy"
            >
              {{ $t("Save") }}
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
            <span
              class="btn btn-sm btn-default"
              @click="this.enableDisableHometown = false"
            >
              {{ $t("Cancel") }}
            </span>
          </div>
        </div>
        <div class="input-job" v-if="updateHometownToggle">
          <div class="vcomments__add-block">
            <input
              class="vcomments__add-input"
              placeholder="details id"
              type="hidden"
              :value="this.profile_details[1].id"
              @input="formHometown.detail_id = $event.target.value"
            />
          </div>
          <div class="vcomments__add-block">
            <textarea
              dir="auto"
              class="vcomments__add-input ar_vcomment"
              :placeholder="$t('Hometown')"
              type="text"
              :value="profile_details[1].details.value"
              @input="formHometown.value = $event.target.value"
            ></textarea>
          </div>
          <div class="vcomments__add-block">
            <label for="display_in_profile" class="vcomments__add-input"
              >{{ $t("display in Profile") }}
              <select
                class="vcomments__add-input"
                @input="formHometown.status = $event.target.value"
              >
                <option
                  :selected="this.profile_details[1].details.status === 1"
                  value="1"
                >
                  {{ $t("Yes") }}
                </option>
                <option
                  :selected="this.profile_details[1].details.status === 0"
                  value="0"
                >
                  {{ $t("No") }}
                </option>
              </select>
            </label>
          </div>
          <div class="vcomments__add-block">
            <select
              class="vcomments__add-input"
              @input="formHometown.privacy = $event.target.value"
            >
              <option value="" disabled>Choose privacy...</option>
              <option
                :selected="this.profile_details[1].details.privacy === 'public'"
                value="public"
              >
                {{ $t("public") }}
              </option>
              <option
                :selected="
                  this.profile_details[1].details.privacy === 'friends'
                "
                value="friends"
              >
                {{ $t("friends") }}
              </option>
              <option
                :selected="
                  this.profile_details[1].details.privacy === 'just_me'
                "
                value="just_me"
              >
                {{ $t("just me") }}
              </option>
              <option
                :selected="
                  this.profile_details[1].details.privacy === 'specific_friends'
                "
                value="specific_friends"
              >
                {{ $t("specific friends") }}
              </option>
              <option
                :selected="
                  this.profile_details[1].details.privacy ===
                  'all_friends_except'
                "
                value="all_friends_except"
              >
                {{ $t("all friends except") }}
              </option>
            </select>
          </div>
          <br />
          <div class="form-group">
            <button
              v-if="!isloading"
              class="btn btn-primary btn-block"
              @click="this.update_public_information(formHometown)"
            >
              {{ $t("Save") }}
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
            <span
              class="btn btn-sm btn-default"
              @click="this.updateHometownToggle = false"
            >
              {{ $t("Cancel") }}
            </span>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import ProfileService from "@/services/Profile/ProfileService";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      formHometown: {
        detail_id: 14,
        value: null,
        privacy: "",
        status: "",
      },
      enableDisableHometown: false,
      updateHometownToggle: false,
      errors: [],
      isloading: false,
    };
  },
  created() {
    this.get_profile_public_details();
  },
  methods: {
    HometownToggle() {
      if (this.enableDisableHometown) {
        this.enableDisableHometown = false;
      } else {
        this.enableDisableHometown = true;
      }
    },
    UpdateHometownToggle() {
      if (this.updateHometownToggle) {
        this.updateHometownToggle = false;
      } else {
        this.updateHometownToggle = true;
      }
    },

    a_store_public_information(data) {
      this.isloading = true;
      ProfileService.Store_details(data)
        .then((res) => {
          console.log(res);
          this.formHometown.value = null;
          this.formHometown.privacy = "";
          this.isloading = null;
        })
        .catch((error) => {
          this.errors.push(error.response.data.message);
          console.log(error.response.data.message[0]);
        });
    },
    update_public_information(data) {
      this.isloading = true;
      ProfileService.Update_details(data)
        .then((res) => {
          this.$store.commit("profile/UPDATE_PROFILE_DETAILS", res.data.data);
          this.isloading = null;
          this.updateHometownToggle = false;
        })
        .catch((error) => {
          this.errors.push(error.response.data.message);
          console.log(error.response.data.message[0]);
        });
    },
    ...mapActions({
      get_profile_public_details: "profile/get_profile_public_details",
    }),
  },
  computed: {
    ...mapGetters({ profile_details: "profile/profile_details" }),
  },
};
</script>
<style lang="scss" scoped>
.image-create {
  width: 20px;
}
.vcomments__add-input:lang(ar) {
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border: 1px solid #eee;
  padding: 10px 17px 10px 15px;
  border-radius: 40px;
  direction: rtl;
  transition: all 0.2s ease-out;
}
.vcomments__add-input {
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border: 1px solid #eee;
  padding: 10px 17px 10px 15px;
  border-radius: 40px;
  transition: all 0.2s ease-out;
}
.write-post-container {
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  color: #626262;
  margin-bottom: 10px;
}
.create-job {
  color: #0790e7;
  cursor: pointer;
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
