import { createRouter, createWebHistory} from 'vue-router'
import Login from '../components/logIn/Login.vue'
import Artikli from '../components/artikli/Artikli.vue'
import LogOut from '../components/logOut/LogOut.vue'
import KupacRegister from '../components/register/KupacRegister.vue'
import ProdavacRegister from '../components/register/ProdavacRegister.vue'

const router = new createRouter({
    history: createWebHistory(),
    routes:[
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Artikli',
            path:'/artikal',
            component:Artikli
        },
        {
            name:'LogOut',
            path:'/logOut',
            component:LogOut
        },
        {
            name:'KupacRegister',
            path:'/kupac-register',
            component:KupacRegister
        },
        {
            name:'ProdavacRegister',
            path:'/prodavac-register',
            component:ProdavacRegister
        },
    ]
})
router.beforeEach((to,from, next) => {
    const token = localStorage.getItem('token')

    if ((to.name === 'KupacRegister' && !token) || (to.name === 'ProdavacRegister' && !token)) next();
    else if(to.name !== 'Login' && !token) next({ name: 'Login'});
    else if((to.name === 'Login' || to.name === 'KupacRegister'  || to.name === 'ProdavacRegister') && token) next ({name: 'Artikli'})
    else next();
})
export default router;