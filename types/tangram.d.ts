
declare module "tangram"{
    import L from "leaflet";
    function leafletLayer(...args: any[]): TangramLeafletLayer;
    interface Scene {
         getActiveCamera(): any;
         getFeatureAt(pixel: {x:number,y:number}, radius?: number): any;
         queryFeatures(options?:any): Promise<any>;
         loadTextures(): void;
         load(scene?:any): any;
         updateConfig(options?:{rebuild?:boolean}): any;
         rebuild():void;
         requestRedraw():void;
         screenshot(options?:any): Promise<any>;

         stopVideoCapture(): Promise<any>;
         startVideoCapture(): boolean;
         setActiveCamera(camera: string):void;
         setIntrospection(active: boolean):void;
         setDataSource(name: string, config: any): Promise<any>;

         subscribe(options?: {
            error?: (evt?: any) => void,
            warning?: (evt?: any) => void,
            load?: (evt?: any) => void,
            view_complete?: (evt?: any) => void,

         }): void;
    }

    interface TangramLeafletLayer{
        scene:Scene
        addTo(map:L.Map):void;
        removeFrom(ma:L.Map): void;
        bringToFront():void;
    }
      
    
}