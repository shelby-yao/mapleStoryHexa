<template>
    <div class="d-flex gap-1">
        <select v-model="limit" aria-label="Default select example"
                class="form-select">
            <option
                v-for="i in [10,20,30,40,50]"
                :value="i">{{ i }}
            </option>
        </select>
        <nav aria-label="Page navigation example">
            <ul class="pagination mb-0">
                <li class="page-item">
                    <a aria-label="Previous" class="page-link"
                       @click="page=1">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                <li v-for="i in createBtn()" class="page-item">
                    <a :class="page===i?'active':''"
                       class="page-link"
                       @click="page=i">{{ i }}</a>
                </li>

                <li class="page-item">
                    <a aria-label="Next" class="page-link"
                       @click="page=Math.ceil(dataCount/limit)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";

const props = defineProps(["dataCount"])
const emits = defineEmits(["pageChange"])
const limit = ref(10)
const page = ref(1)

// changePage emits輸出事件 <br>
// {limit:Number, page:Number}
const changePage = (Page) => {
    if (Page) {
        page.value = Page
    }

    emits("pageChange", {
        limit: limit.value,
        page: page.value
    })
}

// 創建按鈕
const createBtn = () => {
    const buttons = [];

    // pageCount page 總數
    const pageCount = Math.ceil(props.dataCount / limit.value)
    // numButtons btn最大顯示數量
    const numButtons = Math.min(pageCount, 5);
    // startPage 顯示出的第一筆頁碼
    const startPage = Math.max(1, Math.min(page.value - 2, pageCount - 4));

    for (let i = 0; i < numButtons; i++) {
        buttons.push(startPage + i);
    }

    return buttons;
}

watch(page, v => {
    createBtn()
})

watch(page, v => {
    changePage()
})

watch(limit, _ => {
    changePage(1)
})

onMounted(() => {
    changePage(1)
})
</script>

<style lang="scss" scoped>
.form-select:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.05rem rgba(13, 110, 253, .25);
}

.page-link {
    cursor: pointer;
}
</style>