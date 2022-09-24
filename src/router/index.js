import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/logIn/Login.vue";
import Artikli from "../components/artikli/Artikli.vue";
import LogOut from "../components/logOut/LogOut.vue";
import KupacRegister from "../components/register/KupacRegister.vue";
import ProdavacRegister from "../components/register/ProdavacRegister.vue";
import DodavanjeArtikla from "../components/artikli/DodavanjeArtikla.vue";
import BrisanjeArtikla from "../components/artikli/BrisanjeArtikla.vue";
import IzmenaArtikla from "../components/artikli/IzmenaArtikla.vue";
// import IzaberiProdavca from '../components/porudzbina/IzaberiProdavca.vue'
import Aaaa from "../components/porudzbina/Aaaa.vue";
import ArtikliProdavca from "../components/porudzbina/ArtikliProdavca.vue";
import NapraviPorudzbinu from "../components/porudzbina/NapraviPorudzbinu.vue";
import ListaPorudzbina from "../components/porudzbina/ListaPorudzbina.vue";
import PrikaziStavke from "../components/porudzbina/PrikaziStavke.vue";
const router = new createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Login",
      path: "/login",
      component: Login,
    },
    {
      name: "Artikli",
      path: "/artikal",
      component: Artikli,
    },
    {
      name: "ListaPorudzbina",
      path: "/lista-porudzbina",
      component: ListaPorudzbina,
    },
    {
      name: "LogOut",
      path: "/logOut",
      component: LogOut,
    },
    {
      name: "KupacRegister",
      path: "/kupac-register",
      component: KupacRegister,
    },
    {
      name: "ProdavacRegister",
      path: "/prodavac-register",
      component: ProdavacRegister,
    },
    {
      name: "DodavanjeArtikla",
      path: "/dodavanje-artikla",
      component: DodavanjeArtikla,
    },
    {
      name: "BrisanjeArtikla",
      path: "/brisanje-artikla",
      component: BrisanjeArtikla,
    },
    {
      name: "IzmenaArtikla",
      path: "/get-one-artikal/:id",
      component: IzmenaArtikla,
    },
    {
      name: "Aaaa",
      path: "/izaberi-prodavca",
      component: Aaaa,
    },
    {
      name: "ArtikliProdavca",
      path: "/artikli-prodavca/:id",
      component: ArtikliProdavca,
    },
    {
      name: "NapraviPorudzbinu",
      path: "/napravi-porudzbinu",
      component: NapraviPorudzbinu,
    },
    {
      name: "PrikaziStavke",
      path: "/stavke",
      component: PrikaziStavke,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (
    (to.name === "KupacRegister" && !token) ||
    (to.name === "ProdavacRegister" && !token)
  )
    next();
  else if (to.name !== "Login" && !token) next({ name: "Login" });
  else if (
    (to.name === "Login" ||
      to.name === "KupacRegister" ||
      to.name === "ProdavacRegister") &&
    token
  )
    next({ name: "Artikli" });
  else next();
});
export default router;
