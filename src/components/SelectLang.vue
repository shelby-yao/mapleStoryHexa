<template>
    <div class="dropdown" role="search">
        <a aria-expanded="false" class="dropdown-toggle" data-bs-toggle="dropdown" role="button"
           :style="`color:${color}`">
            <svg :height="iconSize" :width="iconSize" aria-hidden="true" class="iconLanguage_fsPD"
                 viewBox="0 0 24 24">
                <path
                    d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
                    fill="currentColor"></path>
            </svg>
        </a>
        <ul class="dropdown-menu mt-2 dropdown-menu-md-end">
            <li><a class="dropdown-item" @click="$i18n.locale='zh-TW'">繁體中文</a></li>
            <li><a class="dropdown-item" @click="$i18n.locale='zh-CN'">简体中文</a></li>
        </ul>
    </div>
</template>

<script setup>
import {watch} from "vue";
import {useI18n} from "vue-i18n";

const {t, locale} = useI18n()

const props = defineProps({
    iconSize: {
        type: Number,
        default: 21
    },
    color: {
        type: String,
        default: "#fff"
    }
})

watch(locale, v => {
    localStorage.setItem("locale", v)
})
</script>

<style lang="scss" scoped>

</style>