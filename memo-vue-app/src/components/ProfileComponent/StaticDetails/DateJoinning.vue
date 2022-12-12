<template>
  <div class="write-post-container">
    <ul>
      <h3>{{ $t("Date of joining the application") }}</h3>

      <div>
        <div>
          {{ this.profile_details[3].details.value }}
          <h6 class="create-job" @click="this.UpdateBiographyToggle()">
            <img
              src="@/assets/images/add_icon.png"
              alt=""
              class="image-create"
            />
            {{ $t("Update") }}
          </h6>
        </div>
      </div>
      <div>
        <div class="input-job" v-if="addBiography">
          <div class="vcomments__add-block">
            <input
              class="vcomments__add-input"
              placeholder="details id"
              type="hidden"
              v-model="form.detail_id"
            />
          </div>
          <div class="vcomments__add-block">
            <input
              dir="auto"
              class="vcomments__add-input"
              v-model="form.value"
              ref="input"
              disabled
            />
            <small class="text-danger" v-if="errors.value">
              {{ errors.value[0] }}
            </small>
          </div>

          <div class="vcomments__add-block">
            <select class="vcomments__add-input" v-model="form.privacy">
              <option value="" disabled>Choose privacy...</option>
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
              @click="this.a_store_public_information(this.form)"
              :disabled="!this.form.value || !this.form.privacy"
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
              @click="this.addBiography = false"
            >
              {{ $t("Cancel") }}
            </span>
          </div>
        </div>
        <div class="input-job" dir="auto" v-if="updateBiography">
          <div class="vcomments__add-block">
            <input
              class="vcomments__add-input"
              placeholder="details id"
              type="hidden"
              v-model="formUpdate.detail_id"
            />
          </div>
          <div dir="auto" class="vcomments__add-block">
            <input
              disabled
              class="vcomments__add-input"
              :value="this.profile_details[3].details.value"
              ref="input"
            />
          </div>
          <div class="vcomments__add-block">
            <label for="display_in_profile" class="vcomments__add-input"
              >{{ $t("display in Profile") }}
              <select
                class="vcomments__add-input"
                @input="formUpdate.status = $event.target.value"
              >
                <option
                  :selected="this.profile_details[3].details.status === 1"
                  value="1"
                >
                  {{ $t("Yes") }}
                </option>
                <option
                  :selected="this.profile_details[3].details.status === 0"
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
              @input="formUpdate.privacy = $event.target.value"
            >
              <option value="" disabled>Choose privacy...</option>
              <option
                :selected="this.profile_details[3].details.privacy === 'public'"
                value="public"
              >
                {{ $t("public") }}
              </option>
              <option
                :selected="
                  this.profile_details[3].details.privacy === 'friends'
                "
                value="friends"
              >
                {{ $t("friends") }}
              </option>
              <option
                :selected="
                  this.profile_details[3].details.privacy === 'just_me'
                "
                value="just_me"
              >
                {{ $t("just me") }}
              </option>
              <option
                :selected="
                  this.profile_details[3].details.privacy === 'specific_friends'
                "
                value="specific_friends"
              >
                {{ $t("specific friends") }}
              </option>
              <option
                :selected="
                  this.profile_details[3].details.privacy ===
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
              @click="this.update_public_information(formUpdate)"
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
              @click="this.updateBiography = false"
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
      form: {
        detail_id: 4,
        value: null,
        privacy: "",
      },
      formUpdate: {
        detail_id: 4,
        value: null,
        privacy: "",
        status: "",
      },
      addBiography: false,
      updateBiography: false,
      errors: [],
      isloading: false,
    };
  },
  created() {
    this.get_profile_public_details();
  },
  methods: {
    myFunction: function () {
      if (this.enableDisable) {
        this.enableDisable = false;
      } else {
        this.enableDisable = true;
      }
    },
    resize() {
      let element = this.$refs["textarea"];

      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
    Add_BiographyToggle() {
      if (this.addBiography) {
        this.addBiography = false;
      } else {
        this.addBiography = true;
      }
    },
    UpdateBiographyToggle() {
      if (this.updateBiography) {
        this.updateBiography = false;
      } else {
        this.updateBiography = true;
      }
    },
    myFunctionHometown: function () {
      if (this.enableDisableHometown) {
        this.enableDisableHometown = false;
      } else {
        this.enableDisableHometown = true;
      }
    },

    a_store_public_information(data) {
      this.isloading = true;
      ProfileService.Store_details(data)
        .then(() => {
          this.form.value = null;
          this.form.privacy = "";
          this.isloading = null;
          this.addBiography = null;
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
          this.isloading = null;
          this.updateBiography = false;
          this.$store.commit("profile/UPDATE_PROFILE_DETAILS", res.data.data);
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
textarea {
  width: 300px;
  min-height: 72px;
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
