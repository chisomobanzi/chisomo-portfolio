import rhino from '../assets/tech/rhino.png';
import blender from '../assets/tech/blender.png';
import unreal from '../assets/tech/unreal.png';
import grasshopper from '../assets/tech/grasshopper.png';
import python from '../assets/tech/python.png';
import cplusplus from '../assets/tech/cplusplus.png';
import affinity from '../assets/tech/affinity.png';
import perforce from '../assets/tech/perforce.png';
import gitIcon from '../assets/tech/git.png';

import english from '../assets/languages/english.png';
import chinese from '../assets/languages/chinese.png';
import portuguese from '../assets/languages/portuguese.png';
import shona from '../assets/languages/shona.png';

export const navLinks = [
  { id: 'work', title: 'Work' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
];

export const projects = [
  {
    id: 'the-bluff',
    index: 0,
    title: 'The Bluff',
    platform: 'Amazon Prime Video',
    year: '2026',
    releasing: true,
    role: 'Set Designer',
    tagline: 'Period drama for Amazon Prime Video',
    description:
      'Developed VR previs of hero cave system set in Unreal, showcased successfully to director, writer, DP, producers, and Amazon executives. Primary draftsperson behind hero house build, aligning closely with stunts and SFX.',
    highlights: ['VR Previs', 'Unreal Engine', 'Set Drafting', 'On-Location'],
    color: '#16a34a',
    category: 'FILM',
    hero: '/projects/the-bluff/hero.jpg',
    gallery: [
      '/projects/the-bluff/gallery-01.jpg',
      '/projects/the-bluff/gallery-02.jpg',
      '/projects/the-bluff/gallery-03.jpg',
      '/projects/the-bluff/gallery-04.jpg',
      '/projects/the-bluff/gallery-05.jpg',
      '/projects/the-bluff/gallery-06.jpg',
    ],
  },
  {
    id: 'monarch-s2',
    index: 1,
    title: 'Monarch S2',
    platform: 'Apple TV+',
    year: '2026',
    releasing: true,
    role: 'Set Designer',
    tagline: 'Legacy of Monsters — Season 2 for Apple TV+',
    description:
      'Set after the battle between Godzilla and the Titans, revealing that monsters are real, follows one family\'s journey to uncover its buried secrets and a legacy linking them to Monarch. Drafting and coordinating design development of the large secret organisation headquarters set build on location.',
    highlights: ['Franchise Production', 'Large-Scale Sets', 'On-Location Build', 'Apple TV+'],
    color: '#2563eb',
    category: 'FILM',
    hero: '/projects/monarch-s2/hero.jpg',
    gallery: [
      '/projects/monarch-s2/gallery-01.jpg',
      '/projects/monarch-s2/gallery-02.jpg',
      '/projects/monarch-s2/gallery-03.jpg',
      '/projects/monarch-s2/gallery-04.jpg',
      '/projects/monarch-s2/gallery-05.jpg',
      '/projects/monarch-s2/gallery-06.jpg',
    ],
  },
  {
    id: 'metropolis',
    index: 2,
    title: 'Metropolis',
    platform: 'Apple TV+',
    year: '2022–2023',
    role: 'Set Designer / VAD Bridge',
    tagline: "Sam Esmail's 10-episode reimagining of the 1927 sci-fi classic for Apple TV+",
    description:
        'Core design team member on one of the largest virtual productions undertaken in Australia. Acted as the bridge between the traditional Art Department and Virtual Art Department — building virtual environments, 3D motion graphics, set elements, and developing software solutions to streamline cross-department workflows. Directed by Sam Esmail (Mr. Robot, Homecoming) and produced by UCP for Apple TV+.',
    highlights: ['Virtual Production', 'ICVFX', 'Unreal Engine', 'Cross-Department Pipeline'],
    color: '#a3a3a3',
    category: 'FILM',
    hero: '/projects/metropolis/hero.jpg',
    gallery: [
      '/projects/metropolis/gallery-01.jpg',
      '/projects/metropolis/gallery-02.jpg',
      '/projects/metropolis/gallery-03.jpg',
      '/projects/metropolis/gallery-04.jpg',
      '/projects/metropolis/gallery-05.jpg',
      '/projects/metropolis/gallery-06.jpg',
    ],
  },
  {
    id: 'nautilus',
    index: 3,
    title: 'Nautilus',
    platform: 'Disney+',
    year: '2022',
    role: 'Set Designer',
    tagline: "Captain Nemo's extraordinary voyages for Disney+",
    description:
        "The telling of Captain Nemo's extraordinary voyages in the legendary Sci-fi book '20 Thousand Leagues Under the Sea'. Designed steampunk-era props and prepared 3D models for prop manufacture.",
    highlights: ['Steampunk Props', '3D Modelling', 'Prop Manufacture', 'Disney+'],
    color: '#d97706',
    category: 'FILM',
    hero: '/projects/nautilus/hero.jpg',
    gallery: [
      '/projects/nautilus/gallery-01.jpg',
      '/projects/nautilus/gallery-02.jpg',
      '/projects/nautilus/gallery-03.jpg',
      '/projects/nautilus/gallery-04.jpg',
      '/projects/nautilus/gallery-05.jpg',
      '/projects/nautilus/gallery-06.jpg',
    ],
  },
  {
    id: 'missions',
    index: 4,
    title: 'Missions',
    platform: 'Meta Quest, iPad',
    year: '2026',
    role: 'Founder & Developer',
    tagline: 'Practice conversations with AI characters in immersive scenarios',
    description:
      'Missions drops you into real-world scenarios — ordering at a night market, navigating a job interview, chatting at a party — where AI characters respond naturally to what you say. Built on spatial storytelling principles from film production, each mission is a scene you can replay until the conversation feels natural.',
    highlights: ['AI Conversation', 'Scenario-Based', 'Speech Recognition', 'VR'],
    color: '#8b5cf6',
    category: 'VR',
    hero: '/projects/missions/hero.jpg',
    gallery: [
      '/projects/missions/gallery-01.jpg',
      '/projects/missions/gallery-02.jpg',
      '/projects/missions/gallery-03.jpg',
      '/projects/missions/gallery-04.jpg',
      '/projects/missions/gallery-05.jpg',
      '/projects/missions/gallery-06.jpg',
    ],
  },
  {
    id: 'constellations',
    index: 5,
    title: 'Constellations',
    platform: 'Meta Quest',
    year: '2026',
    role: 'Founder & Developer',
    tagline: 'Learn vocabulary in VR — flashcards become a memory palace',
    description:
        'Constellations transforms flashcard practice into a memory palace, where every word becomes a star in your growing constellation. Combining ancient spatial visualization techniques with spaced repetition, the app shows you words exactly when you\'re about to forget them — now immersive in VR.',
    highlights: ['Meta Quest', 'Memory Palace', 'Spaced Repetition', 'VR'],
    color: '#db2777',
    category: 'VR',
    link: 'https://www.meta.com/experiences/constellations/25269343592716365/',
    hero: '/projects/constellations/hero.jpg',
    gallery: [
      '/projects/constellations/gallery-01.jpg',
      '/projects/constellations/gallery-02.jpg',
      '/projects/constellations/gallery-03.jpg',
      '/projects/constellations/gallery-04.jpg',
      '/projects/constellations/gallery-05.jpg',
      '/projects/constellations/gallery-06.jpg',
    ],
  },

];

import davidlee from '../assets/people/davidlee.jpg';
import peterbaustaedter from '../assets/people/peterbaustaetder.jpg';
import tomnursey from '../assets/people/tomnursey.jpg';
import noahkadner from '../assets/people/noahkadner.jpg';

export const testimonials = [
  {
    id: 1,
    name: 'Noah Kadner',
    title: 'VP Editor, American Cinematographer',
    quote:
      'Any virtual production would be lucky to have someone as talented and curious as him on their team!',
    image: noahkadner,
  },
  {
    id: 2,
    name: 'David Lee',
    title: 'Production Designer — Nautilus, Watchmen, Brave New World',
    quote:
      'A joy to work with! He has been a great fit for the team.',
    image: davidlee,
  },
  {
    id: 3,
    name: 'Peter Baustaedter',
    title: 'VFX Art Director — Metropolis, Avatar, Rings of Power',
    quote:
      'Absolute powerhouse. Really great bridge between Art department and VAD.',
    image: peterbaustaedter,
  },
  {
    id: 4,
    name: 'Tom Nursey',
    title: 'Supervising Art Director — The Wilds, Mortal Kombat, Pacific Rim: Uprising',
    quote:
      'A very important member of the best little design team I have had.',
    image: tomnursey,
  },
];

export const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/chisomobanzi',
    icon: 'linkedin',
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net/chisomobanzi',
    icon: 'behance',
  },
{
    name: 'GitHub',
    url: 'https://github.com/chisomobanzi',
    icon: 'github',
  },
  {
    name: 'IMDB',
    url: 'https://www.imdb.com/name/nm12855764/',
    icon: 'imdb',
  },
];

export const stats = [
  { value: '8+', label: 'Productions' },
  { value: '5+', label: 'Years' },
  { value: '100%', label: 'Remote Ready' },
];

export const filterTabs = ['ALL', 'FILM', 'VR'];

export const technologies = [
  { name: 'Rhino3D', icon: rhino },
  { name: 'Blender', icon: blender },
  { name: 'Unreal', icon: unreal },
  { name: 'Grasshopper', icon: grasshopper },
  { name: 'Python', icon: python },
  { name: 'C++', icon: cplusplus },
  { name: 'Affinity', icon: affinity },
  { name: 'Perforce', icon: perforce },
  { name: 'Git', icon: gitIcon },
];

export const languages = [
  { name: 'English', icon: english, level: 'Native' },
  { name: 'Mandarin', icon: chinese, level: 'Advanced' },
  { name: 'Portuguese', icon: portuguese, level: 'Beginner' },
  { name: 'Shona', icon: shona, level: 'Beginner' },
];

export const services = [
  {
    title: 'Virtual Art Department',
    description:
        'Remote VAD support for film & TV productions worldwide.',
    points: [
      'VR previsualization for directors & stakeholders',
      'Unreal Engine environment & asset development',
      'Virtual production pipeline integration',
      'Remote collaboration with on-set art departments',
    ],
  },
  {
    title: 'Set Design & Drafting',
    description:
        'Technical design and drafting for physical builds.',
    points: [
      'Construction drawings & technical drafting',
      '3D modelling for sets & props',
      'Cross-department coordination (SFX, stunts)',
      'Design development from concept to build',
    ],
  },
  {
    title: 'XR Development',
    description:
        'Immersive applications and spatial experiences.',
    points: [
      'Meta Quest application development',
      'Interactive 3D experiences',
      'Spatial UI/UX design',
      'Unreal Engine & custom tooling',
    ],
  },
];
