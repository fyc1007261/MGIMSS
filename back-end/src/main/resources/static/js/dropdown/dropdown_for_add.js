(function() {
    [].slice.call( document.querySelectorAll( 'select.cs-skin-underline' )).forEach( function(el) {
        new SelectFx(el);
    } );
})();