<template>
    <div>
        <h2>My Home</h2>
    </div>
</template>

<script>
/* import homes from "~/data/homes" */ 

export default {
    created(){  /* <- Lifecycle Hook */
        console.log(this.$route)
    }
}
</script>