import * as Model from '../Model';
import { Base } from './Base';
export declare class Media extends Base<Model.Media> {
    model: Model.Media;
    get images(): Model.Media[];
    get primary(): Model.Media | undefined;
    get videos(): Model.Media[];
}
