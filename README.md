# 新楓之谷 六轉碎片計算器
由vue3 + vite + bootstrap5 撰寫  
新增rwd 方便手機點選(應該ㄅ)
計算六轉技能進度與計算累積打多少碎片
## Links

網頁地址 [六轉碎片計算器](https://github.com/shelby-yao/mapleStoryHexa/blob/main/hexaSkill.html).

## 後續新增技能
在 skill.vue 底下  
const skill_core = ref([0])  
const proficient_core = ref([0])  
const strengthen_core = ref([0, 0, 0, 0])  
於陣列中新增 0 即可加該技能數量
