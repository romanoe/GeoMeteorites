
/*
    Imports
*/

import { sphericalToCartesian } from '/GeoMeteorites/utils.js';
import { RADIUS, addToScene, removeFromScene } from '/GeoMeteorites/viz/globe.js';

/*
    Code
*/

const FALL_DURATION      = 2400;
const EXPLOSION_DURATION = 600;

const STEP_TIME  = 16;

const METEORITE_GEOMETRY = new THREE.SphereGeometry(1, 7, 7);

const MATERIAL = new THREE.MeshBasicMaterial({
    color       : 0xffad5b,
    transparent : true
});

const EXPLOSION_GEOMETRY = new THREE.SphereGeometry(0, 16, 16);

function dropMeteorite(long, lat, mass) {
    
    // TODO: Check long and lat
    const PHI   = THREE.Math.degToRad(long);
    const THETA = THREE.Math.degToRad(lat);
    
    const MAX_RANDOM_RADIUS = 2 * Math.PI / 3;
    
    const START_PHI   = PHI    + (Math.random() - 0.5) * MAX_RANDOM_RADIUS;
    const START_THETA = THETA  + (Math.random() - 0.5) * MAX_RANDOM_RADIUS;
    const START_R     = RADIUS + 200;
    
    const STEP_PHI   = (PHI    - START_PHI)   * STEP_TIME / FALL_DURATION;
    const STEP_THETA = (THETA  - START_THETA) * STEP_TIME / FALL_DURATION;
    const STEP_R     = (RADIUS - START_R)     * STEP_TIME / FALL_DURATION;
    
    let meteorite = new THREE.Mesh(METEORITE_GEOMETRY, MATERIAL.clone());
    addToScene(meteorite);
    
    let explosion = new THREE.Mesh(EXPLOSION_GEOMETRY, MATERIAL.clone());
    
    let phi   = START_PHI;
    let theta = START_THETA + (Math.PI / 2);
    let r     = START_R;
    
    function deltaFall() {
        phi   += STEP_PHI;
        theta += STEP_THETA;
        r     += STEP_R;
        let { x , y , z } = sphericalToCartesian(r, phi, theta);
        meteorite.position.set(x, y, z);
    }
    
    for (let i = 0 ; i < FALL_DURATION ; i += STEP_TIME) {
        setTimeout(deltaFall, i);
    }
    
    const STEP_MASS    = Math.log(mass) * STEP_TIME / EXPLOSION_DURATION;
    const STEP_OPACITY = STEP_TIME / EXPLOSION_DURATION;
    
    setTimeout(() => {
        
        addToScene(explosion);
        
        let { x , y , z } = sphericalToCartesian(RADIUS, PHI, THETA + (Math.PI / 2));
        meteorite.position.set(x, y, z);
        explosion.position.set(x, y, z);
        
        function deltaExplosion() {
            explosion.scale.addScalar(STEP_MASS);
            explosion.material.opacity -= STEP_OPACITY;
            meteorite.material.opacity -= STEP_OPACITY;
        }
        
        for (let i = 0 ; i < EXPLOSION_DURATION ; i += STEP_TIME) {
            setTimeout(deltaExplosion, i);
        }
        
    }, FALL_DURATION);
    
    setTimeout(() => {
        
        // Dispose of meteorite
        removeFromScene(meteorite);
        meteorite.geometry.dispose();
        meteorite.material.dispose();
        
        // Dispose of explosion
        removeFromScene(explosion);
        explosion.geometry.dispose();
        explosion.material.dispose();
        
    }, FALL_DURATION + EXPLOSION_DURATION);
    
}

function testMeteorites() {
    for (let i = 0 ; i < 1000 ; i++) {
        let long = (Math.random() - 0.5) * 360;
        let lat = (Math.random() - 0.5) * 180;
        let mass = (Math.random() * 100000);
        setTimeout(() => dropMeteorite(long, lat, mass), i * 100);
    }
}

window.testMeteorites = testMeteorites;
window.dropMeteorite = dropMeteorite;

/*
    Exports
*/

export {
    
    // Functions
    dropMeteorite
    
};
