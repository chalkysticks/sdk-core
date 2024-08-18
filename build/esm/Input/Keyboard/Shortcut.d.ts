import { Event } from '../../index.js';
type TShortcutCallback = () => void;
export interface IShortcutOptions {
    ignoreInputs?: boolean;
}
export declare class Shortcut extends Event.Dispatcher {
    static add(key: string, callback: TShortcutCallback): void;
    static instance: Shortcut;
    protected keymap: Record<string, TShortcutCallback>;
    private attached;
    private keysDown;
    private options;
    constructor(options?: IShortcutOptions);
    add(key: string, callback: TShortcutCallback): void;
    remove(key: string): void;
    protected ensureSetup(): void;
    protected findMatch(): string | undefined;
    protected normalize(key: string): string;
    protected Handle_OnKeyDown(e: KeyboardEvent): void;
    protected Handle_OnKeyUp(e: KeyboardEvent): void;
}
export declare class ShortcutSequencer extends Event.Dispatcher {
    static add(keys: string[], callback: TShortcutCallback): void;
    static remove(keys: string[]): void;
    static instance: ShortcutSequencer;
    protected matches: string[];
    protected sequences: Record<string, TShortcutCallback>;
    protected shortcut: Shortcut;
    constructor();
    add(keys: string[], callback: TShortcutCallback): void;
    remove(keys: string[]): void;
    protected Handle_OnShortcutFound(e: any): Promise<void>;
}
export {};
