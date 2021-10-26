const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })
})

describe('favourite blog', () => {
    const fewBlogs = [
        {
            _id: '9a422aa71b54a676934d17f8',
            title: 'Go To StatementConsidered Harmful',
            author: 'Edsger W.Dijkstra',
            url: 'http://www.u.ariz0ona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
        },
        {
            _id: '5a422aa71b54a666234d17f8',
            title: 'Nazov 2',
            author: 'Matus Jurcak',
            url: 'http://www.u.ar6izona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
            __v: 0
        },
        {
            _id: '1a422aa71b54a606234d17f8',
            title: 'Ako byt stastny',
            author: 'Lil Emdzej',
            url: 'http://www.u.a2rizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 69420,
            __v: 0
        },
    ]

    test('returns blog by Lil Emdzej', () => {
        expect(listHelper.favouriteBlog(fewBlogs)).toEqual(fewBlogs[2])
    })
})
