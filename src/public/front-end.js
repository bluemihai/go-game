$(document).ready(() => {
  let lastPlayer = 'W'
  console.log('getGameId', getGameId())
  console.log('getBoardString', getBoardString())

  $('.cell').click( function() {
    lastPlayer = (lastPlayer === 'B' ? 'W' : 'B')
    console.log('getGameId()', getGameId(), 'lastPlayer', lastPlayer, getBoardString())
    $(this).html(lastPlayer)
    $(this).removeClass('available')
    $(this).addClass(lastPlayer)
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
  let range = [...Array(81).keys()]
  let cells = range.map(k => '#cell-' + k)
  return cells.map(k => $(k).html()).join('')
}


const getGameId = () => {
  return $('#title-id').html()
}

const updateGame = (id, board) => {
  // $.post('/games/update', { id: id, board: board})
  let data = { id: id, board: board }
  return $.ajax({
    // Horrible hack, but can't seem to get index.js to see req.params or req.query or req.body otherwise  - TODO: refactor
     url: '/games/' + id + '/update/' + board,
     type: 'PUT',
     success: (results) => {
       console.log('results', results)
     },
     data: data
   });
}

