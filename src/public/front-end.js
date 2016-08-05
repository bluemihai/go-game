let lastPlayer = 'W'

let allGames = []

$(document).ready(() => {
  loadGames()
  loadBoard()
  lastPlayer = lastToMove()
  $('.available').click(recordMove)
  $('a.delete-link').click(destroyGame)
})

const loadGames = () => {
  // assumes that '/' gets redirected to '/games' in index.js - please do not change!!!
  console.log('trying to loadGames...')

  var boardStrings = $('.board-string')
  console.log('boardStrings[3]', boardStrings[3])

  boardStrings.each(function(idx, elem) {
    console.log('idx', idx, 'elem', elem, '$(this).text()', this.innerText)
  })

  // $.each(boardStrings, function (idx, val) {
  //   console.log('idx', idx, 'val', val, 'val.text()', val.text())
  // })
}

const destroyGame = function () {
  let gameId = this.id.replace('delete-', '')
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
  $('#game-' + gameId).remove()
}

const recordMove = function () {
  if (illegalMoveCheck()) {
    $('#message').html('WRONG!!!!')
  } else {
    lastPlayer = (lastPlayer === 'B' ? 'W' : 'B')
    $(this).html(lastPlayer)
    $(this).off('click')
    $(this).removeClass('available')
    $(this).addClass(lastPlayer)
    updateGame(getGameId(), getBoardString())
  }
}

const illegalMoveCheck = () => {
  return true
}

const getGameId = () => {
  return $('#title-id').html()
}

const getCellIds = () => {
  let range = [...Array(81).keys()]
  return range.map(k => '#cell-' + k)
}

const loadBoard = () => {
  return getCellIds().map(cell => {
    let value = $(cell).text()
    if (value === '.') {
      $(cell).addClass('available')
    } else {  // (value === 'B' || 'W')
      $(cell).addClass(value)
    }
    $(cell).text(' ')
  })
}

const lastToMove = () => {
  var board = getBoardString()
  var Bs = (board.match(/B/g)||[]).length
  var Ws = (board.match(/W/g)||[]).length
  console.log('Bs', Bs)
  console.log('Ws', Ws)
  return Bs > Ws ? 'B' : 'W'
}

const getBoardString = () => {
  return getCellIds().map(k => $(k).html()).join('')
}

const updateGame = (id, board) => {
  console.log('Updating game...')
  // $.post('/games/update', { id: id, board: board})
  let data = { id: id, board: board }
  return $.ajax({
    // Horrible hack, but can't seem to get index.js to see req.params or req.query or req.body otherwise  - TODO: refactor
     url: '/games/' + id + '/update/' + board,
     type: 'PUT',
     success: function (results) {
       console.log('results', results)
     },
     data: data
   });
}
