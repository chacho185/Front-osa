<template>
    <div>
        <div class="form-control" id="divartikli" v-for="s in stavke" :key="s.id">
            <div>
                <div>
                    <h3>Naziv artikla: {{s.artikalDTO.naziv}}</h3>
                    <h3>Cena artikla: {{s.artikalDTO.cena}}</h3>
                
                    <h3>Kolicina: {{s.kolicina}}</h3>
                    
                </div>
            </div>
        </div>
        <h3>UKUPNA CENA: {{this.ukupnaCena}}</h3>
        <button @click="glavniPrikaz()">PORUCI</button>
    </div>
</template>

<script>
import axios from '../../axiosConfig'

export default {
    name:'PrikaziStavke',
    created(){
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `${token}`
        this.dajStavke(localStorage.getItem('porudzbinaId'))
        // this.sracunajUkupnuCenu() 
    },
    data(){
        return{
            stavke:[],
            greska:'',
            ukupnaCena:0.0
        }
    },
    methods:{
        dajStavke(id){
            axios
            .get('api/stavka/porudzbina/' + id)
            .then((response) => {
                this.stavke = response.data
                for(let i in this.stavke)
                    this.ukupnaCena += this.stavke[i].artikalDTO.cena *  this.stavke[i].kolicina
            })
            .catch((error) => {
                console.log(error)
                this.greska = 'Error retriving data'
            })
        },
        glavniPrikaz(){
            this.$router.push({ path: '/artikal'})
        }
    }
}
</script>


<style scoped>

</style>