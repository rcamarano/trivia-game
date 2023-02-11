import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './tests/helpers/renderWithRouterAndRedux';
import reducers from './redux/reducers';
import Login from './pages/Login';
import requestToken from './pages/requestApi/requestToken';
import requestApi from './pages/requestApi/requestApi';

describe('Teste o componente <Login.js />', () => {
  it('reducers pagina de Login vazio', () => {
    const state = reducers(undefined, {});
    expect(state).toEqual({ player: { email: '', userName: '' } });
  });

  it('reducers pagina de Login com dados', () => {
    const state = reducers(
      { player: { email: '', userName: '' } },
      { type: 'UPDATE_EMAIL', email: 'user@email.com' },
    );
    expect(state).toEqual({ player: { email: 'user@email.com', userName: '' } });
  });

  it('Teste o input do email e usuario da pagina de Login ', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    expect(inputEmail).toBeInTheDocument();

    const inputName = screen.getByTestId(/input-player-name/i);
    expect(inputName).toBeInTheDocument();

    const btnPlay = screen.getByTestId(/btn-play/i);
    expect(btnPlay).toBeInTheDocument();

    const btnConfig = screen.getByTestId(/btn-settings/i);
    expect(btnConfig).toBeInTheDocument();
  });

  it('Teste email valida ao colocar @ e .com e o input de nome', () => {
    const email = 'alguem@email.com';
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    fireEvent.change(inputEmail, { target: { value: email } });
    expect(inputEmail).toHaveValue(email);

    const inputName = screen.getByTestId(/input-player-name/i);
    fireEvent.change(inputName, { target: { value: 'Abcdef' } });
    expect(inputName).toHaveValue('Abcdef');
  });

  it('Teste os botões Play e Configurações', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const botaoPlay = screen.getByTestId(/btn-play/i);
    userEvent.click(botaoPlay);
    act(() => history.push('/Game'));
  });

  it('teste se requestApi é uma função', () => {
    expect(typeof requestApi).toBe('function');
  });

  it('teste se requestToken é uma função', () => {
    expect(typeof requestToken).toBe('function');
  });

  it('o fetch retorna dados do endpoint https://opentdb.com/api_token.php?command=request', () => {
    expect(requestToken()).resolves.to();
  });

  test('the data is peanut butter', async () => {
    const data = await requestToken();
    expect(data).toBeTruthy();
  });
});
