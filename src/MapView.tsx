
import React, { CSSProperties } from 'react';
import ReactDom from "react-dom";
import L from 'leaflet';
import Tangram, { TangramLeafletLayer } from 'tangram';
import ReactDOM from 'react-dom';
import { number } from 'prop-types';

export interface ViewPoint {
    x: number, y: number
}

export interface GeoPoint {
    lat: number;
    lon: number;
}
export interface QueryFeaturesOptiopns {
    filter?: any;
    visible?: boolean;
    unique: boolean;
    group_by?: boolean;
    geometry?: boolean
}
export interface ScreenShotOptions {
    url?: string;
    blob?: Blob;
    type?: string;
}

export interface MapViewProps {

    style?: CSSProperties;
    scene?: any;
    sceneParams?: any,
    attribution?: string;
    initPoint?: GeoPoint;
    initZoom?: number;
    selectionRadius?: number,
    onLayerClick?: (evt: any) => void;
    onLayerHover?: (evt: any) => void;
    onScenceLoad?: (evt: any) => void;
    onSceneViewComplete?: (evt: any) => void;
    onSceneError?: (evt: any) => void;
    onSceneWarning?: (evt: any) => void;

}
export interface MapViewStates { }
export class MapView extends React.Component<MapViewProps, MapViewStates>
{
    private layer: TangramLeafletLayer | null;
    constructor(props: MapViewProps) {
        super(props);
        this.layer = null;
    }

    private initMap() {
        const { onLayerClick, onLayerHover, selectionRadius } = this.props;

        if (!this.layer) {
            const mapEl = ReactDom.findDOMNode(this.refs.map);


            // const ccc = {
            //     scene: {
            //         import: [
            //             'https://www.nextzen.org/carto/bubble-wrap-style/8/bubble-wrap-style.zip',
            //             'https://www.nextzen.org/carto/bubble-wrap-style/8/themes/label-10.zip'
            //         ],
            //         sources: {
            //             mapzen: {
            //                 url: 'https://tile.nextzen.org/tilezen/vector/v1/256/all/{z}/{x}/{y}.mvt',
            //                 url_params: {
            //                     api_key: 'tsINU1vsQnKLU1jjCimtVw'
            //                 },
            //                 tile_size: 256,
            //                 max_zoom: 16
            //             }
            //         }
            //     }
            // };

            const map = L.map(mapEl as any, {
                maxZoom: 22,
                zoomSnap: 0,
                keyboard: false
            });
            this.layer = Tangram.leafletLayer({
                scene: this.props.scene,
                selectionRadius: selectionRadius,
                events: {
                    hover: onLayerHover && onLayerHover.bind(this),
                    click: onLayerClick && onLayerClick.bind(this),
                },
                logLevel: 'debug',
                attribution: this.props.attribution,
            });
            if (this.layer) {
                this.layer.scene.load(this.props.scene);
                // this.layer.scene.updateConfig();
                this.layer.addTo(map);
               // this.layer.bringToFront();

                map.setView([40.70531887544228, -74.00976419448853], 15);
                if (this.props.initPoint) {
                    map.setView([this.props.initPoint.lat, this.props.initPoint.lon], this.props.initZoom || 15);
                }
            }


        }

        // Yo! NYC maps
    }

    componentDidMount() {

        this.initMap();

    }

    render() {
        const { style } = this.props;
        const defaultStyle: CSSProperties = {
            width: "100%",
            height:"100vh",
            backgroundColor: "#ccc"
        };
        return (<div style={{ ...defaultStyle, ...style }} ref="map"></div>);
    }

    //#region public methods

    /**
     * return tangram scene object
     */
    public getScene() {
        this.checkLayer();
        return this.layer && this.layer.scene;
    }

    private checkLayer() {
        if (!this.layer)
            throw new Error("tangram layer not initialized");
    }

    /**
     * Returns the active camera.
     */
    public getActiveCamera() {
        this.checkLayer();
        return this.layer && this.layer.scene.getActiveCamera();
    }

    /**
     * Simple object-picking may be enabled by setting any layer's interactive parameter to true. This will enable Tangram's "feature selection" capability for objects in that layer. These objects can then be queried with the getFeatureAt() function, which takes pixel coordinates within the map view in the form { x, y }
     * @param {ViewPoint} pixel pixel coordinates within the map view in the form { x, y }
     * @param {number} radius An optional radius value may be passed, interpreted as pixels. Default radius is zero
     */
    public getFeatureAt(pixel: ViewPoint, radius?: number): { feature: any, changed: any, pixel: ViewPoint, leaflet_event: any } {
        this.checkLayer();
        return this.layer && this.layer.scene.getFeatureAt(pixel, radius);
    }

    load(scene_url: any, options?: { base_url?: string, file_type?: string }) {

    }
    /**
     * Reloads and rebinds textures in the scene.
     */
    public loadTextures() {
        this.checkLayer();
        return this.layer && this.layer.scene.loadTextures();
    }
    /**
     * Rebuilds the current scene from scratch. 
     * */
    rebuild() {
        this.checkLayer();
        return this.layer && this.layer.scene.rebuild();
    }
    /**
     * Requests an update to the drawn map. If the map contains animated elements, this happens once per frame automatically. If not, it happens whenever the map view changes (pan, zoom, etc.).
     */
    requestRedraw() {
        this.checkLayer();
        return this.layer && this.layer.scene.requestRedraw();
    }
    /**
     * 
     * @param param0 This queues a screenshot request, returning a Promise that fulfills when the screenshot is available.
     */
    screenshot({ background = 'transparent' }): Promise<ScreenShotOptions> {
        this.checkLayer();
        if (!this.layer) return Promise.resolve(null);
        return this.layer && this.layer.scene.screenshot(background);
    }
    /**
     * 
     * @param {boolean}camera 
     * Sets the active camera to the camera specified by name, as named in the scene file.
     */
    setActiveCamera(camera: string) {
        this.checkLayer();
        return this.layer && this.layer.scene.setActiveCamera(camera);
    }
    /**
     * 
     * @param {boolean}active
     *  Enabling or disabling introspection at run-time will cause the scene to rebuild automatically to reflect the new setting.
     */
    setIntrospection(active: boolean) {
        this.checkLayer();
        return this.layer && this.layer.scene.setIntrospection(active);
    }

    setDataSource(name: string, config: any): Promise<any> {
        this.checkLayer();
        if (!this.layer) return Promise.resolve(null);
        return this.layer && this.layer.scene.setDataSource(name, config);
    }
    /**
     * 
     * @param  {FeaturesTiles} options
     * 
     *  Queries the tiles which intersect the viewport and returns the features contained in those tiles. 
     * The query method has the following signature and default parameters: queryFeatures({ filter = null, visible = null, unique = true, group_by = null, geometry = false })
     */
    public queryFeatures(options?: QueryFeaturesOptiopns): Promise<any> {
        this.checkLayer();
        if (!this.layer) return Promise.resolve(null);
        return this.layer && this.layer.scene.queryFeatures(options);
    }

    //#end region



}