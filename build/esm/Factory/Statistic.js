import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
export function model(options = {}) {
    return new Model.Statistic(undefined, Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
}
export function collection(options = {}) {
    const collection = new Collection.Statistic(Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
    return collection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGlzdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0ZhY3RvcnkvU3RhdGlzdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQU0vQyxNQUFNLFVBQVUsS0FBSyxDQUFDLFVBQStCLEVBQUU7SUFDdEQsT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQ3pCLFNBQVMsRUFDVCxNQUFNLENBQUMsTUFBTSxDQUNaO1FBQ0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVO0tBQzdCLEVBQ0QsT0FBTyxDQUNQLENBQ0QsQ0FBQztBQUNILENBQUM7QUFNRCxNQUFNLFVBQVUsVUFBVSxDQUFDLFVBQStCLEVBQUU7SUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUMxQyxNQUFNLENBQUMsTUFBTSxDQUNaO1FBQ0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVO0tBQzdCLEVBQ0QsT0FBTyxDQUNQLENBQ0QsQ0FBQztJQUVGLE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUMifQ==