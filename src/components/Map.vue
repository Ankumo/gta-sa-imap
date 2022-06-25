<template>
    <div class="map-container">
        <div
            class="map-wrapper"
            :class="{ dragging, editing: $store.state.createMode }"
            :style="{
                transform: `scale(${zoom})`,
                width: `${W}px`,
                height: `${H}px`,
                left: `${pos.x}px`,
                top: `${pos.y}px`,
            }"
            @mousedown.left="mapMouseDown"
            @click.left="mapClick"
        >
            <img class="map" draggable="false" src="@/assets/img/map.jpg" />
            <MapMarkers />
        </div>
    </div>
</template>

<script>
import { W, H, ZOOM_STEP, MIN_ZOOM, MAX_ZOOM } from '@/lib/constants';
import MapMarkers from '@/components/MapMarkers';

export default {
    components: {
        MapMarkers,
    },
    data() {
        return {
            dragging: false,
            moved: false,
            W,
            H,
        };
    },
    methods: {
        movePos(x, y) {
            x += this.pos.x;
            y += this.pos.y;

            if (x > window.innerWidth / 2) {
                x = window.innerWidth / 2;
            }

            if (x < window.innerWidth / 2 - W * this.zoom) {
                x = window.innerWidth / 2 - W * this.zoom;
            }

            if (y > window.innerHeight / 2) {
                y = window.innerHeight / 2;
            }

            if (y < window.innerHeight / 2 - H * this.zoom) {
                y = window.innerHeight / 2 - H * this.zoom;
            }

            this.pos = { x, y };
        },
        getMapPoint(clientX, clientY) {
            return {
                x: (clientX - this.pos.x) / this.zoom,
                y: (clientY - this.pos.y) / this.zoom,
            };
        },
        windowMouseUp() {
            this.dragging = false;
        },
        windowWheel(e) {
            const direction = e.deltaY < 0;
            this.setZoom(direction);
        },
        windowMouseMove(e) {
            if (!this.dragging) {
                return;
            }

            this.moved = true;
            this.movePos(e.movementX, e.movementY);
        },
        mapMouseDown() {
            this.dragging = true;
        },
        mapClick(e) {
            if (this.moved) {
                this.moved = false;
                return;
            }

            if (
                process.env.NODE_ENV !== 'development' ||
                !this.$store.state.createMode
            ) {
                return;
            }

            const coords = this.getMapPoint(e.clientX, e.clientY);

            coords.x = Math.floor(coords.x * 100) / 100;
            coords.y = Math.floor(coords.y * 100) / 100;

            this.$store.commit('mergeActivePoint', coords);
        },
        setZoom(direction) {
            let newZoom = direction
                ? this.zoom + ZOOM_STEP
                : this.zoom - ZOOM_STEP;

            if (newZoom > MAX_ZOOM) {
                newZoom = MAX_ZOOM;
            } else if (newZoom < MIN_ZOOM) {
                newZoom = MIN_ZOOM;
            }

            if (newZoom === this.zoom) {
                return;
            }

            const centerPoint = this.getMapPoint(
                window.innerWidth / 2,
                window.innerHeight / 2,
            );

            this.zoom = newZoom;

            const centerPointNew = this.getMapPoint(
                window.innerWidth / 2,
                window.innerHeight / 2,
            );

            const d = {
                x: (centerPointNew.x - centerPoint.x) * newZoom,
                y: (centerPointNew.y - centerPoint.y) * newZoom,
            };

            this.movePos(d.x, d.y);
        },
        zoomIn() {
            this.setZoom(true);
        },
        zoomOut() {
            this.setZoom(false);
        },
    },
    computed: {
        zoom: {
            get() {
                return this.$store.state.zoom;
            },
            set(value) {
                this.$store.commit('setZoom', value);
            },
        },
        pos: {
            get() {
                return this.$store.state.mapPos;
            },
            set(value) {
                this.$store.commit('setMapPos', value);
            },
        },
    },
    mounted() {
        window.addEventListener('mouseup', this.windowMouseUp);
        window.addEventListener('wheel', this.windowWheel);
        window.addEventListener('mousemove', this.windowMouseMove);
        this.$eventBus.$on('zoomIn', this.zoomIn);
        this.$eventBus.$on('zoomOut', this.zoomOut);
    },
    destroyed() {
        window.removeEventListener('mouseup', this.windowMouseUp);
        window.removeEventListener('wheel', this.windowWheel);
        window.removeEventListener('mousemove', this.windowMouseMove);
        this.$eventBus.$off('zoomIn', this.zoomIn);
        this.$eventBus.$off('zoomOut', this.zoomOut);
    },
};
</script>

<style scoped>
.map-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 2;
}

.map-wrapper {
    position: absolute;
    transform-origin: left top;
    cursor: grab;
}

.map-wrapper.dragging {
    cursor: grabbing;
}

.map-wrapper.editing {
    cursor: default;
}

.map {
    display: block;
}
</style>
