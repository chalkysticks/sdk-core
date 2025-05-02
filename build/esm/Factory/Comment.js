import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
export function model(options = {}) {
    return new Model.Comment(undefined, Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
}
export function collection(options = {}) {
    const collection = new Collection.Comment(Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
    return collection;
}
export function createFor(entity_type, entity_id, body, options = {}) {
    const instance = model(options);
    instance.set({
        entity_type,
        entity_id,
        body,
    });
    return instance;
}
export function createReply(parent_id, body, options = {}) {
    const instance = model(options);
    instance.set({
        body,
        parent_id,
    });
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9GYWN0b3J5L0NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFVBQVUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBTS9DLE1BQU0sVUFBVSxLQUFLLENBQUMsVUFBK0IsRUFBRTtJQUN0RCxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FDdkIsU0FBUyxFQUNULE1BQU0sQ0FBQyxNQUFNLENBQ1o7UUFDQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsRUFDRCxPQUFPLENBQ1AsQ0FDRCxDQUFDO0FBQ0gsQ0FBQztBQU1ELE1BQU0sVUFBVSxVQUFVLENBQUMsVUFBK0IsRUFBRTtJQUMzRCxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQ1o7UUFDQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsRUFDRCxPQUFPLENBQ1AsQ0FDRCxDQUFDO0lBRUYsT0FBTyxVQUFVLENBQUM7QUFDbkIsQ0FBQztBQVdELE1BQU0sVUFBVSxTQUFTLENBQUMsV0FBbUIsRUFBRSxTQUEwQixFQUFFLElBQVksRUFBRSxVQUErQixFQUFFO0lBQ3pILE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ1osV0FBVztRQUNYLFNBQVM7UUFDVCxJQUFJO0tBQ0osQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUM7QUFDakIsQ0FBQztBQVVELE1BQU0sVUFBVSxXQUFXLENBQUMsU0FBMEIsRUFBRSxJQUFZLEVBQUUsVUFBK0IsRUFBRTtJQUN0RyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUNaLElBQUk7UUFDSixTQUFTO0tBQ1QsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUM7QUFDakIsQ0FBQyJ9