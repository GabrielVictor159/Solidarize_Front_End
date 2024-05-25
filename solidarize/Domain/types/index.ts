import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type MapEventClick = {
  region: RegionMap,
}

export type RegionMap ={
  lat: number,
  lng:number 
}

