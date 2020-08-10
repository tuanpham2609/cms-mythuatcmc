<template>
    <div v-if="authenticated">
        <ul :class="(isShow)?'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion':'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">{{user.name}}</a>
            <hr class="sidebar-divider my-0">
            <li :class="($route.path == '/')?'active nav-item':'nav-item'">
                <router-link to="/" class="nav-link collapsed">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Home</span>
                </router-link>
            </li>
            <hr class="sidebar-divider my-0">
            <li :class="($route.path == '/comment')?'active nav-item':'nav-item'">
                <router-link to="/comment" class="nav-link">
                    <i class="fas fa-heart"></i>
                    <span>Quản lí comment</span>
                </router-link>
            </li>
            <hr class="sidebar-divider my-0">
            <li :class="($route.path == '/category' || $route.path == '/post')?'active nav-item':'nav-item'">
                <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true"
                    aria-controls="collapsePages">
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Tin tức</span>
                </a>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <router-link to="/category" class="collapse-item">Thể loại</router-link>
                        <router-link to="/post" class="collapse-item">Tin tức</router-link>
                    </div>
                </div>
            </li>
            <hr class="sidebar-divider my-0">
            <li :class="($route.path == '/img')?'active nav-item':'nav-item'">
                <router-link to="/img" class="nav-link">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Quản lí ảnh</span>
                </router-link>
            </li>
            <hr class="sidebar-divider my-0">
            <li :class="($route.path == '/user')?'active nav-item':'nav-item'">
                <router-link to="/user" class="nav-link">
                    <i class="fas fa-heart"></i>
                    <span>Quản lí user</span>
                </router-link>
            </li>
            <hr class="sidebar-divider my-0">
            <li :class="($route.path == '/contact')?'active nav-item':'nav-item'">
                <router-link to="/contact" class="nav-link">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Liên hệ</span>
                </router-link>
            </li>
            <hr class="sidebar-divider d-none d-md-block">
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle" @click="toggleChange()"></button>
            </div>
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
        data() {
            return {
                isShow: true
            }
        },
        methods: {
            toggleChange() {
                this.isShow = !this.isShow;
            }
        },
    }
</script>