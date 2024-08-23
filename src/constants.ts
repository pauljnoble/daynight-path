/* How many pixels to drag 24 hours time */
export const PX_DAY = 1024;
/* Ms per day */
export const MS_DAY = 86400000;
/* Fixed aspect for this projection */
export const CYLINDRICAL_STEREOGRAPHIC_ASPECT = 1.5712;
/* Crop some of the blank space at the bottom of the map */
export const CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED = 1.8;

export const LOCATIONS = [
    {
        name: "New York",
        time: "11:30",
        timeZone: 'America/New_York',
        id: "0001",
        location: { lat: 40.7, lng: -74 },
    },
    {
        name: "London",
        time: "11:30",
        offset: 0,
        id: "0003",
        location: { lat: 52, lng: 0 },
    },
    {
        name: "Dubai",
        time: "11:30",
        offset: 0,
        id: "0002",
        location: { lat: 25.2, lng: 55.27 },
    },
    {
        name: "Tokyo",
        time: "11:30",
        offset: 10,
        id: "0004",
        location: { lat: 35.67, lng: 139.65 },
    },
];