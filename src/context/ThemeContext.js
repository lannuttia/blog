import React from 'react';
const defaultState = {
  dark: false,
  toggleDark: () => {},
};

const ThemeContext = React.createContext(defaultState);
// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this.
const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches === true;

class ThemeProvider extends React.Component {
  propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  state = {
    dark: false,
  };

  toggleDark = () => {
    const dark = !state.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    setState({dark});
  }

  componentDidMount() {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem('dark'));
    if (lsDark) {
      this.setState({dark: lsDark});
    } else if (supportsDarkMode()) {
      this.setState({dark: true});
    }
  }

  render() {
    const {children} = this.props;
    const {dark} = this.state;
    return (
      <ThemeContext.Provider
        value={{
          dark,
          toggleDark: this.toggleDark,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContext;

export {ThemeProvider};
