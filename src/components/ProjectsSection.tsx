import { For } from 'solid-js';
import projects from '~/data/projects.json';
import ProjectLink from './ProjectLink';

export default function ProjectsSection() {
  return (
    <div class="section projects">
      <div class="section-title">Projects</div>
      <div class="links">
        <For each={projects}>{(project) => <ProjectLink project={project} />}</For>
      </div>
    </div>
  );
}