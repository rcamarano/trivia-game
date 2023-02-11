import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import reducers from '../redux/reducers';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../';

describe('Teste o componente <Login.js />', () => {

    it('reducers pagina de Login vazio', () => {
      const state = reducers(undefined, {});
      expect(state).toEqual({player:{email:'',userName:''}});
    });
  
    it('reducers pagina de Login com dados', () => {
      const state = reducers(
        {player:{email:'',userName:''}},
        {type:'UPDATE_EMAIL',email:'amanda@rmaiclo.com'});
      expect(state).toEqual({player:{email:'amanda@rmaiclo.com',userName:''}});
    });

    it('Teste o input do email e usuario da pagina de Login ', () => {
      renderWithRouterAndRedux(<Login />);
  
      const inputEmail = screen.getByTestId(/input-gravatar-email/i);
      expect(inputEmail).toBeInTheDocument();
  
      const inputName = screen.getByTestId(/input-player-name/i);
      expect(inputName).toBeInTheDocument();

      const btnPlay = screen.getByTestId(/btn-play/i);
      expect(btnPlay).toBeInTheDocument();
      expect(btnPlay).toBeDefined();

      const btnConfig = screen.getByTestId(/btn-settings/i);
      expect(btnConfig).toBeInTheDocument();
      expect(btnConfig).toBeDefined();
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

      const botaoConfig = screen.getByTestId(/btn-settings/i);
      userEvent.click(botaoConfig);
      act(() => history.push('/Config'));
    });
  });
  
