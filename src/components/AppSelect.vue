<template>
    <select v-model="localValue">
        <option v-for="(o, index) in options" :key="index" v-bind="o">
            {{ o.text }}
        </option>
    </select>
</template>

<script>
export default {
    props: {
        value: String | null,
        options: Array,
    },
    computed: {
        localValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>

<style scoped>
select {
    padding: 0.75rem;
    background: white;
    border-radius: 8px;
    min-width: 100px;
    font-weight: 500;
    box-shadow: 0 0 2px 0 black;
    border: none;
}

select:focus {
    outline: none;
}
</style>
