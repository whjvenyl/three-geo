import DatGuiDefaults from 'dat-gui-defaults';

class GuiHelper extends DatGuiDefaults {
    constructor(data, callbacks={}) {
        super(data);
        this.onChangeAutoOrbit = callbacks.onChangeAutoOrbit;
        this.onChangeVis = callbacks.onChangeVis;
        this.onChangeVrLaser = callbacks.onChangeVrLaser;
        this.onChangeLeaflet = callbacks.onChangeLeaflet;
        this.onChangeLoc = callbacks.onChangeLoc;
    }

    // override
    initGui(gui, data, params) {
        this.locations = { // key: [lat, lng],
            "(none)": [0, 0], // dummy
            "Table Mountain": [-33.9625, 18.4107],
            "Eiger": [46.5763, 7.9904],
            "Colorado River": [36.2058, -112.4413],
            "Mount Fuji": [35.3778, 138.7472],
            "k2": [35.8818, 76.5142],
            // "Akagi": [36.5457, 139.1766],
            // "Cruach Ardrain": [56.3562, -4.5940],
            // "giza": [29.9791, 31.1342],
        };

        let controller;

        controller = gui.add(params, 'vis',
            // ["Satellite", "Wireframe", "Contours"]).name('Terrain'); // FIXME: to be fixed soon ;-)
            ["Satellite", "Wireframe"]).name('Terrain');
        controller.onChange((value) => {
            this.onChangeVis(value);
            data.vis = value;
        });

        controller = gui.add(params, 'autoOrbit').name('Orbit');
        controller.onChange((value) => {
            this.onChangeAutoOrbit(value);
            data.autoOrbit = value;
        });
        this.autoOrbitController = controller;

        controller = gui.add(params, 'vrLaser').name('Laser');
        controller.onChange((value) => {
            this.onChangeVrLaser(value);
            data.vrLaser = value;
        });

        if (0) {
            controller = gui.add(params, 'reset').name("Reset");
            controller.onChange((value) => {
                this.applyDefaults();
                this.onChangeVis(params.vis);
                this.onChangeAutoOrbit(params.autoOrbit);
                this.onChangeVrLaser(value);

                Object.assign(data, params);
            });
        }

        controller = gui.add(params, 'leaflet').name('Map');
        controller.onChange((value) => {
            this.onChangeLeaflet(value);
            data.leaflet = value;
        });

        controller = gui.add(params, 'loc',
            Object.keys(this.locations)).name('Location');
        controller.onChange((value) => {
            this.onChangeLoc(value, this.locations);
            data.Loc = value;
        });

        controller = gui.add(params, 'sourceCode').name("Source Code");
        controller.onChange((value) => {
            window.location.href = "https://github.com/w3reality/three-geo/tree/master/examples/geo-viewer";
        });
    }
}

export default GuiHelper;
