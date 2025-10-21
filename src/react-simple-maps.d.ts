declare module 'react-simple-maps' {
    import { ReactNode } from 'react';

    export interface ComposableMapProps {
        projection?: string;
        projectionConfig?: {
            scale?: number;
            center?: [number, number];
        };
        width?: number;
        height?: number;
        children?: ReactNode;
    }

    export interface GeographiesProps {
        geography: string;
        children: (props: { geographies: any[] }) => ReactNode;
    }

    export interface GeographyProps {
        geography: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        style?: any;
        key?: string;
    }

    export interface MarkerProps {
        coordinates: [number, number];
        children?: ReactNode;
        onClick?: () => void;
    }

    export const ComposableMap: React.FC<ComposableMapProps>;
    export const Geographies: React.FC<GeographiesProps>;
    export const Geography: React.FC<GeographyProps>;
    export const Marker: React.FC<MarkerProps>;
}
