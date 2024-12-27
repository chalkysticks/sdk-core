import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvRmFjdG9yeS9SdWxlYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssVUFBVSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFNL0MsTUFBTSxVQUFVLEtBQUssQ0FBQyxVQUErQixFQUFFO0lBQ3RELE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUN4QixTQUFTLEVBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FDWjtRQUNDLE9BQU8sRUFBRSxTQUFTLENBQUMsVUFBVTtLQUM3QixFQUNELE9BQU8sQ0FDUCxDQUNELENBQUM7QUFDSCxDQUFDO0FBTUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxVQUErQixFQUFFO0lBQzNELE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FDekMsTUFBTSxDQUFDLE1BQU0sQ0FDWjtRQUNDLE9BQU8sRUFBRSxTQUFTLENBQUMsVUFBVTtLQUM3QixFQUNELE9BQU8sQ0FDUCxDQUNELENBQUM7SUFFRixPQUFPLFVBQVUsQ0FBQztBQUNuQixDQUFDIn0=