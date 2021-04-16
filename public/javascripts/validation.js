$('#addMovie').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#name').val() || !$('input#cardImage').val() || !$('input#price').val()  || !$('input#genres').val() || !$('input#author').val() || !$('#rating').val() || !$('input#reviewText').val() ) {
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div > ');
            window.scrollTo(0,0);
        } 
        return false;
    }
});