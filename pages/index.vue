<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="padding:10px; float:left">
      <router-link :to="`/home/${home.objectID}`"><home-card :home="home" /></router-link>
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes"

export default {
    data(){
        return {
            homes: homes.slice(0,3)
        }
    },
    head(){
        return {
        title: "Homepage",
        meta:[{
            name: "description",
            content: "This is my Homepage!",
            hid: "description"
        }]
        }
    }
}
</script>