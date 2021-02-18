const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file');
            resolve(data);
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/dog-img.txt`, (err, res) => {
            fs.writeFile(file, `${res}\n${data}`, err => {
                if (err) reject('Could not write file');
                resolve('success');
            })
        })
    })
}

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1pro, res2pro, res3pro]);
        const imgs = all.map(res => res.body.message)
        console.log(imgs)

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Rando dog image saved to file!');

        return "2: teste dois"
    } catch (error) {
        console.log(error)

        throw (err)
    }
}
(async () => {
    console.log('1: teste um')
    const x = await getDogPic();
    console.log(x);
    console.log('3: teste três');
})()

/*readFilePro(`${__dirname}/dog.txt`).then(data => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
})
    .then(data => {
        writeFilePro('dog-file.txt', data.body.message)
            .then(res => console.log('Rondom dog image save to file'))
            .catch(err => console.log(err))

    }).catch(err => {
        console.log(err);
    })*/