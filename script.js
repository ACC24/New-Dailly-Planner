$(document).ready(function () {

    // Set current date //
    $("#currentDay").text(moment().format("LL"));

    // Set time/task blocks and save buttons //

    var timeArr = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
    var timeHour = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    var table = $('<table>');

    for (var i = 0; i < timeArr.length; i++) {

        var row = $('<tr class="row">');
        var time = $('<td class="time-block">').text(timeArr[i]);
        var desc = $('<td><textarea class="description" id="' + timeHour[i] + '""></textarea></td>');
        var save = $('<td class="saveBtn" id="' + timeHour[i] + '"><i class="fas fa-save"></i></td>');

        row.append(time, desc, save);
        table.append(row);
    };

    $(".container").append(table);

    // Change colors from task blocks to reflect past, present and future according to current time //

    function changeColorBlock() {
        var currentHour = moment().hours();
        $(".description").each(function () {

            var timeStamp = parseInt($(this).attr("id"));

            if (timeStamp < currentHour) {
                $(this).addClass("past");

            } else if (timeStamp === currentHour) {
                $(this).addClass("present");
            }
            else {
                $(this).addClass("future");
            }
        })
    };
    changeColorBlock();


    // Save data to local storage

    $(".saveBtn").click(function () {
        var key = $(this).attr('id');
        var val = $("#" + key).val();
        localStorage.setItem(key, val);
    });

    for (i = 0; i < timeHour.length; i++) {
        $("#" + timeHour[i]).val(localStorage.getItem(timeHour[i]));
    };
});
