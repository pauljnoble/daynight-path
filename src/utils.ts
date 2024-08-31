import * as d3 from "d3";
import SunCalc from "suncalc";
import { geoCylindricalStereographic as geoCylindricalStereographicProjection } from "d3-geo-projection";
import { PX_DRAG_PER_DAY, MS_PER_DAY, CYLINDRICAL_STEREOGRAPHIC_ASPECT } from "./constants";

const getLatitudeRangesForAngle = (
    date: Date,
    lng: number,
    latPrecision: number,
    targetAltitude: number
) => {
    let range: [number | null, number | null] = [null, null];

    for (let lat = -90; lat <= 90; lat += latPrecision) {
        const { altitude } = SunCalc.getPosition(date, lat, lng);
        const degreesAltitude = rad2Deg(altitude);

        if (range[0] === null) {
            if (degreesAltitude < targetAltitude) {
                range[0] = lat;
            }
        } else {
            if (degreesAltitude > targetAltitude) {
                range[1] = lat;
                break;
            }
        }
    }

    if (range[0] === null && range[1] === null) {
        return range;
    }

    if (range[1] === null) {
        range[1] = 90;
    }

    return range;
};

export const getAllAngles = (
    date: Date,
    angle: number,
    lngPrecision: number = 1
) => {
    const ranges = [];
    for (let lng = -180; lng <= 180; lng += lngPrecision) {
        const range = getLatitudeRangesForAngle(date, lng, 0.1, angle);
        if (range[0] !== null) {
            ranges.push({ lng, range });
        }
    }
    return ranges;
};

export const getCoordPathsFromRanges = (
    ranges: { lng: number; range: [number | null, number | null] }[],
    lngPrecision: number
) => {
    let isSplit = false;

    // Determine if the range is split. This can happen if the path
    // doesn't extend to the poles at both ends.
    let prevLng = -180;
    const path: any = [[], []];
    let splitRanges: any = [];

    let i = 0;

    for (let range of ranges) {
        if (Math.abs(range.lng - prevLng) > lngPrecision) {
            isSplit = true;
            splitRanges = [ranges.slice(0, i), ranges.slice(i)];
            break;
        }
        i++;
        prevLng = range.lng;
    }

    if (!isSplit) {
        // Go one way...
        for (let range of ranges) {
            path[0].push({ lng: range.lng, lat: range.range[0] });
        }
        // Now the other...
        for (let range of ranges.reverse()) {
            path[0].push({ lng: range.lng, lat: range.range[1] });
        }
    } else {
        let i = 0;
        for (let splitRange of splitRanges) {
            for (let range of splitRange) {
                path[i].push({ lng: range.lng, lat: range.range[0] });
            }
            for (let range of splitRange.reverse()) {
                path[i].push({ lng: range.lng, lat: range.range[1] });
            }
            i++;
        }
    }

    return path;
};

export const getPointGroups = (
    paths: { lng: number | null; lat: number | null }[][],
    projection: any
) => {
    const points = paths[0].map(({ lng, lat }) => projection([lng, lat]));
    let points2 = [];

    if (paths[1].length) {
        points2 = paths[1].map(({ lng, lat }) => projection([lng, lat]));
    }
    return [points, points2];
};

export const rad2Deg = (rad: number) => (rad * 180) / Math.PI;

export const getPathStrings = (
    pointGroup: any,
    width: number,
    height: number
) => {
    let pathString = "";
    let curvePath = "";
    // For single group paths we identify the curved 'half' side first
    if (!pointGroup[1].length) {
        const firstHalf = [...pointGroup[0]].splice(0, pointGroup[0].length / 2);
        let sumOfDeltas = 0;

        for (let i = 0; i < firstHalf.length - 1; i++) {
            sumOfDeltas += Math.abs(firstHalf[i + 1][1] - firstHalf[i][1]); // Compute difference in the second indices and accumulate
        }

        const isFirstHalfCurved = sumOfDeltas > 10; // Arbitrary threshold
        const curvePoints = isFirstHalfCurved
            ? firstHalf
            : [...pointGroup[0]].splice(pointGroup[0].length / 2);

        const curvedLine = d3
            .line<any>()
            .x((p: any) => p[0])
            .y((p: any) => p[1])
            .curve(d3.curveBasis);

        curvePath = curvedLine(curvePoints)!;
        pathString += curvePath;

        if (isFirstHalfCurved) {
            pathString += `L${width}, ${firstHalf[firstHalf.length - 1][1]
                } L${width}, 0 L 0, 0 Z`;
        } else {
            pathString += `L 0, ${height} L ${width}, ${height} Z`;
        }
    }
    return { closedPath: pathString, curvePath };
};

/**
 * Converts an SVG string into a Base64 encoded image suitable for use in a CSS background-image property.
 * 
 * @param svgString - The SVG data as a string.
 * @returns A string containing the Base64 encoded SVG image that can be used in a CSS background-image property.
 */
export const convertSvgToCssBackgroundImage = (svgString: string): string => {
    // Encode the SVG string to Base64
    const encodedSvg = btoa(encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
    ));

    // Create the data URL that can be used in CSS
    return `url('data:image/svg+xml;base64,${encodedSvg}')`;
};

export const getCustomProperty = (name: string) => {
    const root = document.documentElement;
    console.log('getting name', name, getComputedStyle(root).getPropertyValue(name))
    return getComputedStyle(root).getPropertyValue(name).trim();
}

/**
 * Converts paths to XML SVG string
 * @param paths 
 * @returns 
 */
export const pathsToSvgString = (paths: any) => {
    const height = 100 / CYLINDRICAL_STEREOGRAPHIC_ASPECT;
    const fill = getCustomProperty('--color-fill-daynight');
    const opacity = getCustomProperty('--opacity-fill-daynight');
    const strokeColor = getCustomProperty('--color-stroke-daynight');
    const strokeOpacity = getCustomProperty('--opacity-stroke-daynight');


    const svg = `<svg viewBox="0 0 100 ${height}" xmlns="http://www.w3.org/2000/svg" id="foo">
            <path d="${paths.closedPath}" fill="${fill}" fill-opacity="${opacity}" />
            <path d="${paths.curvePath}" className="open" fill="transparent" stroke="${strokeColor}" stroke-width="0.1" stroke-opacity="${strokeOpacity}" />
          </svg>`;
    return svg;
}


export const getIsNorthSun = (date: number) => {
    // When it's daylight at the north pole we know it's a northern sun
    return SunCalc.getPosition(date, 90, 0).altitude > 0;
};

export const getDayNumberOfYear = (timestamp: number): number => {
    // Convert timestamp to Date object
    const date = new Date(timestamp);

    // Get the day of the year (1-365 or 1-366 for leap years)
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return dayOfYear;
};

export const formatDate = (date: Date): string => {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayOfMonth = ("0" + date.getUTCDate()).slice(-2); // Add leading zero if necessary
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${month} ${dayOfMonth}, ${year}`;
};

export const pxToMs = (px: number) => {
    return (px / PX_DRAG_PER_DAY) * MS_PER_DAY;
};

export const msToPx = (ms: number) => {
    return (ms / MS_PER_DAY) * PX_DRAG_PER_DAY;
};

export const convertTimestampToTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

/**
 * Convert geographic coordinates to stereographic projection
 * @param coord - The latitude and longitude coordinates
 * @returns The XY point in the stereographic projection
 */
export const geoCylindricalStereographic = (coord: any) => {
    const projection = geoCylindricalStereographicProjection();

    const pos2 = projection([coord.lng, coord.lat])!;
    const pos = (coord.lng + 180) / 3.6; // TODO - can't use projection()
    return { x: pos, y: (pos2[1] / 5) };
};

/**
 * Converts millisecond value to whole day value (rounded down)
 * @param ms 
 * @returns The days rounded down
 */
export const msToDay = (ms: number) => {
    const days = ms / MS_PER_DAY;
    const result = ms > 0 ? Math.floor(days) : Math.ceil(days);

    // -0 or 0 are equal however trigger value changes
    if (result === 0) return 0;

    return result
}


/**
 * Converts days to milliseconds (whole value)
 * @param day 
 * @returns The milliseconds
 */
export const dayToMs = (day: number) => Math.round(day * MS_PER_DAY);