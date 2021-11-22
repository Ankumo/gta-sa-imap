<template>
    <component 
        :is="multiline ? 'textarea' : 'input'" 
        v-bind="$attrs"
        :value="localValue"
        @input="localValue = $event.target.value"
    >
        {{localValue}}
    </component>
</template>

<script>
export default {
    props: {
        value: String | Number,
        multiline: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    }
}
</script>

<style scoped>
    input,
    textarea {
        padding: .75rem;
        background: white;
        border-radius: 8px;
        min-width: 100px;
        font-weight: 500;
        border: none;
        box-shadow: 0 0 2px 0 black;
        resize: none;
    }

    input:focus,
    textarea:focus {
        outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
</style>