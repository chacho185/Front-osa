<template>
    <h1></h1>
</template>

<script>

export default {
    created(){
        this.logout()
    },
    methods:{
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>

</style>
