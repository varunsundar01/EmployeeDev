<template>
    <div class="hero-section">
        <h1>EmployeeDev Portal</h1>
        <p>Continuous Improvement and Learning propels are our core assets that drive growth</p>
        <p>Sign in to submit your proposed process improvement methods and strategies</p>
        <p>***PlaceHolder Image***</p>
        <base-button primaryVisible="true">
            <template v-slot:primary>Sign In</template>
        </base-button>
    </div>
</template>

<style scoped>
.hero-section {
    margin-bottom: 4em;
}
.hero-section h1 {
    font-size: 3em;
    font-weight: 500;
}

.hero-section p {
    font-size: 1.25em;
    font-weight: 300;
}
</style>