<template>
  <userForm />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import userForm from './components/UserForm.vue';

@Options({
  components: {
    userForm,
  },
})
export default class App extends Vue { }
</script>
