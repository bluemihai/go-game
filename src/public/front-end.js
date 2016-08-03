$(document).ready(() => {
  let lastPlayer = 'X'
  console.log('getGameId', getGameId())

  $('.cell').click( function() {
    lastPlayer = (lastPlayer === 'X' ? 'O' : 'X')
    $(this).html(lastPlayer)
    updateGame(getGameId(), getBoardString())
  })
})

const getBoardString = () => {
  let range = [...Array(9).keys()]
  let cells = range.map(k => '#cell-' + k)
  return cells.map(k => $(k).html()).join('')
}

const getGameId = () => {
  return $('#title-id').html().replace('Game #', '')
}

const updateGame = (id, board) => {
  $.post('/games/update', { id: id, board: board})
}