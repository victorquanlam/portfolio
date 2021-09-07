import { lazy, Suspense, useEffect, createContext, useReducer, Fragment } from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';
import ThemeProvider from 'components/ThemeProvider';
import VisuallyHidden from 'components/VisuallyHidden';
import { tokens } from 'components/ThemeProvider/theme';
import { msToNum } from 'utils/style';
import { useLocalStorage } from 'hooks';
import { initialState, reducer } from 'app/reducer';
import { reflow } from 'utils/transition';
import './reset.css';
import './index.css';

const Home = lazy(() => import('pages/Home'));
const ProjectDM = lazy(() => import('pages/DeviceModels'));
const ProjectDTT = lazy(() => import('pages/DevTechTools'));
const Articles = lazy(() => import('pages/Articles'));
const Uses = lazy(() => import('pages/Uses'));
const Page404 = lazy(() => import('pages/404'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const App = () => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`https://codyb.co${pathname}`} />
      </Helmet>
      <VisuallyHidden showOnFocus as="a" className="skip-to-main" href="#MainContent">
        Skip to main content
      </VisuallyHidden>
      <Navbar location={location} />
      <TransitionGroup component="main" className="app" tabIndex={-1} id="MainContent">
        <Transition
          key={pathname}
          timeout={msToNum(tokens.base.durationS)}
          onEnter={reflow}
        >
          {status => (
            <TransitionContext.Provider value={{ status }}>
              <div className={classNames('app__page', `app__page--${status}`)}>
                <Suspense fallback={<Fragment />}>
                  <Switch location={location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/projects/device-models" component={ProjectDM} />
                    <Route path="/projects/devtech-tools" component={ProjectDTT} />
                    <Route path="/skills" component={Uses} />
                    <Route path="/articles" component={Articles} />
                    <Route component={Page404} />
                  </Switch>
                </Suspense>
              </div>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
    </Fragment>
  );
};

export default App;
