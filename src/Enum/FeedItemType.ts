/**
 * Venues = 100-199
 * Beacons = 200-299
 * Tournaments = 300-399
 * Leagues = 400-499
 * Content = 500-599
 * Users = 600-699
 * Games = 700-799
 * TV = 800-899
 *
 * @class FeedItemType
 * @package Enum
 * @project ChalkySticks SDK Core
 */
export enum FeedItemType {
	VenueAdd = 100,
	VenueMediaAdd = 105,
	VenueUpdate = 110,
	VenueCheckin = 120,
	BeaconAdd = 200,
	TournamentAdd = 300,
	LeagueAdd = 400,
	ContentAdd = 500,
	ContentPad = 510,
	ContentNews = 520,
	ContentVideo = 530,
	UserAdd = 600,
	GameAdd = 700,
	GameUpdate = 710,
	GameDelete = 720,
	TvAdd = 800,
}
