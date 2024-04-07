import Control from '../Control';
import { ControlThemes } from '../controlProps';
import renderer from 'react-test-renderer';

// @ts-ignore
it('renders correctly', () => {
  const tree = renderer
      .create(<Control theme={ControlThemes.Primary} text="Test"></Control>)
      .toJSON();
  // @ts-ignore
  expect(tree).toMatchSnapshot();
});