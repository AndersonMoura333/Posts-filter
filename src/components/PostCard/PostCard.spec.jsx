import { render } from "react-dom/cjs/react-dom.development"
import { PostCard } from "."

const mock = {
    title: 'title 1',
    body: 'body 1',
    id: 1,
    cover: 'img/img.jpg'
};

describe('<PostCard>', () => {
    it('should render PostCard correctly', () => {
        const { debug } = render(<PostCard post={mock} />);

        debug();
    });
});
