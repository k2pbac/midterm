$('document').ready(function() {

  const createField = function() {
    let n = $(".option").length++;
    const field =
      `<br>
      <li><input type="text" name="option${n + 1}" id="option${n + 1}" class="option" maxlength="255"></li>
      <li><input name="description${n + 1}" type="text" id="description${n + 1}" class="description" placeholder="Description" maxlength="255"></li>`;
    return field;
  }

  //creates as many options as wanted
    $("#add_option").on('click', function(event) {
      // event.preventDefault();
      const $option = createField();
      $("ul").append($option);
    })
})
