var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/c_cpp");
$('#send').on('click', function (event) {
    var code = editor.getValue();
    var data = {}
    data["code"] = code;
    event.preventDefault();
    $.ajaxSetup({
        headers: { "X-CSRFToken": '{{csrf_token}}' }
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/",
        data: data,
        datatype: 'json',
        success: function (data) {
            var output = data.success
            output = output.replace(/(?:\r\n|\r|\n)/g, '<br>');
            $("#output").empty();
            $("#output").html("<p>" + output + "</p>");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}); 