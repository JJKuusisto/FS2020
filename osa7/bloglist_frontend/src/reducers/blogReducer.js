import blogService from '../services/blogs'


export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch({
      type: 'NEW',
      data: blog
    })
  }
}

export const likeBlog = (content, id) => {
  return async dispatch => {
    const blog = await blogService.update(id, content)
    dispatch({
      type: 'LIKE',
      data: blog.id
    })
  }
}

export const commentBlog = (content, id) => {
  return async dispatch => {
    const blog = await blogService.addComment(id, content)
    dispatch({
      type: 'ADD_COMMENT',
      data: blog
    })
  }
}

export const deleteBlog = (blog, id) => {
  return async dispatch => {
    if (window.confirm(`You really want to delete "${blog.title}"`)) {
      const response = await blogService.remove(id)
      console.log(response)
      dispatch({
        type: 'REMOVE',
        data: id
      })
    }
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'NEW':
      return [...state, action.data]
    case 'LIKE': {
      const id = action.data
      const liked = state.find(b => b.id === id)
      const addLike = {
        ...liked,
        likes: liked.likes + 1
      }
      return state.map(b => b.id !== id ? b : addLike)
    }
    case 'REMOVE': {
      const newBlogs = state.filter(b => b.id !== action.data)
      console.log(newBlogs)
      return newBlogs
    }
    case 'ADD_COMMENT': {
      const response = action.data
      const blog = state.find(b => b.id === response.id)
      const addComment = {
        ...blog,
        comments: blog.comments
      }
      return state.map(b => b.id !== blog.id ? b : addComment)
    }
    default:
      return state
  }
}

export default blogReducer