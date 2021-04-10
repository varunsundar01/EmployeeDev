<template>
    <base-card>
        <h1 class="title">Sign In</h1>
        <the-auth></the-auth>
    </base-card>
</template>

<script>
import TheAuth from "../../components/auth/TheAuth.vue";
export default {
    components: {
        TheAuth
    }
}
</script>

<style scoped>
.title {
    margin: 0.5em auto;
}
</style>