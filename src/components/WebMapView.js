import React from 'react';
import { loadModules } from 'esri-loader';

export class WebMapView extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        //lazy load the required Arc GIS API for JavaScript modules and CSS

        loadModules(['esri/Map', 'esri/views/MapView'], {css: true}).then((
            [ArcGISMap, MapView]
        ) => {
            const map = new ArcGISMap({
                basemap: 'national-geographic'
            });

            map.on("mouse-wheel", function(event) {
                event.preventDefault();
                alert("Mouse wheel value = " + event.value);
            });

            //Load the map view at ref's DOM node
            this.view = new MapView({
                container: this.mapRef.current,
                map: map,
                center: [0, 0],
                zoom: 2
            });

            this.view.on("click", function(event) {
                console.log("Wow, a click event occurred. The value is " + event.value);
                console.log(event.mapPoint.x);
            })
        })
    }

    componentWillUnmount() {
        if(this.view) {
            //destroy the map view
            this.view.container = null;
        }
    }

    render() {
        return(
            <div className="webmap" ref={this.mapRef}></div>
        );
    }
}