import { createRouter, createWebHistory} from 'vue-router'
import Login from '../components/logIn/Login.vue'
import Artikli from '../components/artikli/Artikli.vue'
import LogOut from '../components/logOut/LogOut.vue'
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
    ]
})
router.beforeEach((to,from, next) => {
    const token = localStorage.getItem('token')

    if (to.name === 'Register' && !token) next();
    else if(to.name !== 'Login' && !token) next({ name: 'Login'});
    else if((to.name === 'Login' || to.name === 'Register') && token) next ({name: 'Artikli'})
    else next();
})
export default router;