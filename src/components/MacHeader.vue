<template>
    <div id="bg-header" v-if="headerShow">
        <div class="bg-header-left">
            <div class="dian" style="background-color: #fa555b; margin-left: 16px"></div>
            <div class="dian" style="background-color: rgb(226 197 36);"></div>
            <div class="dian" style="background-color: #2dd644;"></div>
        </div>
        <div class="bg-header-right" @click="onCopy">
            <svg t="1717503729806" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="16" height="16"><path d="M746.932 698.108" fill="#ffffff" p-id="1457"></path><path d="M925.731 288.698c-1.261-1.18-3.607-3.272-6.902-6.343-5.486-5.112-11.615-10.758-18.236-16.891-18.921-17.526-38.003-35.028-56.046-51.397-2.038-1.848-2.038-1.835-4.077-3.682-24.075-21.795-44.156-39.556-58.996-52.076-8.682-7.325-15.517-12.807-20.539-16.426-3.333-2.402-6.043-4.13-8.715-5.396-3.365-1.595-6.48-2.566-10.905-2.483C729.478 134.227 720 143.77 720 155.734l0 42.475 0 42.475 0 84.95L720 347l21.205 0L890 347l0 595L358.689 942C323.429 942 295 913.132 295 877.922L295 177l361.205 0c11.736 0 21.25-9.771 21.25-21.5s-9.514-21.5-21.25-21.5l-382.5 0L252 134l0 21.734L252 813l-52.421 0C166.646 813 140 786.928 140 754.678L140 72l566.286 0C739.29 72 766 98.154 766 130.404L766 134l40 0 0-3.596C806 76.596 761.271 33 706.286 33L119.958 33 100 33l0 19.506 0 702.172C100 808.463 144.642 852 199.579 852L252 852l0 25.922C252 936.612 299.979 984 358.689 984l552.515 0L932 984l0-21.237L932 325.635 932 304l0.433 0C932.432 299 930.196 292.878 925.731 288.698zM762 304l0-63.315L762 198.21l0-0.273c14 11.479 30.3 26.369 49.711 43.942 2.022 1.832 2.136 1.832 4.157 3.665 17.923 16.259 36.957 33.492 55.779 50.926 2.878 2.666 5.713 5.531 8.391 7.531L762 304.001z" fill="#ffffff" p-id="1458"></path><path d="M816.936 436 407.295 436c-10.996 0-19.91 8.727-19.91 19.5 0 10.77 8.914 19.5 19.91 19.5l409.641 0c11 0 19.914-8.73 19.914-19.5C836.85 444.727 827.936 436 816.936 436z" fill="#ffffff" p-id="1459"></path><path d="M816.936 553 407.295 553c-10.996 0-19.91 8.727-19.91 19.5 0 10.774 8.914 19.5 19.91 19.5l409.641 0c11 0 19.914-8.726 19.914-19.5C836.85 561.727 827.936 553 816.936 553z" fill="#ffffff" p-id="1460"></path><path d="M816.936 689 407.295 689c-10.996 0-19.91 8.729-19.91 19.503 0 10.769 8.914 19.497 19.91 19.497l409.641 0c11 0 19.914-8.729 19.914-19.497C836.85 697.729 827.936 689 816.936 689z" fill="#ffffff" p-id="1461"></path></svg>
        </div>
    </div>
</template>
<script>
import {copy} from "../common/Contant"
export default {
    name: "MacHeader",
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
<style>
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
</style>
