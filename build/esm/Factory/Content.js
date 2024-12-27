import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
export function model(options = {}) {
    return new Model.Content(undefined, Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
}
export function collection(options = {}) {
    const collection = new Collection.Content(Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
    return collection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9GYWN0b3J5L0NvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFVBQVUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBTS9DLE1BQU0sVUFBVSxLQUFLLENBQUMsVUFBK0IsRUFBRTtJQUN0RCxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FDdkIsU0FBUyxFQUNULE1BQU0sQ0FBQyxNQUFNLENBQ1o7UUFDQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsRUFDRCxPQUFPLENBQ1AsQ0FDRCxDQUFDO0FBQ0gsQ0FBQztBQU1ELE1BQU0sVUFBVSxVQUFVLENBQUMsVUFBK0IsRUFBRTtJQUMzRCxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQ1o7UUFDQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsRUFDRCxPQUFPLENBQ1AsQ0FDRCxDQUFDO0lBRUYsT0FBTyxVQUFVLENBQUM7QUFDbkIsQ0FBQyJ9