<template>
<div class="app-error-page">
    <div style="text-align: center">
        <h1>Oh no, something went wrong!</h1>
        <br>
        <img src="" width="400px" alt="Imagine a beautiful image describing this situation in a hilarious way!" />
        <br><br>
        <p>We apologize for any inconveniences! This issue is reported and will be fixed soon.</p>
        <div style="padding: 20px">
            <h3>Informations</h3>
            <p><b>Error Message:</b> {{ error.message }}</p>
            <p><b>Status Code:</b> {{ error.statusCode }}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            required: true
        }
    },
    head(){
        return {
            title: "An error occured!"
        }
    }
}
</script>