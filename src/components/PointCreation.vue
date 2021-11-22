<template>
    <div class="point-creation">
        <div class="grid">
            <AppInput 
                :value="item.x" 
                placeholder="X" 
                type="number"
                @input="setItemField('x', $event)"
            />
            <AppInput 
                :value="item.y" 
                placeholder="Y" 
                type="number"
                @input="setItemField('y', $event)"
            />
            <AppSelect 
                :options="typeOptions" 
                :value="item.type" 
                :disabled="activePoint.idx !== undefined"
                @input="setItemField('type', $event)"
            />
            <AppButton @click.left.native="$store.commit('setCreateMode', false)">
                Cancel
            </AppButton>
            <AppInput 
                multiline 
                :value="item.desc" 
                class="desc" 
                rows="3"
                placeholder="Description"
                @input="setItemField('desc', $event)"
            />
            <AppButton @click.left.native="save">
                Save
            </AppButton>
        </div>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import AppSelect from '@/components/AppSelect';
import { Objectives } from '@/lib/constants';
import pointCall from '../lib/dev';

export default {
    components: {
        AppButton,
        AppInput,
        AppSelect
    },
    methods: {
        async save() {
            const type = this.activePoint.idx === undefined ? 'add' : 'edit';
            const result = await pointCall(type, this.activePoint);

            console.log(type, this.activePoint, result);

            this.$store.commit('setCreateMode', false);
        },
        setItemField(type, value) {
            this.$store.commit('mergeActivePoint', {[type]: value});
        }
    },
    computed: {
        typeOptions() {
            return [{
                value: null,
                text: 'Choose type',
                disabled: true
            }, 
            ...Object.entries(Objectives).map(([k, v]) => ({
                value: v,
                text: k
            }))];
        },
        activePoint() {
            return this.$store.state.activePoint;
        },
        item() {
            return this.activePoint.point;
        }
    }
}
</script>

<style scoped>
    .point-creation {
        background: white;
        border-radius: 8px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .4);
        padding: 1rem;
    }

    .grid {
        width: 470px;
        display: grid;
        grid-gap: 1rem;
        align-items: center;
        grid-template-columns: 1fr 1fr 2fr auto;
    }

    .grid input,
    .grid textarea {
        min-width: 0;
    }

    .grid .btn {
        padding: .5rem .75rem;
        justify-content: center;
    }

    .desc {
        grid-column: 1 / 4;
    }
</style>