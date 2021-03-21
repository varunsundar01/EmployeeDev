<template>
  <div class="nav-wrapper">
    <div class="main-nav">
      <a class="nav-brand" href="/">EmployeeDev</a>
      <ul class="nav-list">
        <li class="nav-item">Process Details</li>
        <li class="nav-item">Benefits &amp; Savings</li>
      </ul>
      <ul class="nav-right">
        <li class="nav-item">Hey, Varun</li>
        <li class="nav-item">
          <base-button secondaryVisible="true">
            <template v-slot:secondary>Logout</template>
          </base-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.nav-wrapper {
  background-color: var(--primary);
  height: 65px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
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
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5em;
  color: var(--secondary);
}

.nav-list,
.nav-right {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item {
  margin-left: 2em;
  font-weight: 300;
  padding: 0;
  margin: 0 2em 0 0;
  font-size: 1em;
}
</style>
