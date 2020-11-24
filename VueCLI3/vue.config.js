module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `
          @import "@/style/_color.scss";
          @import "@/style/_breakpoint.scss";
          @import "@/style/_taskstyle.scss";
          `
        }
      }
    }
  };