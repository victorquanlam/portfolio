// const allPosts = require.context(
//   '!babel-loader!mdx-loader!posts',
//   true,
//   /\.mdx$/,
//   'lazy'
// );

// const posts = allPosts.keys().map(async filePath => {
//   const module = await allPosts(filePath);

//   return {
//     content: module.default,
//     ...module.frontMatter,
//   };
// });

// export default posts;



const { request, formatDevtoArticle } = require(".");



const GetAllDevBlogs = async () => {
    let response = await request(`https://dev.to/api/articles?per_page=10&username=victorquanlam`);

    return response.data.map(item => formatDevtoArticle(item));                         

};

let posts = GetAllDevBlogs();

export default posts;
