'use strict';

/*
    Constants
*/

const CAMERA_MOVE_DURATION = 1500;

/*
    Code
*/

// TODO: Rename this function
function updateCameraZ() {
    let { x , y , z } = sphericalToCartesian(cameraDistance, CAMERA.rotation.y, - CAMERA.rotation.x);
    CAMERA.position.set(x, y, z);
}

// TODO: Improve performance of this function
function moveCameraTo(long, lat, r, duration = 0) {
    
    // TODO: Check if long and lat are in bounds
    const PHI   = long * Math.PI / 180;
    const THETA = lat  * Math.PI / 180;
    
    if (duration === 0) {
        CAMERA.rotation.y = PHI;
        CAMERA.rotation.x = - THETA;
        cameraDistance = r;
        
        let { x , y , z } = sphericalToCartesian(r, PHI, THETA);
        
        CAMERA.position.set(x, y, z);
        
        return new Promise((resolve, reject) => resolve());
    }
    
    pauseGlobeAnimation();
    
    const DIFF_PHI   =   PHI   - CAMERA.rotation.y;
    const DIFF_THETA = - THETA - CAMERA.rotation.x;
    const DIFF_R     =   r     - cameraDistance;
    
    const PHIS    = [];
    const THETAS  = [];
    const RS      = [];
    
    CUBIC_BEZIER_EASE_VALUES.forEach(delta => {
        PHIS.push(CAMERA.rotation.y + delta * DIFF_PHI);
        THETAS.push(CAMERA.rotation.x + delta * DIFF_THETA);
        RS.push(cameraDistance + delta * DIFF_R);
    });
    
    function deltaT(i) {
        CAMERA.rotation.y = PHIS[i];
        CAMERA.rotation.x = THETAS[i];
        cameraDistance = RS[i];
        
        let { x , y , z } = sphericalToCartesian(RS[i], PHIS[i], - THETAS[i]);
        
        CAMERA.position.set(x, y, z);
    }
    
    for (let i = 0 ; i < CUBIC_BEZIER_EASE_VALUES.length ; i++) {
        setTimeout(() => deltaT(i), duration * i / CUBIC_BEZIER_EASE_VALUES.length);
    }
    
    return new Promise((resolve, reject) => setTimeout(resolve, duration));
    
}

function focusOnCountry(countryName) {
    
    const COUNTRY = countries.find(country => country.name === countryName);
    
    const R = CAMERA_BOUNDS.MIN + Math.floor(Math.max(
        parseFloat(COUNTRY.maxLong) - parseFloat(COUNTRY.minLong),
        parseFloat(COUNTRY.maxLat)  - parseFloat(COUNTRY.minLat)
    ));
    
    if (COUNTRY !== undefined) {
        moveCameraTo(parseFloat(COUNTRY.centLong), parseFloat(COUNTRY.centLat),
            R, CAMERA_MOVE_DURATION);
    }
    
}
