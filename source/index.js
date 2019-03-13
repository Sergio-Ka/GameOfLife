require('webpack-jquery-ui/slider');

const requireAllFiles = (requireContext) => {
  requireContext.keys().map(requireContext);
};

requireAllFiles(require.context('./', true, /^\.\/.*\.(styl|css|png|jpg)$/));

require('./blocks/slider-with-pop-up/slider-with-pop-up.js');
require('./application/application.js');
