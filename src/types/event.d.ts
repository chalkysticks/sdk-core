interface IEventPresetThumbnailLinkClick {
	presetModel: any;
}

interface IEventTabClick {
	slug: string;
	tab: string;
}

interface IEventOptionTrigger {
	event: string;
	option: IManifestOptionBasic;
}
