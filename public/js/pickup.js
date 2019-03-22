AFRAME.registerComponent('pickup', {
    schema:{},
    init: function() {
        Context_AF = this;
        el = Context_AF.el;

        Context_AF.falling = false;

        // drop object if let go of mouse
        el.addEventListener('mouseup', function(e) {
            // set to dynamic body
            el.removeAttribute('static-body');
            el.setAttribute('dynamic-body', '');

            Context_AF.falling = true;
        });

        el.addEventListener('collide', function(e) {
            console.log(e.detail);
            // set back to static if colliding with ground
            if(Context_AF.falling && e.detail.body.el.id == 'ground') {
                el.removeAttribute('dynamic-body');
                el.setAttribute('static-body', '');

                Context_AF.falling = false;
            }
        });
    }
});