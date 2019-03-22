socket.on('writePos2', function(data) {
    let object = document.querySelector('#' + data.id);
    object.object3D.position.set(data.pos.x, data.pos.y, data.pos.z);
    object.object3D.rotation.set(data.rot._x, data.rot._y, data.rot._z);
});

socket.on('writeCountdown', function(visible){
    let text = document.getElementsByClassName('camCountdown');
    for(i = 0; i < text.length; i++) {
        text[i].setAttribute('text', {'value': camCountdown});
        if(visible) {
            text[i].setAttribute('visible', 'true');
        }
        else {
            text[i].setAttribute('visible', 'false');
            camCountdown = 4;
        }
    }
    camCountdown -= 1;
});