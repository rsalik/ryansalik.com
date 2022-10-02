import { faCodeBranch, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Show } from 'solid-js';
import { RouteDataArgs, useRouteData } from 'solid-start';
import Fa from '~/components/Fa';
import Header from '~/components/Header';
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
    <>
      <Header />
      <div class="section project">
        <div class="text">
          <div class="project-title">{project.name}</div>
          <div class="description">{project.description}</div>
          <Show when={project.repoLink !== undefined}>
            <a href={project.repoLink} target="_blank" rel="noreferrer" class="link repo">
              <Fa size="1.5x" icon={faCodeBranch} />
              <span>Repository</span>
            </a>
          </Show>
          <Show when={project.webLink !== undefined}>
            <a href={project.webLink} target="_blank" rel="noreferrer" class="link web">
              <Fa size="1.5x" icon={faGlobe} />
              <span>
                <Show
                  when={!project.webLink.includes('ryansalik.com') || project.webLink.includes('concurrently')}
                  fallback={"You're already here"}
                >
                  View
                </Show>
              </span>
            </a>
            <Show when={project.webLink.includes('herokuapp')}>
              <div class="heroku-warning">
                <span>Heroku apps may take a minute to load</span>
              </div>
            </Show>
          </Show>
        </div>
        <img src={`../imgs/${project.coverImage}.png`} />
      </div>
    </>
  );
}
