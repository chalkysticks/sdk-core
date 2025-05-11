import * as Enum from '../Enum/index.js';
import * as Model from '../Model/index.js';
import * as Provider from '../Provider/index.js';
import { Base } from './Base.js';
export class Reaction extends Base {
    constructor(options = {}) {
        super(options, false);
        this.model = new Model.Reaction();
        this.endpoint = 'reactions';
        this.Handle_OnAddBeforeSetParentId = this.Handle_OnAddBeforeSetParentId.bind(this);
        this.setup(options);
    }
    attachEvents() {
        super.attachEvents();
        this.on('add:before', this.Handle_OnAddBeforeSetParentId);
    }
    detachEvents() {
        super.detachEvents();
        this.off('add:before', this.Handle_OnAddBeforeSetParentId);
    }
    get angry() {
        return this.where({ type: Enum.ReactionType.Angry });
    }
    get dislike() {
        return this.where({ type: Enum.ReactionType.Dislike });
    }
    get laugh() {
        return this.where({ type: Enum.ReactionType.Laugh });
    }
    get like() {
        return this.where({ type: Enum.ReactionType.Like });
    }
    get sad() {
        return this.where({ type: Enum.ReactionType.Sad });
    }
    get wow() {
        return this.where({ type: Enum.ReactionType.Wow });
    }
    forEntity(entity_type, entity_id) {
        this.builder.qp('entity_type', entity_type);
        this.builder.qp('entity_id', entity_id);
        return this;
    }
    byType(type) {
        this.builder.qp('type', type);
        return this;
    }
    byUser(owner_id) {
        this.builder.qp('owner_id', owner_id);
        return this;
    }
    async favorite() {
        return this.addReaction(Enum.ReactionType.Love);
    }
    async unfavorite() {
        return this.removeReaction(Enum.ReactionType.Love);
    }
    async addReaction(type) {
        this.ensureToken(this.token || this.options.token);
        this.add({ type });
        const reactionModel = this.last();
        await reactionModel.save();
        return reactionModel;
    }
    async removeReaction(type) {
        const userModel = this.getUser();
        const owner_id = userModel?.id || 0;
        const reaction = this.where({
            owner_id,
            type,
        }, true, true);
        if (!reaction)
            return false;
        this.ensureToken(this.token || this.options.token);
        await reaction.delete();
        this.remove([reaction]);
        return true;
    }
    async toggleReaction(type) {
        const userModel = this.getUser();
        const owner_id = userModel?.id || 0;
        this.hasReaction(type) ? await this.removeReaction(type) : await this.addReaction(type);
    }
    hasReaction(type) {
        const userModel = this.getUser();
        const owner_id = userModel?.id || 0;
        console.log(userModel, owner_id, this);
        return !!this.where({
            owner_id,
            type,
        }, true, true);
    }
    getUser() {
        const store = Provider.Store.get();
        const userModel = store?.getters['authentication/user'];
        return userModel || new Model.User();
    }
    async Handle_OnAddBeforeSetParentId(e) {
        const reactionModel = e.detail.model;
        const parentEndpoint = reactionModel.parent?.parent?.endpoint;
        let entityType = parentEndpoint || 'content';
        switch (parentEndpoint) {
            case 'venues':
                entityType = 'venue';
                break;
            case 'users':
                entityType = 'user';
                break;
            case 'facts':
                entityType = 'fact';
                break;
        }
        reactionModel.set({
            entity_id: reactionModel.parent?.parent?.id,
            entity_type: entityType,
        });
        reactionModel.cancelModifiedEndpoint();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29sbGVjdGlvbi9SZWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUWpDLE1BQU0sT0FBTyxRQUFTLFNBQVEsSUFBb0I7SUF3QmpELFlBQVksVUFBdUIsRUFBRTtRQUNwQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBbkJoQixVQUFLLEdBQW1CLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBUTdDLGFBQVEsR0FBVyxXQUFXLENBQUM7UUFjckMsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHbkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBS00sWUFBWTtRQUNsQixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUtNLFlBQVk7UUFDbEIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFVRCxJQUFXLEtBQUs7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBYSxD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