$.extend( $.fn.dataTableExt.oSort, {
    "numeric-comma-pre": function ( a ) {
        var x = (a == "-" || a === "" || a == 0) ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( x );
    },

    "numeric-comma-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "numeric-comma-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
} );
