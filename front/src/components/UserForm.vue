<template>
  <div class="middle">
    <form @submit.prevent="getUserData">
      <input type="text" v-model="userData.email" required @blur="validateEmail">
      <br>
      <span class="error-text" v-if="msgEmail">{{ msgEmail }}</span>
      <br>
      <input type="text" @input="acceptNumber" v-model="userData.number">
      <br>
      <button>Submit</button>
    </form>
    <div v-if="foundUser.email">
      <span>Email: {{ foundUser.email }}</span>
      <br>
      <span>Number: {{ foundUser.number }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from 'axios';
import { reactive } from 'vue';

interface UserFormDataType {
  email: string,
  number?: string,
}

const API_URL = 'http://localhost:5038';
const emailReg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

export default class UserForm extends Vue {
  userData: UserFormDataType = reactive({
    email: '',
    number: undefined
  })
  foundUser: UserFormDataType = reactive({
    email: '',
    number: undefined
  });
  msgEmail = '';

  getUserData() {
    axios({
      method: 'post',
      url: API_URL + '/api/testapp/GetUser',
      data: this.userData
    }).then((response) => {
      this.foundUser = response.data;
      console.log(this.foundUser)
    }).catch(function (error) {
      console.log(error);
    });
  }
  validateEmail() {
    if (!emailReg.test(this.userData.email)) {
      this.msgEmail = 'Пожалуйста, введите корректный email';
    } else {
      this.msgEmail = '';
    }
  }
  acceptNumber() {
    if (this.userData.number) {
      const realNumber = this.userData.number.replace(/-/gi, '')
      const dashedNumber = realNumber.match(/.{1,2}/g);
      if (dashedNumber)
        this.userData.number = dashedNumber.join('-');
    }

  }
}

</script>

<style scoped>
  .middle {
    text-align: center;
  }
  input {
    width: 200px;
    height: 15px;
    padding: 5px 10px;
    margin-right: 10px;
    margin-bottom: 15px;
  }
  .error-text {
    display: block;
    margin-top: 0px;
  }
  button {
    width: 100px;
    height: 25px;
    font-size: 15px;
  }
</style>
