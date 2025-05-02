import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
export function model(options = {}) {
    return new Model.Reaction(undefined, Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
}
export function collection(options = {}) {
    const collection = new Collection.Reaction(Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
    return collection;
}
export function createFor(entity_type, entity_id, type, options = {}) {
    const instance = model(options);
    instance.set({
        entity_id,
        entity_type,
        type,
    });
    return instance;
}
export function like(entity_type, entity_id, options = {}) {
    return createFor(entity_type, entity_id, 'like', options);
}
export function dislike(entity_type, entity_id, options = {}) {
    return createFor(entity_type, entity_id, 'dislike', options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvRmFjdG9yeS9SZWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssVUFBVSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFNL0MsTUFBTSxVQUFVLEtBQUssQ0FBQyxVQUErQixFQUFFO0lBQ3RELE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUN4QixTQUFTLEVBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FDWjtRQUNDLE9BQU8sRUFBRSxTQUFTLENBQUMsVUFBVTtLQUM3QixFQUNELE9BQU8sQ0FDUCxDQUNELENBQUM7QUFDSCxDQUFDO0FBTUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxVQUErQixFQUFFO0lBQzNELE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FDekMsTUFBTSxDQUFDLE1BQU0sQ0FDWjtRQUNDLE9BQU8sRUFBRSxTQUFTLENBQUMsVUFBVTtLQUM3QixFQUNELE9BQU8sQ0FDUCxDQUNELENBQUM7SUFFRixPQUFPLFVBQVUsQ0FBQztBQUNuQixDQUFDO0FBV0QsTUFBTSxVQUFVLFNBQVMsQ0FBQyxXQUFtQixFQUFFLFNBQTBCLEVBQUUsSUFBWSxFQUFFLFVBQStCLEVBQUU7SUFDekgsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWhDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDWixTQUFTO1FBQ1QsV0FBVztRQUNYLElBQUk7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPLFFBQVEsQ0FBQztBQUNqQixDQUFDO0FBVUQsTUFBTSxVQUFVLElBQUksQ0FBQyxXQUFtQixFQUFFLFNBQTBCLEVBQUUsVUFBK0IsRUFBRTtJQUN0RyxPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBVUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxXQUFtQixFQUFFLFNBQTBCLEVBQUUsVUFBK0IsRUFBRTtJQUN6RyxPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5RCxDQUFDIn0=