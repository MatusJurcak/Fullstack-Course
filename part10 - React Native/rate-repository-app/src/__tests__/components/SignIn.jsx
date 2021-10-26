import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SingIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

            fireEvent.changeText(getByTestId('username'), 'LilEmdzej');
            fireEvent.changeText(getByTestId('password'), 'password');
            fireEvent.press(getByTestId('button'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'LilEmdzej',
                    password: 'password'
                });
            });
        });
    });
});
