$(document).ready(function () {
  $("#poll-options").sortable({
    group: "list",
    animation: 200,
    ghostClass: "ghost",
    onSort: reportActivity,
  });

  // Report when the sort order has changed
  function reportActivity() {
    console.log("The sort order has changed");

    document.querySelectorAll(".sortOption").forEach((el, index) => {
      $(el)
        .parents("div.input-group")
        .find("div input")
        .val(index + 1);
      $(el)
        .parents("div.input-group")
        .find("div span")
        .html(index + 1);
    });
  }
});
