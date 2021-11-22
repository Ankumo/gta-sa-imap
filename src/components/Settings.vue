<template>
    <transition name="fade">
        <div 
            class="settings" 
            v-show="opened" 
            @click.left="clickOutside"
        >
            <div class="settings-wrapper">
                <div class="header">
                    <h3>
                        Настройки
                    </h3>
                    <AppIcon 
                        name="times" 
                        class="close"
                        @click.left.native="opened = false" 
                    />
                </div>
                <div class="body">
                    <div class="reset-block">
                        <AppSelect 
                            :options="resetOptions"
                            v-model="resetType"
                        />
                        <AppButton @click.left.native="reset">
                            Сбросить
                        </AppButton>
                    </div>
                    <div class="links">
                        <AppButton 
                            icon="paw" 
                            @click.left.native="openMe" 
                        />
                        <AppButton 
                            icon="github" 
                            @click.left.native="openGithub" 
                        />
                    </div>
                    <span class="credit">
                        GTA:SA Interactable Map v{{$v}} <br>
                        За подсказки и положение меток большое спасибо 
                        <a href="http://gta.riotpixels.com/" target="_blank">RiotPixels</a>
                    </span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import AppSelect from '@/components/AppSelect';
import AppButton from '@/components/AppButton';
import { Objectives, ObjectivesTitles } from '@/lib/constants';

export default {
    components: {
        AppIcon,
        AppSelect,
        AppButton
    },
    computed: {
        opened: {
            get() {
                return this.$store.state.settingsOpened;
            },
            set(value) {
                this.$store.commit('setSettingsOpened', value);
            }
        },
        resetOptions() {
            return [{
                text: 'Все',
                value: 'all'
            }, 
                ...Object.values(Objectives).map(k => ({
                text: ObjectivesTitles[k],
                value: k
            }))];
        }
    },
    data() {
        return {
            resetType: 'all'
        }
    },
    methods: {
        clickOutside(e) {
            if (this.$el !== e.target) {
                return;
            }

            this.opened = false;
        },
        openMe() {
            window.open('https://ankumo.ru/');
        },
        openGithub() {
            window.open('https://github.com/Ankumo/gta-sa-imap');
        },
        reset() {
            const markerTitle = this.resetType === 'all' ? 'все' : ObjectivesTitles[this.resetType];
            const answer = confirm(`Вы действительно желаете сбросить ${markerTitle.toLowerCase()}?`);

            if (!answer) {
                return;
            }

            const found = {...this.$store.state.found};

            if (this.resetType === 'all') {
                Object.keys(found).forEach(k => found[k] = []);
            } else {
                found[this.resetType] = [];
            }

            this.$store.commit('setFound', found);
            this.opened = false;
        }
    }
}
</script>

<style scoped>
    .settings {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0, .35);
        backdrop-filter: blur(7px);
        z-index: 20;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .settings-wrapper {
        width: 400px;
        margin: auto;
        overflow: hidden;
        background: rgba(255, 255, 255, .85);
        border-radius: 8px;
        box-shadow: 0 0 2px 0 black;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, .5);
    }

    .header h3 {
        font-size: 20px;
    }

    .close {
        width: 28px;
        height: 28px;
        opacity: .4;
        cursor: pointer;
        transition: opacity .3s;
    }

    .close:hover {
        opacity: .8;
    }

    .body {
        padding: 2rem 1rem;
    }

    .reset-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .reset-block select {
        flex-grow: 1;
    }

    .links {
        display: flex;
        margin-top: 1rem;
        align-items: center;
        gap: 1rem;
        justify-content: center;
    }

    .credit {
        margin-top: 1rem;
        text-align: center;
        display: block;
        color: rgba(0, 0, 0, .5);
        font-size: 13px;
    }

    .credit a {
        /* text-decoration: none; */
        color: inherit;
    }
</style>