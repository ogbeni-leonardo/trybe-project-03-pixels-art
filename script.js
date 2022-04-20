const colors = document.getElementsByClassName('color');

// Aplicando a cor principal da paleta de cores
colors[0].style.backgroundColor = 'rgb(0 0 0)';

// Esta função retorna a cor selecionada da paleta de cores
function selectedColorPalette() {
  return document.querySelector('.selected').style.backgroundColor;
}

// Gerador de cores aleatórias
function colorGenerator() {
  const redColor = parseInt(Math.random() * 255, 10);
  const greenColor = parseInt(Math.random() * 255, 10);
  const blueColor = parseInt(Math.random() * 255, 10);

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

// Altera o tamanho o pixel-board proporcionalmente ao tamanho de blocos por linha e coluna
function pixelBoardSize(parent, width, height) {
  const element = parent;
  element.style.width = `${width * 42}px`;
  element.style.height = `${height * 42}px`;
}

// Os pixels receberão uma função ao serem clicados
function pixelChangeColor() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].onclick = () => {
      pixels[index].style.backgroundColor = selectedColorPalette();
    };
  }
}

// Adiciona os pixels ao elemento parent com n linhas e n colunas
function pixelsAdd(parent, lines, columns) {
  // Altere o tamanho do pixel board em relação as linhas e colunas
  pixelBoardSize(parent, columns, lines);

  for (let line = 0; line < lines; line += 1) {
    for (let column = 0; column < columns; column += 1) {
      pixelGenerator(parent);
    }
  }
  // Atribua uma função a todos os pixels
  pixelChangeColor();
}

const pixelBoard = document.getElementById('pixel-board');

// Adicionando pixels ao pixel-board
pixelsAdd(pixelBoard, 5, 5);

// Quando uma cor da paleta for clicada ela será selecionada
for (let index = 0; index < colors.length; index += 1) {
  colors[index].onclick = () => {
    const selectedColor = document.querySelector('.selected');
    selectedColor.classList.remove('selected');

    colors[index].classList.add('selected');
  };
}

// Limpar todos os blocos de pintura
function pixelClean() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'rgb(255 255 255)';
  }
}

const clearBoard = document.getElementById('clear-board');
clearBoard.onclick = pixelClean;

const generateBoard = document.getElementById('generate-board');
const boardSize = document.getElementById('board-size');

// Função para remover e atualizar todos os elementos do pixel board
function pixelBoardCleaner() {
  const allPixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < allPixels.length; index += 1) {
    pixelBoard.removeChild(allPixels[index]);
  }
}

generateBoard.addEventListener('click', () => {
  if (boardSize.value.length === 0) {
    alert('Board inválido!');
    return;
  }
  const inputValue = parseInt(boardSize.value, 10);
  pixelBoardCleaner();
  if (inputValue < 5) {
    pixelsAdd(pixelBoard, 5, 5);
    return;
  }
  if (inputValue > 50) {
    pixelsAdd(pixelBoard, 50, 50);
    return;
  }
  pixelsAdd(pixelBoard, inputValue, inputValue);
});
