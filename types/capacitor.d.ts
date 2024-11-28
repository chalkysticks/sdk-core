declare module '@capacitor/geolocation' {
	export interface GeolocationPlugin {
		getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition>;
		watchPosition(options: PositionOptions, callback: PositionCallback): string;
		clearWatch(options: { id: string }): Promise<void>;
		checkPermissions(): Promise<PermissionStatus>;
		requestPermissions(): Promise<PermissionStatus>;
	}

	export const Geolocation: GeolocationPlugin;
}
