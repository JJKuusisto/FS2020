const lodash = require('lodash')
const blogs = [ 
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 22, __v: 0 }
]
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
    for(const[key, value] of Object.entries(uniques)){
      let likes = 0
      let highest = 0
      for(v of value){
        likes = likes += v.likes
      }
      if(likes  > highest){
        highest = likes
        most = {
          author: key,
          likes: highest
        }
      }
    }
    return most
  }

  console.log(mostLikes(blogs))
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }