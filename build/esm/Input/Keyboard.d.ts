import { Event } from '../index.js';
import { Shortcut } from './Keyboard/Shortcut.js';
export declare class Keyboard extends Event.Dispatcher {
    static instance: Keyboard;
    protected shortcut: Shortcut;
}
declare const _default: Keyboard;
export default _default;
