import React, {useEffect, useRef} from "react";
import "./map-box-styles.scss";
import {useChangePropsAfterMount} from "@/src/hooks/lifecycleHooks";
import mapboxgl, {LngLat, LngLatBoundsLike, LngLatLike, Map} from "mapbox-gl";
import {GeoPoint} from "@/src/data/geoPoint";
import {getCountriesBounds, getPointsBounds} from "./tools/map-box-tools";
import {MapBoxApi} from "./tools/map-box-api";
import {Country} from "@/src/api/openapi";
import {IMapMarker} from "./map-box-types";

type TInitView = {
    countries?: Country[]; // priority 1
    points?: GeoPoint[]; // priority 2
    zoom?: number
};

export interface IMapBoxProps {
    markers: IMapMarker[];
    polyLines: string[];
    flyTo?: GeoPoint;
    center?: GeoPoint[];
    initialView?: TInitView;
    disableScrollZoom?: boolean;
    onClick?: (lngLat: LngLat) => void;
}

export const MapBox = (props: IMapBoxProps) => {
    return <InnerMapBox {...props} />
}

const InnerMapBox = (props: IMapBoxProps) => {
    const _mapContainerRef = useRef<HTMLDivElement>(null);
    const _mapRef = useRef<Map|null>(null);
    const {markers, polyLines, flyTo, disableScrollZoom, initialView, center, onClick} = props;
    const _markersToUpdateRef = useRef<IMapMarker[]>(markers);
    const _polyLinesToUpdateRef = useRef<string[]>(polyLines);
    const _centerToUpdateRef = useRef<GeoPoint[]>(center || []);

    useEffect(() => {
        if (_mapRef.current) return; // initialize map only once
        initMap();
    }, []);

    const initMap = () => {
        if (process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        } else {
            throw new Error('Environment variable NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not defined.');
        }
        let initBounds: LngLatBoundsLike|undefined = undefined;
        let initCenter: LngLatLike|undefined = undefined;
        if (initialView && initialView.countries?.length) {
            initBounds = getCountriesBounds(initialView.countries);
        } else if (initialView && initialView.points?.length) {
            if (initialView.points.length > 1) {
                initBounds = getPointsBounds(initialView.points);
            } else {
                initCenter = {
                    lng: initialView.points[0].lng,
                    lat: initialView.points[0].lat
                }
            }
        }
        const map = new mapboxgl.Map({
            container: _mapContainerRef.current || "",
            style: "mapbox://styles/merysysel/clik93r2900ec01qvglz70h0q",
            scrollZoom: !disableScrollZoom,
            bounds: initBounds,
            center: initCenter,
            zoom: initialView?.zoom || 1,
            maxZoom: 15,
            fitBoundsOptions: { padding: {top: 40, bottom: 40, left: 40, right: 40}}
        });
        map.on("load", async () => {
            MapBoxApi.initMapBoxDirection(map, _polyLinesToUpdateRef.current);
            await MapBoxApi.initMapImages(map);
            MapBoxApi.initMapBoxMarkers(map, _markersToUpdateRef.current);
            MapBoxApi.fitCenter(map, _centerToUpdateRef.current);
            _mapRef.current = map;
        })
        map.on("click", (e) => {
            if (onClick) {
                onClick(e.lngLat);
            }
        })
    }

    useChangePropsAfterMount(() => {
        if (_mapRef.current) {
            MapBoxApi.updateMapBoxMarkers(_mapRef.current, markers);
        } else {
            _markersToUpdateRef.current = markers;
        }
    }, [markers])

    useChangePropsAfterMount(() => {
        if (_mapRef.current) {
            MapBoxApi.updateMapBoxDirection(_mapRef.current, polyLines);
        } else {
            _polyLinesToUpdateRef.current = polyLines;
        }
    }, [polyLines])

    useChangePropsAfterMount(() => {
        if (_mapRef.current && center) {
            MapBoxApi.fitCenter(_mapRef.current, center)
        } else {
            _centerToUpdateRef.current = center || [];
        }
    }, [center])

    useChangePropsAfterMount(() => {
        if (_mapRef.current && flyTo) {
            MapBoxApi.flyToPoint(_mapRef.current, flyTo);
        }
    }, [flyTo])

    return <div
        ref={_mapContainerRef}
        style={{
            position: 'absolute',
            top: "0",
            bottom: "0",
            width: "100%"
        }}
    />
};