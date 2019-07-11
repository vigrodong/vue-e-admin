const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))
      .set("components", resolve("src/components"));
  },
  devServer: {
    proxy: {
        '/api': {
            // target: 'https://beidou.hletong.com/',
            // target: '192.168.4.16:25090',
            // target: 'http://192.168.4.16:25089/',//田间波主机
            target:'http://192.168.2.4:8081/yzjh/',
            // target:'http://192.168.4.16:25083/',//liudongcai serve
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
                },
            headers: {

                }
            }
        }
    },
};