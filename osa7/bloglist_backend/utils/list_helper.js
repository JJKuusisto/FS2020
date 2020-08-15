const lodash = require('lodash')

const dummy = (blogs) => {
    // ...
    return 1
  }

  const totalLikes = (blogs) => {
      const reducer = (sum, item) => {
          return sum + item
      }
      return blogs.map(b => b.likes).reduce(reducer, 0)
  }

  const favoriteBlog = (blogs) => {
      return blogs.reduce((highest, current) => {
          if(current.likes > highest.likes){
              highest = current
          }
          return highest
      })
  }

  const mostBlogs = (blogs) => {
    const uniques = lodash.countBy(blogs, 'author')
    const sorted =  Object.entries(uniques).sort((a,b) => a[1] < b[1])
    return {
      author : sorted[0][0],
      blogs : sorted[0][1]
    }
  }

  const mostLikes = (blogs) => {
    const uniques = lodash.groupBy(blogs, 'author')
    let most = {}
    let highest = 0
    for(const[key, value] of Object.entries(uniques)){
      let likes = 0
      for(v of value){
        likes = likes += v.likes
      }
      if(likes  > highest){
        highest = likes
        most = {
          author: key,
          likes: likes
        }
      }
    }
    return most
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }