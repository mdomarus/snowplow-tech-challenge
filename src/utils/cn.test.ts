import { cn } from './cn';

describe('cn', () => {
  it('should not crash without arguments', () => {
    const result = cn();

    expect(result).toEqual('');
  });

  it('should not crash with empty array', () => {
    const inputs: string[] = [];

    const result = cn(...inputs);

    expect(result).toEqual('');
  });

  it('should return a string', () => {
    const inputs = ['foo', 'bar'];

    const result = cn(...inputs);

    expect(result).toEqual('foo bar');
  });

  it('should remove tailwind overwrites', () => {
    const inputs = ['p-2 border-1 text-bold', 'border-2'];

    const result = cn(...inputs);

    expect(result).toEqual('p-2 text-bold border-2');
  });
});
