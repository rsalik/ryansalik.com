import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Fa from './Fa';

export default function ContactSection() {
  return (
    <div class="contact section">
      <div class="section-title">Contact</div>
      <div class="links">
        <a href="https://github.com/rsalik" target="_blank" rel="noreferrer" class="link">
          <Fa icon={faGithub} /> <span class="value">rsalik</span>
        </a>
        <a href="mailto:rssalik14@gmail.com" class="link">
          <Fa icon={faEnvelope} /> <span class="value">rssalik14@gmail.com</span>
        </a>
      </div>
    </div>
  );
}
