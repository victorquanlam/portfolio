import {
  Fragment,
  useEffect,
  useState,
  createContext,
  useContext,
  lazy,
  Suspense,
} from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Post from 'pages/Post';
import Link from 'components/Link';
import Image from 'components/Image';
import Section from 'components/Section';
import Footer from 'components/Footer';
import { useScrollRestore } from 'hooks';
import { request, formatDevtoArticle } from 'posts/index';

import './index.css';

const Page404 = lazy(() => import('pages/404'));

const ArticlesPost = ({
  link,
  title,
  description,
  banner,
  bannerPlaceholder,
  bannerAlt,
  date,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article className="articles__post">
      <Link
        className="articles__post-content"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="articles__post-image-wrapper">
          <Image
            play={hovered}
            className="articles__post-image"
            src={banner}
            placeholder={bannerPlaceholder}
            alt={bannerAlt}
          />
          <div className="articles__post-image-tag">K256</div>
        </div>
        <div className="articles__post-text">
          <span className="articles__post-date">
            {new Date(date).toLocaleDateString('default', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
          <h2 className="articles__post-title">{title}</h2>
          <p className="articles__post-description">{description}</p>
        </div>
      </Link>
    </article>
  );
};

const Articles = () => {
  const { posts } = useContext(ArticlesContext);
  useScrollRestore();

  return (
    <div className="articles">
      <Helmet>
        <title>Articles | Victor Lam</title>
        <meta
          name="description"
          content="A collection of technical design and development articles."
        />
      </Helmet>
      <Section className="articles__content">
        <div className="articles__column">
          {posts.map(({ slug, ...post }, index) => (
            <Fragment key={slug}>
              {index !== 0 && <hr className="articles__divider" />}
              <ArticlesPost slug={slug} {...post} />
            </Fragment>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
};

const ArticlesContext = createContext({});

const ArticlesRouter = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const grabPosts = async () => {
      let response = await request(`https://dev.to/api/articles?per_page=10&username=victorquanlam`);

      const postData = response.data.map(item => formatDevtoArticle(item));  

      console.log(postData);

      const posts = postData
        .filter(({ draft }) => !draft)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

      setPosts(posts);
    };

    grabPosts();
  }, []);

  return (
    <ArticlesContext.Provider value={{ posts }}>
      <Suspense>
        <Switch>
          {posts?.map(({ slug,link, ...rest }) => (
            <Link
              exact
              key={slug}
              href={link}
              path={`/articles/${slug}`}
              render={() => <Post slug={slug} {...rest} />}
            />
          ))}
          <Route exact component={Articles} path="/articles" />
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </ArticlesContext.Provider>
  );
};

export default ArticlesRouter;
