import { writable } from "svelte/store"

type AppState = 
    'no-files' |
    'no-files.dragging' |
    'no-files.error' |
    'pick-format' |
    'load-module' |
    'load-module.error' |
    'converting' |
    'done';

const appState = writable<AppState>('no-files');

export default appState;