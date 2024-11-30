import { Base } from './Base';
export class Media extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'media';
        this.fields = ['id', 'type', 'url', 'group', 'subgroup', 'created_at', 'updated_at'];
        this.proxyUrl = 'https://d2k0n0ggvekdpx.cloudfront.net';
    }
    getGroup() {
        return this.attr('group');
    }
    getSubgroup() {
        return this.attr('subgroup');
    }
    getProxiedUrl(options = {
        width: 1024,
    }) {
        const url = this.getUrl();
        const parts = ['unsafe'];
        const filters = [];
        if (!url) {
            return url;
        }
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
    getCreatedAt() {
        return this.attr('created_at');
    }
    getUpdatedAt() {
        return this.attr('updated_at');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvTWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQStCOUIsTUFBTSxPQUFPLEtBQU0sU0FBUSxJQUFJO0lBQS9COztRQU9RLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFPM0IsV0FBTSxHQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFLdkYsYUFBUSxHQUFXLHVDQUF1QyxDQUFDO0lBb0p0RSxDQUFDO0lBNUlPLFFBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDckMsQ0FBQztJQUtNLFdBQVc7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFhTSxhQUFhLENBQ25CLFVBQTJCO1FBQzFCLEtBQUssRUFBRSxJQUFJO0tBQ1g7UUFFRCxNQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEMsTUFBTSxLQUFLLEdBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1YsT0FBTyxHQUFHLENBQUM7UUFDWixDQUFDO1FBR0QsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUc3QixJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUVuRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBR0QsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBR0QsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUVELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUVELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUVELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDRixDQUFDO1FBRUQsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBS00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQztJQUNwQyxDQUFDO0lBS00sTUFBTTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVcsQ0FBQztJQUNuQyxDQUFDO0lBS00sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBS00sWUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBS00sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBS00sWUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFXLENBQUM7SUFDMUMsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzFDLENBQUM7Q0FHRCJ9