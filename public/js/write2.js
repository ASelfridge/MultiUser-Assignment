socket.on('writePos2', function(data) {
    let object = document.querySelector('#' + data.id);
    object.object3D.position.set(data.pos.x, data.pos.y, data.pos.z);
    object.object3D.rotation.set(data.rot._x, data.rot._y, data.rot._z);
});