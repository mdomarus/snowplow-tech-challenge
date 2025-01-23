import { render, screen } from '@/utils/test-utils';
import Button from './button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
  });

  it('should have text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
