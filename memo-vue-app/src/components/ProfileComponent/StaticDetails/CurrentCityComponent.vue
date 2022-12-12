<template>
  <div class="write-post-container">
    <ul>
      <h3>{{ $t("Current City") }}</h3>
      <div>
        <h6
          class="create-job"
          @click="this.add_currentCityToggle()"
          v-if="this.profile_details[0].details.value == null"
        >
          <img src="@/assets/images/add_icon.png" alt="" class="image-create" />
          {{ $t("Create Current City") }}
        </h6>
        <div v-else>
          {{ this.profile_details[0].details.value }}
          <h6 class="create-job" @click="this.UpdateCurrentCityToggle()">
            <img
              src="@/assets/images/add_icon.png"
              alt=""
              class="image-create"
            />
            {{ $t("Update Current City") }}
          </h6>
        </div>
        <div class="input-job" v-if="enableDisable">
          <div class="vcomments__add-block">
            <input
              class="vcomments__add-input"
              placeholder="details id"
              type="hidden"
              v-model="form.detail_id"
            />
          </div>
          <div dir="auto" class="vcomments__add-block">
            <textarea
              dir="auto"
              class="vcomments__add-input ar_vcomment"
              :placeholder="$t('Current City')"
              type="text"
              v-model="form.value"
            ></textarea>
          </div>

          <div class="vcomments__add-block">
            <select class="vcomments__add-input" v-model="form.privacy">
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
              @click="this.enableDisable = false"
            >
              {{ $t("Cancel") }}
            </span>
          </div>
        </div>
        <div class="input-job" v-if="enableDisableUpdate">
          <div class="vcomments__add-block">
            <input
              class="vcomments__add-input"
              placeholder="details id"
              type="hidden"
              :value="this.profile_details[0].id"
              @input="form.detail_id = $event.target.value"
            />
          </div>
          <div dir="auto" class="vcomments__add-block">
            <textarea
              dir="auto"
              class="vcomments__add-input ar_vcomment"
              :placeholder="$t('Current City')"
              type="text"
              :value="profile_details[0].details.value"
              @input="form.value = $event.target.value"
            ></textarea>
          </div>

          <div class="vcomments__add-block">
            <label for="display_in_profile" class="vcomments__add-input"
              >{{ $t("display in Profile") }}
              <select
                class="vcomments__add-input"
                @input="form.status = $event.target.value"
              >
                <option
                  :selected="this.profile_details[0].details.status === 1"
                  value="1"
                >
                  {{ $t("Yes") }}
                </option>
                <option
                  :selected="this.profile_details[0].details.status === 0"
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
              @input="form.privacy = $event.target.value"
            >
              <option value="" disabled>Choose privacy...</option>
              <option
                :selected="this.profile_details[0].details.privacy === 'public'"
                value="public"
              >
                {{ $t("public") }}
              </option>
              <option
                :selected="
                  this.profile_details[0].details.privacy === 'friends'
                "
                value="friends"
              >
                {{ $t("friends") }}
              </option>
              <option
                :selected="
                  this.profile_details[0].details.privacy === 'just_me'
                "
                value="just_me"
              >
                {{ $t("just me") }}
              </option>
              <option
                :selected="
                  this.profile_details[0].details.privacy === 'specific_friends'
                "
                value="specific_friends"
              >
                {{ $t("specific friends") }}
              </option>
              <option
                :selected="
                  this.profile_details[0].details.privacy ===
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
              @click="this.update_public_information(form)"
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
              @click="this.enableDisableUpdate = false"
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
        detail_id: 34,
        value: null,
        privacy: "",
        status: "",
      },
      enableDisable: false,
      enableDisableUpdate: false,
      errors: [],
      isloading: false,
    };
  },
  created() {
    this.get_profile_public_details();
  },
  methods: {
    add_currentCityToggle() {
      if (this.enableDisable) {
        this.enableDisable = false;
      } else {
        this.enableDisable = true;
      }
    },
    UpdateCurrentCityToggle() {
      if (this.enableDisableUpdate) {
        this.enableDisableUpdate = false;
      } else {
        this.enableDisableUpdate = true;
      }
    },

    a_store_public_information(data) {
      this.isloading = true;
      ProfileService.Store_details(data)
        .then(() => {
          this.form.value = null;
          this.form.privacy = "";
          this.isloading = null;
          this.enableDisable = null;
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
          this.$store.commit("profile/UPDATE_PROFILE_DETAILS", res.data.data);
          this.enableDisableUpdate = false;
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
.create-job {
  color: #0790e7;
  cursor: pointer;
}
.image-create {
  width: 20px;
}
.write-post-container {
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  color: #626262;
  margin-bottom: 10px;
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
