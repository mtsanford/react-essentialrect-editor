import { Rect } from '../lib';
test('use a Rect', () => {
  const r1: Rect = {
    left: 0,
    top: 0,
    width: 10,
    height: 10,
  };
  expect(r1.width).toBe(10);
});

test('fit a Rect', () => {
  const imageRect: Rect = {
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  };
  expect(imageRect.width).toBe(100);
});
