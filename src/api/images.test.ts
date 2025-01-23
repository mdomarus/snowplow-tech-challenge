import { getPaginationProps } from './images';

describe('getPaginationProps', () => {
  it('should return valid pagination props', () => {
    const result = getPaginationProps(
      'Link: <https://picsum.photos/v2/list?page=2&limit=10>; rel="next", <https://picsum.photos/v2/list?page=1&limit=10>; rel="prev"',
    );

    expect(result).toEqual({ hasNext: true, hasPrev: true });
  });

  it('should return valid pagination props', () => {
    const result = getPaginationProps(
      'Link: <https://picsum.photos/v2/list?page=1&limit=10>; rel="prev"',
    );

    expect(result).toEqual({ hasNext: false, hasPrev: true });
  });

  it('should return valid pagination props', () => {
    const result = getPaginationProps(
      'Link: <https://picsum.photos/v2/list?page=2&limit=10>; rel="next"',
    );

    expect(result).toEqual({ hasNext: true, hasPrev: false });
  });

  it('should return valid pagination props from empty string', () => {
    const result = getPaginationProps('');

    expect(result).toEqual({ hasNext: false, hasPrev: false });
  });

  it('should return valid pagination props when argument is missing', () => {
    const result = getPaginationProps();

    expect(result).toEqual({ hasNext: false, hasPrev: false });
  });
});
