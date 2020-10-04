var comment_btn = document.querySelector(".comment_btn");
var comments = document.querySelector(".comment_conatainer");
var like = document.querySelector(".like_btn");
comment_btn.addEventListener("click", function () {
    comments.classList.toggle("comment_conatainer");
});
// $('#myForm').submit(function(e){
//     e.preventDefault();
//     $.ajax({
//         url: '/campgrounds/:id/comments',
//         type: 'post',
//         data:$('#myForm').serialize(),
//         success:function(){
//             // Whatever you want to do after the form is successfully submitted
//         }
//     });
// });