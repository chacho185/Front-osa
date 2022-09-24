<template>
  <div>
    <h3 v-if="greska">{{ greska }}</h3>
    <center>
      <div class="mb-3">
        <button class="btn btn-secondary btn-lg btn-block" @click="sync">
          SYNC
        </button>
        <br />
        <label for="filter" class="form-label">Filter:</label>
        <input
          type="text"
          v-on:input="getArtikli"
          class="form-control"
          id="filter"
          v-model="filter"
        />
      </div>
      <div class="mb-3">
        <label for="cenaOd" class="form-label">Cena od:</label>
        <input
          type="number"
          v-on:input="getArtikli"
          class="form-control"
          id="cenaOd"
          v-model="cenaOd"
        />
      </div>
      <div class="mb-3">
        <label for="cenaDo" class="form-label">Cena do:</label>
        <input
          type="number"
          v-on:input="getArtikli"
          class="form-control"
          id="cenaDo"
          v-model="cenaDo"
        />
      </div>
      <table>
        <tr>
          <td>Naziv</td>
          <td>Cena</td>
          <td>Opis</td>
          <td>Akcija 1</td>
          <td>Akcija 2</td>
        </tr>
        <tr v-for="a in artikli" :key="a.id">
          <td>
            {{ a.naziv }}
          </td>
          <td>
            {{ a.cena }}
          </td>
          <td>
            {{ a.opis }}
          </td>
          <td>
            <button class="btn btn-success" @click="getOneArtikal(a.id)">
              izmjeni
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="brisanjeArtikla(a.id)">
              obrisi
            </button>
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
    this.getArtikli();
  },
  data() {
    return {
      artikli: [],
      greska: "",
      artikal: null,
      filter: "",
      cenaOd: 0,
      cenaDo: 99999,
    };
  },
  methods: {
    getArtikli() {
      axios
        .get(
          "api/artikal?filter=" +
            this.filter +
            "&cenaOd=" +
            this.cenaOd +
            "&cenaDo=" +
            this.cenaDo
        )
        .then((response) => {
          this.artikli = response.data;
          console.log(this.artikli + " artikli");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sync() {
      axios
        .get(
          "api/artikal?filter=" +
            this.filter +
            "&cenaOd=" +
            this.cenaOd +
            "&cenaDo=" +
            this.cenaDo +
            "&reindex=1"
        )
        .then((response) => {
          this.artikli = response.data;
          console.log(this.artikli + " artikli");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    brisanjeArtikla(id) {
      axios
        .delete("api/artikal/" + id)
        .then((response) => {
          this.brisanjeArtikla = response.data;
          this.getArtikli();
        })
        .catch((error) => {
          console.log(error);
          alert("Data is not valid!");
        });
    },
    getOneArtikal(id) {
      axios
        .get("api/artikal/" + id)
        .then((response) => {
          this.artikal = response.data;
          console.log(this.artikal + " artikli");
          this.$router.push("/get-one-artikal/" + id);
        })
        .catch((error) => {
          console.log(error);
          this.greska = "Error retriving data";
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
