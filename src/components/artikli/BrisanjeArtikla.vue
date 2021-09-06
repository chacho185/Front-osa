<template>
    <form @submit.prevent="brisanjeArtikla">

    <div class="mb-3">
        <label for="naziv" class="form-label">Naziv:</label>
        <input type="text" class="form-control" id="naziv" v-model="formData.naziv">
    </div>
    <div class="mb-3">
        <label for="opis" class="form-label">Opis:</label>
        <input type="text" class="form-control" id="opis" v-model="formData.opis">
    </div>
    <div class="mb-3">
        <label for="cena" class="form-label">Cena:</label>
        <input type="text" class="form-control" id="cena" v-model="formData.cena">
    </div>
    <div class="mb-3">
        <label for="putanjaSlike" class="form-label">Putanja Slike:</label>
        <input type="text" class="form-control" id="putanjaSlike" v-model="formData.putanjaSlike">
    </div>
    <label for="prodavac" class="form-label">Prodavac:</label>
    <select class="form-control" @change="changeProdavac($event)" v-model="formData.prodavacDTO">
        <option value="" selected disabled>Choose</option>
        <option v-for="p in prodavci" :value="p.id" :key="p.id">{{ p.korisnickoIme }}</option>
    </select>
    <button type="submit" class="btn btn-primary">Obrisi</button>
    </form>

</template>

<script>
import axios from '../../axiosConfig'

export default {
    name:'BrisanjeArtikla',
    created(){
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `${token}`
        this.sviProdavci()
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
        brisanjeArtikla(){
            axios
            .delete('api/artikal')
            .then((response) =>{
                this.brisanjeArtikla = response.data
            })
            .catch((error) => {
                 console.log(error)
                alert('Data is not valid!')
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
