<template>
  <div>
    <h3 v-if="greska">{{ greska }}</h3>

    <label for="prodavac" class="form-label">Porudzbina:</label>
    <select
      class="form-control"
      @change="changePorudzbina($event)"
      v-model="formData.porudzbinaDTO"
    >
      <option value="" disabled>Choose</option>
      <option v-for="p in porudzbine" :value="p.id" :key="p.id"
        >{{ p.komentar }} - {{ p.satnica.split("T")[0] }}</option
      >
    </select>

    <label for="prodavac" class="form-label">Atrikal:</label>
    <select
      class="form-control"
      @change="changeArtikal($event)"
      v-model="formData.artikalDTO"
    >
      <option value="" selected disabled>Choose</option>
      <option v-for="a in artikli" :value="a.id" :key="a.id">{{
        a.naziv
      }}</option>
    </select>
    <div class="mb-3">
      <label for="kolicina" class="form-label">Kolicina:</label>
      <input
        type="text"
        class="form-control"
        id="kolicina"
        v-model="formData.kolicina"
      /><!--  v-model="formData.putanjaSlike"-->
    </div>
    <p>
      ------------------------------------------------------------------------------
    </p>
    <!--  treba napraviti metodu koju ce poyivati on click -->
  </div>
  <button @click="zavrsiPorudzbinu()">Zavrsi porudzbinu</button>
</template>

<script>
import axios from "../../axiosConfig";
export default {
  name: "ArtikliProdavca",
  created() {
    let token = localStorage.getItem("token");
    axios.defaults.headers["Authorization"] = `${token}`;
    this.getArtikliForProdavac(this.$route.params.id);
    this.prikaziPorudzbine();
  },
  data() {
    return {
      ukupnaCijena: 0,
      artikli: [],
      izabraniArtiklii: [],
      selPorudzbina: null,
      selArtikal: null,
      porudzbine: [],
      formData: {
        id: 0,
        kolicina: 0,
        porudzbinaDTO: 0,
        artikalDTO: 0,
      },
      stavke: [],
    };
  },
  methods: {
    getArtikliForProdavac(id) {
      axios
        .get("api/artikal/prodavac/" + id)
        .then((response) => {
          this.artikli = response.data;
          console.log(this.artikli + " artikli");
          // this.$router.push({ path: '/artikal/artikli-prodavca/'+id})
        })
        .catch((error) => {
          console.log(error);
          this.greska = "Error retriving data";
        });
    },
    changePorudzbina(event) {
      console.log(event.target.options[event.target.options.selectedIndex]);
      //   this.selPorudzbina = event.target.value;
      this.selPorudzbina =
        event.target.options[event.target.options.selectedIndex].value;
      localStorage.setItem("porudzbinaId", this.selPorudzbina);
    },
    changeArtikal(event) {
      this.selArtikal = event.target.value;
      this.selArtikal =
        event.target.options[event.target.options.selectedIndex].text;
    },
    prikaziStavke() {
      axios
        .get("api/stavka")
        .then((response) => {
          this.stavke = response.data;
          console.log(this.stavke + " stavke");
          // this.$router.push({ path: '/artikal/artikli-prodavca/'+id})
        })
        .catch((error) => {
          console.log(error);
          this.greska = "Error retriving data";
        });
    },
    ukupnacijena(novaCijena) {
      this.ukupnaCijena += novaCijena;
    },
    prikaziPorudzbine() {
      axios
        .get("api/porudzbina")
        .then((response) => {
          this.porudzbine = response.data;
          this.formData.porudzbinaDTO = this.porudzbine[
            this.porudzbine.length - 1
          ].id;
          localStorage.setItem("porudzbinaId", this.formData.porudzbinaDTO);
          //   console.log(this.porudzbine + " porudzbine");
          // this.$router.push({ path: '/artikal/artikli-prodavca/'+id})
        })
        .catch((error) => {
          console.log(error);
          this.greska = "Error retriving data";
        });
    },

    zavrsiPorudzbinu() {
      axios
        .post("api/stavka", this.formData)
        .then(() => {
          this.$router.push({ path: "/stavke" });
        })
        .catch((error) => {
          console.log(error);
          alert("Data is not valid!");
        });
    },
  },
};
</script>
<!-- 1. napraviti dva apija na bekendu, get stavke, post porudzbina...
     2. na frontu sve to ipovezuujemo... -->
<style scoped></style>
