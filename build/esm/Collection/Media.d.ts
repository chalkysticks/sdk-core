import * as Model from '../Model/index.js';
import * as Enum from '../Enum/index.js';
import { Base } from './Base.js';
export declare class Media extends Base<Model.Media> {
    get avatar(): Model.Media | undefined;
    get images(): Model.Media[];
    get primary(): Model.Media | undefined;
    get videos(): Model.Media[];
    private get isUserEndpoint();
    private get isVenueEndpoint();
    endpoint: string;
    model: Model.Media;
    getEndpoint(): string;
    exterior(): this;
    interior(): this;
    person(): this;
    random(): this;
    table(): this;
    type(mediaType: Enum.MediaType): this;
}
