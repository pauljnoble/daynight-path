/* How many pixels to drag 24 hours time */
export const PX_DRAG_PER_DAY = 1200;
/* Ms per day */
export const MS_PER_DAY = 86400000;
/* Fixed aspect for this projection */
export const CYLINDRICAL_STEREOGRAPHIC_ASPECT = 1.5712;
/* Crop some of the blank space at the bottom of the map */
export const CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED = 1.8;
/* Locations with timezones */
export const LOCATIONS = [
    {
        id: "0001",
        name: "New York",
        timeZone: 'America/New_York',
        coords: { lat: 40.7, lng: -74 },
    },
    {
        id: "0003",
        name: "London",
        timeZone: 'Europe/London',  // Correct time zone for London
        coords: { lat: 52, lng: 0 },
    },
    {
        id: "0002",
        name: "Dubai",
        timeZone: 'Asia/Dubai',  // Correct time zone for Dubai
        coords: { lat: 25.2, lng: 55.27 },
    },
    {
        id: "0004",
        name: "Tokyo",
        timeZone: 'Asia/Tokyo',  // Correct time zone for Tokyo
        coords: { lat: 35.67, lng: 139.65 },
    },
];