<template>
    <div class="overlay">
        <div class="overlay-wrapper">
            <div class="top">
                <div class="legend">
                    <AppButton
                        v-for="k in Object.values(Objectives)"
                        :key="k"
                        :class="{ active: $store.state.visible.includes(k) }"
                        :icon="k"
                        @click.left.native="activate(k)"
                    >
                        {{ ObjectivesTitles[k] }}
                        <CountBadge :type="k" />
                    </AppButton>
                </div>
                <div class="zoom">
                    <AppButton
                        icon="plus"
                        @click.left.native="$eventBus.$emit('zoomIn')"
                    />
                    <AppButton
                        icon="minus"
                        @click.left.native="$eventBus.$emit('zoomOut')"
                    />
                </div>
            </div>
            <div class="settings">
                <AppButton
                    icon="settings"
                    @click.left.native="
                        $store.commit('setSettingsOpened', true)
                    "
                />
            </div>
            <transition name="bot" appear>
                <div
                    v-if="devMode"
                    class="helper"
                    :key="$store.state.createMode"
                >
                    <PointCreation v-if="$store.state.createMode" />
                    <AppButton
                        v-else
                        icon="plus"
                        @click.left.native="createPoint"
                    >
                        Create point
                    </AppButton>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { Objectives, ObjectivesTitles, W, H } from '@/lib/constants';
import AppButton from '@/components/AppButton';
import CountBadge from '@/components/CountBadge';
import PointCreation from '@/components/PointCreation';

export default {
    components: {
        AppButton,
        PointCreation,
        CountBadge,
    },
    data() {
        return {
            Objectives,
            ObjectivesTitles,
            devMode: process.env.NODE_ENV === 'development',
        };
    },
    methods: {
        getIconSrc(k) {
            return require(`@/assets/img/${k}.svg`);
        },
        activate(k) {
            this.$store.dispatch('toggleVisible', k);
        },
        async createPoint() {
            this.$store.commit('setActivePoint', {
                point: {
                    x: W / 2,
                    y: H / 2,
                    type: this.$store.state.lastPointType,
                    desc: '',
                },
                idx: undefined,
            });
            this.$store.commit('setCreateMode', !this.$store.state.createMode);
        },
    },
};
</script>

<style scoped>
.overlay {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    pointer-events: none;
}

.overlay-wrapper {
    width: 100%;
    height: 100%;
}

.overlay-wrapper > div {
    position: absolute;
    pointer-events: all;
}

.legend {
    display: flex;
    align-items: center;
    gap: 1rem;
    pointer-events: all;
}

.top {
    top: 1rem;
    left: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    pointer-events: none !important;
}

.helper {
    bottom: 1rem;
    left: 1rem;
    display: inline-block;
}

.settings {
    bottom: 1rem;
    right: 1rem;
}

.zoom {
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
    pointer-events: all;
}

.bot-enter-active,
.bot-leave-active {
    transition: opacity 0.2s, bottom 0.3s;
}

.bot-enter,
.bot-leave,
.bot-leave-to {
    opacity: 0;
    bottom: -10rem;
}
</style>
