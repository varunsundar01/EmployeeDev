<template>
  <div class="nav-wrapper">
    <div class="main-nav">
      <router-link to="/" class="nav-brand"></router-link>

      <ul class="nav-right">
        <li class="nav-item-right">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="nav-item-right">
          <router-link to="/process-details">Submit Project</router-link>
        </li>
        <li class="nav-item-right">
          <router-link to="/projects">View All Projects</router-link>
        </li>
        <li class="nav-item-right">
          <base-button primaryVisible="true" @toNext="toNext">
            <template v-slot:primary>Sign In</template>
          </base-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  setup() {
    const router = useRouter();

    function toNext() {
      router.push('/sign-in');
    }

    return {
      toNext
    }
  }
}
</script>

<style scoped>
.nav-wrapper {
  background-color: var(--background);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  max-width: 1260px;
}

.nav-brand {
  padding: 0;
  background-image: url("~@/assets/images/EmployeeDev Logo.svg");
  height: 65px;
  width: 200px;
  background-repeat: no-repeat;
  background-position: left center;
}

.nav-list,
.nav-right {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item,
.nav-item-right {
  margin: auto 1em;
  font-weight: 300;
  padding: 0.5em 0;
  margin: 0 2em 0 0;
  font-size: 1.1em;
}

.nav-item-right a {
  color: var(--secondary);
  font-weight: 300;
  transition: none;
}

.nav-item-right a::after {
  display: block;
  content: "";
  border-bottom: 1.25px solid var(--secondary-variant);
  transform: scaleX(0);
  transition: all 0.25s ease-in-out;
  transform-origin: 0% 50%;
}

.nav-item-right a:hover::after {
  border-bottom: 1.25px solid var(--secondary-variant);
  transform: scaleX(1);
}

.active {
  border-bottom: 2px solid #2a9d8f;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .nav-item {
    margin: auto 1em;
  }
}
</style>
