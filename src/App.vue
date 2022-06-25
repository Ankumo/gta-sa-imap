<template>
    <div id="app">
        <Map />
        <Settings />
    </div>
</template>

<script>
import Map from '@/components/Map';
import Settings from '@/components/Settings';
import pointCall from './lib/dev';

export default {
    name: 'App',
    components: {
        Map,
        Settings,
    },
    methods: {
        async keyUp(e) {
            if (
                e.keyCode !== 46 ||
                process.env.NODE_ENV !== 'development' ||
                !this.$store.state.createMode
            ) {
                return;
            }

            const activePoint = this.$store.state.activePoint;

            if (activePoint.idx === undefined) {
                this.$store.commit('setCreateMode', false);
                return;
            }

            const answer = confirm(
                'Are you sure you want to remove this marker?',
            );

            if (answer) {
                const result = await pointCall('delete', activePoint);

                console.log('delete', activePoint, result);

                this.$store.commit('setCreateMode', false);
            }
        },
    },
    mounted() {
        window.addEventListener('keyup', this.keyUp);
    },
    destroyed() {
        window.removeEventListener('keyup', this.keyUp);
    },
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
    font-family: Inter, sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    user-select: none;
}

html,
body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: url('assets/img/bg.jpg');
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave,
.fade-leave-to {
    opacity: 0;
}
</style>
