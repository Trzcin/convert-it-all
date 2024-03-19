import { FFmpeg } from '@ffmpeg/ffmpeg';
import { Pandoc } from 'pandoc-wasm';
import YAML from 'yaml';
import './style.css';
import { toBlobURL } from '@ffmpeg/util';

const dropzone = <HTMLDivElement>document.querySelector('div#dropzone');
const pandocdrop = <HTMLDivElement>document.querySelector('div#pandoc');
const yamldrop = <HTMLDivElement>document.querySelector('div#yaml');

dropzone.addEventListener('drop', async (e) => {
    if (!ffmpegLoaded) {
        return;
    }

    e.preventDefault();
   
    if (!e.dataTransfer) {
        return;
    }
    
    for (const file of e.dataTransfer.files) {
        const fileData = await file.arrayBuffer();
        await ffmpeg.writeFile(file.name, new Uint8Array(fileData));
        const baseName = file.name.split('.')[1];
        await ffmpeg.exec(['-i', file.name, `${baseName}.gif`]);
        const output = await ffmpeg.readFile(`${baseName}.gif`);
        const link = URL.createObjectURL(new Blob([output], { type: 'image/gif' }));
        addLink(link);
    }
});

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

pandocdrop.addEventListener('drop', async (e) => {
    if (!pandocLoaded) {
        return;
    }

    e.preventDefault();

    if (!e.dataTransfer) {
        return;
    }

    for (const file of e.dataTransfer.files) {
        const input = await file.text();
        const result = await pandoc.run({
            text: input,
            options: { from: 'markdown', to: 'latex' }
        });
        const link = URL.createObjectURL(new Blob([result], { type: 'text/plain' }));
        addPandLink(link);
    }
});

pandocdrop.addEventListener('dragover', (e) => {
    e.preventDefault();
})

yamldrop.addEventListener('drop', async (e) => {
    e.preventDefault();
    
    if (!e.dataTransfer) {
        return;
    }

    for (const file of e.dataTransfer.files) {
        const input = await file.text();
        const result = YAML.stringify(JSON.parse(input));
        const link = URL.createObjectURL(new Blob([result], { type: 'text/plain' }));
        addYamlLink(link);
    }
});

yamldrop.addEventListener('dragover', (e) => {
    e.preventDefault();
})

// setup ffmpeg
const ffmpeg = new FFmpeg();
const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
ffmpeg.on('log', ({ message }) => {
    console.log(message);
});

let ffmpegLoaded = false;
(async () => {
    try {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
        });
        ffmpegLoaded = true;
    } catch (error) {
        console.error(error);   
    }
})();

const links = <HTMLUListElement>document.querySelector('ul#links');
function addLink(link: string) {
    const a = document.createElement('a');
    a.innerText = 'linkczor';
    a.href = link;
    const ul = document.createElement('ul');
    ul.appendChild(a);
    links.append(ul);
}

// setup pandoc
let pandocLoaded = false;
const pandoc = new Pandoc();
pandoc.init().then(() => {
    pandocLoaded = true;
}).catch(err => {
    console.error(err);
});

const pandLinks = <HTMLUListElement>document.querySelector('ul#links-pandoc');
function addPandLink(link: string) {
    const a = document.createElement('a');
    a.innerText = 'linkczor';
    a.href = link;
    const ul = document.createElement('ul');
    ul.appendChild(a);
    pandLinks.append(ul);
}

const yamlLinks = <HTMLUListElement>document.querySelector('ul#links-yaml');
function addYamlLink(link: string) {
    const a = document.createElement('a');
    a.innerText = 'linkczor';
    a.href = link;
    const ul = document.createElement('ul');
    ul.appendChild(a);
    yamlLinks.append(ul);
}