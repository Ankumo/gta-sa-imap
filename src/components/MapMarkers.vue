<template>
    <div class="markers">
        <div 
            v-for="(v, k) in dict"
            :key="k"
            :class="['label-field', k]"
            v-show="$store.state.visible.includes(k)"
        >
            <MapMarker 
                v-for="(lb, index) in v"
                :key="index"
                :index="index"
                :item="{...lb, type: k}"
                v-show="showLabel(k, index)"
            />
        </div>
        <div class="label-field new" v-if="createMode">
            <MapMarker :item="activePoint.point" />
        </div>
    </div>
</template>

<script>
import dict from '@/lib/dict.json';
import MapMarker from '@/components/MapMarker';

export default {
    components: {
        MapMarker
    },
    data() {
        return {
            dict
        }
    },
    methods: {
        showLabel(type, index) {
            if (this.createMode && this.activePoint.point.type === type && this.activePoint.idx === index) {
                return false;
            }

            return true;
        }
    },
    computed: {
        activePoint() {
            return this.$store.state.activePoint;
        },
        createMode() {
            return this.$store.state.createMode;
        }
    }
}
</script>

<style scoped>
    .labels {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        pointer-events: none;
    }
</style>