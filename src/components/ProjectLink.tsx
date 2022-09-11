import { lazy } from 'solid-js';
import projects from '~/data/projects.json';

export default function ProjectLink(props: { project: typeof projects[0] }) {
  //const LinkImage = lazy(() => import(`~/imgs/exogram-charts.png`));
  //const LinkImage = lazy(() => import(`~/imgs/${props.project.linkImage}`));

  return (
    <a href={`/project/${props.project.name}`} class="proj-link" style={{ 'background-image': `url('../imgs/${props.project.linkImage}.png')` }}>
      <span class="name">{props.project.name}</span>
    </a>
  );
}
