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

/* // Criador de pixels
function pixelGenerator(parent){
    const newPixel = document.createElement
}
 */
