const {
    app,
    express
} = require('./config/app');
const fs = require("fs");
const path = require('path');


// 访问静态资源
app.use(express.static(path.join(__dirname, 'public')));


// 查看当前文件夹下所有文件
app.get('/checkFile', (req, res) => {
    const {
        url
    } = req.query;

    if (!url) {
        res.json({
            success: false,
            msg: 'invite url'
        });
        return
    }

    fs.readdir(url, 'utf8', (err, fileList) => {
        if (err) throw err;
        res.json({
            fileList
        });
    })
});

// 更改文件夹下所有文件
app.post('/changeFile', (req, res) => {
    let {
        url,
        fileName,
        originName
    } = req.body;

    fs.readdir(url, 'utf8', (err, fileList) => {
        if (err) throw err;

        url += "\\";

        // 修改单个
        if (originName) {
            let type = '';
            // 没有填后缀名的时候，用原来的后缀
            if (!fileName.includes('.')) {
                let length = originName.split('.').length;
                //获取文件后缀名
                type = '.' + originName.split('.')[length - 1];
            }

            fs.renameSync(url + originName, url + fileName + type, err => console.log(err));

        } else { // 批量修改

            fileList.forEach((item, index) => {
                let length = item.split('.').length;

                //获取文件后缀名
                let type = '.' + item.split('.')[length - 1];

                // 改名
                fs.renameSync(url + item, url + fileName + (index + 1) + type, err => console.log(err));
            });
        }



        res.json({
            success: true,
            msg: '改名成功！'
        })
    })
});


const {
    exec
} = require("child_process");

exec('start http://127.0.0.1:8888/index.html');