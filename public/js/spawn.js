AFRAME.registerComponent('spawn', {
    schema:{},
    init: function() {
        let Context_AF = this;
        let el = Context_AF.el;

        el.addEventListener('mousedown', function(e) {
            let intersect = e.detail.intersection;
            if(intersect != null) {
                socket.emit('spawnPrompt', intersect.point);
                let powerup = document.createElement('a-entity');
                powerup.setAttribute('geometry', {'primitive': 'box'});
                powerup.setAttribute('material', {'color': 'blue'});
                powerup.object3D.position.set(intersect.point.x, intersect.point.y + 1, intersect.point.z);
                let scene = document.querySelector('a-scene');
                scene.appendChild(powerup);
            }
        });
    }
})