$('document').ready(function() {

  const createField = function() {
    let n = $(".option").length++;
    const field =
      `<br>
      <div class="list-item">
      <li><h5><input type="text" name="option${n + 1}" id="option${n + 1}" class="option" maxlength="255"></h5></li>
      <li><h6><input name="description${n + 1}" type="text" id="description${n + 1}" class="description" placeholder="Description" maxlength="255"></h6></li>
      </div>`;
    return field;
  }

  //creates as many options as wanted
    $("#add_option").on('click', function(event) {
      // event.preventDefault();
      const $option = createField();
      $("ul").append($option);
    })
})
