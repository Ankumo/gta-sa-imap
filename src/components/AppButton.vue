<template>
    <div class="btn" :class="{'icon-only': iconOnly}">
        <AppIcon v-if="icon" :name="icon" />
        <slot />
    </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';

export default {
    components: {
        AppIcon
    },
    props: {
        icon: String
    },
    computed: {
        iconOnly() {
            return Object.keys(this.$slots).length === 0;
        }
    }
}
</script>

<style scoped>
    .btn {
        border-radius: 100px;
        padding: .75rem 1rem;
        display: inline-flex;
        align-items: center;
        background: white;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
        gap: .5rem;
        transition: background .3s, box-shadow .3s, color .2s;
    }

    .btn:hover {
        background: #d9d9d9;
        box-shadow: 0 0 7px 0 rgba(0, 0, 0, .5);
    }

    .btn.active {
        background: #848487;
        color: #e5e5e5;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, .6);
    }

    .btn.active svg::v-deep * {
        fill: #e5e5e5;
    }

    .btn svg {
        width: 20px;
        height: 20px;
    }

    .btn.icon-only svg {
        margin-right: 0;
        width: 24px;
        height: 24px;
    }

    .btn.icon-only {
        padding: .8rem;
        border-radius: 100%;
    }
</style>