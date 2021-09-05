<template>
    <form @submit.prevent="login">
        <div style="width: 50%; background:white; padding: 5%; border-radius:2%;">
            <div class="mb-3" >
                <label for="username" class="form-label">Username:</label>
                <input type="text" class="form-control" id="username" aria-describedby="emailHelp" v-model="formData.username">
            </div>
            <div class="mb-3">
                <label for="current-password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="current-password" v-model="formData.password">
            </div>
            <button type="submit" class="btn btn-primary">Log In</button>
        </div>
    </form>
</template>

<script>
import axios from '../../axiosConfig'
export default {
    name:'Login',
    data() {
        return{
            formData: {
                username:'',
                password: ''
            }
        }
    },
    methods:{
        async login() {
            await axios
            .post('/api/login',this.formData)
            .then((response) => {
                localStorage.setItem('token',response.data)
                console.log(response.data + ' token')
                this.$router.push({ path: '/artikal' })
            })
            .catch((error)=> {
                console.log(error)
                alert('Niste pravilno unijeli podatke!')
            })
        }
    }

}

</script>

<style scoped>

</style>
