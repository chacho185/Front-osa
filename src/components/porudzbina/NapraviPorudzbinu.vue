<template>
  <form @submit.prevent="registerKupac">
    <div style="width: 100%; background:white; padding: 5%; border-radius:2%;">
      <div class="mb-3">
        <label for="dostavljeno" class="form-label">Dostavljeno:</label>
        <input
          type="checkbox"
          id="dostavljeno"
          v-model="formData.dostavljeno"
        />
      </div>
      <div class="mb-3">
        <label for="ime" class="form-label">Ocena:</label>
        <input
          type="text"
          class="form-control"
          id="ime"
          v-model="formData.ocena"
        />
      </div>
      <div class="mb-3">
        <label for="prezime" class="form-label">Kometar:</label>
        <input
          type="text"
          class="form-control"
          id="prezime"
          v-model="formData.komentar"
        />
      </div>
      <div class="mb-3">
        <label for="korisnickoIme" class="form-label">anonimiKomentar:</label>
        <input
          type="checkbox"
          id="korisnickoIme"
          v-model="formData.anonimiKomentar"
        />
      </div>
      <div class="mb-3">
        <label for="loz" class="form-label">arhiviraniKomentar:</label>
        <input type="checkbox" id="loz" v-model="formData.arhiviraniKomentar" />
      </div>
      <button
        @click="napraviPorudzbinu()"
        type="submit"
        class="btn btn-primary"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script>
import axios from "../../axiosConfig";

export default {
  name: "NapraviPorudzbinu",
  data() {
    return {
      formData: {
        satnica: "2020-12-12T12:12:12.231",
        dostavljeno: false,
        ocena: 0,
        komentar: "",
        anonimiKomentar: false,
        arhiviraniKomentar: false,
        kupacDTO: 0,
      },
    };
  },
  methods: {
    napraviPorudzbinu() {
      axios
        .post("api/porudzbina", this.formData)
        .then((response) => {
          console.log(response.data + " data poruzbine");
          this.$router.push({ path: "/izaberi-prodavca" });
        })
        .catch((error) => {
          console.log(error);
          alert("Data is not valid!");
        });
    },
  },
};
</script>

<style scoped></style>
