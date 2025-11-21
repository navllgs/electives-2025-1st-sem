<template>
  <div id="main-app">
    <div id="header">
      <span class="logo" @click="goHome()">Header</span>
    </div>
    <div id="main-page">
      <div id="left-navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/about-me">About Me</RouterLink>
      </div>
      <div id="main-content">
        <div id="content">
          <router-view></router-view>
        </div>
        <div id="footer">Footer</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main-app {
  height: 100vh;
  width: 100%;
  background: red;
}

#header {
  height: 60px;
  background: green;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

#main-page {
  background: pink;
  height: calc(100vh - 60px);
  display: flex;
}

#left-navigation {
  background: purple;
  width: 200px;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

#main-content {
  background: teal;
  width: 100%;
}

#content {
  background-color: blueviolet;
  height: calc(100% - 40px);
  padding: 12px;
  overflow-x: hidden;
  overflow-y: auto;
}

#footer {
  padding: 12px;
  height: 40px;
  display: flex;
  align-items: center;
}

.logo:hover {
  scale: 1.1;
  cursor: pointer;
}
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
