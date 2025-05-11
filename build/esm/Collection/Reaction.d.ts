import * as Enum from '../Enum/index.js';
import * as Model from '../Model/index.js';
import { Base } from './Base.js';
import { IAttributes, IDispatcherEvent } from 'restmc';
export declare class Reaction extends Base<Model.Reaction> {
    model: Model.Reaction;
    endpoint: string;
    constructor(options?: IAttributes);
    attachEvents(): void;
    detachEvents(): void;
    get angry(): Reaction;
    get dislike(): Reaction;
    get laugh(): Reaction;
    get like(): Reaction;
    get sad(): Reaction;
    get wow(): Reaction;
    forEntity(entity_type: string, entity_id: number | string): this;
    byType(type: string): this;
    byUser(owner_id: number | string): this;
    favorite(): Promise<Model.Reaction | null>;
    unfavorite(): Promise<boolean | null>;
    addReaction(type: Enum.ReactionType): Promise<Model.Reaction>;
    removeReaction(type: Enum.ReactionType): Promise<boolean>;
    toggleReaction(type: Enum.ReactionType): Promise<void>;
    hasReaction(type: Enum.ReactionType): boolean;
    protected getUser(): Model.User;
    protected Handle_OnAddBeforeSetParentId(e: IDispatcherEvent): Promise<void>;
}
