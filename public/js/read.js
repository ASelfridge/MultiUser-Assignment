
AFRAME.registerComponent('read', {
    schema:{},
    tick: function() {
        socket.emit('readPos', this.el.object3D.position);
    }
});