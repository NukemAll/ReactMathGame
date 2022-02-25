const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
    plugins: [{
        plugin: CracoAntDesignPlugin,
        options: {
            customizeTheme: {
                // '@primary-color': '#1c69d4',
                '@font-size-base': '14px',
                '@font-family': 'sans-serif',
            }
        }
    }],
};