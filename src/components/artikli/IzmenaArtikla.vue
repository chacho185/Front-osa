<template>

    <form @submit.prevent="izmenaArtikla">

    <div class="mb-3">
        <label class="form-label" for="naziv">Naziv:</label>
        <input type="text" class="form-control" id="naziv" v-model="artikal.naziv">
    </div>
    <div class="mb-3">
        <label class="form-label" for="opis">Opis:</label>
        <input type="text" class="form-control" id="opis" v-model="artikal.opis">

    </div>
    <div class="mb-3">
        <label class="form-label" for="cena">Cena:</label>
        <input type="text" class="form-control" id="cena" v-model="artikal.cena">
    </div>
    <div class="input-group mb-3">
        <label class="form-label" for="putanjaSlike">Putanja slike:</label>
        <input type="text" class="form-control" id="cena" v-model="artikal.putanjaSlike">
    </div>
    <label for="prodavac" class="form-label">Prodavac:</label>
    <select class="form-control" @change="changeProdavac($event) " v-model="artikal.ProdavacDTO" > 
        <option value="" selected disabled>Choose</option>
        <option v-for="p in prodavci" :value="p.id" :key="p.id">{{ p.korisnickoIme }}</option>
    </select>
    <button @click="izmenaArtikla(artikal.id)" type="submit" class="btn btn-primary">Izmeni</button>
    </form>


</template>

<script>
import axios from '../../axiosConfig'

export default {
    name:'IzmenaArtikla',
    created(){
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `${token}`
        this.getOneArtikal(this.$route.params.id)
        this.sviProdavci()
    },
    data() {
        return {
            artikal:null,
            formData: {
                naziv: '',
                opis: '',
                cena:0.0,
                putanjaSlike:'',
                prodavacDTO:0
            },
            prodavci:[],
            selectedProdavac:null,
            user:{
                prodavac: null
            }
        }
    },
    methods: {
        dodavanjeArtikla() {
            axios
            .post('api/artikal',this.formData)
            .then((response) => {
                console.log(response.data + 'data artikal')
                this.$router.push({ path: '/artikal'})
            })
            .catch((error) => {
                console.log(error)
                alert('Niste pravilno uneli podatke!')
            })
        },
        izmenaArtikla(id) {
            axios
            .put('api/artikal/' + id , this.artikal)
            .then((response) => {
                console.log(response.data + 'data artikal')
                this.$router.push({ path: '/artikal'})
            })
            .catch((error) => {
                console.log(error)
               // alert('Niste pravilno  podatke')
            })
        },
        sviProdavci(){
            axios
            .get('api/prodavac')
            .then((response) =>{
                this.prodavci = response.data
            })
            .catch((error) => {
                 console.log(error)
                alert('Data is not valid!')
            })
        },
        getOneArtikal(id) {
            axios
            .get('api/artikal/' + id)
                .then((response) => {
                    this.artikal = response.data
                    console.log(this.artikal + ' artikli')
                })
                .catch((error) => {
                    console.log(error)
                    this.greska = 'Error retriving data'
                })
            },
        changeProdavac (event) {
            this.user.prodavac = event.target.value
            this.selectedProdavac= event.target.options[event.target.options.selectedIndex].text
        }
    }


}
    
</script>

<style>

</style>
