declare module '@capacitor/geolocation' {
	export interface GeolocationPlugin {
		getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition>;
		watchPosition(options: PositionOptions, callback: PositionCallback): string;
		clearWatch(options: { id: string }): Promise<void>;
		checkPermissions(): Promise<PermissionStatus>;
		requestPermissions(): Promise<PermissionStatus>;
	}

	// capacitor-geolocation-types.d.ts
	export interface PermissionStatus {
		location: 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';
		coarseLocation: 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';
	}

	export const Geolocation: GeolocationPlugin;
}
