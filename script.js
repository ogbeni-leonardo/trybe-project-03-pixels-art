const colors = document.getElementsByClassName('color');

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
  parent.style.width = width * 30 + 'px';
  parent.style.height = height * 30 + 'px';
}

const pixelsBoard = document.getElementById('pixel-board');

// Adicionando pixels ao pixel-board
pixelsAdd(pixelsBoard, 5, 5);
