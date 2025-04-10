import test from 'node:test';
import assert from 'node:assert/strict';
import { Model } from '../src';
import { simplifyCoordinates } from '../src/Utility/Geolocation';

/**
 * Mock data to simulate geocode API responses
 */
// Existing mock data
const existingResults = [
	{
		address_components: [
			{
				long_name: '600',
				short_name: '600',
				types: ['street_number'],
			},
			{
				long_name: 'West 111th Street',
				short_name: 'W 111th St',
				types: ['route'],
			},
			{
				long_name: 'Manhattan',
				short_name: 'Manhattan',
				types: ['sublocality_level_1', 'sublocality', 'political'],
			},
			{
				long_name: 'New York',
				short_name: 'New York',
				types: ['locality', 'political'],
			},
			{
				long_name: 'New York County',
				short_name: 'New York County',
				types: ['administrative_area_level_2', 'political'],
			},
			{
				long_name: 'New York',
				short_name: 'NY',
				types: ['administrative_area_level_1', 'political'],
			},
			{
				long_name: 'United States',
				short_name: 'US',
				types: ['country', 'political'],
			},
			{
				long_name: '10025',
				short_name: '10025',
				types: ['postal_code'],
			},
		],
		formatted_address: '600 W 111th St, New York, NY 10025, USA',
		geometry: {
			location: {
				lat: 40.8049163,
				lng: -73.9668548,
			},
			location_type: 'ROOFTOP',
			viewport: {
				northeast: {
					lat: 40.8063331802915,
					lng: -73.96545576970848,
				},
				southwest: {
					lat: 40.8036352197085,
					lng: -73.96815373029149,
				},
			},
		},
		place_id: 'Eic2MDAgVyAxMTF0aCBTdCwgTmV3IFlvcmssIE5ZIDEwMDI1LCBVU0EiMRIvChQKEglJ_AKjO_bCiRHfQhf5uvLYYRDYBCoUChIJfbBE8hf2wokR5zhUCodVySo',
	},
];

// Complete mock data for comprehensive testing
const mockGeocodingResult = {
	status: 'OK',
	results: existingResults,
};

const mockEmptyResult = {
	status: 'ZERO_RESULTS',
	results: [],
};

const mockErrorResult = {
	status: 'INVALID_REQUEST',
	results: [],
};

/**
 * Tests for Geocode class
 */
test('Geocode - initialize with empty data', () => {
	const geocode = new Model.Geocode();
	assert.equal(geocode.endpoint, 'data/geocode', 'Should have correct endpoint');
	assert.deepEqual(geocode.fields, ['status', 'results'], 'Should have correct fields');
});

test('Geocode - load data and check address components', () => {
	const geocode = new Model.Geocode(mockGeocodingResult);

	// Test basic properties
	assert.equal(geocode.getStatus(), 'OK', 'Status should be OK');
	assert.equal(geocode.isOK(), true, 'isOK should return true');
	assert.equal(geocode.hasResults(), true, 'Should have results');

	// Test address components
	assert.equal(geocode.getCity(), 'New York', 'Should return correct city');
	assert.equal(geocode.getCity(true), 'New York', 'Should return correct city with short name');
	assert.equal(geocode.getState(), 'New York', 'Should return correct state');
	assert.equal(geocode.getState(true), 'NY', 'Should return correct state short code');
	assert.equal(geocode.getStateShortCode(), 'NY', 'Should return correct state short code');
	assert.equal(geocode.getCityAndState(), 'New York, NY', 'Should return correct city and state');
	assert.equal(geocode.getCityAndState(false), 'New York, New York', 'Should return correct city and state with full state name');
	assert.equal(geocode.getZipCode(), '10025', 'Should return correct zip code');
	assert.equal(geocode.getStreetNumber(), '600', 'Should return correct street number');
	assert.equal(geocode.getStreetName(), 'West 111th Street', 'Should return correct street name');
	assert.equal(geocode.getStreetAddress(), '600 West 111th Street', 'Should return correct street address');
	assert.equal(geocode.getNeighborhood(), 'Manhattan', 'Should return correct neighborhood');
	assert.equal(geocode.getCounty(), 'New York County', 'Should return correct county');
	assert.equal(geocode.getCountry(), 'United States', 'Should return correct country');
	assert.equal(geocode.getCountry(true), 'US', 'Should return correct country code');
	assert.equal(geocode.getCountryCode(), 'US', 'Should return correct country code');
	assert.equal(geocode.getFormattedAddress(), '600 W 111th St, New York, NY 10025, USA', 'Should return correct formatted address');
	assert.equal(geocode.getAddressComponentByType('postal_code'), '10025', 'Should get component by type');

	// Test is in methods
	assert.equal(geocode.isInCountry('US'), true, 'Should be in US');
	assert.equal(geocode.isInCountry('CA'), false, 'Should not be in CA');
	assert.equal(geocode.isInState('NY'), true, 'Should be in NY');
	assert.equal(geocode.isInState('CA'), false, 'Should not be in CA');
});

test('Geocode - location and coordinates', () => {
	const geocode = new Model.Geocode(mockGeocodingResult);

	// Test location methods
	const location = geocode.getLocation();
	assert.equal(typeof location, 'object', 'Should return location object');
	assert.equal(location.latitude, 40.8049163, 'Should have correct latitude');
	assert.equal(location.longitude, -73.9668548, 'Should have correct longitude');

	assert.equal(geocode.getLatitude(), 40.8049163, 'Should return correct latitude');
	assert.equal(geocode.getLongitude(), -73.9668548, 'Should return correct longitude');
	assert.equal(geocode.getCoordinatesString(4), '40.8049, -73.9669', 'Should return formatted coordinates');
	assert.equal(geocode.getLocationType(), 'ROOFTOP', 'Should return correct location type');

	// Test viewport
	const viewport = geocode.getViewport();
	assert.ok(viewport, 'Should have viewport');
	assert.equal(viewport.northeast.latitude, 40.8063331802915, 'Should have correct NE latitude');
	assert.equal(viewport.northeast.longitude, -73.96545576970848, 'Should have correct NE longitude');
	assert.equal(viewport.southwest.latitude, 40.8036352197085, 'Should have correct SW latitude');
	assert.equal(viewport.southwest.longitude, -73.96815373029149, 'Should have correct SW longitude');

	// Test place ID
	assert.equal(
		geocode.getPlaceId(),
		'Eic2MDAgVyAxMTF0aCBTdCwgTmV3IFlvcmssIE5ZIDEwMDI1LCBVU0EiMRIvChQKEglJ_AKjO_bCiRHfQhf5uvLYYRDYBCoUChIJfbBE8hf2wokR5zhUCodVySo',
		'Should return correct place ID',
	);
});

test('Geocode - empty results', () => {
	const geocode = new Model.Geocode(mockEmptyResult);

	assert.equal(geocode.getStatus(), 'ZERO_RESULTS', 'Should have ZERO_RESULTS status');
	assert.equal(geocode.isOK(), false, 'isOK should return false');
	assert.equal(geocode.hasResults(), false, 'Should not have results');

	// Test that methods return default values when no results
	assert.equal(geocode.getCity(), '', 'Should return empty string');
	assert.equal(geocode.getState(), '', 'Should return empty string');
	assert.equal(geocode.getFullAddress(), '', 'Should return empty string');
	assert.deepEqual(geocode.getLocation(), { latitude: 0, longitude: 0 }, 'Should return zeros for coordinates');
	assert.equal(geocode.getLatitude(), 0, 'Should return 0 for latitude');
	assert.equal(geocode.getLongitude(), 0, 'Should return 0 for longitude');
	assert.equal(geocode.getViewport(), null, 'Should return null for viewport');
	assert.equal(geocode.getFormattedAddress(), '', 'Should return empty string for formatted address');
	assert.equal(geocode.getPlaceId(), '', 'Should return empty string for place ID');
	assert.equal(geocode.getErrorMessage(), 'No results found for this address', 'Should return correct error message');
});

test('Geocode - error results', () => {
	const geocode = new Model.Geocode(mockErrorResult);

	assert.equal(geocode.getStatus(), 'INVALID_REQUEST', 'Should have INVALID_REQUEST status');
	assert.equal(geocode.isOK(), false, 'isOK should return false');
	assert.equal(geocode.hasResults(), false, 'Should not have results');
	assert.equal(geocode.getErrorMessage(), 'Invalid request parameters', 'Should return correct error message');
});

test('Geocode - address formatting', () => {
	const geocode = new Model.Geocode(mockGeocodingResult);

	// Test full and short address formatting
	const fullAddress = geocode.getFullAddress();
	assert.ok(fullAddress.includes('600 West 111th Street'), 'Full address should contain street address');
	assert.ok(fullAddress.includes('New York, New York'), 'Full address should contain city and state');
	assert.ok(fullAddress.includes('United States'), 'Full address should contain country');
	assert.ok(fullAddress.includes('10025'), 'Full address should contain ZIP code');

	const shortAddress = geocode.getShortAddress();
	assert.ok(shortAddress.includes('600 West 111th Street'), 'Short address should contain street address');
	assert.ok(shortAddress.includes('New York, NY'), 'Short address should contain city and state code');
	assert.ok(shortAddress.includes('US'), 'Short address should contain country code');
	assert.ok(shortAddress.includes('10025'), 'Short address should contain ZIP code');
});

test('Geocode - static search methods', () => {
	// Verify static methods exist with correct signatures
	assert.equal(typeof Model.Geocode.search, 'function', 'search should be a static method');
	assert.equal(typeof Model.Geocode.searchByCoordinates, 'function', 'searchByCoordinates should be a static method');
});

// -------------------------------------------------------------

import test from 'node:test';
import assert from 'node:assert/strict';
import { simplifyCoordinates } from '../src/Utility/Geolocation';

test('simplifyCoordinates - numeric lat/lng input', () => {
	const result = simplifyCoordinates(40.712776, -74.005974);
	assert.deepEqual(result, { latitude: 40.713, longitude: -74.006 });
});

test('simplifyCoordinates - numeric input with custom precision', () => {
	const result = simplifyCoordinates(40.712776, -74.005974, 1e5);
	assert.deepEqual(result, { latitude: 40.71278, longitude: -74.00597 });
});

test('simplifyCoordinates - array input', () => {
	const result = simplifyCoordinates([34.052235, -118.243683]);
	assert.deepEqual(result, { latitude: 34.052, longitude: -118.244 });
});

test('simplifyCoordinates - object with latitude/longitude properties', () => {
	const result = simplifyCoordinates({ latitude: 51.507351, longitude: -0.127758 });
	assert.deepEqual(result, { latitude: 51.507, longitude: -0.128 });
});

test('simplifyCoordinates - object with lat/lng properties', () => {
	const result = simplifyCoordinates({ lat: 48.856613, lng: 2.352222 });
	assert.deepEqual(result, { latitude: 48.857, longitude: 2.352 });
});

test('simplifyCoordinates - object with lat()/lng() methods', () => {
	const result = simplifyCoordinates({
		lat: () => 37.774929,
		lng: () => -122.419418,
	});
	assert.deepEqual(result, { latitude: 37.775, longitude: -122.419 });
});

test('simplifyCoordinates - Google Maps-style object with position.lat()/lng()', () => {
	const result = simplifyCoordinates({
		position: {
			lat: () => 35.689487,
			lng: () => 139.691711,
		},
	});
	assert.deepEqual(result, { latitude: 35.689, longitude: 139.692 });
});

test('simplifyCoordinates - Google Maps-style object with position.lat/lng numbers', () => {
	const result = simplifyCoordinates({
		position: {
			lat: 41.902782,
			lng: 12.496366,
		},
	});
	assert.deepEqual(result, { latitude: 41.903, longitude: 12.496 });
});

test('simplifyCoordinates - invalid input returns default', () => {
	const result = simplifyCoordinates({ foo: 'bar' } as any);
	assert.deepEqual(result, { latitude: 0, longitude: 0 });
});

test('simplifyCoordinates - null input returns default', () => {
	const result = simplifyCoordinates(null as any);
	assert.deepEqual(result, { latitude: 0, longitude: 0 });
});

test('simplifyCoordinates - NaN values are handled', () => {
	const result = simplifyCoordinates({ latitude: NaN, longitude: NaN });
	assert.deepEqual(result, { latitude: 0, longitude: 0 });
});
