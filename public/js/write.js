AFRAME.registerComponent('write', {
    schema:{},
    init: function() {
        let Context_AF = this;
        socket.on('writePos', function(data) {
            Context_AF.el.object3D.position.set(data.x, data.y, data.z);
        });
    }
});