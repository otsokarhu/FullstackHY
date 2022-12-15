const listHelper = require('./list_helper')




test('dummy returns one', () => {

    const result = listHelper.dummy(listHelper.severealBlogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listHelper.severealBlogs)
        expect(result).toBe(36)
    })

})

describe('favorite blog', () => {

    test('the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listHelper.severealBlogs)
        expect(result).toEqual({

            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,

        })
    })
})

describe('most blogs', () => {

    test('the author with most blogs', () => {
        const result = listHelper.mostBlogs(listHelper.severealBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})



