$(document).ready(() => {
  let lastPlayer = 'X'

  $('.cell').click( function() {
    lastPlayer = (lastPlayer === 'X' ? 'O' : 'X')
    $(this).html(lastPlayer)
  })
})
