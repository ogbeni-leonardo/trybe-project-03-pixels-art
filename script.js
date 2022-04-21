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

// Altera a classe de seleção dos elementos
function selectedColor(element) {
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');

  element.classList.add('selected');
}

// Quando uma cor da paleta for clicada ela será selecionada
for (let index = 0; index < colors.length; index += 1) {
  colors[index].onclick = () => {
    selectedColor(colors[index]);
  };
}

const colorPicker = document.getElementById('color-picker');

// Função que altera a cor de fundo da opção multicolor na paleta de cores
function colorPickerChange(color) {
  const extraColor = document.querySelector('.multicolor');
  extraColor.style.backgroundColor = color;

  // Ao mudar sua cor padrão faça dessa div a opção selecionada
  selectedColor(extraColor);
}

colorPicker.addEventListener('change', (event) => {
  colorPickerChange(event.target.value);
});

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
const boardSizeLine = document.getElementById('board-size-line');
const boardSizeColumn = document.getElementById('board-size-column');

// Função para remover e atualizar todos os elementos do pixel board
function pixelBoardCleaner() {
  const allPixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < allPixels.length; index += 1) {
    pixelBoard.removeChild(allPixels[index]);
  }
}

// Validar as entradas de linhas e colunas
function validInput(inputLine, inputColumn) {
  let lineValue = inputLine;
  let columnValue = inputColumn;

  if (inputLine < 5) lineValue = 5;
  else if (inputLine > 14) lineValue = 14;

  if (inputColumn < 5) columnValue = 5;
  else if (inputColumn > 22) columnValue = 22;

  return [lineValue, columnValue];
}

generateBoard.addEventListener('click', () => {
  if (boardSizeLine.value.length === 0 || boardSizeColumn.value.length === 0) {
    alert('Board inválido!');
    return;
  }
  pixelBoardCleaner();
  const inputValues = validInput(
    parseInt(boardSizeLine.value, 10),
    parseInt(boardSizeColumn.value, 10),
  );
  console.log(inputValues);
  pixelsAdd(pixelBoard, inputValues[0], inputValues[1]);
});
