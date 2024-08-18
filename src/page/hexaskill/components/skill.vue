<template>
    <div class="container">
        <img class="img-thumbnail mb-3" src="../../../assets/new.png">
        <div class="row">
            <div class="col-12 col-md-7 col-lg-7 border-end">
                <div v-for="(v, i) in skill_core" :key="i" class=" mb-1">
                    <div class="p-2">
                        <div class="mb-2">技能核心{{ i + 1 }}:</div>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-5 mb-2">
                                <input type="range" class="form-range p-2" min="0" max="30" step="1" id="skill_core"
                                    v-model="skill_core[i]">
                            </div>
                            <div class="col-12 col-sm-6 col-md-7">
                                <input type="number" class="w-25" v-model="skill_core[i]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(v, i) in proficient_core" :key="i" class="mb-1">
                    <div class="p-2">
                        <div class="mb-2">精通核心{{ i + 1 }}:</div>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-5 mb-2">
                                <input type="range" class="form-range p-2" min="0" max="30" step="1"
                                    id="proficient_core" v-model="proficient_core[i]">
                            </div>
                            <div class="col-12 col-sm-6 col-md-7">
                                <input type="number" class="w-25" v-model="proficient_core[i]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(v, i) in strengthen_core" :key="i" class="mb-1">
                    <div class="p-2">
                        <div class="mb-2"> 強化核心{{ i + 1 }}:</div>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-5 mb-2">
                                <input type="range" class="form-range p-2" min="0" max="30" step="1"
                                    id="strengthen_core" v-model="strengthen_core[i]">
                            </div>
                            <div class="col-12 col-sm-6 col-md-7">
                                <input type="number" class="w-25" v-model="strengthen_core[i]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-5 col-lg-5">
                <div class="p-3">
                    <div class="mb-2">
                        <div>
                            <img class="img" src="../../../assets/soul.png">靈魂愛爾達 : {{ soul }}
                        </div>
                    </div>
                    <div>
                        <img class="img" src="../../../assets/fragment.png">靈魂愛爾達碎片 : {{ fragments }}
                    </div>
                </div>
                <div class="p-3">
                    <div class="d-flex text-nowrap">
                        <!-- <div class="col"> -->
                            背包碎片 : &nbsp;
                        <!-- </div> -->
                        <!-- <div class="col"> -->
                            <input type="number" class="w-25" v-model="bag_fragment" />
                        <!-- </div> -->
                    </div>
                </div>
                <div class="p-3">
                    <div class="row">
                        <div class="col-12 col-lg-6 mb-2 text-nowrap">碎片進度 : {{ roundTo(progess, 2) }}%</div>
                        <div class="col-12 col-lg-6 text-nowrap">只打每日還有 : {{ Math.ceil(remaining_daily) }}天</div>
                    </div>
                </div>
            </div>
        </div>




    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
const skill_core_fragments = [0, 30, 35, 40, 45, 50, 55, 60, 65, 200, 80, 90, 100, 110, 120, 130, 140, 150, 160, 350, 170, 180, 190, 200, 210, 220, 230, 240, 250, 500]
const skill_core_soul = [0, 1, 1, 1, 2, 2, 2, 3, 3, 10, 3, 3, 4, 4, 4, 4, 4, 4, 5, 15, 5, 5, 5, 5, 5, 6, 6, 6, 7, 20]
const proficient_core_fragments = [50, 15, 18, 20, 23, 25, 28, 30, 33, 100, 40, 45, 50, 55, 60, 65, 70, 75, 80, 175, 85, 90, 95, 100, 105, 110, 115, 120, 125, 250]
const proficient_core_soul = [3, 1, 1, 1, 1, 1, 1, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 3, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10]
const strengthen_core_fragments = [75, 23, 27, 30, 34, 38, 42, 45, 49, 150, 60, 68, 75, 83, 90, 98, 105, 113, 120, 263, 128, 135, 143, 150, 158, 165, 173, 180, 188, 375]
const strengthen_core_soul = [4, 1, 1, 1, 2, 2, 2, 3, 3, 8, 3, 3, 3, 3, 3, 3, 3, 3, 4, 12, 4, 4, 4, 4, 4, 5, 5, 5, 6, 15]

const skill_core = ref([0])
const proficient_core = ref([0, 0])
const strengthen_core = ref([0, 0, 0, 0])
const fragments = ref(0)
const soul = ref(0)
const progess = ref(0)
const bag_fragment = ref(0)
const remaining_daily = ref(0)
var all_fragment = 0
var all_soul = 0

function count() {
    fragments.value = 0
    soul.value = 0
    skill_core.value.forEach(num => {
        if (num < 0) {
        } else if (num > 30) {
            countSkill(30)
        } else {
            countSkill(num)
        }
    });
    proficient_core.value.forEach(num => {
        if (num < 0) {
        } else if (num > 30) {
            countProficient(30)
        } else {
            countProficient(num)
        }
    });
    strengthen_core.value.forEach(num => {
        if (num < 0) {
        } else if (num > 30) {
            countStrengthen(30)
        } else {
            countStrengthen(num)
        }
    });
}
function countSkill(x) {
    for (var i = 0; i < x; i++) {
        fragments.value = fragments.value + skill_core_fragments[i];
        soul.value = soul.value + skill_core_soul[i];
    }
}
function countProficient(x) {
    for (var i = 0; i < x; i++) {
        fragments.value = fragments.value + proficient_core_fragments[i];
        soul.value = soul.value + proficient_core_soul[i];
    }
}
function countStrengthen(x) {
    for (var i = 0; i < x; i++) {
        fragments.value = fragments.value + strengthen_core_fragments[i];
        soul.value = soul.value + strengthen_core_soul[i];
    }
}

function countDailyAndProgess() {
    var temp = 0;
    if (bag_fragment.value > 0) {
        temp = bag_fragment.value
    }
    remaining_daily.value = (all_fragment - (fragments.value + temp)) / 12
    progess.value = (fragments.value + temp) / all_fragment * 100
    if (progess.value > 100) {
        progess.value = 100
    }
}

function checkAll() {
    fragments.value = 0
    soul.value = 0
    skill_core.value.forEach(num => {
        countSkill(30)
    });
    proficient_core.value.forEach(num => {
        countProficient(30)
    });
    strengthen_core.value.forEach(num => {
        countStrengthen(30)
    });
    all_fragment = fragments.value
    all_soul = soul.value
    fragments.value = 0
    soul.value = 0
}

const roundTo = function (num, decimal) { return Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal); }
watch([skill_core.value, proficient_core.value, strengthen_core.value], async (newVal, oldVal) => {
    count()
    countDailyAndProgess()
})
watch(bag_fragment, () => {
    countDailyAndProgess()
})
onMounted(() => {
    checkAll()
    countDailyAndProgess()
})
</script>

<style scoped></style>
