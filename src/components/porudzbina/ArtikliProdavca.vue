<template>
    <div>
        <h3 v-if="greska">{{greska}}</h3>
            
            
            <label for="prodavac" class="form-label">Porudzbina:</label>
            <select class="form-control" @change="changePorudzbina($event) " v-model="formData.porudzbinaDTO" > 
                <option value="" selected disabled>Choose</option>
                <option v-for="p in porudzbine" :value="p.id" :key="p.id">{{ p.id }}</option>
            </select>

            <label for="prodavac" class="form-label">Atrikal:</label>
            <select class="form-control" @change="changeArtikal($event) " v-model="formData.artikalDTO" > 
                <option value="" selected disabled>Choose</option>
                <option v-for="a in artikli" :value="a.id" :key="a.id">{{ a.naziv }}</option>
            </select>

            <div class="mb-3">
                <label for="kupujem" class="form-label">Kupujem:(samo oznaciti red)</label>
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
            selArtikal:null,
            porudzbine:[],
            formData:{
                id:0,
                kolicina:0,
                porudzbinaDTO:0,
                artikalDTO:0
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
            localStorage.setItem('porudzbinaId', this.selPorudzbina)
        },
        changeArtikal(event) {
            this.selArtikal = event.target.value
            this.selArtikal= event.target.options[event.target.options.selectedIndex].text
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
           this.$router.push({ path: '/stavke'})
        }
    }
}
</script>
<!-- 1. napraviti dva apija na bekendu, get stavke, post porudzbina...
     2. na frontu sve to ipovezuujemo... --> 
<style scoped>

</style>