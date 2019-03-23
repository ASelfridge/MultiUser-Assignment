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
            camCountdown = MAX_COUNTDOWN + 1;
        }
    }
    camCountdown -= 1;
});

socket.on('writeColour', function(data){
    // change colour of object with data.id
    let object = document.querySelector('#' + data.id);
    object.setAttribute('material', {'color': data.colour});
});

socket.on('writeVisibility', function(data){
    // hide object with given id
    let object = document.querySelector('#' + data.id);
    object.setAttribute('visible', data.visible);
});

socket.on('groundLose', function(){
    // show lose screen
    let loseText = document.querySelector('#loseText');
    loseText.style.display = 'block';

    // remove ability to move/look around
    let player = document.querySelector('#player1');
    player.removeAttribute('wasd-controls');
    player.removeAttribute('look-controls');
});

socket.on('spawnPowerup', function(data) {
    let powerup = document.createElement('a-entity');
    powerup.setAttribute('geometry', {'primitive': 'box'});
    powerup.setAttribute('material', {'color': 'blue'});
    powerup.object3D.position.set(data.x, data.y + 1, data.z);
    powerup.setAttribute('give-speed', '');
    console.log(powerup);
    let scene = document.querySelector('a-scene');
    scene.appendChild(powerup);
});