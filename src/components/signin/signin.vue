<template>
    <div>
        <div class="login-page">
            <div class="form-log">
                <h4>Đăng nhập</h4>
                <form @submit.prevent="submit">
                    <div class="form-group">
                        <i class="fa fa-user"></i>
                        <input type="email" class="form-control" placeholder="Email" v-model.trim="$v.form.email.$model">
                        <p class="validation" :class="{ 'validation-active': $v.form.email.$error }" v-if="!$v.form.email.required">
                            Email is không được bỏ trống.
                        </p>
                        <p class="validation" :class="{ 'validation-active': $v.form.email.$error }" v-if="!$v.form.email.email">
                            Email is không đúng định dạng.
                        </p>
                    </div>
                    <div class="form-group">
                        <i class="fa fa-lock"></i>
                        <input type="password" class="form-control" placeholder="Mật khẩu" v-model.trim="$v.form.password.$model">
                        <p class="validation" :class="{ 'validation-active': $v.form.email.$error }" v-if="!$v.form.email.required">
                            Mật khẩu is không được bỏ trống.
                        </p>
                    </div>
                    <button type="submit" class="btn btn-default" :disabled="$v.$invalid">Đăng nhập</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions,mapGetters } from 'vuex';
    import { required, minLength,email } from 'vuelidate/lib/validators';
    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        validations:{
            form: {
                email: {
                    required,email
                },
                password: {
                    required
                }
            }
        },
        computed: {
            ...mapGetters({
                authenticated : 'auth/authenticated',
                user : 'auth/user',
            })
        },
        methods: {
            ...mapActions({
                signIn: 'auth/signIn'
            }),
            submit() {
                this.signIn(this.form).then(() => {
                    if(this.authenticated){
                        this.$router.replace({
                            name: 'Home'
                        })
                    }
                });
            }
        },
    }
</script>