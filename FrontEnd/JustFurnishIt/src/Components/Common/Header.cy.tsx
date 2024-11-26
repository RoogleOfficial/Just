import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore();

describe('Header Component Tests', () => {
  let store;

  beforeEach(() => {
    // Set the viewport for desktop
    cy.viewport(1440, 900);

    // Initialize mock store with default "logged-out" state
    store = mockStore({
      auth: {
        token: null,
        userDetails: null,
      },
    });

    // Mount with desktop-like width to ensure all elements are visible
    mount(
      <div style={{ width: '1200px' }}>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      </div>
    );
  });

  it('displays the logo and main navigation links', () => {
    cy.get('img[alt="Logo with Name"]').should('be.visible');
    cy.contains('JustFurnishIt').should('be.visible');
    cy.contains('Home', { timeout: 10000 }).should('be.visible');
    cy.contains('About Us').should('be.visible');
    cy.contains('How it Works').should('be.visible');
    cy.contains('Contact').should('be.visible');
  });

  it('shows login and signup buttons when the user is not logged in', () => {
    cy.contains('Login').should('be.visible');
    cy.contains('Signup').should('be.visible');
  });

  it('opens Design Ideas dropdown on hover', () => {
    cy.contains('Design Ideas').trigger('mouseover', { force: true });
    cy.contains('Modular Kitchen Designs').should('be.visible');
  });

  it('displays user profile and dropdown menu when logged in', () => {
    // Set mock store state to simulate "logged-in" state
    store = mockStore({
      auth: {
        token: 'test-token',
        userDetails: {
          ProfilePicture: 'path/to/profile-pic.jpg', // mock profile picture URL
          firstName: 'Test',
          lastName: 'User',
        },
      },
    });

    // Re-mount with logged-in state
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    cy.get('[alt="User Avatar"]').should('be.visible').click({ force: true });
  });
});
