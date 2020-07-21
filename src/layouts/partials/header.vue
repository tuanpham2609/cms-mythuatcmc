<template>
    <div v-if="authenticated">
        <ul :class="(isShow)?'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion':'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">{{user.name}}</a>
            <hr class="sidebar-divider my-0">
            <li class="nav-item">
                <router-link to="/" class="nav-link collapsed">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Home</span>
                </router-link>
            </li>
            <hr class="sidebar-divider my-0">
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Trang chủ</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="admin/cauhinhtrangchu">Cấu hình trang chủ</a>
                        <a class="collapse-item" href="admin/banner">banner</a>
                        <a class="collapse-item" href="admin/cauhinhgiaovien">cấu hình giáo viên</a>
                        <a class="collapse-item" href="admin/cauhinhhocsinh ">cấu hình học sinh</a>
                    </div>
                </div>
            </li>
            <hr class="sidebar-divider">
            <li class="nav-item active">
                <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true"
                    aria-controls="collapsePages">
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Tin tức</span>
                </a>
                <div id="collapsePages" class="collapse show" aria-labelledby="headingPages"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <router-link to="/category" class="collapse-item">Thể loại</router-link>
                        <router-link to="/post" class="collapse-item">Tin tức</router-link>
                    </div>
                </div>
            </li>
            <li class="nav-item">
                <router-link to="/img" class="nav-link" href="admin/vechungtoi">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Quản lí ảnh</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/user" class="nav-link" href="admin/lienhe">
                    <i class="fas fa-heart"></i>
                    <span>Quản lí user</span>
                </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admin/hinhanhchung">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Hình ảnh về chúng tôi</span>
                </a>
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