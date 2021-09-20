<template>
    <div>
        <h3 v-if="greska">{{greska}}</h3>
            <div class="form-control" id="divartikli" v-for="a in artikli" :key="a.id">
            <div>
                <h5>{{a.naziv}} {{a.cena}}</h5>
                <h5>{{a.opis}}</h5>
            </div>
            <button class="btn btn-success" @click='getOneArtikal(a.id)'>izmjeni</button>
            <button class="btn btn-danger" @click='brisanjeArtikla(a.id)'>obrisi</button>
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig'
export default {
    name:'Artikli',
    created(){
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `${token}`
        this.getArtikli()
    },
    data() {
        return{
            artikli:[],
            greska: '',
            artikal:null
        }
    },
    methods:{
       getArtikli(){
                axios
                .get('api/artikal')
                .then((response) => {
                    this.artikli = response.data
                    console.log(this.artikli + ' artikli')
                })
                .catch((error) => {
                    console.log(error)
                    this.greska = 'Error retriving data'
                })
            },
            brisanjeArtikla(id){
            axios
            .delete('api/artikal/' + id)
            .then((response) =>{
                this.brisanjeArtikla = response.data
                this.getArtikli()
                
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
                    this.$router.push('/get-one-artikal/'+id)
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
    #divartikli{
        background: yellow;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        width: 550px;
        text-align: center;
    }
</style>
