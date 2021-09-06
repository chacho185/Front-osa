<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a id="webprodavinca" class="navbar-brand" href="#">Web prodavnica</a>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-if="!tokenn" class="navbar-nav">
            <a href="/login" class="nav-link">Log In</a>
        </li>
        <li v-if="tokenn" class="navbar-nav">
            <a href="/artikal" class="nav-link">Artikli</a>
        </li>
        <li v-if="tokenn" class="navbar-nav">
            <a href="/logOut" class="nav-link">Log Out</a>
        </li>
        <li v-if="!tokenn" class="navbar-nav">
            <a href="/kupac-register" class="nav-link">Register Kupac</a>
        </li>
        <li v-if="!tokenn" class="navbar-nav">
            <a href="/prodavac-register" class="nav-link">Register Prodavac</a>
        </li>
        <li v-if="tokenn" class="navbar-nav">
            <a href="/dodavanje-artikla" class="nav-link">Dodavanje Artikla</a>
        </li>
        
        
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import axios from '../../axiosConfig'

export default {
  created(){
    let token = localStorage.getItem('token');
    axios.defaults.headers['Authorization'] = `${token}`
  },
  name:'TheNavigation',
  data(){
    return {
      tokenn: localStorage.getItem('token'),
    }
  }
}
</script>

<style scoped>
 #webprodavinca{
   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
   background: chocolate;
 }
</style>