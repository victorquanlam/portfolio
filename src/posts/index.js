const axios = require('axios');

/**
 * Make a get request
 * 
 * @param {String} url
 * @return Axios response object
 */
export const request = async (url) => {
    try {
        return axios.get(url);
    } catch (error) {
        throw Error(error);
    }
};

/**
 * Format raw dev.to article
 * 
 * @param {Object} article
 * @return {Object} formatted article
 */
export const formatDevtoArticle = (article) => {
    return {
        slug:article.title,
        title:article.title,
        description:article.description,
        banner: article.cover_image,
        bannerPlaceholder: article.cover_image,
        bannerAlt: article.title +' image',
        tags: article.tag_list,
        date: article.published_timestamp,
        link: article.url
    };
};