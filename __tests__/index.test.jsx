import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock';
import Home from '../src/pages/index';

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})
