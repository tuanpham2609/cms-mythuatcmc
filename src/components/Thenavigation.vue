<template>
  <div >
   <h2>navigation</h2>
   <ul>
    <template v-if="authenticated">
        <li><router-link :to="{name:'Dashboard'}">Dashboard</router-link></li>
        <li>{{user.name}}</li>
        <li>{{user.email}}</li>
        <li><a href="#" @click.prevent="signOut()">Sign Out</a></li>
    </template>
    <template v-else>
        <li><router-link :to="{name:'Signin'}">Signin</router-link></li>
    </template>
   </ul>
  </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        computed: {
            ...mapGetters({
                authenticated : 'auth/authenticated',
                user : 'auth/user',
            })
        },
        methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),
            signOut(){
                this.signOutAction().then(()=>{
                    this.$router.replace({
                        name: 'Signin'
                    })
                });
            }
        }
    }
</script>