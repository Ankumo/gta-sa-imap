import Vue from 'vue'
import Vuex from 'vuex'
import { Objectives } from './constants'

Vue.use(Vuex);

const objectives = Object.values(Objectives);

export default new Vuex.Store({
    state: {
        mapPos: {
            x: 0,
            y: 0
        },
        zoom: 0.4,
        found: {
            [Objectives.CLAM]: [],
            [Objectives.GRAFFITI]: [],
            [Objectives.HORSESHOE]: [],
            [Objectives.PHOTO]: [],
            [Objectives.TRAMP]: []
        },
        visible: [],
        createMode: false,
        activePoint: null,
        settingsOpened: false,
        lastPointType: objectives[Math.floor(Math.random() * objectives.length)]
    },
    mutations: {
        setZoom(state, payload) {
            state.zoom = payload;

            window.localStorage.setItem('lastZoom', state.zoom);
        },
        setFound(state, payload) {
            state.found = payload;

            window.localStorage.setItem('gmm', JSON.stringify(state.found));
        },
        setVisible(state, payload) {
            state.visible = payload;

            window.localStorage.setItem('lastVisible', JSON.stringify(state.visible));
        },
        setCreateMode(state, payload) {
            state.createMode = payload;
        },
        setActivePoint(state, payload) {
            state.activePoint = payload;

            if (state.activePoint && state.activePoint.point) {
                state.lastPointType = state.activePoint.point.type;
            }
        },
        mergeActivePoint(state, payload) {
            state.activePoint = {...state.activePoint, point: {...state.activePoint.point, ...payload } };
            state.lastPointType = state.activePoint.point.type;
        },
        setMapPos(state, payload) {
            state.mapPos = payload;

            window.localStorage.setItem('lastPos', JSON.stringify(state.mapPos));
        },
        setSettingsOpened(state, payload) {
            state.settingsOpened = payload;
        }
    },
    actions: {
        init({ state, commit }) {
            const foundRaw = window.localStorage.getItem('gmm');
            let found = {};

            try {
                const gmm = JSON.parse(foundRaw);

                Object.keys(gmm).forEach(k => {
                    if (!objectives.includes(k) || !Array.isArray(gmm[k])) {
                        return;
                    }

                    found[k] = gmm[k];
                });
            } catch (err) {
                console.warn('Found resetted');
            }

            commit('setFound', {...state.found, ...found });

            const lastZoom = parseFloat(window.localStorage.getItem('lastZoom'));

            if (!isNaN(lastZoom)) {
                commit('setZoom', lastZoom);
            }

            try {
                const lastPos = JSON.parse(window.localStorage.getItem('lastPos'));

                if (lastPos && lastPos.x && lastPos.y) {
                    commit('setMapPos', lastPos);
                }
            } catch {

            }

            try {
                const lastVisible = JSON.parse(window.localStorage.getItem('lastVisible'));

                if (lastVisible && Array.isArray(lastVisible)) {
                    commit('setVisible', lastVisible);
                }
            } catch {

            }
        },
        toggleFound({ state, commit }, { key, idx }) {
            const found = {...state.found };
            const index = found[key].indexOf(idx);

            if (~index) {
                found[key].splice(index, 1);
            } else {
                found[key].push(idx);
            }

            found[key] = found[key].filter(item => typeof item === 'number');

            commit('setFound', found);
        },
        toggleVisible({ state, commit }, key) {
            const visible = [...state.visible];

            const index = visible.indexOf(key);

            if (~index) {
                visible.splice(index, 1);
            } else {
                visible.push(key);
            }

            commit('setVisible', visible);
        }
    }
})