
declare module "tangram"{
    import L from "leaflet";
    function leafletLayer(...args: any[]): TangramLeafletLayer;
    interface Scene {
         getActiveCamera(): any;
         getFeatureAt(pixel: {x:number,y:number}, radius?: number): any;
         queryFeatures(options?: any): Promise<any>;
         loadTextures(): void;
    }
    interface TangramLeafletLayer{
        scene:Scene
        addTo(map:L.Map):void;
    }
    
}