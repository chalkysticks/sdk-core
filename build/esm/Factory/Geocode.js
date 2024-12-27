import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
export function model(options = {}) {
    return new Model.Geocode(undefined, Object.assign({
        baseUrl: Constants.API_URL_V1,
    }, options));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9GYWN0b3J5L0dlb2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQU0vQyxNQUFNLFVBQVUsS0FBSyxDQUFDLFVBQStCLEVBQUU7SUFDdEQsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQ3ZCLFNBQVMsRUFDVCxNQUFNLENBQUMsTUFBTSxDQUNaO1FBQ0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVO0tBQzdCLEVBQ0QsT0FBTyxDQUNQLENBQ0QsQ0FBQztBQUNILENBQUMifQ==