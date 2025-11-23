const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '../public/src/assets/images/flyers';
const outputDir = '../public/src/assets/images/flyers';
const maxWidth = 1200; // Largeur maximale des images

fs.readdirSync(inputDir).forEach(file => {
  if (file.match(/\.(jpg|JPG|jpeg|png)$/i)) {
    console.log(`Traitement de ${file}...`);
    const inputPath = path.join(inputDir, file);
    const tempPath = path.join(outputDir, `${path.parse(file).name}_temp.jpg`);
    const outputPath = path.join(outputDir, `${path.parse(file).name}.jpg`);

    sharp(inputPath)
      .resize({
        width: maxWidth,
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFile(tempPath)
      .then(() => {
        // Remplacer le fichier original par le temporaire
        fs.renameSync(tempPath, outputPath);
        console.log(`✅ Converti: ${file} -> ${path.parse(file).name}.jpg`);
      })
      .catch(err => {
        // Supprimer le fichier temporaire en cas d'erreur
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        console.error(`❌ Erreur avec ${file}:`, err);
      });
  }
});

console.log('Conversion en cours...');