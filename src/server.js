const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/')
    },
    filename: function (req, file, cb) {
        const filePath = 'assets/logo.png';
        // 删除同名文件
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        cb(null, 'logo.png')
    }
})

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});