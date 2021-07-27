<template>
  <div style="margin:20px">
    <h1>Some nice homes</h1>
    <div v-for="home in homes" :key="home.objectID" style="float:left">
      <home-card :home="home" />
    </div>
  </div>
</template>

<script>
  import homes from "~/data/homes"
  /* import HomeCard from "~/components/HomeCard" */ 

  export default {
  /*  components: {
        HomeCard,
    }, */
    data(){
      return {
        homes: homes.slice(0,3)
      }
    }
  }
</script>