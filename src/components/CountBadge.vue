<template>
    <span :class="[type, 'count-badge']">
        {{value}} / {{max}}
    </span>
</template>

<script>
import dict from '@/lib/dict.json';

export default {
    props: {
        type: String
    },
    computed: {
        max() {
            return dict[this.type].length;
        },
        value() {
            return this.$store.state.found[this.type].length;
        }
    }
}
</script>

<style scoped>
    .count-badge {
        padding: .25rem .5rem;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 400;
        color: black;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, .3);
        font-variant-numeric: tabular-nums;
    }

    .count-badge.graffiti {
        background: #0e9f15;
        color: #4600db;
    }

    .count-badge.photo {
        background: #012e76;
        color: white;
    }

    .count-badge.clam {
        background: #efd1e8;
    }

    .count-badge.horseshoe {
        background: #f5a840;
    }

    .count-badge.tramp {
        background: #ecf317;
    }
</style>