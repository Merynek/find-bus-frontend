import {Direction} from "../src/data/trip/direction";

const polyLines: string[] = [
    "gijnHabfgBr@TMfB`DxA}CnRbT`Dtd@qUvbDq{CfHoYdHkNnNhOqA_QdcCouEre@qtA`jCyyFth@_tCf^gkAtPkGi@{^vImYkBuh@VgXbFDFpC"
]

export function getRandomDirection(): Direction {
    const randomPolyLine = polyLines[Math.floor(Math.random() * polyLines.length)];
    return new Direction({
        polyline: randomPolyLine
    })
}