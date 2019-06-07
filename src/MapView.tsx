
import React from 'react';
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

export interface MapViewProps {

    scene: any;
    sceneParams?: any,
    attribution?: string;
    initPoint?: GeoPoint;
    initZoom?: number;
    selectionRadius?: number,
    onLayerClick: (evt: any) => void;
    onLayerHover: (evt: any) => void;
    onScenceLoad: (evt: any) => void;
    onSceneViewComplete: (evt: any) => void;
    onSceneError: (evt: any) => void;
    onSceneWarning: (evt: any) => void;

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

            const map = L.map(mapEl as any);
            this.layer = Tangram.leafletLayer({
                scene: this.props.scene,
                selectionRadius: selectionRadius,
                events: {
                    hover: onLayerHover && onLayerHover.bind(this),
                    click: onLayerClick && onLayerClick.bind(this),
                },
                attribution: this.props.attribution
            });
            if(this.layer){
                this.layer.addTo(map);
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
        return (<div ref="map"></div>);
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

    load(scene: any, options?: {base_url?:string,file_type?:string}){

    }

    public loadTextures(){
        this.checkLayer();
        return this.layer && this.layer.scene.loadTextures();
    }

    rebuild(){
 // TODO;
    }

    requestRedraw(){
         // TODO;
    }

    screenshot({ background = 'transparent' }): Promise<any>{
        // TODO;
    }

    setActiveCamera(camera: string): void{
// TODO;
    }

    setIntrospection(active: boolean){
// TODO;
    }

    setDataSource(name: string, config: any){
// TODO;
    }

    public queryFeatures(options?: any): Promise<any>{
        this.checkLayer();
        if(!this.layer) return Promise.resolve(null);
        return this.layer && this.layer.scene.queryFeatures(options);
    }

    //#end region



}