<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  background: linear-gradient(90deg, #2f4573 0%, #1f4c83 50%, #2f4573 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.layout {
  max-width: 1200px; /* Максимальна ширина */
  min-width: 360px; /* Мінімальна ширина */
  margin: 0 auto; /* Вирівнювання по центру */
  padding: 0 15px; /* Відступи з боків */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.glass-effect {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
</style>
