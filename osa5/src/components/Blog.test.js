import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'test blog',
    author: 'Jarmo Kuusisto',
    url: 'test.com',
    likes: 5,
    user: {
      username: 'pekkis',
      name: 'Pekka'
    }
  }

  const user = {
    name: 'Pekka',
    username: 'pekkis'
  }

  const likeHandler = jest.fn()
  const removeHandler = jest.fn()

  beforeEach(() => {

    component = render(<Blog blog={blog} newLike={likeHandler} remove={removeHandler} user={user} />)
  })

  test('Only author and title are showing at the start', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title + ', ' + blog.author + ' ')
  })

  test('Url and likes are showing after clicking view button', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent('likes ' + blog.likes)
    expect(div).toHaveTextContent(blog.user.name)
  })

  test('Clicking like button twice triggers function', () => {
    const button = component.getByText('View')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })

})
