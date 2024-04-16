<template>
    <div :style="`min-height: ${height}`" ref="pQuill">

    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Quill from "quill";

const pQuill = ref(null)

const props = defineProps({
    content: {
        type: String,
        default: ""
    },
    readonly: {
        type: Boolean,
        default: false
    },
    height:{
        type:String,
        default:"300px"
    }
})

const myQuill = ref(null)

const getValue = () => {
    return myQuill.value.root.innerHTML
}

const clear = () => {
    myQuill.value.root.innerHTML = ""
}


const setContent = e => {
    myQuill.value.root.innerHTML = e
}

const initQuill = () => {

    myQuill.value = function () {
        if (props.readonly) {
            return new Quill(pQuill.value,{})
        } else {
            return new Quill(pQuill.value, {
                theme: "snow", // 模板
                modules: {
                    toolbar: [
                        // 工具列列表[註1]
                        ['bold', 'italic', 'underline', 'strike'], // 粗體、斜體、底線和刪節線
                        ['link'],
                        // ['blockquote', 'code-block'], // 區塊、程式區塊
                        // [{ 'header': 1 }, { 'header': 2 }], // 標題1、標題2
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }], // 清單
                        // [{ 'script': 'sub'}, { 'script': 'super' }], // 上標、下標
                        [{ 'indent': '-1'}, { 'indent': '+1' }], // 縮排
                        // [{ 'direction': 'rtl' }], // 文字方向
                        [{'size': ['small', false, 'large', 'huge']}], // 文字大小
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],// 標題
                        [{'color': []}, {'background': []}], // 顏色
                        // [{ 'font': [] }], // 字體
                        [{ 'align': [] }], // 文字方向
                        ['clean'] // 清除文字格是
                    ]
                }
            });
        }
    }()


    if (props.content !== "") {
        myQuill.value.root.innerHTML = props.content
    }
}

defineExpose({getValue, clear, setContent})

onMounted(() => {
    initQuill()
})
</script>

<style lang="scss" scoped>

</style>