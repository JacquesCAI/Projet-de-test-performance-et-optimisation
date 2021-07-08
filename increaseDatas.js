const fs = require("fs/promises");


const fileA = 'stocks-es-par-region.csv';
const fileB = 'stocks-es-par-region20k.csv';
const increaseTo = 20000;

(async () => {
    const csv = await fs.readFile('./'+fileA).then(res => res.toString());

    const lines = csv.split("\n").map(line => line.split(','));
    const nbLinesAtBegining = lines.length
    const nbIter = Math.floor(increaseTo/nbLinesAtBegining)-1;

    for (let i=0;i<nbIter;i++) {
        for (let j=0;j<nbLinesAtBegining;j++) {
            lines.push([parseInt(lines[j][0])+(i+1)*nbLinesAtBegining,  ...lines[j].slice(1)]);
        }
    }
    const linesAdded = (nbIter+1)*nbLinesAtBegining;
    for (let i=0;i<increaseTo-linesAdded;i++) {
        lines.push([parseInt(lines[i][0])+linesAdded, ...lines[i].slice(1)]);
    }

    const newCsv = lines.map(line => line.join(",")).join('\n');
    await fs.writeFile('./'+fileB, newCsv);
})()