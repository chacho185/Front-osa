<template>
  <div>
    <h3 v-if="greska">{{ greska }}</h3>
    <center>
      <div class="mb-3">
        <h1>PRETRAGA PORUDZBINA PO NAPOMENI/KOMENTARU</h1>
        <br />
        <label for="filter" class="form-label">Filter:</label>
        <input
          type="text"
          v-on:input="getPorudzbine"
          class="form-control"
          id="filter"
          v-model="filter"
        />
      </div>
      <table>
        <tr>
          <td>ID</td>
          <td>Ocena</td>
          <td>Komentar</td>
          <td>Kupac</td>
        </tr>
        <tr v-for="p in porudzbine" :key="p.id">
          <td>
            {{ p.id }}
          </td>
          <td>
            {{ p.ocena }}
          </td>
          <td>
            {{ p.komentar }}
          </td>
          <td>
            {{ p.kupac }}
          </td>
        </tr>
      </table>
    </center>
  </div>
</template>

<script>
import axios from "../../axiosConfig";
export default {
  name: "Artikli",
  created() {
    let token = localStorage.getItem("token");
    axios.defaults.headers["Authorization"] = `${token}`;
    this.getPorudzbine();
  },
  data() {
    return {
      porudzbine: [],
      greska: "",
      filter: "",
    };
  },
  methods: {
    getPorudzbine() {
      axios
        .get("api/porudzbina/filter?filter=" + this.filter)
        .then((response) => {
          this.porudzbine = response.data;
          console.log(this.porudzbine + " porudzbine");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#divartikli {
  background: yellow;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  width: 550px;
  text-align: center;
}
td,
th {
  width: 15rem;
  height: 2rem;
  border: 1px solid #ccc;
  text-align: center;
}
th {
  background: lightblue;
  border-color: white;
}
body {
  padding: 1rem;
}
</style>
