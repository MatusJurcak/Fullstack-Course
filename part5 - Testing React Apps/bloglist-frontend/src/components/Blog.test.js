import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'title',
        author: 'Emdzej',
        url: 'url'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'title'
    )

    const element = component.getByText(
        'title'
    )
    expect(element).toBeDefined()

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'title'
    )
    expect(div).toHaveTextContent(
        'Emdzej'
    )
    expect(div).not.toHaveTextContent(
        'url'
    )

})

test('clicking the button shows url and likes', async () => {
    const blog = {
        title: 'title',
        author: 'Emdzej',
        url: 'url'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} updateBlog={mockHandler} />
    )

    const button = component.getByText('show')
    fireEvent.click(button)
    const likebutton = component.getByText('like')
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)

    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('url')
    expect(mockHandler.mock.calls).toHaveLength(2)
})
