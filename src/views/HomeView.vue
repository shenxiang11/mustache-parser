<script setup lang="ts">
import parser from "@/utils/mustache-parser";
import {computed, ref} from "vue";

const strTpl = ref('全民制作人大家好，我是练习时长{{time}}的个人练习生{{name}}。喜欢{{likes}}。')
const texts = computed(() => parser(strTpl.value));

const variableTables: Record<string, any> = {
  name: '蔡徐坤',
  likes: '唱、跳、rap、篮球',
  time: '两年半',
}
</script>

<template>
  <main>
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">填写模版：</label>
    <textarea id="message" v-model="strTpl" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..."></textarea>
    <br>
    <h5>元数据</h5>
    <div>{{JSON.stringify(variableTables)}}</div>
    <br>
    <h5>生成结果</h5>
    <div>
      <template v-for="(item, index) in texts" :key="index">
        <span :class="{
          'text-sky-500': item.type === 'variable'
        }">{{item.type === 'variable' ? (variableTables[item.text] ?? '') : item.text}}</span>
      </template>
    </div>

  </main>
</template>
