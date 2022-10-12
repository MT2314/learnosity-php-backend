require('dotenv').config();

module.exports = function(eleventyConfig) {
    /*
     * Converts LaTeX strings into <amp-mathml/> tags.
     * 
     * \( ... \) becomes an inline tag (LaTeX).
     * \[ ... \] becomes a block tag (LaTeX).
     * 
     * The following syntax does NOT work:
     * $ ... $ becomes an inline tag (TeX).
     * $$ ... $$ becomes a block tag (TeX).
     */
    eleventyConfig.addPairedShortcode("mathformulas", function(content) {
        // TODO figure out how to do "single $" means inline
        const DEBUG = false;
        const block = /(\\\[)(.*?)(\\\])/gim;
        const inline = /(\\\()(.*?)(\\\))/gim;
        var count = 0;
        
        return content.replace(block, function(match) {
            if (DEBUG) {
                console.log(++count, 'block', match);
            }

            return '<amp-mathml layout="container" data-formula="' + match + '"></amp-mathml>';
        }).replace(inline, function(match) {
            if (DEBUG) {
                console.log(++count, 'inline', match);
            }

            return '<amp-mathml layout="container" inline data-formula="' + match + '"></amp-mathml>';
        });
    });

    // Liquid config options; dynamicPartials:false will allow includes without quotes ie "include.html"
    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
    });

    // Opt-out of using .gitignore with 11ty:
    // https://www.11ty.dev/docs/ignores/
    eleventyConfig.setUseGitIgnore(false);

    return {      
        dir: {
            input: "views",
            output: process.env.ELEVENTY_STAGING,
            // includes directory must be inside input directory
            includes: "includes",
            // layouts directory must be inside input directory
            layouts: "layouts",
            // data directory must be inside input directory
            data: "data"
        }
    };
};