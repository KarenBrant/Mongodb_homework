// Grab the articles as a json
var limit = 50;
$(".scrape-new").on("click", function() {
    
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  // With that done, add the note information to the page
  .then(function(data) {
                $.getJSON("/articles", function(data) {
    // For each one
            for (var i = 0; i < limit; i++) {
      // Display the apropos information on the page 
      $("#articles").append("<h3 <a data-id='" + data[i]._id + "'>" + "Title:  " + data[i].title + "<br>" + "Link:  " + data[i].link + "</a>" + "</h3>");
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].summary + "</p>");
      // $("#articles").append("<button type='button' id='note-article'>Article Notes</button>" + "<br> <br>");
      $("#articles").append("<button type='button' class='btn btn-primary open-notes' data-toggle='modal' data-target='#modalCenter' data-id=" + data[i]._id + ">Article Notes</button>");
      
    }
  });
});
console.log("id: " + data[i]._id);
});
  
// $(document).on("click", ".btn.save", handleArticleSave);

//   var artSave = $(this).parents(".panel").data();
//   artSave.saved = true;
//   $.ajax({
//     method: "PUT",
//     url: ,
//     data: artSave
//   }).then(function(data){
//     if (data.ok) {
//       initPage();
//     }
//   });


  // Whenever someone clicks a save button
  $(".open-notes").on("click", function() {
    console.log("data-id: " + data._id);
    // Empty the notes from the note section
    $("#note-name").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    // console.log("thisId: " + thisId);
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        // console.log(data);
        
        $('#modalCenter').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget) // Button that triggered the modal
          var recipient = button.data('target') // Extract info from data-* attributes
          // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
          // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
          var modal = $(this)
          // modal.find('.modal-title').text('New message to ' + recipient)
          modal.find('.modal-body input').val(recipient)
        })
        
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          // $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#note-name").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        // title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#note-name").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#note-name").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");
    $("#note-name").val("");
  });
  