expect.extend({
  toBeType(received, argument) {
    const initialType = typeof received;
    let type;
    if (typeof received === 'object') {
      type = Array.isArray(received) ? 'array' : initialType;
    } else {
      type = initialType;
    }

    return type === argument ? {
      message: () => `expected ${received} to be type ${argument}`,
      pass: true,
    } : {
      message: () => `expected ${received} to be type ${argument}`,
      pass: false,
    };
  },
});
