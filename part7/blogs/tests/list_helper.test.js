/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = helper.listOfBlogs

const listWithOneBlog = helper.listWithOneBlog

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

    test('of empty list is an empty object', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    test('of a list with one blog is the blog itself', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test('of a list with multiple blogs is the one with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })

})

describe('most blogs', () => {
    
        test('of empty list is an empty object', () => {
            const result = listHelper.mostBlogs([])
            expect(result).toEqual({})
        })
    
        test('of a list with one blog is the author of that blog', () => {
            const result = listHelper.mostBlogs(listWithOneBlog)
            expect(result).toEqual({
                author: 'Edsger W. Dijkstra',
                blogs: 1
            })
        })
    
        test('of a list with multiple blogs is the author with most blogs', () => {
            const result = listHelper.mostBlogs(blogs)
            expect(result).toEqual(
                {
                    author: "Robert C. Martin",
                    blogs: 3
                }
            )
        })
})

describe('most likes', () => {
    
        test('of empty list is an empty object', () => {
            const result = listHelper.mostLikes([])
            expect(result).toEqual({})
        })
    
        test('of a list with one blog is the author of that blog', () => {
            const result = listHelper.mostLikes(listWithOneBlog)
            expect(result).toEqual({
              author: 'Edsger W. Dijkstra',
              likes: 5
            })
        })

        test('of a list with multiple blogs is the author with most likes', () => {
            const result = listHelper.mostLikes(blogs)
            expect(result).toEqual(
                {
                  author: 'Edsger W. Dijkstra',
                  likes: 17
                })
        })
      })