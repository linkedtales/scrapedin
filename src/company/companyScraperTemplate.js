const template = {
    profile: {
        selector: '.org-top-card',
        fields: {
            name: `h1`,
            headline: `p`,
            imageurl: {
                selector: `img.org-top-card-primary-content__logo`,
                attribute: 'src'
            }
        }
    },
    about: {
        selector: '.org-grid__core-rail--no-margin-left',
        fields: {
            overview: 'p',
            types:{
                selector: 'dl dt',
                isMultipleFields: true
            },
            values:{
                selector: 'dl dd:not(.org-page-details__employees-on-linkedin-count)',
                isMultipleFields: true
            }
        }
    }
}


module.exports = template
