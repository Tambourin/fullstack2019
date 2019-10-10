import blogService from "../services/blogs";

const SET_BLOGS = "SET_BLOGS"; 
const INITIALIZE_BLOGS = "INITIALIZE_BLOGS";
const REMOVE_BLOG = "DELETE_BLOG";
const LIKE_BLOG = "LIKE_BLOG";
const SORT_BLOGS = "SORT_BLOGS";
const UPDATE_BLOG = "UPDATE_BLOG";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_BLOGS :
      return action.blogs;
    case SET_BLOGS :
      return [...state, action.blog];
    case REMOVE_BLOG :
      return state.filter(blog => blog.id !== action.blogId);
    case LIKE_BLOG :
      const blogToBeUpdated = state.find(blog => blog.id === action.blogId);
      const updatedBlog = {
        ...blogToBeUpdated,
        likes: blogToBeUpdated.likes + 1
      }     
      return state.map(blog => blog.id === action.blogId ? updatedBlog : blog);
    case SORT_BLOGS :
      return [...state].sort((blog1, blog2) => blog2.likes - blog1.likes);
    case UPDATE_BLOG :
      return state.map(blog => blog.id === action.blog.id ? action.blog : blog);
    default:
      return state;
  }
};

const setBlogs = blog => {
  return {
    type: SET_BLOGS,
    blog: blog
  };
};

const initializeBlogs = (blogs) => {
  return {
    type: INITIALIZE_BLOGS,
    blogs: blogs
  }
}

const likeBlog = (id) => {
  return {
    type: LIKE_BLOG,
    blogId: id
  }
}

const sortBlogs = () => {
  return {
    type: SORT_BLOGS
  }
}

const removeBlog = (id) => {
  return {
    type: REMOVE_BLOG,
    blogId: id
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id);
    dispatch(removeBlog(response.id));
  }
}

export const increaseBlogLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,     
    }
    const response = await blogService.update(updatedBlog);
    dispatch(likeBlog(response.id));
    dispatch(sortBlogs());
  }
}

export const fetchInitialBlogData = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(initializeBlogs(blogs));
    dispatch(sortBlogs());
  }
}

export const addBlog = initialBlog => {
  return async dispatch => {
    const blog = await blogService.create(initialBlog);
    console.log(blog);
    dispatch(setBlogs(blog));
    return blog;
  };
};

export const addCommentToBlog = (blog, comment) => {
  return async dispatch => {
    const response = await blogService.createComment(blog.id, comment);
    dispatch({
      type: UPDATE_BLOG,
      blog: response
    });
  }
}

export default blogReducer;
