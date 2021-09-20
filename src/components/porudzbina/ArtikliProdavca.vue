<template>
    <div>
        <h3 v-if="greska">{{greska}}</h3>
            <div id="divartikli" v-for="a in artikli" :key="a.id">
                <h4>OVO JE ARTIKAL PRODAVCA {{a.prodavacDTO}}</h4>
            <div>
                <h5>{{a.naziv}} {{a.cena}}</h5>
                <h5>{{a.opis}}</h5>
            </div>
            
            <label for="prodavac" class="form-label">Porudzbina:</label>
            <select class="form-control" @change="changePorudzbina($event) " v-model="formData.porudzbinaDTO" > 
                <option value="" selected disabled>Choose</option>
                <option v-for="p in porudzbine" :value="p.id" :key="p.id">{{ p.id }}</option>
            </select>

            <div class="mb-3">
                <label for="kupujem" class="form-label">Artikal id:</label>
                <input type="number" class="form-control" id="kupujem" v-model="formData.artikalDTO">
            </div>

            <div class="mb-3">
                <label for="kupujem" class="form-label">Kupujem:</label>
                <input @change="dodajStavku()" type="checkbox" class="form-control" id="kupujem"><!--  v-model="formData.putanjaSlike"-->
            </div>
            <div class="mb-3">
                <label for="kolicina" class="form-label">Kolicina:</label>
                <input type="text" class="form-control" id="kolicina" v-model="formData.kolicina"><!--  v-model="formData.putanjaSlike"-->
            </div>
            <p>------------------------------------------------------------------------------</p>
            <!--  treba napraviti metodu koju ce poyivati on click -->
        </div>
        
            <button @click="zavrsiPorudzbinu()">Zavrsi porudzbinu</button>
        <!-- <button @click="ukupnacijena(a.cena)">sracunaj</button>
            <input type="text" v-model="this.ukupnaCijena"> -->
    </div>
</template>

<script>
import axios from '../../axiosConfig'
export default{
    name:'ArtikliProdavca',
    created(){
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `${token}`
        this.getArtikliForProdavac(this.$route.params.id)
        this.prikaziPorudzbine()
    },
    data(){
        return{
            ukupnaCijena:0,
            artikli:[],
            izabraniArtiklii:[],
            selPorudzbina:null,
            porudzbine:[],
            formData:{
                id:0,
                kolicina:0,
                porudzbinaDTO:0,
                artikalDTO:10
            },
            stavke:[]
        }
    },
    methods:{
        getArtikliForProdavac(id){
            axios
            .get('api/artikal/prodavac/'+ id)
            .then((response) => {
                this.artikli = response.data
                console.log(this.artikli + ' artikli')
                // this.$router.push({ path: '/artikal/artikli-prodavca/'+id})
            })
            .catch((error) => {
                console.log(error)
                this.greska = 'Error retriving data'
            })
        },
        changePorudzbina(event) {
            this.selPorudzbina = event.target.value
            this.selPorudzbina= event.target.options[event.target.options.selectedIndex].text
        },
        prikaziStavke(){
            axios
            .get('api/stavka')
            .then((response) => {
                this.stavke = response.data
                console.log(this.stavke + ' stavke')
                // this.$router.push({ path: '/artikal/artikli-prodavca/'+id})
            })
            .catch((error) => {
                console.log(error)
                this.greska = 'Error retriving data'
            })
        },
        ukupnacijena(novaCijena){
            this.ukupnaCijena += novaCijena;
        },
        prikaziPorudzbine(){
            axios
            .get('api/porudzbina')
            .then((response) => {
                this.porudzbine = response.data
                console.log(this.porudzbine + ' porudzbine')
                // this.$router.push({ path: '/artikal/artikli-prodavca/'+id})
            })
            .catch((error) => {
                console.log(error)
                this.greska = 'Error retriving data'
            })
        },
        dodajStavku(){
            axios
            .post('api/stavka', this.formData)
            .then((response) => {
                console.log(response.data + ' data register')
                // this.$router.push({ path: '/api/login'})
            })
            .catch((error)=> {
                console.log(error)
                alert('Data is not valid!')
            })
        },
        zavrsiPorudzbinu(){
            this.$router.push({ path: '/artikal'})
        }
    }
}
</script>
<!-- 1. napraviti dva apija na bekendu, get stavke, post porudzbina...
     2. na frontu sve to ipovezuujemo... --> 
<style scoped>

</style>