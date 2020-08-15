import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from './NewBlog'

test('proper props is provided to createBlog', () => {
  const createBlog = jest.fn()
  const component = render(
    <NewBlog createBlog={createBlog} />
  )
  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')


  fireEvent.change(title, {
    target: { value: 'Testing blog creation' }
  })
  fireEvent.change(author, {
    target: { value: 'Jarmo Kuusisto' }
  })
  fireEvent.change(url, {
    target: { value: 'test.com' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing blog creation')
  expect(createBlog.mock.calls[0][0].author).toBe('Jarmo Kuusisto')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})
