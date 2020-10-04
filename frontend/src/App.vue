<template>
  <div id="app">
    <input v-model="message" placeholder="Type Command Here">
    <input v-model="nickName" placeholder="Type Name Here">
    <button @click="doCommand()">Submit</button>
    <br><br>
    <button @click="check()">Check Value in DB</button>
    <div v-for="item in out">
      <h1>{{item.name + ' ' +item.cmd}}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'App',
  data(){
    return {
      message: "",
      cmd:"",
      //value:"",
      //name:"",
      out:[]
    }
  },
  methods: {
    async doCommand() {
      this.cmd = this.message;
      const payload = {'cmd':this.message, 'name':this.nickName}
      console.log(payload)
      const res = await axios.post('http://localhost:8000/command',payload)
      console.log(res)
    },
    async check(){
      const res = await axios.get('http://localhost:8000/check')
      this.out = res.data
      //this.value = res.data.cmd
      //this.name = res.data.name
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>