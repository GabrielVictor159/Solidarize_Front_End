import { RegionGeographyLimit } from "@/Domain/config/functions";
import { MapEventClick, RegionMap } from "@/Domain/types";
import { APIProvider, Map, MapMouseEvent, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";

type SelectMapRegionProps = {
    callbackSelectRegion: (value:MapEventClick) => void;
    defaultRegionMap?:RegionMap;
  }  & React.ComponentProps<typeof Map>;

export default function SelectMapRegion({callbackSelectRegion, defaultRegionMap, ...mapProps}: SelectMapRegionProps) {
    const [locationObtained, setLocationObtained] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [defaultRegion, setDefaultRegion] = useState<RegionMap>(
        { lat: defaultRegionMap === null || undefined ? -15.77972000 : defaultRegionMap?.lat ?? -15.77972000, 
         lng: defaultRegionMap === null || undefined ? -47.92972000 : defaultRegionMap?.lng ?? -47.92972000});

    useEffect(() => {
        if(defaultRegionMap===undefined || defaultRegionMap===null){
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if (RegionGeographyLimit(position.coords.latitude, position.coords.longitude)) {
                    setDefaultRegion({ lat: position.coords.latitude, lng: position.coords.longitude });
                }
                setLocationObtained(true);
            }, function (error) {
                setLocationObtained(true);
                console.error(`Erro ao obter a localização: ${error.message}`);

            }, {

                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0

            });
        } else {
            setLocationObtained(true);
            console.log('Geolocalização não é suportada por este navegador.');

        }
    }
    else{
        setLocationObtained(true);
    }
    }, [defaultRegionMap]);

    useEffect(()=>{setIsClient(true);},[]);
    const [mapEventClick, setMapEventClick] = useState<MapEventClick>();


    const ClickMap = (value: MapMouseEvent) => {

        const eventDetails: MapEventClick = {
            region: {
                lat: value.detail.latLng?.lat ?? 0,
                lng: value.detail.latLng?.lng ?? 0
            }
        };
        callbackSelectRegion(eventDetails);
        setMapEventClick(eventDetails);
    };
    return (
        <>
            {isClient && locationObtained && (
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
                    <Map
                        {...mapProps}
                        defaultCenter={{ lat: defaultRegion.lat, lng: defaultRegion.lng }}
                        defaultZoom={13}
                        disableDoubleClickZoom={true}
                        onClick={(e) => { ClickMap(e) }}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    />
                    {
                        mapEventClick != undefined
                            ?
                            <>
                                <Marker position={{ lat: mapEventClick.region.lat, lng: mapEventClick.region.lng }} />
                            </>
                            : defaultRegionMap!==undefined ? 
                                <Marker position={{ lat: defaultRegion.lat, lng: defaultRegion.lng }} />
                            :<></>
                    }
                </APIProvider>
            )}
        </>);
}