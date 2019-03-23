AFRAME.registerComponent('give-speed', {
    schema:{},
    init: function() {
        let Context_AF = this;
        let el = Context_AF.el;

        el.addEventListener('mousedown', function(e) {
            // increase player acceleration
            let player = document.querySelector('#player1');
            let currSpeed = player.getAttribute('wasd-controls');
            currSpeed = currSpeed.acceleration + 100;
            player.setAttribute('wasd-controls', {'acceleration': currSpeed});

            // hide powerup
            el.object3D.position.y = -100;
        });
    }
})