import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
export function model(options = {}) {
    return new Model.Advertisement(undefined, Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
}
export function collection(options = {}) {
    const collection = new Collection.Advertisement(Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
    return collection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWR2ZXJ0aXNlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9GYWN0b3J5L0FkdmVydGlzZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFVBQVUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBTS9DLE1BQU0sVUFBVSxLQUFLLENBQUMsVUFBK0IsRUFBRTtJQUN0RCxPQUFPLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FDN0IsU0FBUyxFQUNULE1BQU0sQ0FBQyxNQUFNLENBQ1o7UUFDQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsRUFDRCxPQUFPLENBQ1AsQ0FDRCxDQUFDO0FBQ0gsQ0FBQztBQU1ELE1BQU0sVUFBVSxVQUFVLENBQUMsVUFBK0IsRUFBRTtJQUMzRCxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQ1o7UUFDQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsRUFDRCxPQUFPLENBQ1AsQ0FDRCxDQUFDO0lBRUYsT0FBTyxVQUFVLENBQUM7QUFDbkIsQ0FBQyJ9