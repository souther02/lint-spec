<template>
  <div style="margin: 20px">
    <textarea>{{ value }}</textarea>
  </div>
</template>

<script lang="js">
export default {
  data() {
    const bo = import('./foo');
    return {
      value: 'value',
    };
  },
};
</script>

<!-- <script setup lang="js">
import { ref } from 'vue'
import bo from './foo';

const value = ref('value')
</script> -->

<!-- <script setup>
import { ref } from 'vue';

const msg = ref('Hello World!');
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <input v-model="msg" />
  </div>
</template> -->
