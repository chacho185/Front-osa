<template>
    <div>
        <h3 v-if="greska">{{greska}}</h3>
            <div style="background:red; margin:2% 0 2% 0; padding: 2% width:33% display:grid" v-for="a in artikli" :key="a.id">
            <div>
                <h5>{{a.naziv}} {{a.cena}}</h5>
                <h5>{{a.opis}}</h5>
            </div>
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
            greska: ''
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
            }
    }

}
</script>

<style scoped>

</style>
