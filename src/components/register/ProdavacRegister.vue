<template>
    <form @submit.prevent="registerProdavac">
        <div style="width: 50%; background:white; padding: 5%; border-radius:2%;">
            <div class="mb-3" >
                <label for="poslujeOd" class="form-label">Posluje od:</label>
                <input type="date" class="form-control" id="poslujeOd"  v-model="formData.poslujeOd">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="text" class="form-control" id="email" v-model="formData.email">
            </div>
            <div class="mb-3">
                <label for="naziv" class="form-label">Naziv:</label>
                <input type="text" class="form-control" id="naziv" v-model="formData.naziv">
            </div>
            <div class="mb-3" >
                <label for="adresa" class="form-label">Adresa:</label>
                <input type="text" class="form-control" id="adresa" aria-describedby="emailHelp" v-model="formData.adresa">
            </div>
            <div class="mb-3">
                <label for="ime" class="form-label">Ime:</label>
                <input type="text" class="form-control" id="ime" v-model="formData.ime">
            </div>
            <div class="mb-3">
                <label for="prezime" class="form-label">Prezime:</label>
                <input type="text" class="form-control" id="prezime" v-model="formData.prezime">
            </div>
            <div class="mb-3">
                <label for="korisnickoIme" class="form-label">Korisnicko ime:</label>
                <input type="text" class="form-control" id="korisnickoIme" v-model="formData.korisnickoIme">
            </div>
            <div class="mb-3">
                <label for="loz" class="form-label">Lozinka:</label>
                <input type="password" class="form-control" id="loz" v-model="formData.lozinka">
            </div>
            <div class="mb-3">
                <label for="blokiran" class="form-label">Blokiran:</label>
                <input type="checkbox" class="form-control" id="blokiran" v-model="formData.blokiran">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
</template>

<script>
import axios from '../../axiosConfig'

export default {
    name:'ProdavacRegister',
    data() {
        return {
            formData: {
                poslujeOd:'2019-06-27T11:06:00.000Z',
                email:'',
                naziv:'',
                adresa:'',
                ime:'',
                prezime:'',
                korisnickoIme:'',
                lozinka:'',
                blokiran:true
            }
        }
    },
    methods: {
        registerProdavac() {
            axios
            .post('api/prodavac/register',this.formData)
            .then((response) => {
                console.log(response.data + 'data register')
                this.$router.push({ path: '/api/login'})
            })
            .catch((error) => {
                console.log(error)
                alert('Data is not valid!')
            })
        }
    }
}
</script>

<style scoped>

</style>
