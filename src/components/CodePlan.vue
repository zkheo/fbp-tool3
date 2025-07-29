<template>
    <div class="cp">
        <MacHeader :header-show="headerShow" :value="value"></MacHeader>
        <div id="bg">
            <highlightjs id="hi" v-if="value != ''" :autodetect="true" :code="value"
                         style="overflow-wrap: break-word"></highlightjs>
        </div>
    </div>
</template>
<script>
import {copy} from "../common/Contant"
import MacHeader from "@/components/MacHeader.vue";

export default {
    name: "CodePlan",
    components: {
        MacHeader
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        headerShow: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        onCopy() {
            copy(this.value)
        },
    },
};
</script>

<style scoped>
#bg {
    background-color: #282c34;
    width: 100%;
    height: 100%;
    color: white;
}

#bg-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    border-radius: 10px 10px 0px 0px;
    background-color: #000000;
}
.bg-header-left {
    display: flex;
    align-items: center;
}
.bg-header-right {
    display: flex;
    align-items: center;
    color: white;
    margin-right: 10px;
    cursor: pointer;
}

.dian {
    width: 10px;
    height: 10px;
    border-radius: 50px;
    margin: 0px 3px;
}

#hi {
    white-space: pre-wrap;
    margin: 0px;
}
</style>
