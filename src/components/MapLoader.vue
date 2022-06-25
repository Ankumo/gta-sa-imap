<template>
    <div class="map-loader">
        Загрузка карты

        <div class="loader-anim">
            <div />
        </div>
    </div>
</template>

<style scoped>
@keyframes loader {
    from {
        transform: translateX(-150%);
    }

    to {
        transform: translateX(150%);
    }
}

.map-loader {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(7px);
    color: white;
    font-size: 1.5rem;
}

.loader-anim {
    width: 150px;
    height: 4px;
    border-radius: 4px;
    background: white;
    margin-top: 1rem;
    position: relative;
    overflow: hidden;
}

.loader-anim div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(100, 100, 104);
    border-radius: 4px;
    animation: loader 1.75s infinite cubic-bezier(0.25, 0.5, 0.4, 0.65);
}
</style>
