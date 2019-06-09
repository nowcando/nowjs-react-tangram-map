
declare module "tangram"{
    import L from "leaflet";
    function leafletLayer(...args: any[]): TangramLeafletLayer;
    interface Scene {
         getActiveCamera(): any;
         getFeatureAt(pixel: {x:number,y:number}, radius?: number): any;
         queryFeatures(options?:any): Promise<any>;
         loadTextures(): void;
         load(scene?:any);
         updateConfig(options?:{rebuild?:boolean});
         rebuild():void;
         requestRedraw():void;
         screenshot(options?:any): Promise<any>;
         setActiveCamera(camera: string):void;
         setIntrospection(active: boolean):void
         setDataSource(name: string, config: any):Promise<any>;
    }

    interface TangramLeafletLayer{
        scene:Scene
        addTo(map:L.Map):void;
        bringToFront():void;
    }
      
    
}