export type TODO = any;

export type Coordinates = {
    lat: number;
    lng: number;
}

export type LocationType = {
    id: string;
    name: string;
    timeZone: string;
    coords: Coordinates;
}

export type IconType = 'contrast' | 'close' | 'calendar';

export type Theme = "purple" | "light" | "green" | "blue" | "mono-dark";

