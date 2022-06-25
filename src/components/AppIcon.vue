<template>
    <component :is="cmp" />
</template>

<script>
export default {
    props: {
        name: String,
        fallback: String,
    },
    computed: {
        cmp() {
            return () =>
                import(
                    /* webpackChunkName: "icons" */
                    /* webpackMode: "lazy-once" */
                    `../assets/img/${this.name}.svg`
                )
                    .then((m) => m.default)
                    .catch((err) =>
                        import(
                            /* webpackChunkName: "icons" */
                            /* webpackMode: "lazy-once" */
                            `../assets/img/${this.fallback}.svg`
                        ),
                    );
        },
    },
};
</script>
