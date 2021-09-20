<template>
    <h1>IZABERI PRODAVCA</h1>
    <label for="prodavac" class="form-label">Prodavac:</label>
    <select class="form-control" @change="changeProdavac($event) " v-model="formData.prodavacId" > 
        <option value="" selected disabled>Choose</option>
        <option v-for="p in prodavci" :value="p.id" :key="p.id">{{ p.korisnickoIme }}</option>
    </select>
    <button @click="izabraniProdavac(formData.prodavacId)">Izaberi</button>
</template>

<script>

import axios from '../../axiosConfig'
export default {
    name:'Aaaa',
    created(){
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `${token}`
        this.getProdavci()
    },
    data() {
        return{
            formData:{
                prodavacId:0
            },
            prodavci:[],
            greska: '',
            selectedProdavac:null,
            user:{
                prodavac: null
            },
            artikli:[]
        }
    },
    methods:{
        getProdavci(){
            axios
            .get('api/prodavac')
            .then((response) => {
                this.prodavci = response.data
                console.log(this.prodavci + ' prodavci')
            })
            .catch((error) => {
                console.log(error)
                this.greska = 'Error retriving data'
            })
        },
        changeProdavac (event) {
            this.user.prodavac = event.target.value
            this.selectedProdavac= event.target.options[event.target.options.selectedIndex].text
        },
        izabraniProdavac(id){
            axios
            .get('api/artikal/prodavac/'+ id)
            .then((response) => {
                this.artikli = response.data
                console.log(this.artikli + ' artikli')
                this.$router.push({ path: '/artikli-prodavca/'+id})
            })
            .catch((error) => {
                console.log(error)
                this.greska = 'Error retriving data'
            })
        },
    }
}
</script>
<style scoped>

</style>