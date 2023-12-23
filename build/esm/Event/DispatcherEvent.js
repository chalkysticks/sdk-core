export class DispatcherEvent {
    constructor(eventName, envelope) {
        this.callbacks = [];
        this.eventName = eventName;
        if (envelope) {
            this.envelope = envelope;
        }
    }
    clearCallbacks() {
        this.callbacks = [];
    }
    registerCallback(callback) {
        this.callbacks.push(callback);
    }
    unregisterCallback(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }
    fire(envelope) {
        const callbacks = this.callbacks.slice(0);
        callbacks.forEach((callback) => {
            callback(Object.assign({}, this.envelope, envelope));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzcGF0Y2hlckV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0V2ZW50L0Rpc3BhdGNoZXJFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQ0EsTUFBTSxPQUFPLGVBQWU7SUFxQnhCLFlBQVksU0FBaUIsRUFBRSxRQUEyQjtRQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUzQixJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFLTSxjQUFjO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFNTSxnQkFBZ0IsQ0FBQyxRQUE2QjtRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBTU0sa0JBQWtCLENBQUMsUUFBNkI7UUFDbkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0wsQ0FBQztJQU1NLElBQUksQ0FBQyxRQUEwQjtRQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUcxQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBNkIsRUFBRSxFQUFFO1lBQ2hELFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==