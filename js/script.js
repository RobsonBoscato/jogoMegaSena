var state = { board: [], currentGame: [], savedGames: [] };

function start() {
  createBoard();
  newGame();
}

function createBoard() {
  state.board = [];

  for (let i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

function newGame() {
  resetGame();
  render();
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function renderBoard() {
  var divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';

  var ulNumbers = document.createElement('ul');

  for (let i = 0; i < state.board.length; i++) {
    var liNumber = document.createElement('li');
    liNumber.textContent = state.board[i];

    liNumber.addEventListener('click', handleNumberClick); // add o evento de click

    ulNumbers.appendChild(liNumber);
  }

  divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
  // pega o número clickado
  var value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }

  console.log(state.currentGame);
}

function renderButtons() {
  var divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = '';

  var buttonNewGame = createNewGameButton();

  var buttonRandomGame = createRandomGameButton();

  var buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function createRandomGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Jogo Aleatório';

  button.addEventListener('click', randomGame);

  return button;
}

function createSaveGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Salvar Jogo';

  button.addEventListener('click', saveGame);

  return button;
}

function createNewGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Novo Jogo';

  button.addEventListener('click', newGame);

  return button;
}

function renderSavedGames() {}

function addNumberToGame(numberToAdd) {
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error('[ERRO] Número fora dos parâmetros.');
    return;
  }

  if (state.currentGame.length >= 6) {
    console.error('[ERRO] O jogo já está completo.');
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error('[ERRO] Número já existente.', numberToAdd);
    return;
  }

  state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error('[ERRO] Número fora dos parâmetros.', numberToRemove);
    return;
  }

  var newGame = [];

  for (var i = 0; i < state.currentGame.length; i++) {
    if (state.currentGame[i] === numberToRemove) {
      continue;
    }

    newGame.push(state.currentGame[i]);
  }

  state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
  return state.currentGame.includes(numberToCheck); // refatorado
  // if (state.currentGame.includes(numberToCheck)) {
  //   return true;
  // }
  // return false;
}

function saveGame() {
  if (!isGameComplete()) {
    console.error(
      '[ERRO] O jogo não está completo. Total de nº: ',
      state.currentGame.length
    );
    return;
  }
  state.savedGames.push(state.currentGame);
  newGame();
}

function isGameComplete() {
  return state.currentGame.length === 6;
}

function resetGame() {
  state.currentGame = [];
}

function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }

  console.log(state.currentGame);
}

start();
