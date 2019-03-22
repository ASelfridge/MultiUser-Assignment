AFRAME.registerComponent('pickup', {
    schema:{},
    init: function() {
        let Context_AF = this;
        let el = Context_AF.el;

        Context_AF.falling = false;

        // drop object if let go of mouse
        el.addEventListener('mouseup', function(e) {
            // set to dynamic body
            el.removeAttribute('static-body');
            el.setAttribute('dynamic-body', '');

            Context_AF.falling = true;
        });

        el.addEventListener('collide', function(e) {
            // set back to static if colliding with ground
            if(Context_AF.falling && e.detail.body.el.id == 'ground') {
                el.removeAttribute('dynamic-body');
                el.setAttribute('static-body', '');

                Context_AF.falling = false;
            }
        });
    }
});