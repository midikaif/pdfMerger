const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const port = 3000
const {mergePdfs} = require('./mergePdfs');
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    // res.send({ data: req.files });
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});






