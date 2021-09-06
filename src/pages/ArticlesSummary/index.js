import {
  Fragment,
  useEffect,
  useState
} from 'react';
import Link from 'components/Link';
import Image from 'components/Image';
import Section from 'components/Section';
import { request, formatDevtoArticle } from 'posts/index';
import { Button } from 'components/Button';
import { isVisible } from 'utils/transition';

import './index.css';


const ArticlesPost = ({
  link,
  title,
  description,
  banner,
  bannerPlaceholder,
  bannerAlt,
  date,
  visible
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


const ArticlesSummary = ({status}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const grabPosts = async () => {
      let response = await request(`https://dev.to/api/articles?per_page=10&username=victorquanlam`);

      const postData = response.data.map(item => formatDevtoArticle(item));  

      console.log(postData);

      const posts = postData
        .slice(0,2)
        .filter(({ draft }) => !draft)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

      setPosts(posts);
    };

    grabPosts();
  }, []);

  const buttonText = "More Articles"; 

  return (
    <div>
        <Section className="articles__content" showDelay={800}
                show={isVisible(status)}>
        <div className="articles__column">
          {posts.map(({ slug, ...post }, index) => (
            <Fragment key={slug}>
              {index !== 0 && <hr className="articles__divider" />}
              <ArticlesPost slug={slug} {...post} />
            </Fragment>
          ))}
        </div> 
        <div class="mt-4">
          <Button iconHoverShift href={`/articles`} iconEnd="arrowRight">
            {buttonText}
          </Button>
          </div>     
       
      </Section>

    </div>

  );
};

export default ArticlesSummary;
