// Main function that controlls the app.
for (let i = 9; i < 18; i++) {
  const containerDivEl = $(".container");
  const hourDivEl = $("<div>").attr("class", "row timeRow");
  hourDivEl.attr("id", `hour-${i}`);
  const timeDivEl = $(`<div> ${i}AM </div>`).attr("class", "col-md-1 hour");
  const textareaEl = $("<textarea>").attr("class", "col-md-10 description");
  const buttonEl = $("<button>").attr("class", "btn saveBtn col-md-1");
  const iEl = $("<i>").attr("class", "fas fa-save");
  containerDivEl.append(hourDivEl);
  hourDivEl.append(timeDivEl, textareaEl, buttonEl);
  buttonEl.append(iEl)
}


function init() {
  // Displays the current date
  var formatDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  $(".date").text(formatDate);

  // Colors each rows and updates the rows every minute.
  timeRow();
  setInterval(timeRow, 60000);

  // Updates the timeRow with data in the local storage.
  $(".timeRow").each(function () {
    var blockId = $(this).attr("id");
    // loads the saved data from the local storage.
    $("#" + blockId + " textarea").text(
      localStorage.getItem(moment().format("DDDYYYY") + blockId)
    );
  });

  // on click, runs the function to save the data of the clicked objects parent to the local storage. 
  $(".saveBtn").on("click", handleSave);
}

// function that colors the time blocks.
function timeRow() {
  $(".timeRow").each(function () {
    var hour = +$(this).attr("id").replace("hour-", "");
    // console.log(hour)
    var currentHour = +moment().format("H");
    console.log(currentHour);
    // Removes any class we may have added before.
    $(this).removeClass("past present future");
    // Colors the time rows based on past, present, or future class
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}
 // function that saves the data in local storage. 
function handleSave(event) {
  var hourId = $(this).parent().attr("id");
  localStorage.setItem(
    moment().format("DDDYYYY") + hourId,
    $("#" + hourId + " textarea").val()
  );
}

// function call that starts the whole app.
$(init);
