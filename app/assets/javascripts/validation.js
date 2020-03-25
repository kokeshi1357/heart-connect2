$(function(){
 // ユーザー登録・ログイン
  $('input:submit[class="register_btn"]').click(function(){
   if(!user_input_check()){
    return false;
   }
  });

  // 入力内容チェックのための関数
  function user_input_check(){
   var result = true;

   // 入力エラー文をリセット
   $(".reg_e").empty();
  
   // 入力内容セット
   var nickname   = $("#input_n").val();
   var email  = $("#input_e").val();
   var passwords = $("#input_p").val();
   var pass_confirm  = $("#input_c").val();

   // 入力内容チェック
   // ニックネーム
   if(nickname != undefined){
    if(nickname == ""){
     $("#nickname_error").html("　*お名前を入力してください。");
     result = false;
    }else if(nickname.length > 25){
     $("#nickname_error").html("　*お名前は15文字以内で入力してください。");
     result = false;
    }
   }
   // メールアドレス
   if(email != undefined){
    if(email == ""){
     $("#email_error").html("　*メールアドレスを入力してください。");
     result = false;
    }else if(!email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
     $('#email_error').html("　*正しいメールアドレスを入力してください。");
     result = false;
    }else if(email.length > 50){
     $('#email_error').html("　*正しいメールアドレスを入力してください。");
     result = false;
    }
   }
   //パスワード
   if(passwords != undefined){
    if(passwords == ""){
     $("#pass_error").html("　*パスワードを入力してください。");
     result = false;
    }else if(passwords.length < 8){
     $("#pass_error").html("　*パスワードは8文字以上で入力してください。");
     result = false;
    }
   }
   //確認
   if(pass_confirm != undefined){
    if(pass_confirm == ""){
     $("#confo_error").html("　*確認用パスワードを入力してください。");
     result = false;
    }else if(pass_confirm.length < 8){
     $("#confo_error").html("　*確認用パスワードは8文字上で入力してください。");
     result = false;
    }else if(passwords != pass_confirm){    //確認用のパスワードの相違チェック
     $("#confo_error").html("　*パスワードが確認内容とあっていません。");
     result = false;
    }
   }
   return result;
  };


 // 投稿画面
  $('button:submit[class="new_msg_send"]').click(function(){
  if(!msg_input_check()){
    return false;
  }
  });

  function msg_input_check(){
    var result = true;

    // 入力エラー文をリセット
    $(".msg_e").empty();
   
    // 入力内容セット
    var title   = $("#message_title").val();
    var detail  = $("#message_body").val();

    if(title != undefined){
      if(title == ""){
       $("#title_error").html("*タイトルを入力してください。");
       result = false;
      }
    }
    if(detail != undefined){
      if(detail == ""){
        $("#detail_error").html("*テキストを入力してください。");
        result = false;
      }
    }
    return result;
  };
});