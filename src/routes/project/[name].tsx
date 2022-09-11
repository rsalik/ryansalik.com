import { Show } from 'solid-js';
import { RouteDataArgs, useRouteData } from 'solid-start';
import projects from '~/data/projects.json';
import NotFound from '../[...404]';

export const routeData = (props: RouteDataArgs) => {
  const project = projects.find((project) => project.name === props.params.name);
  if (!project) {
    return null;
  }
  return project;
};

export default function Project() {
  const project = useRouteData<typeof routeData>();

  if (!project) {
    return <NotFound />;
  }

  return (
    <div class="section project">
      <div class="section-title">{project.name}</div>
    </div>
  );
}
