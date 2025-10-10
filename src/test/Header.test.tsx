import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';
import { AuthContext } from '../features/auth/contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import type { User } from '../../src/types/auth'; 

const mockUser: User = {
  id: '1',
  email: 'ana@example.com',
  username: 'ana',
  role: 'user',
};

const mockAuthValue = {
  currentUser: mockUser,
  isAdmin: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_email: string) => ({ ok: true as const }),
  logout: () => {},
};

describe('Header', () => {
  it('shows user email when logged in', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome ana@example.com!')).toBeInTheDocument();
  });
});