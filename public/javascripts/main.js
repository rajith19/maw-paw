$(document).ready(function(){
    $('.delete-movie').on('click', function(e){
        // e.preventDefault();
        $target = $(e.target);
        const id =$target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/api/movies/' + id,
            success:function(res){
                window.location.href= "/list";
            },
            error:function(err){
                console.log(err);
            }
        })
    })
})