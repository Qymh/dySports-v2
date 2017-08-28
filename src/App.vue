<template>
  <div id="app">
    <!-- 导航 -->
    <nav-public></nav-public>

    <router-view></router-view>

    <!-- 尾部 -->
    <footer-public></footer-public>
  </div>
</template>

<script>
    // 导航
    import navPublic
    from './components/navPublic'

    import footerPublic
    from './components/footerPublic'

    export default {
        components: {
            navPublic:navPublic,
            footerPublic:footerPublic
        }
    }
</script>

<style lang="scss">
 @import 'style/plug/navPublic.scss';
 @import 'style/plug/footerPublic.scss';
</style>

