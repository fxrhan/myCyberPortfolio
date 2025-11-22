import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from '../Projects'

// Mock next/image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />,
}))

// Mock next/link
vi.mock('next/link', () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Projects Component', () => {
    it('renders the projects section title', () => {
        render(<Projects />)
        expect(screen.getByText('Impressive Works')).toBeDefined()
    })

    it('renders the "Many more" button', () => {
        render(<Projects />)
        expect(screen.getByText('And many more')).toBeDefined()
    })
})
