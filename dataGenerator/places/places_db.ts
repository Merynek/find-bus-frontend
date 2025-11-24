import {Country} from "../../src/api/openapi";
import {IPlace} from "../../src/data/place";
import {GeoPoint} from "../../src/data/geoPoint";

export const places: IPlace[] = [
    {
        placeId: "ChIJEVE_wDqUEkcRsLEUZg-vAAQ",
        point: new GeoPoint({
            lat: 49.1950602,
            lng: 16.6068371
        }),
        name: "Brno",
        country: Country.CZ
    },
    {
        placeId: "ChIJH_Q5td9AEkcRbsXnDCMOh2E",
        point: new GeoPoint({
            lat: 49.7012089,
            lng: 17.0761547
        }),
        name: "Litovel",
        country: Country.CZ
    },
    {
        placeId: "ChIJucKBHC6sE0cRILYVZg-vAAQ",
        point: new GeoPoint({
            lat: 49.4564788,
            lng: 17.45023
        }),
        name: "Přerov",
        country: Country.CZ
    },
    {
        placeId: "ChIJi3lwCZyTC0cRkEAWZg-vAAQ",
        point: new GeoPoint({
            lat: 50.0755381,
            lng: 14.4378005
        }),
        name: "Praha",
        country: Country.CZ
    },
    {
        placeId: "ChIJneckMWpYEUcRRJGen_tzGYk",
        point: new GeoPoint({
            lat: 49.8209226,
            lng: 18.2625243
        }),
        name: "Ostrava",
        country: Country.CZ
    },
    {
        placeId: "ChIJDY6ITK0ME0cRTyGsqBZMjUE",
        point: new GeoPoint({
            lat: 49.2244365,
            lng: 17.6627635
        }),
        name: "Zlín",
        country: Country.CZ
    },
    {
        placeId: "ChIJl2HKCjaJbEcRaEOI_YKbH2M",
        point: new GeoPoint({
            lat: 48.1485965,
            lng: 17.1077478
        }),
        name: "Bratislava",
        country: Country.SK
    },
    {
        placeId: "ChIJzco95mKgbEcRsPqWxtH3AAQ",
        point: new GeoPoint({
            lat: 48.3709108,
            lng: 17.5833218
        }),
        name: "Trnava",
        country: Country.SK
    },
    {
        placeId: "ChIJ_ZNlVeA-a0cR8IuXxtH3AAQ",
        point: new GeoPoint({
            lat: 48.3061414,
            lng: 18.076376
        }),
        name: "Nitra",
        country: Country.SK
    },
    {
        placeId: "ChIJn8o2UZ4HbUcRRluiUYrlwv0",
        point: new GeoPoint({
            lat: 48.2081743,
            lng: 16.3738189
        }),
        name: "Vídeň",
        country: Country.AT
    },
    {
        placeId: "ChIJ60oYRIYKbUcRijvwxl-Fi-c",
        point: new GeoPoint({
            lat: 48.23106569999999,
            lng: 16.1485434
        }),
        name: "Gablitz",
        country: Country.AT
    },
    {
        placeId: "ChIJu2wdYYCwbUcRWrT9Xz_ONm8",
        point: new GeoPoint({
            lat: 48.00214,
            lng: 16.23091
        }),
        name: "Baden",
        country: Country.AT
    },
]
