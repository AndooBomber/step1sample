var todo = [];
$(function() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var toTwoDigits = function(num, digit) {
    num += '';
    if (num.length < digit) {
      num = '0' + num;
    }
    return num;
  };
  var yyyy = toTwoDigits(year, 4);
  var mm = toTwoDigits(month, 2);
  var dd = toTwoDigits(day, 2);
  var ymd = yyyy + "-" + mm + "-" + dd;
  $('#day').val(ymd);
  todo = localStorage.getItem("todo");
  if(todo){
    todo = JSON.parse(todo);
    showToDo();
  }else{
    todo = [];
  }
});

function showToDo() {
  var List = $("#list");
  List.children().remove();
  var kigen,kanryou,dbutton,sakuseibi,naiyou,bangou, value=[];
  for (var i = 0; i < todo.length; i++) {
    value = todo[i];
    bangou = i;
    kanryou = $("<button>");
    kanryou.on('click', function(event) {
      var n1 = $(event.target).parent().parent().parent().children('p').text();
      var n2 = Number(n1);
      if(todo[todo.length-n2][3]){
        todo[todo.length-n2][3]=false;
      }else{
        todo[todo.length-n2][3]=true;
      }
      localStorage.setItem("todo",JSON.stringify(todo));
      showToDo();
    });
    dbutton = $("<button>");
    dbutton.text("削除");
    dbutton.on('click', function(event) {
      var n1 = $(event.target).parent().parent().parent().children('p').text();
      var n2 = Number(n1);
      todo.splice(todo.length-n2,1);
      showToDo();
      localStorage.setItem("todo",JSON.stringify(todo));
    });
    sakuseibi = $("<div>").text(value[0]);
    sakuseibi.addClass('saku');
    naiyou = $("<span>").text(value[1]);
    kigen = $("<span>").text(value[2]);
    var div1= $("<div>");
    var div2= $("<div>");
    var div3= $("<div>");
    var div4= $("<div>");
    div3.append(kanryou);
    div4.append(dbutton);
    div1.addClass('A1');
    div1.css('font-weight', 'bold');
    div2.addClass('A1');
    div3.addClass('div3');
    div4.addClass('div4');
    div1.append(naiyou);
    div1.append(div3);
    div2.append(kigen);
    div2.append(div4);
    var li1= $("<li>");
    li1.append($("<p>").text(todo.length-bangou));
    li1.append(div1);
    li1.append(div2);
    li1.append(sakuseibi);
    if(!value[3]){
      kanryou.addClass('Button');
      dbutton.addClass('Button');
      li1.addClass('li1');
      kanryou.text("未完了");
    }else{
      kanryou.addClass('Button2');
      dbutton.addClass('Button2');
      li1.addClass('li2');
      kanryou.text("完了");
    }
    List.prepend(li1);
  }
}

function ToDoSend() {
  var text = $("#todo");
  var kigen = $("#day");
  if (text.val().length == 0) {
    alert('Todo名を入力してください');
  }else{
  var time = new Date();
  var time2 = "作成日: "+time.getFullYear()+"年"+(time.getMonth()+1)+"月"+time.getDate()+"日";//kairyounoyochiari
  var time3 = new Date(kigen.val());
  var time4 = "期限: "+time3.getFullYear()+"年"+(time3.getMonth()+1)+"月"+time3.getDate()+"日";
  todo.push([time2,text.val(),time4,false]);
  localStorage.setItem("todo" , JSON.stringify(todo));
  text.val("");
  showToDo();
}
  $('#day').val(kigen.val());
}
