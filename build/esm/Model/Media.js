import { Base } from './Base';
export class Media extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'media';
        this.fields = ['id', 'type', 'url', 'created_at', 'updated_at'];
        this.proxyUrl = 'https://d2k0n0ggvekdpx.cloudfront.net';
    }
    getProxiedUrl(options = {
        width: 1024,
    }) {
        const parts = ['unsafe'];
        const filters = [];
        filters.push('format(webp)');
        if (options.width || options.height) {
            const dimension = `${options.width || ''}x${options.height || ''}`;
            if (options.fitIn) {
                parts.push('fit-in');
            }
            parts.push(dimension);
        }
        if (options.smart) {
            parts.push('smart');
        }
        if (options.filters) {
            if (options.filters.quality) {
                filters.push(`quality(${options.filters.quality})`);
            }
            if (options.filters.blur) {
                filters.push(`blur(${options.filters.blur})`);
            }
            if (options.filters.brightness) {
                filters.push(`brightness(${options.filters.brightness})`);
            }
            if (options.filters.contrast) {
                filters.push(`contrast(${options.filters.contrast})`);
            }
            if (options.filters.grayscale) {
                filters.push('grayscale()');
            }
            if (options.filters.watermark) {
                const wm = options.filters.watermark;
                filters.push(`watermark(${wm.image},${wm.x},${wm.y},${wm.transparency || 0})`);
            }
            if (filters.length > 0) {
                parts.push(`filters:${filters.join(':')}`);
            }
        }
        return `${this.proxyUrl}/${parts.join('/')}/${this.getUrl()}`;
    }
    getType() {
        return this.attr('type');
    }
    getUrl() {
        return this.attr('url');
    }
    getUrlSmall() {
        return this.getProxiedUrl({ width: 256 });
    }
    getUrlMedium() {
        return this.getProxiedUrl({ width: 512 });
    }
    getUrlLarge() {
        return this.getProxiedUrl({ width: 1024 });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvTWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQStCOUIsTUFBTSxPQUFPLEtBQU0sU0FBUSxJQUFJO0lBQS9COztRQU9RLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFPM0IsV0FBTSxHQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBS2xFLGFBQVEsR0FBVyx1Q0FBdUMsQ0FBQztJQWtIdEUsQ0FBQztJQWxHTyxhQUFhLENBQ25CLFVBQTJCO1FBQzFCLEtBQUssRUFBRSxJQUFJO0tBQ1g7UUFFRCxNQUFNLEtBQUssR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUc3QixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRzdCLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckMsTUFBTSxTQUFTLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBRW5FLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLENBQUM7WUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFHRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFHRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUVELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUMvQyxDQUFDO1lBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQzNELENBQUM7WUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUVELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMvQixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoRixDQUFDO1lBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsQ0FBQztRQUNGLENBQUM7UUFFRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFLTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFLTSxNQUFNO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDO0lBQ25DLENBQUM7SUFLTSxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFLTSxZQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFLTSxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FHRCJ9