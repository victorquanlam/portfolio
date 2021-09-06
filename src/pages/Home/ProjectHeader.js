import { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';

import DecoderText from 'components/DecoderText';
import Section from 'components/Section';
import Heading from 'components/Heading';
import { reflow } from 'utils/transition';
import './ProjectHeader.css';


const ProfileText = ({ status, titleId,text }) => (
  <Fragment>
    <Heading
      className={classNames('project__header__title', `project__header__title--${status}`)}
      level={3}
      id={titleId}
    >
      <DecoderText text={text} start={status !== 'exited'} delay={500} />
    </Heading>
  </Fragment>
);

const ProjectHeader = ({ id, visible, sectionRef,text }) => {
  const titleId = `${id}-title`;

  return (
    <Section
      className="project__header"
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <div className="project__header__content">
            <div className="project__header__column">
              <ProfileText status={status} titleId={titleId} text={text} />
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

export default ProjectHeader;
