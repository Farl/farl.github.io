import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import MDXContent from '@theme/MDXContent';
import {usePortfolio} from '../../../portfolio/usePortfolio';
import {ProjectDetail} from '../../../portfolio/components';
export default function DocItemLayout({children}: {children: ReactNode}) {
  const {metadata} = useDoc();
  const project = usePortfolio().find(item => item.id === metadata.id);
  return project ? <ProjectDetail project={project}>{children}</ProjectDetail> :
    <article className="page-shell generic-document markdown"><MDXContent>{children}</MDXContent></article>;
}
