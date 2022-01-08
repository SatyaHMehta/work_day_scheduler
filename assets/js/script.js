
function init() {
    // Displays the current date on top.
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
  
    // Colors the time blocks and updates them every minute.
    colorTimeBlocks();
    setInterval(colorTimeBlocks, 60000);
  
    // Updates the timeblock with data in the local storage. 
    $(".time-block").each(function() {
      var blockId = $(this).attr("id");
      // load saved data from local storage
      $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
    });
  
    $(".saveBtn").on("click", handleSave);
  }
  
  function colorTimeBlocks() {
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").replace("hour-", ""));
      var currentHour = parseInt(moment().format("H"));
      // Removes any class we may have added before
      $(this).removeClass("past present future");
      // Color the block based on past, present, or future class
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour > currentHour) {
        $(this).addClass("future");
      } else {
        $(this).addClass("present");
      }
    });
  }
  
  function handleSave(event) {
    // Get the id of our parent and save the data in textarea to the local storage.
    var hourId = $(this).parent().attr("id");
    localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
  }
  
  $(init);
  
  