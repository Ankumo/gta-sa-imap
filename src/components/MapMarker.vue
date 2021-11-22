<template>
    <div 
        :class="['marker', item.type, {found: isFound}]"
        :style="{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `scale(${1 / this.$store.state.zoom}) translate(-50%, -100%)`
        }"
        :title="item.desc"
        @mousedown.left="prevent"
        @click.left="clicked"
    >
        <AppIcon name="marker" class="marker-icon" />
        <AppIcon :name="item.type" class="type-icon" :key="item.type" />
    </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import dict from '@/lib/dict.json';

export default {
    components: {
        AppIcon
    },
    props: {
        item: Object,
        index: Number
    },
    methods: {
        prevent(e) {
            e.stopPropagation();
        },
        clicked(e) {
            e.stopImmediatePropagation();

            if (this.createMode || this.index === undefined) {
                return;
            }

            if (process.env.NODE_ENV === 'development' && e.ctrlKey) {
                this.$store.commit('setActivePoint', {
                    idx: this.index,
                    point: this.item
                });

                this.$store.commit('setCreateMode', true);
            } else {
                this.$store.dispatch('toggleFound', {
                    key: this.item.type,
                    idx: this.index
                });

                if (this.found[this.item.type].length === dict[this.item.type].length) {
                    this.$store.dispatch('toggleVisible', this.item.type);
                }
            }
        }
    },
    computed: {
        createMode() {
            return this.$store.state.createMode;
        },
        found() {
            return this.$store.state.found;
        },
        isFound() {
            const activePoint = this.$store.state.activePoint;

            if (this.index === undefined || 
                (this.createMode && this.item.type === activePoint.point.type && activePoint.idx === this.index)) {
                return false;
            }

            return this.found[this.item.type].includes(this.index);
        }
    }
}
</script>

<style scoped>
    .marker {
        transform-origin: left top;
        width: 30px;
        height: 40px;
        position: absolute;
        cursor: pointer;
        transition: opacity .5s;
        pointer-events: all;
    }

    .marker.found {
        opacity: .2;
    }

    .marker:hover {
        z-index: 15;
    }

    .marker.found:hover {
        opacity: .6;
    }

    .marker-icon {
        width: 100%;
        height: 100%;
        overflow: visible;
    }   

    .clam .marker-icon::v-deep * {
        fill: #efd1e8;
        stroke: black;
        stroke-width: 15px;
        stroke-dasharray: 5000, 5000;
        stroke-linejoin: round;
    }

    .graffiti .marker-icon::v-deep * {
        fill: #0e9f15;
        stroke: #4600db;
        stroke-width: 15px;
        stroke-dasharray: 5000, 5000;
        stroke-linejoin: round;
    }

    .photo .marker-icon::v-deep * {
        fill: #012e76;
        stroke: white;
        stroke-width: 15px;
        stroke-dasharray: 5000, 5000;
        stroke-linejoin: round;
    }

    .horseshoe .marker-icon::v-deep * {
        fill: #f5a840;
        stroke: black;
        stroke-width: 15px;
        stroke-dasharray: 5000, 5000;
        stroke-linejoin: round;
    }

    .tramp .marker-icon::v-deep * {
        fill: #ecf317;
        stroke: black;
        stroke-width: 15px;
        stroke-dasharray: 5000, 5000;
        stroke-linejoin: round;
    }

    .type-icon {
        position: absolute;
        top: 13%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 22px;
        height: 22px;
    }

    .type-icon::v-deep * {
        fill: black;
    }

    .graffiti .type-icon {
        width: 17px;
        height: 17px;
        top: 14%;
    }

    .graffiti .type-icon::v-deep * {
        fill: #4600db;
    }

    .photo .type-icon::v-deep * {
        fill: white;
    }

    .horseshoe .type-icon {
        width: 20px;
        height: 20px;
        top: 14%;
    }

    .photo .type-icon {
        width: 18px;
        height: 18px;
        top: 13%;
    }

    .tramp .type-icon {
        width: 22px;
        height: 22px;
        top: 10%;
    }
</style>