AFRAME.registerComponent('read', {
    schema:{
        writeTo: {},
        file: {default: 0}
    },
    tick: function() {
        if (this.data.file == 1) {
            socket.emit('readPos', {id: this.data.writeTo, pos: this.el.object3D.position, rot: this.el.object3D.rotation});
        }
        else if(this.data.file == 2){
            socket.emit('readPos2', {id: this.data.writeTo, pos: this.el.object3D.position, rot: this.el.object3D.rotation});
        }
    }
});