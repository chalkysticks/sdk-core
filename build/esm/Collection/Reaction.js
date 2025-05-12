import * as Enum from '../Enum/index.js';
import * as Model from '../Model/index.js';
import * as Provider from '../Provider/index.js';
import { Base } from './Base.js';
export class Reaction extends Base {
    constructor(options = {}) {
        super(options, false);
        this.model = new Model.Reaction();
        this.endpoint = 'reactions';
        this.Handle_OnAddAfterSetParentId = this.Handle_OnAddAfterSetParentId.bind(this);
        this.setup(options);
    }
    attachEvents() {
        super.attachEvents();
        this.on('add:after', this.Handle_OnAddAfterSetParentId);
    }
    detachEvents() {
        super.detachEvents();
        this.off('add:after', this.Handle_OnAddAfterSetParentId);
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
        this.setEntity(reactionModel);
        await reactionModel.save();
        return reactionModel;
    }
    async removeReaction(type) {
        const userModel = this.getUser();
        const owner_id = userModel?.id || 0;
        const reactionModel = this.where({
            owner_id,
            type,
        }, true, true);
        if (!reactionModel)
            return false;
        this.ensureToken(this.token || this.options.token);
        this.setEntity(reactionModel);
        await reactionModel.delete();
        this.remove([reactionModel]);
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
    async setEntity(reactionModel) {
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
    async Handle_OnAddAfterSetParentId(e) {
        this.setEntity(e.detail.model);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29sbGVjdGlvbi9SZWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUWpDLE1BQU0sT0FBTyxRQUFTLFNBQVEsSUFBb0I7SUF3QmpELFlBQVksVUFBdUIsRUFBRTtRQUNwQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBbkJoQixVQUFLLEdBQW1CLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBUTdDLGFBQVEsR0FBVyxXQUFXLENBQUM7UUFjckMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBS00sWUFBWTtRQUNsQixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUtNLFlBQVk7UUFDbEIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFVRCxJQUFXLEtBQUs7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBYSxD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