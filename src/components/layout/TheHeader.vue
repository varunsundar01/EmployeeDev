<template>
  <div class="nav-wrapper">
    <div class="main-nav">
      <div class="nav-brand-wrapper">
        <router-link to="/" class="nav-brand"></router-link>
        <i @click="showNavBar" class="icon-menu"></i>
      </div>

      <ul class="nav-right" :class="{ show: showNav }">
        <li
          class="nav-item-right"
          v-if="$store.getters['auth/isAuthenticated']"
          @click="hideNav"
        >
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li
          class="nav-item-right"
          v-if="$store.getters['auth/isAuthenticated']"
          @click="hideNav"
        >
          <router-link to="/process-details">Submit Project</router-link>
        </li>
        <li class="nav-item-right" @click="hideNav">
          <router-link to="/projects">View All Projects</router-link>
        </li>
        <li
          class="nav-item-right"
          v-if="!$store.getters['auth/isAuthenticated']"
          @click="hideNav"
        >
          <base-button primaryVisible="true" @toNext="toNext" @click="hideNav">
            <template v-slot:primary>Sign In</template>
          </base-button>
        </li>
        <li class="nav-item-right" v-else>
          <base-button
            secondaryVisible="true"
            @toBack="logout"
            @click="hideNav"
          >
            <template v-slot:secondary>Logout</template>
          </base-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    let showNav = ref(false);

    function toNext() {
      router.push("/sign-in");
    }

    function logout() {
      store.dispatch("auth/logout");
    }

    function showNavBar() {
      showNav.value = !showNav.value;
    }

    function hideNav() {
      showNav.value = false;
    }

    const firstName = computed(() => {
      return localStorage.getItem("firstName");
    });

    return {
      toNext,
      firstName,
      logout,
      showNavBar,
      showNav,
      hideNav,
    };
  },
};
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

.nav-brand-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

i {
  display: none;
}

.nav-brand {
  padding: 0;
  background-image: url("~@/assets/images/EmployeeDev Logo.svg");
  height: 65px;
  width: 200px;
  background-repeat: no-repeat;
  background-position: left center;
}

.nav-right {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
}

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
  border-bottom: 2px solid var(--active);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .main-nav {
    flex-direction: column;
  }
  .nav-brand-wrapper {
    width: 100%;
    z-index: 10;
    background-color: var(--background);
  }
  .nav-right {
    position: absolute;
    flex-direction: column;
    top: -300%;
    transition: all 0.25s cubic-bezier(0, 0.27, 1, 0.86);
    width: 100%;
    background-color: var(--background);
  }
  .show {
    top: 65px;
    width: 100%;
    background-color: var(--background);
    box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.1);
  }
  .nav-item-right {
    margin: 0;
  }
  i {
    display: block;
    position: absolute;
    top: 12px;
    right: 0px;
    font-size: 1.35em;
    color: var(--secondary);
    cursor: pointer;
  }
}
</style>
