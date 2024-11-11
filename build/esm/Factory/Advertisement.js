import * as Collection from '../Collection';
import * as Model from '../Model';
import { Constants } from '@chalkysticks/sdk-core';
export function model() {
    return new Model.Advertisement(undefined, {
        baseUrl: Constants.API_URL_V1,
    });
}
export function collection() {
    const collection = new Collection.Advertisement({
        baseUrl: Constants.API_URL_V1,
    });
    return collection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWR2ZXJ0aXNlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9GYWN0b3J5L0FkdmVydGlzZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFVBQVUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxLQUFLLEtBQUssTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBS25ELE1BQU0sVUFBVSxLQUFLO0lBQ3BCLE9BQU8sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtRQUN6QyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUtELE1BQU0sVUFBVSxVQUFVO0lBQ3pCLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUMvQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVU7S0FDN0IsQ0FBQyxDQUFDO0lBRUgsT0FBTyxVQUFVLENBQUM7QUFDbkIsQ0FBQyJ9