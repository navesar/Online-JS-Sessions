import path from 'path';

export default {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  }
};
