// src/components/blogcomponents/ShareButtons.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

export default function ShareButtons({ url, title }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      icon: <FiFacebook />,
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      icon: <FiTwitter />,
      label: "Tweet",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      icon: <FiLinkedin />,
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
   
  ];

  return (
    <FadeInOnScroll>
      <div className="flex items-center space-x-4 py-6">
        <span className="text-sm font-medium text-dark dark:text-light">
          Share this article:
        </span>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-2xl text-primary dark:text-accent hover:text-secondary transition"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </FadeInOnScroll>
  );
}
