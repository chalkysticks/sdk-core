export function toggleFullscreen(element = document.body) {
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    }
    else {
        document.exitFullscreen().catch((err) => {
            console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
        });
    }
}
export function isFullscreenActive() {
    return !!document.fullscreenElement;
}
export async function castToDevice(url) {
    if (!('presentation' in navigator)) {
        console.error('Presentation API is not supported in this browser.');
        return;
    }
    try {
        const presentationRequest = new PresentationRequest([url]);
        presentationRequest.start().then((connection) => {
            console.log('Connected to presentation:', connection);
            connection.onterminate = () => {
                console.log('Presentation terminated.');
            };
        }, (err) => {
            console.error('Error starting presentation:', err);
        });
    }
    catch (err) {
        console.error('Error casting to device:', err);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlc2VudGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1V0aWxpdHkvUHJlc2VudGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtDQSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsVUFBdUIsUUFBUSxDQUFDLElBQUk7SUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsK0NBQStDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDUCxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7WUFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0FBQ0YsQ0FBQztBQU9ELE1BQU0sVUFBVSxrQkFBa0I7SUFDakMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0FBQ3JDLENBQUM7QUFRRCxNQUFNLENBQUMsS0FBSyxVQUFVLFlBQVksQ0FBQyxHQUFXO0lBQzdDLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNwRSxPQUFPO0lBQ1IsQ0FBQztJQUVELElBQUksQ0FBQztRQUNKLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFM0QsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUMvQixDQUFDLFVBQWUsRUFBRSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFdEQsVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUM7UUFDSCxDQUFDLEVBQ0QsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUNELENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztBQUNGLENBQUMifQ==