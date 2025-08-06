// src/data/blog.js
import Mpic from "../../../src/assets/boatMaintenance.jpg";
import Ppic from "../../../src/assets/boatCus.webp";
import Cpic from "../../../src/assets/boatPainting.webp";

export const latestPosts = [
  {
    slug: "boat-maintenance-101",
    title: "Boat Maintenance 101",
    excerpt:
      "Learn how to keep your hull in top shape and avoid costly repairs with our step-by-step guide.",
    date: "July 15, 2025",
    category: "Maintenance",
    img: Mpic,
    author: {
      name: "Jane Doe",
      title: "Marine Engineer",
      photo: "/images/authors/jane-doe.jpg",
      bio: "Jane has over 15 years of experience keeping vessels in peak condition and shares her expertise here.",
    },
    content: `
      <h2>Introduction</h2>
      <p>Welcome to your definitive guide on boat maintenance. In this article, we'll cover everything from hull cleaning to engine tune-ups.</p>
      
      <h2>Hull Maintenance Essentials</h2>
      <p>Regular hull cleaning prevents fouling and ensures optimal performance.</p>
      
      <h3>Cleaning Techniques</h3>
      <p>Use a soft brush and marine‐safe detergent, then rinse thoroughly.</p>
      
      <h3>Anti-Fouling Applications</h3>
      <p>Apply a new coat of anti-fouling paint every 12 months.</p>
      
      <h2>Engine Tune-Ups</h2>
      <p>Keep your engine running smoothly with periodic oil changes and filter replacements.</p>
      
      <h2>Conclusion</h2>
      <p>By following these steps, you’ll extend the life of your boat and avoid costly repairs.</p>
    `,
  },
  {
    slug: "choosing-right-marine-paint",
    title: "Choosing the Right Marine Paint",
    excerpt:
      "Discover the best paint systems for UV resistance and long-lasting color on your vessel.",
    date: "June 20, 2025",
    category: "Painting",
    img: Cpic,
    author: {
      name: "John Smith",
      title: "Paint Specialist",
      photo: "/images/authors/john-smith.jpg",
      bio: "John has a decade of experience applying premium marine paint systems for boats of all sizes.",
    },
    content: `
      <h2>Understanding Paint Types</h2>
      <p>Marine paints fall into several categories, each with unique properties.</p>
      
      <h3>Awlgrip®</h3>
      <p>High-gloss, long-lasting finish with excellent UV resistance.</p>
      
      <h3>Alexseal®</h3>
      <p>Thin-film system that cures quickly and resists abrasion.</p>
      
      <h2>Color Selection</h2>
      <p>Consider heat absorption, fading, and visual impact when choosing colors.</p>
      
      <h2>Application Tips</h2>
      <p>Ensure proper surface prep and climate-controlled conditions in the spray booth.</p>
    `,
  },
  {
    slug: "engine-tuning-tips",
    title: "Engine Tuning Tips for Peak Performance",
    excerpt:
      "Optimize your boat’s engine with these expert-approved tuning techniques. help you get the most out of your marine engine. boost performance and reliability.new techniques to enhance your boat's engine performance. Update your engine with these expert-approved tuning techniques.",
    date: "May 10, 2025",
    category: "Maintenance",
    img: Ppic,
    author: {
      name: "Alex Johnson",
      title: "Engine Technician",
      photo: "/images/authors/alex-johnson.jpg",
      bio: "Alex specializes in marine engine diagnostics and performance tuning for recreational and commercial boats.",
    },
    content: `
      <h2>Why Tuning Matters</h2>
      <p>
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      A well-tuned engine runs cleaner, uses less fuel, and lasts longer
      
      .</p>
      
      <h2>Basic Tune-Up Steps</h2>
      <p>Include spark plug inspection, fuel filter replacement, and throttle calibration.</p>
      
      <h3>Spark Plugs</h3>
      <p>Replace every 100 hours or as specified by the manufacturer.</p>
      
      <h3>Fuel System</h3>
      <p>Clean injectors and change filters to maintain proper fuel flow.</p>
      
      <h2>Advanced Diagnostics</h2>
      <p>Use compression tests and diagnostic scanners for in-depth engine analysis.</p>
      
      <h2>Maintenance Schedule</h2>
      <p>Follow a quarterly tune-up plan for peak reliability.</p>
    `,
  },
];
