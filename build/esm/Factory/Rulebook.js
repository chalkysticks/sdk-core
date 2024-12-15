import * as Collection from '../Collection';
import * as Model from '../Model';
import Constants from '../Common/Constants';
export function model(options = {}) {
    return new Model.Rulebook(undefined, Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
}
export function collection(options = {}) {
    const collection = new Collection.Rulebook(Object.assign({
        baseUrl: Constants.API_URL_V3,
    }, options));
    return collection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvRmFjdG9yeS9SdWxlYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssVUFBVSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEtBQUssS0FBSyxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQztBQU01QyxNQUFNLFVBQVUsS0FBSyxDQUFDLFVBQStCLEVBQUU7SUFDdEQsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQ3hCLFNBQVMsRUFDVCxNQUFNLENBQUMsTUFBTSxDQUNaO1FBQ0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVO0tBQzdCLEVBQ0QsT0FBTyxDQUNQLENBQ0QsQ0FBQztBQUNILENBQUM7QUFNRCxNQUFNLFVBQVUsVUFBVSxDQUFDLFVBQStCLEVBQUU7SUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUN6QyxNQUFNLENBQUMsTUFBTSxDQUNaO1FBQ0MsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVO0tBQzdCLEVBQ0QsT0FBTyxDQUNQLENBQ0QsQ0FBQztJQUVGLE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUMifQ==