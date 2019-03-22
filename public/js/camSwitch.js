AFRAME.registerComponent('cam-switch', {
    schema:{},
    init: function() {
        let Context_AF = this;
        let el = Context_AF.el;

        let parent = el.object3D.parent;

        el.addEventListener('mousedown', function(e) {
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
        });
    }
});