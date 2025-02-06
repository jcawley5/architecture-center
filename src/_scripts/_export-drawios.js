const { readdirSync, readFileSync, writeFileSync } = require('node:fs');
const { execSync } = require('node:child_process');
const { normalize: normalizePath } = require('node:path');

// SCRIPT CAN BE RUN NATIVELY ON MAC OR VIA DOCKER.
// THE FORMER REQUIRES DRAWIO TO BE INSTALLED

const log = console.log;

// DOCKER=1 -> run drawio cli via docker
const { DOCKER = 0 } = process.env;
const DRAWIO_CLI_MAC_BINARY = '/Applications/draw.io.app/Contents/MacOS/draw.io';
// assuming script is in src/_scripts/
const SEARCH_DIR = __dirname + '/../../docs/ref-arch';
const SAP_LOGO = __dirname + '/../../static/img/logo.svg';
const SVG_BACKGROUND_COLOR = '#ffffff';
const URL = "https://architecture.cloud.sap";

const single = process.argv[2];

if (!DOCKER) {
    try {
        execSync(DRAWIO_CLI_MAC_BINARY + ' -h', { encoding: 'utf8' });
    } catch (e) {
        const msg = `Cannot find Drawio executable at ${DRAWIO_CLI_MAC_BINARY}. For now only Mac is supported. Set DOCKER=1 to run Drawio CLI via docker (if installed)`;
        throw new Error(msg, { cause: e });
    }
}

const files = readdirSync(SEARCH_DIR, { recursive: true });
const drawios = files.filter((file) => file.match(/\.drawio$/));
log(`Found ${drawios.length} drawios to export to svg\n`);

// TODO: make his const again later
let transforms = {};
// drawio as in RA0001/drawio/Events-to-business-actions-framework.drawio
for (const drawio of drawios) {
    // Events-to-business-actions-framework part
    const name = drawio.split('/').slice(-1)[0].split('.')[0];
    const svg = `${SEARCH_DIR}/${drawio.split('/drawio/')[0]}/images/${name}.svg`;
    transforms[`${SEARCH_DIR}/${drawio}`] = svg;
}

if (single) {
    log("single is", single)
    const k = Object.keys(transforms).find(k => k.includes(single));
    transforms = { [k]: transforms[k] };
    log("now it's", JSON.stringify(transforms))
}

// throw new Error("stop")
// export all drawios to svgs
for (const [input, out] of Object.entries(transforms)) {
    const cmd = prepareCommand(input, out);
    try {
        // try sync variant first to not overwhelm runner in GitHub workflow
        const stdout = execSync(cmd, { encoding: 'utf8' });
        log(stdout.replaceAll('docs/ref-arch/', '').replaceAll('\n', ''));
    } catch (e) {
        const msg = `Export failed ${prettyPath(input)} -> ${prettyPath(out)}, aborting now`;
        // let's fail early
        throw new Error(msg, { cause: e });
    }
}
log('\n');

function prepareCommand(input, out) {
    // make relative, docker doesn't have same dir structure
    const d = 'docs/';
    out = d + normalizePath(out).split(d)[1];
    input = d + normalizePath(input).split(d)[1];

    // put path in quotes because there are spaces sometimes
    const args = ` --export --embed-svg-images --output "${out}" "${input}"`;
    const cmd =
        (!DOCKER ? DRAWIO_CLI_MAC_BINARY : 'docker run -w /data -v $(pwd):/data rlespinasse/drawio-desktop-headless') +
        args;
    return cmd;
}

// watermark the svgs, which were created in the previous step
for (const [drawioPath, svgPath] of Object.entries(transforms)) {
    let svg = readFileSync(svgPath, 'utf8');
    const viewBox = svg.match(/viewBox="([^"]*)"/)[1].split(' ');
    const height = parseInt(viewBox[3]);
    const width = parseInt(viewBox[2]);
    // finding these exact values is a bit trial and error
    const pad = 20; // additional padding to the one drawio itself already has
    viewBox[0] = -pad;
    viewBox[1] = -pad;
    // pad*2 to have ~same padding right/left and top/bottom
    viewBox[2] = width + pad * 2;
    const logoHeight = 52;
    // x coordinate of title is bottom of text, so need to shift everything to keep padding top
    const yShift = 40;
    // actual title height is 25 with font size 22, but this gets us closer
    // to the top padding we want
    const titleHeight = 25 - 5;
    // height increase = logo height + pad top/left + pad between logo and diagram
    // (+ necessary vertical shift for now cause title)
    viewBox[3] = height + logoHeight + pad * 3 + titleHeight + yShift;

    const logoWidth = 106;
    const logoY = height + pad + yShift;
    const textX = logoWidth + pad;
    try {
        const iso = execSync(`git log -1 --format=%cd --date=iso "${drawioPath}"`);
        const lastUpdate = new Date(iso).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const revert = 30;
        const logo = readFileSync(SAP_LOGO, 'utf8');
        const mark = `<text x="0" y="${titleHeight}" font-family="Arial" font-weight="bold" font-size="22">
                        Solution Diagram Title
                    </text>
                    <text x="${textX}" y="${logoY + 20 + yShift - revert}" font-family="Arial" font-weight="bold" font-size="20">
                        Architecture Center
                    </text>
                    <text x="${textX}" y="${logoY + logoHeight - 4 + yShift - revert}" font-family="Arial" font-style="italic" font-size="16">
                        Last update on ${lastUpdate}
                    </text>
                    <g transform="translate(0, ${logoY + yShift - revert})">
                        <image width="${logoWidth}" height="${logoHeight}" href="data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}" />
                    </g>
                    <text x="${width/2}" y="${logoY + 36 + yShift - revert}" font-family="Arial" font-size="18">
                        ${URL}
                    </text>`;

        const bg = `<rect x="${-pad}" y="${-pad}" width="${viewBox[2]}" height="${viewBox[3]}" fill="${SVG_BACKGROUND_COLOR}"/>`;
        svg = svg
            // leave svg opening tag unchanged, but add rect element to set background color
            .replace(/<svg([^>]*)>/, '<svg$1>' + bg)
            // this g contains the diagram
            .replace("<g>", `<g transform="translate(0, ${yShift})">`)
            .replace(/<\/svg>$/, mark + '</svg>')
            .replace(/viewBox="([^"]*)"/, `viewBox="${viewBox.join(' ')}"`)
            // height attribute was set to same as viewbox height, so update it too
            .replace(/height="([^"]*)"/, `height="${viewBox[3]}"`)
            .replace(/width="([^"]*)"/, `width="${viewBox[2]}"`);

        writeFileSync(svgPath, svg);
        log('Watermarked ' + prettyPath(svgPath));
    } catch (e) {
        const msg = `Failed to watermark ${prettyPath(svgPath)}, aborting now`;
        throw new Error(msg, { cause: e });
    }
}

function prettyPath(p) {
    return normalizePath(p.split('ref-arch/')[1]);
}
