<template>
  <div >
   <h2>Signin</h2>
   <form @submit.prevent="submit">
        <div>
            <label for="email">email</label>
            <input class="form-control" type="text" name="email" v-model="form.email">
        </div>
        <div>
            <label for="password">password</label>
            <input class="form-control" type="text" name="password" v-model="form.password">
        </div>
        <div><button type="submit" class="btn btn-primary">SignIn</button></div>
   </form>
  </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                form: {
                    email:'',
                    password:''
                }
            }
        },
        methods: {
            ...mapActions({
                signIn: 'auth/signIn'
            }),
            submit(){
               this.signIn(this.form).then(()=>{
                   this.$router.replace({
                       name: 'Dashboard'
                   })
               }); 
            }
        },
    }
</script>