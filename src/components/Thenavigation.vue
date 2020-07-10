<template>
  <div >
   <h2>navigation</h2>
   <ul>
    <template v-if="authenticated">
        <li><router-link :to="{name:'Dashboard'}">Dashboard</router-link></li>
        <li>{{user.name}}</li>
        <li>{{user.email}}</li>
    </template>
    <template v-else>
        <li><router-link :to="{name:'Signin'}">Signin</router-link></li>
    </template>
   </ul>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters({
                authenticated : 'auth/authenticated',
                user : 'auth/user',
            })
        },
    }
</script>