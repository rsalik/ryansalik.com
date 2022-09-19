import { Title } from 'solid-start';
import ContactSection from '~/components/ContactSection';
import ProjectsSection from '~/components/ProjectsSection';
import TitleCanvas from '~/components/TitleCanvas';
import TitlePageContentWrapper from '~/components/TitlePageContentWrapper';
import TitleSection from '~/components/TitleSection';

export default function Home() {
  return (
    <main>
      <Title>Ryan Salik</Title>
      <TitleSection />
      <TitlePageContentWrapper>
        <ProjectsSection />
        <ContactSection />
      </TitlePageContentWrapper>
    </main>
  );
}
