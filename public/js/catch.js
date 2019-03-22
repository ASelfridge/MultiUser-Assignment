AFRAME.registerComponent('catch', {
    schema:{},
    init: function() {
        let Context_AF = this;
        let el = Context_AF.el;

        el.addEventListener('mousedown', function(e) {
            // show win screen
            let winText = document.querySelector('#winText');
            winText.style.display = 'block';

            // send event to player file
            socket.emit('watcherWin');
        });
    }
})