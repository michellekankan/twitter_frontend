const CracoAlias = require('craco-alias');

// webpack的配置
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: './src',
        source: 'jsconfig',
      },
    },
  ],
};
