<template>
    <div id="root">
        <LandingPage />
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
import LandingPage from "@/components/LandingPage.vue";
export default {
    name: 'ElectronRobot',
    components: {LandingPage}
};
</script>

<style>
/* CSS */

body {
    height: 100vh;
}
#root {
    /* padding: 50px 0; */
}
</style>
