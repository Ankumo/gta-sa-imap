const fs = require('fs');
const formidable = require('express-formidable');

module.exports = {
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = 'GTA:SA Интерактивная карта';
            return args;
        });

        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    oneOf: [
                        {
                            resourceQuery: /inline/,
                            loader: 'file-loader',
                        },
                        {
                            use: [
                                'babel-loader',
                                {
                                    loader: 'vue-svg-loader',
                                    options: {
                                        svgo: {
                                            plugins: [
                                                { removeDimensions: true },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        devServer: {
            before(app) {
                app.use(formidable());

                const dictPath = './src/lib/dict.json';

                app.post('/dev/point', (req, res) => {
                    const { type, data } = req.fields;
                    const dictRaw = fs.readFileSync(dictPath, {
                        encoding: 'utf-8',
                    });

                    const dict = JSON.parse(dictRaw);

                    const pointType = data.point.type;
                    delete data.point.type;

                    switch (type) {
                        case 'add':
                            dict[pointType].push(data.point);
                            break;
                        case 'edit':
                            dict[pointType][data.idx] = data.point;
                            break;
                        case 'delete':
                            dict[pointType].splice(data.idx, 1);
                            break;
                    }

                    fs.writeFileSync(dictPath, JSON.stringify(dict, null, 4));

                    res.send('ok');
                });
            },
        },
    },
};
