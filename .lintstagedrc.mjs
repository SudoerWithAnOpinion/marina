export default {
  '**/*.{t,j}s': ['prettier --plugin-search-dir . --write', 'eslint', 'vitest related --run']
};
