<template>
  <div class="loading">
    <div class="spinner"></div>
  </div>
</template>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  place-items: center;
  height: 70vh;
}

.spinner {
  display: inline;
}
.spinner::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  height: 60px;
  width: 60px;
  margin-top: -30px;
  margin-left: -30px;
  border-radius: 50%;
  border: 2px solid var(--inactive);
  border-top-color: var(--primary);
  -webkit-animation: spinner 0.7s linear infinite;
  animation: spinner-1 0.7s linear infinite;
}

@keyframes spinner-1 {
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spinner-1 {
  to {
    transform: rotate(360deg);
  }
}
</style>
