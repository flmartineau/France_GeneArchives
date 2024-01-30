const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');


const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

fs.readFile('manifest.json', 'utf8', (err, data) => {
  if (err) {
    console.error(`Erreur lors de la lecture du fichier manifest.json: ${err}`);
    process.exit(1);
  }

  const manifest = JSON.parse(data);
  const version = manifest.version;

  exec(`cd dist && tar.exe -a -c -f ${path.join(outDir, version + '.zip')} *`, (err) => {
    if (err) {
      console.error(`Erreur lors de la création du fichier zip: ${err}`);
      process.exit(1);
    }

    console.log(`Fichier ${version}.zip créé avec succès dans le dossier 'out'.`);
  });

  exec(`tar.exe --exclude=dist --exclude=out --exclude=.git --exclude=node_modules --exclude=package-lock.json --exclude=package.js -a -c -f ${path.join(outDir, 'code-' + version + '.zip')} *`, (err) => {
    if (err) {
      console.error(`Erreur lors de la création du fichier zip: ${err}`);
      process.exit(1);
    }

    console.log(`Fichier code-${version}.zip créé avec succès.`);
  });




});
