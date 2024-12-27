export function isYouTube(url) {
    return url.match(/(?:youtube\.com|youtu\.be)/) !== null;
}
export function parseId(url) {
    const id = url.match(/(?:\?v=|\/embed\/|\/\d+\/|\.be\/)([a-zA-Z0-9_-]+)/);
    return id ? id[1] : '';
}
export function thumbnailUrl(url) {
    const id = parseId(url);
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
export function toEmbedUrl(url) {
    const id = parseId(url);
    return `https://www.youtube.com/embed/${id}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWW91VHViZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9VdGlsaXR5L1lvdVR1YmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUFXO0lBQ3BDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUN6RCxDQUFDO0FBUUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxHQUFXO0lBQ2xDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUUxRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQVFELE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVztJQUN2QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFeEIsT0FBTyw4QkFBOEIsRUFBRSxnQkFBZ0IsQ0FBQztBQUN6RCxDQUFDO0FBUUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxHQUFXO0lBQ3JDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV4QixPQUFPLGlDQUFpQyxFQUFFLEVBQUUsQ0FBQztBQUM5QyxDQUFDIn0=