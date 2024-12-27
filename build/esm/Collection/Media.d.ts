import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export declare class Media extends Base<Model.Media> {
    model: Model.Media;
    get images(): Model.Media[];
    get primary(): Model.Media | undefined;
    get videos(): Model.Media[];
}
