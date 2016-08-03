$(document).ready(() => {
  let lastPlayer = 'O'
  console.log('getGameId', getGameId())

  $('.cell').click( function() {
    lastPlayer = (lastPlayer === 'X' ? 'O' : 'X')
    $(this).html(lastPlayer)
    updateGame(getGameId(), getBoardString())
  })
  
  $('a.delete-link').click(function() {
    let gameId = this.id.replace('delete-', '')
    console.log('gameId', gameId)
    $.ajax({
      url: '/games/' + gameId,
      type: 'DELETE',
      success: (results) => {
        console.log('results', results)
      },
      error: (error) => {
        console.log('error:', error)
      }
    })
    
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
  // $.post('/games/update', { id: id, board: board})
  let data = { id: id, board: board }
  // Horrible hack, but can't seem to get index.js to see req.params or req.query or req.body otherwise  - TODO: refactor
  return $.ajax({
     url: '/games/' + id + '/update/' + board,
     type: 'PUT',
     success: (results) => {
       console.log('results', results)
     },
     data: data
   });
}