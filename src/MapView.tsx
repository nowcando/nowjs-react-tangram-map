
import L, { LatLngExpression } from "leaflet";
import React, { CSSProperties } from "react";
import ReactDom, { createPortal } from "react-dom";
import Tangram, { TangramLeafletLayer } from "tangram";


export interface ViewPoint {
    x: number; y: number;
}
export type GeoPointExpression = LatLngExpression;
export interface QueryFeaturesOptiopns {
    filter?: any;
    visible?: boolean;
    unique: boolean;
    group_by?: boolean;
    geometry?: boolean;
}
export interface ScreenShotResponse {
    url?: string;
    blob?: Blob;
    type?: string;
}
export interface VideoRecordResponse {
    url?: string;
    blob?: Blob;
    type?: string;
}

export interface MapViewProps {

    width?: number | string;
    height?: number | string;
    style?: CSSProperties;
    scene?: any;
    sceneParams?: any;
    attribution?: string;
    initPosition?: GeoPointExpression;
    initZoom?: number;

    numberofWorkers?: number;

    keyboard?: boolean;

    position?: GeoPointExpression;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    selectionRadius?: number;
    continuousZoom?: number;
    showDebug?: boolean;

    leafletEvents?: any;
    onLayerClick?: (evt?: any) => void;
    onLayerHover?: (evt?: any) => void;

    onScenceLoad?: (evt?: any) => void;
    onSceneViewComplete?: (evt?: any) => void;
    onSceneError?: (evt?: any) => void;
    onSceneWarning?: (evt?: any) => void;

    onPreUpate?: (evt?: any) => void;
    onPostUpate?: (evt?: any) => void;

}
export interface MapViewStates { }
export class MapView extends React.Component<MapViewProps, MapViewStates> {
    private layer: TangramLeafletLayer | null;
    private lmap: L.Map;
    private mapEl: any;
    public state = {
    };
    constructor(props: MapViewProps) {
        super(props);
        this.layer = null;
    }

    private initMap() {
        const position = this.props.initPosition || [0.1, 0.1];
        const zoom = this.props.initZoom || 15;
        const { onLayerClick, onLayerHover, onPostUpate, onPreUpate,
            onScenceLoad, onSceneError, onSceneWarning, onSceneViewComplete,
            selectionRadius, maxZoom, keyboard, leafletEvents,
            numberofWorkers, showDebug, continuousZoom,
        } = this.props;

        if (!this.layer) {
            this.mapEl = ReactDom.findDOMNode(this.refs.map);


            this.lmap = L.map(this.mapEl as any, {
                maxZoom,
                zoomSnap: 0,
                keyboard,
                // zoomControl: false,
                // attributionControl: false,

            }).setView(position, 18);
            // this.lmap.scrollWheelZoom.disable();
            // this.lmap.on('focus', () => { this.lmap.scrollWheelZoom.enable(); });
            // this.lmap.on('blur', () => { this.lmap.scrollWheelZoom.disable(); });
            this.layer = Tangram.leafletLayer({
                scene: this.props.scene,
                selectionRadius,
                numWorkers: numberofWorkers, // number of web workers
                //  highDensityDisplay: true,
                //   noWrap: false,
                // disableRenderLoop: false, // disable render loop
                // introspection: true, // turn scene introspection on/off
                //  logLevel: "debug",
                showDebug,
                continuousZoom, // continus zoom
                preUpdate: onPreUpate,
                postUpdate: onPostUpate,
                events: {
                    hover: onLayerHover,
                    click: onLayerClick,
                    ...leafletEvents,
                },
                attribution: this.props.attribution,
            });
            if (this.layer) {
                if (this.layer.scene) {
                    this.layer.scene.subscribe({
                        load: onScenceLoad,
                        view_complete: onSceneViewComplete,
                        error: onSceneError,
                        warning: onSceneWarning,


                    });
                }
                // this.layer.scene.load(this.props.scene);
                // this.layer.scene.updateConfig();
                this.layer.addTo(this.lmap);
                // this.layer.bringToFront();

                // this.lmap.setView(this.props.initPoint, 15);
                // if (this.props.initPoint) {
                //     this.lmap.setView(this.props.initPoint, this.props.initZoom || 15);
                // }
            }


        }

        // Yo! NYC maps
    }

    public componentDidMount() {

        this.initMap();

    }

    public componentWillUnmount() {
        this.layer.removeFrom(this.lmap);
    }

    public render() {
        const { style, height, width } = this.props;
        const defaultStyle: CSSProperties = {
            width: "100%",
            height: 200,
            backgroundColor: "#ccc",
            overflow: "hidden",
        };

        return (<div style={{ ...defaultStyle, height, width, ...style }}
            ref="map">
        </div>);
    }

    //#region public methods


    public getMap() {
        return this.lmap;
    }
    public getLayer() {
        this.checkLayer();
        return this.layer;
    }
    /**
     * return tangram scene object
     */
    public getScene() {
        this.checkLayer();
        return this.layer && this.layer.scene;
    }

    private checkLayer() {
        if (!this.layer) {
            throw new Error("tangram layer not initialized");
        }
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

    public load(scene_url: any, options?: { base_url?: string, file_type?: string }) {

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
    public rebuild() {
        this.checkLayer();
        return this.layer && this.layer.scene.rebuild();
    }
    /**
     * Requests an update to the drawn map. If the map contains animated elements, this happens once per frame automatically. If not, it happens whenever the map view changes (pan, zoom, etc.).
     */
    public requestRedraw() {
        this.checkLayer();
        return this.layer && this.layer.scene.requestRedraw();
    }
    /**
     *
     * @param param0 This queues a screenshot request, returning a Promise that fulfills when the screenshot is available.
     */
    public screenshot({ background = "transparent" }): Promise<ScreenShotResponse> {
        this.checkLayer();
        if (!this.layer) { return Promise.resolve(null); }
        return this.layer && this.layer.scene.screenshot(background);
    }

    public startVideo() {
        this.checkLayer();
        if (!this.layer) { return Promise.resolve(null); }
        return this.layer && this.layer.scene.startVideoCapture();
    }

    public stopVideo(): Promise<VideoRecordResponse> {
        this.checkLayer();
        if (!this.layer) { return Promise.resolve(null); }
        return this.layer && this.layer.scene.stopVideoCapture();
    }


    /**
     *
     * @param {boolean}camera
     * Sets the active camera to the camera specified by name, as named in the scene file.
     */
    public setActiveCamera(camera: string) {
        this.checkLayer();
        return this.layer && this.layer.scene.setActiveCamera(camera);
    }
    /**
     *
     * @param {boolean}active
     *  Enabling or disabling introspection at run-time will cause the scene to rebuild automatically to reflect the new setting.
     */
    public setIntrospection(active: boolean) {
        this.checkLayer();
        return this.layer && this.layer.scene.setIntrospection(active);
    }

    public setDataSource(name: string, config: any): Promise<any> {
        this.checkLayer();
        if (!this.layer) { return Promise.resolve(null); }
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
        if (!this.layer) { return Promise.resolve(null); }
        return this.layer && this.layer.scene.queryFeatures(options);
    }

    // #end region



}
