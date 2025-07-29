<template>
    <div class="layout">
        <div id="header">
            <Header></Header>
        </div>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

import Header from "@/components/Header.vue";
export default {
    name: 'Layout',
    components: {
        Header
    }
}
</script>
<style>
.layout{
    //flex-grow: 1;
    width: 100%;
}
#content{
    height: 90%;
    display: flex;
}

</style>
