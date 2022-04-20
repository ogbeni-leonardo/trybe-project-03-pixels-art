const colors = document.getElementsByClassName('color');

// Aplicando a cor principal da paleta de cores
colors[0].style.backgroundColor = 'rgb(0 0 0)';

let mainColor = colors[0].style.backgroundColor;

// Gerador de cores aleatórias
function colorGenerator() {
  let redColor = parseInt(Math.random() * 255);
  let greenColor = parseInt(Math.random() * 255);
  let blueColor = parseInt(Math.random() * 255);

  return `rgb(${redColor} ${greenColor} ${blueColor})`;
}

// Aplicando uma cor aleatória aos blocos da paleta de cores, exceto o primeiro
for (let index = 1; index < colors.length; index += 1) {
  colors[index].style.backgroundColor = colorGenerator();
}

// Criador de pixels
function pixelGenerator(parent) {
  const newPixel = document.createElement('div');
  newPixel.className = 'pixel';

  parent.appendChild(newPixel);
}

// Adiciona os pixels ao elemento parent com n linhas e n colunas
function pixelsAdd(parent, lines, columns) {
  // Altere o tamanho do meu pixel board em relação as minhas linhas e colunas
  pixelBoardSize(parent, columns, lines);
  for (let line = 0; line < lines; line += 1) {
    for (let column = 0; column < columns; column += 1) {
      pixelGenerator(parent);
    }
  }
}

// Altera o tamanho o pixel-board proporcionalmente ao tamanho de blocos por linha
function pixelBoardSize(parent, width, height) {
  parent.style.width = width * 42 + 'px';
  parent.style.height = height * 42 + 'px';
}

const pixelBoard = document.getElementById('pixel-board');

// Adicionando pixels ao pixel-board
pixelsAdd(pixelBoard, 5, 5);

// Quando uma cor da paleta for clicada ela será selecionada
for (let color of colors) {
  color.addEventListener('click', () => {
    const selectedColor = document.querySelector('.selected');
    selectedColor.classList.remove('selected');

    color.classList.add('selected');

    // Alterando a cor de aplicação (mainColor)
    mainColor = color.style.backgroundColor;
  });
}

// Coletando todos os pixels
const pixels = document.getElementsByClassName('pixel');

for (let pixel of pixels) {
  pixel.addEventListener('click', () => {
    pixel.style.backgroundColor = mainColor;
  });
}

// Limpar todos os blocos de pintura
function pixelClean() {
  for (let pixel of pixels) {
    pixel.style.backgroundColor = 'rgb(255 255 255)';
  }
}

const clearBoard = document.getElementById('clear-board');
clearBoard.onclick = pixelClean;

const generateBoard = document.getElementById('generate-board');
const boardSize = document.getElementById('board-size');

// Função para remover e atualizar todos os elementos do pixel board
function pixelBoardCleaner() {
  const allPixels = document.querySelectorAll('.pixel');
  for (let pixel of allPixels) {
    pixelBoard.removeChild(pixel);
  }
}

generateBoard.addEventListener('click', () => {
  if (boardSize.value.length === 0) {
    alert('Board inválido!');
    return;
  }
  const inputValue = parseInt(boardSize.value);
  pixelBoardCleaner();
  if (inputValue > 0 && inputValue <= 50) {
    pixelsAdd(pixelBoard, inputValue, inputValue);
  }
});
