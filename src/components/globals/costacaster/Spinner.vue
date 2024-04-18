<template>
    <div class="spinner-overlay">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* Adjust the background color and opacity as needed */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    /* Ensure it's on top of other elements */
}

.spinner {
    border: 4px solid #fff;
    border-top: 4px solid #000;
    /* Black color for the spinner */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>