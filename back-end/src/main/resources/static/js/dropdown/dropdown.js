(function() {
    [].slice.call( document.querySelectorAll( 'select.cs-skin-slide' )).forEach( function(el) {
        new SelectFx(el);
    } );
})();