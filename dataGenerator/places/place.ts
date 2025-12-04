import {Place} from "@/src/data/place";
import {places} from "./places_db";

export function getRandomPlace(): Place {
    const instances = places.map(place => new Place({
        name: place.name,
        city: place.city,
        country: place.country,
        placeId: place.placeId,
        point: place.point
    }))
    return instances[Math.floor(Math.random() * instances.length)];
}
