import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'components/ProjectLayout';
import { Table, TableCell, TableRow } from 'components/Table';
import Link from 'components/Link';
import Footer from 'components/Footer';
import { useScrollRestore } from 'hooks';
import prerender from 'utils/prerender';
import usesBackground from 'assets/uses-background.mp4';
import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import './index.css';

const Uses = () => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>Technical Skills | Victor Lam</title>
        <meta
          name="description"
          content="A list of programming languages I use to do my thing"
        />
      </Helmet>
      <ProjectContainer className="uses">
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
          entered={!prerender}
        />
        <ProjectHeader
          title="Technical Skills"
          description="A somewhat comprehensive list of programming languages that I use on a daily basis to code things."
        />
       <ProjectSection className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionText style={{ marginBottom: 24 }}>
                I frequently work on .NET projects, so my strongest knowledge will be using C# and visual Studio. On top of that, I have got some other skills to assist me with web development.
                .
              </ProjectSectionText>
              <Table>
                <TableRow>
                  <TableCell>
                    <strong>Client-side</strong>
                  </TableCell>
                  <TableCell>Vuejs, React, Angular</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Server-side</strong>
                  </TableCell>
                  <TableCell>C#, NodeJS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Databases</strong>
                  </TableCell>
                  <TableCell>SQL, Firebase, MongoDB</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Office</strong>
                  </TableCell>
                  <TableCell>Word, Powerpoint, Publisher, Outlook, Excel</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Applications</strong>
                  </TableCell>
                  <TableCell>Android Studio, Visual Studio, Visual Studio Code, SQL Management, PowerBI</TableCell>
                </TableRow>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default Uses;
