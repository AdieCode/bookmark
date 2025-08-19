module.exports = {
    content: [
      "./pages/**/*.{js,ts,vue}",
      "./components/**/*.{js,ts,vue}",
      "./layouts/**/*.{js,ts,vue}",
      "./app/**/*.{js,ts,vue}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          lightBg: '#ffffff',
          darkBg: '#121212',
          lightText: '#000000',
          darkText: '#ffffff',
        },
      },
    },
    plugins: [],
  };
  