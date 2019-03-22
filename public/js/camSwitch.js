AFRAME.registerComponent('cam-switch', {
    schema:{},
    init: function() {
        let Context_AF = this;
        let el = Context_AF.el;
        let parent = el.object3D.parent.el;

        let text = document.getElementsByClassName('camCountdown');

        el.addEventListener('mousedown', function(e) {
            console.log(el);
            if(!swappingCam){
                // initiate countdown
                swappingCam = true;
                // show countdown text
                for(i = 0; i < text.length; i++) {
                    text[i].setAttribute('visible', 'true');
                    text[i].setAttribute('text', {'value': camCountdown});
                }
                // set countdown in other file
                socket.emit('setCountdown', true);

                // change text every second
                let countdown = setInterval(function() {
                    camCountdown -= 1;
                    for(i = 0; i < text.length; i++) {
                        text[i].setAttribute('text', {'value': camCountdown});
                    }
                    // set countdown in other file
                    socket.emit('setCountdown', true); 
                    // switch to selected camera at end of countdown
                    if(camCountdown <= 0) {
                        Context_AF.switch();
                        clearInterval(countdown);
                    }
                }, 1000);
            }
        });
    },
    switch: function() {
        let Context_AF = this;
        let el = Context_AF.el;
        let parent = el.object3D.parent;
        let text = document.getElementsByClassName('camCountdown');
        
        // remove active camera
        let activeCam = document.getElementsByClassName('activeCamera');
        activeCam[0].setAttribute('camera', {'active': 'false'});
        activeCam[0].classList.remove('activeCamera');

        // assign active camera to one associated with this object
        parent.el.classList.add('activeCamera');
        parent.el.setAttribute('camera', {'active': 'true'}); 

        // parent cursor to new active cam
        let cursor = document.querySelector('#cursor');
        parent.el.appendChild(cursor);
        // unrotate cursor
        cursor.object3D.rotation.set(-1 * parent.el.object3D.rotation._x, -1 * parent.el.object3D.rotation._y, -1 * parent.el.object3D.rotation._z);

        // reset countdown attributes
        camCountdown = 3;
        swappingCam = false;
        for(i = 0; i < text.length; i++) {
            text[i].setAttribute('visible', 'false');
            text[i].setAttribute('text', {'value': camCountdown});
        }
        
        // reset countdown timer in other file
        socket.emit('setCountdown', false);
    }
});