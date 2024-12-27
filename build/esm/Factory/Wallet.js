import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
export function model(options = {}) {
    return new Model.Wallet(undefined, Object.assign({
        baseUrl: Constants.API_URL_V1,
    }, options));
}
export function collection(options = {}) {
    const collection = new Collection.Wallet(Object.assign({
        baseUrl: Constants.API_URL_V1,
    }, options));
    return collection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0ZhY3RvcnkvV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQU0vQyxNQUFNLFVBQVUsS0FBSyxDQUFDLFVBQStCLEVBQUU7SUFDdEQsT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQ3RCLFNBQVMsRUFDVCxNQUFNLENBQUMsTUFBTSxDQUNaO1FBQ0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVO0tBQzdCLEVBQ0QsT0FBTyxDQUNQLENBQ0QsQ0FBQztBQUNILENBQUM7QUFNRCxNQUFNLFVBQVUsVUFBVSxDQUFDLFVBQStCLEVBQUU7SUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUN2QyxNQUFNLENBQUMsTUFBTSxDQUNaO1FBQ0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVO0tBQzdCLEVBQ0QsT0FBTyxDQUNQLENBQ0QsQ0FBQztJQUVGLE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUMifQ==