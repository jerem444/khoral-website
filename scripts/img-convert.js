const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '../public/src/assets/images';
const outputDir = '../public/src/assets/images';
const maxWidth = 1200; // Largeur maximale des images

// Lire les fichiers du répertoire d'entrée
fs.readdirSync(inputDir).forEach(file => {
  if (file.match(/\.(jpg|JPG|jpeg|png)$/i)) {
    console.log(`Traitement de ${file}...`);
    
    sharp(path.join(inputDir, file))
      .resize({ 
        width: maxWidth, 
        withoutEnlargement: true, // Ne pas agrandir les images plus petites
        fit: 'inside' // Conserver les proportions
      })
      .toFile(path.join(outputDir, `${path.parse(file).name}.webp`))
      .then(() => {
        console.log(`✅ Converti: ${file} -> ${path.parse(file).name}.webp`);
      })
      .catch(err => {
        console.error(`❌ Erreur avec ${file}:`, err);
      });
  }
});

console.log('Conversion en cours...');