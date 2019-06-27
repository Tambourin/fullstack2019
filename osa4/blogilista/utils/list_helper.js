const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sumOfLikes, currentblog) => {
    return sumOfLikes + currentblog.likes;
  }
  return blogs.reduce(reducer, 0);
}

const favouriteBlog = (blogs) => {
  const reducer = (blogWithMostLikes, currentBlog) => {
    return blogWithMostLikes.likes > currentBlog.likes ? blogWithMostLikes : currentBlog;
  }
  return blogs.reduce(reducer);
}


const mostBlogs = (blogs) => {
  const bloggers = [];
  blogs.forEach((blog) => {
    const blogger = bloggers.find(blogger => blogger.author === blog.author);    
    if (blogger === null || blogger === undefined) {
      bloggers.push({ author: blog.author, numOfBlogs: 1});
    } else {
      blogger.numOfBlogs++;
    } 
  });

  const reducer = (bloggerWithMostBlogs, currentBlogger) => {
    return bloggerWithMostBlogs.numOfBlogs > currentBlogger.numOfBlogs 
      ? bloggerWithMostBlogs : currentBlogger;
  };

  return bloggers.reduce(reducer);
}


const mostLikes = (blogs) => {
  const bloggers = [];
  blogs.forEach((blog) => {
    const blogger = bloggers.find(blogger => blogger.author === blog.author);
    if(blogger === null || blogger === undefined) {
      bloggers.push({ author: blog.author, likes: blog.likes });
    } else {
      blogger.likes += blog.likes;
    }
  });
  return favouriteBlog(bloggers);
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}