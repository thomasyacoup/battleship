describe('Initial setup test suite', () => {
  test('should perform basic assertions correctly', () => {
    const sum = (a, b) => a + b;
    expect(sum(2, 3)).toBe(5);
  });

  test('should support DOM manipulation with jsdom', () => {
    document.body.innerHTML = '<div id="test-container">Hello Battleship</div>';
    const element = document.getElementById('test-container');
    expect(element).not.toBeNull();
    expect(element.textContent).toBe('Hello Battleship');
  });
});
