<template>
<div>
    <p>Admin Page</p>
    <nuxt-child />
</div>
</template>
<script>
import Cookie from "js-cookie"

export default {
    asyncData({ $config, redirect }) {
        if(!Cookie.get($config.auth.cookieName))
        redirect("/no-access/")
    }
}
</script>