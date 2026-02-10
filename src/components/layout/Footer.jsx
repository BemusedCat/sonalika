import { SocialLinks } from '../ui';

const socialLinks = [
  { icon: 'bxl-linkedin', url: 'https://www.linkedin.com/in/sonalika-gupta-b36729189/', label: 'LinkedIn' },
  { icon: 'bxl-instagram', url: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary dark:bg-gray-800 text-white text-center font-semibold py-8">
      <h2 className="text-3xl mb-8">Sonalika</h2>
      <SocialLinks
        links={socialLinks}
        size="sm"
        direction="horizontal"
        className="justify-center mb-8"
      />
      <p className="text-sm opacity-70">
        &copy; {new Date().getFullYear()} Sonalika. All rights reserved.
      </p>
    </footer>
  );
}
