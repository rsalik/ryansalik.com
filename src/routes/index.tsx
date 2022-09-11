import { Title } from 'solid-start';
import ProjectsSection from '~/components/ProjectsSection';
import TitlePageContentWrapper from '~/components/TitlePageContentWrapper';
import TitleSection from '~/components/TitleSection';

export default function Home() {
  return (
    <main>
      <Title>Ryan Salik</Title>
      <TitleSection />
      <TitlePageContentWrapper>
        <ProjectsSection />
      </TitlePageContentWrapper>
    </main>
  );
}
