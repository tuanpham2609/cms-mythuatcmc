<<template>
    <div>
        <h2>day la trang 404</h2>
    </div>
</template>
<script>
export default {
    created(){
        var vm = this;
        setTimeout(function(){
            vm.$store.state.loading = false
        },500)
    }
}
</script>