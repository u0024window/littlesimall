import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from "clean-webpack-plugin";

const extractCss = new ExtractTextPlugin('[hash:4][name].css')

export default {
    context: path.resolve(__dirname, '.'),
    entry: {
        index: './app/entry/main.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: '[name].[hash:4]bunld.js',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: /app\//,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader']
                })
            },
            {
                test: /\.(scss|sass)$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader', 'sass-loader',]
                })
            },
            {
                test: /\.less$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader','less-loader',]
                })
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '10000',
                            name:'mock/images/[hash:4][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                exclude: /mock\//,
                use: ['json-loader']
            }

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "output"),
        // compress: true,
        port: 9000
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['.web.js', '.js', '.json'],
    },
    plugins: [
        extractCss,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/page/index.html',
            chunks: ['index']
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDom: 'react-dom',
            $: 'jquery',
            createHistory: 'history/es/createBrowserHistory'
        }),
        // new UglifyJsPlugin({
        //     compress: {
        //         warnings: true
        //     }
        // }),
        new CleanWebpackPlugin(['output'],{
            exclude:['mock']
        })
        ]

}