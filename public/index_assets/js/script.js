function check() {
    document.getElementById("true").style.display = 'none';
    document.getElementById("false").style.display = 'none';
    $.post( "/", { phone: phone.value} )
    .done(function( data ) {
        console.log(data.length);
        if (data.length > 0) {
            document.getElementById("true").style.display = 'block';
        } else {
            document.getElementById("false").style.display = 'block';
        }
    });
}