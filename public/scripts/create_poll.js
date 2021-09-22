$('document').ready(function() {

  const createField = function() {
    // <% for (let i = 0; i < 8; i++) { %>
    const field =
      `<li><input type="text" name="option${i + 1}" id="option${i + 1}" class="option" maxlength="255"></li>
      <li><input name="description${i + 1}" type="text" id="description${i + 1}" class="description" placeholder="Description" maxlength="255"></li>`;
    return field;
  }

  //creates as many options as wanted
  $("#add_option").on('click', function(event) {
    event.preventDefault();
    // renderFields(field);
    const $option = createField(field);
    $("<ul>").append($option);
  })
})

