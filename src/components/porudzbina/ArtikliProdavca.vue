<template>
    <div>
        <h3 v-if="greska">{{greska}}</h3>
            <div id="divartikli" v-for="a in artikli" :key="a.id">
                <h4>OVO SU ARTIKLI PRODAVCA {{a.prodavacDTO}}</h4>
            <div>
                <h5>{{a.naziv}} {{a.cena}}</h5>
                <h5>{{a.opis}}</h5>
            </div>
            <div class="mb-3">
                <label for="kupujem" class="form-label">Kupujem:</label>
                <input type="checkbox" class="form-control" id="kupujem"><!--  v-model="formData.putanjaSlike"-->
            </div>
            <div class="mb-3">
                <label for="kolicina" class="form-label">Kolicina:</label>
                <input type="text" class="form-control" id="kolicina"><!--  v-model="formData.putanjaSlike"-->
            </div>
            <button>Zavrsi porudzbinu</button>
            <!--  treba napraviti metodu koju ce poyivati on click -->
        </div>
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
    },
    data(){
        return{
            artikli:[]
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
        }
    }
}
</script>
<!-- 1. napraviti dva apija na bekendu, get stavke, post porudzbina...
     2. na frontu sve to ipovezuujemo... -->
<style scoped>

</style>