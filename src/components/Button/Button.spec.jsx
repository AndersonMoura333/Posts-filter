import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe('<Button />', () => {
    it('should render the button with the text "Mais posts"', () => {
        render(<Button text="Mais posts" />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /Mais posts/i });
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Mais posts" onClick={fn} />);

        const button = screen.getByRole('button', { name: /Mais posts/i });
        userEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);

    });

    it('should be disabled when disabled is true', () => {
        render(<Button text="Mais posts" disabled={true} />);

        const button = screen.getByRole('button', { name: /Mais posts/i });
        userEvent.click(button);

        expect(button).toBeDisabled();

    });
});
