const LOCALSTORAGE_COLORS = 'colorPalette';
const LOCALSTORAGE_BOARD = 'pixelBoard';
const LOCALSTORAGE_BOARD_SIZE = 'boardSize';

function createColor() { // função que cria uma cor aleatória
  const hexaCharacters = '0123456789ABCDEF'; // variavel que contém caracteres hexadecimais
  let color = '#'; // o # precisa ser incrementado no código pois todas as cores se inicam assim
  for (let index = 0; index < 6; index += 1) { // o for vai iniciar do 0, vai até o indíce 6 e incrementa 1
    const randomIndex = Math.floor(Math.random() * hexaCharacters.length); // gera um número aleatório inteiro entre 0 e o tamanho da string hexaCharacters (6x)
    const randomHexaCharacter = hexaCharacters[randomIndex]; // usa o índice aleatório para selecionar um caractere hexadecimal aleatório (6x)
    color += randomHexaCharacter; // pega a string color e adiciona o caractere gerado aleatoriamente. (6x)
  }
  return color;
}

function updatePageColorsFromLocalStorage() {
  if (localStorage.getItem(LOCALSTORAGE_COLORS)) {
    const localStorageColors = JSON.parse(localStorage.getItem(LOCALSTORAGE_COLORS));
    const colors = document.querySelectorAll('.color'); // captura os elementos que tem a classe color
    for (let index = 0; index < colors.length; index += 1) { // o for vai passar pelas div's pulando a primeira div que é o black
      colors[index].style.backgroundColor = localStorageColors[index]; // cada div vai mudar de acordo com o está armazenado no localStorage
    }
  }
}

function randomColors() { // função que queria a paleta de cores aleatória
  const colors = document.querySelectorAll('.color'); // captura os elementos que tem a classe color
  const colorArray = ['#000000'];
  for (let index = 1; index < colors.length; index += 1) { // o for vai passar pelas div's pulando a primeira div que é o black
    const randomColor = createColor(); // a variável armazena uma cor aleatória da função acima
    colorArray[index] = randomColor;
    localStorage.setItem(LOCALSTORAGE_COLORS, JSON.stringify(colorArray));
  }
  updatePageColorsFromLocalStorage();
}

function createBoard() {
  const input = document.getElementById('board-size');
  let value = input.value;
  if (value === '' || value <= 5) {
    if (localStorage.getItem(LOCALSTORAGE_BOARD_SIZE)) {
      value = LOCALSTORAGE_BOARD_SIZE;
    } else {
      value = 5;
      alert('Board inválido!');
    }
  } else if (value >= 50) {
    value = 50;
  }
  const board = document.getElementById('pixel-board');
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  for (let row = 0; row < value; row += 1) {
    const newDiv = document.createElement('div');
    for (let index = 0; index < value; index += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      newDiv.appendChild(pixel);
    }
    board.appendChild(newDiv);
  };
  localStorage.setItem(LOCALSTORAGE_BOARD_SIZE, value);
}

function selectColor() {
  document.getElementById('color-palette').addEventListener('click', (e) => {
    const clickedElement = e.target;
    if (clickedElement.classList.contains('color')) {
      // remover o selected dos outros elementos com a classe color
      document.getElementsByClassName('selected')[0].classList.remove('selected'); // pega o elemento que tem a classe selected e removendo ela
      clickedElement.classList.add('selected'); // adiciona selected no elemento clicado
    }
  });
}

function saveColorsBoard() {
  const board = document.getElementsByClassName('pixel');
  const arrayColors = [];
  for (let index = 0; index < board.length; index += 1) {
    const pixel = board[index];
    arrayColors[index] = pixel.style.backgroundColor;
  }
  console.log(arrayColors);
  localStorage.setItem(LOCALSTORAGE_BOARD, JSON.stringify(arrayColors));
}

function paintPixel() {
  document.getElementById('pixel-board').addEventListener('click', (e) => {
    const paint = e.target;
    if (paint.classList.contains('pixel')) {
      const color = document.getElementsByClassName('selected')[0].style.backgroundColor;
      paint.style.backgroundColor = color;
    }
    saveColorsBoard();
  });
}

function clearBoard() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];
    pixel.style.backgroundColor = 'white';
  }
  saveColorsBoard();
}

function loadBoard() {
  if (localStorage.getItem(LOCALSTORAGE_BOARD)) {
    const savedColors = JSON.parse(localStorage.getItem(LOCALSTORAGE_BOARD));
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
      const pixel = pixels[index];
      pixel.style.backgroundColor = savedColors[index];
    }
  }
}

const randomColorButton = document.getElementById('button-random-color');
randomColorButton.onclick = randomColors;
const clearBoardButton = document.getElementById("clear-board");
clearBoardButton.onclick = clearBoard;
if (localStorage.getItem(LOCALSTORAGE_COLORS)) { // verfifica se o localStorage está vazio
  updatePageColorsFromLocalStorage(); // se não estiver ele preenche na tela as cores do local Storage
} else { // se tiver vazia
  randomColors(); // cria paleta aleatoria
}
createBoard();
selectColor();
paintPixel();
loadBoard();
const generateBoard = document.getElementById('generate-board');
generateBoard.onclick = createBoard;
