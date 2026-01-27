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
  },
  {
    id: 'constellations',
    index: 1,
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
  },
  {
    id: 'monarch-s2',
    index: 2,
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
  },
  {
    id: 'missions',
    index: 3,
    title: 'Missions',
    platform: 'Meta Quest',
    year: '2026',
    role: 'Founder & Developer',
    tagline: 'Practice conversations with AI characters in immersive scenarios',
    description:
      'Missions drops you into real-world scenarios — ordering at a night market, navigating a job interview, chatting at a party — where AI characters respond naturally to what you say. Built on spatial storytelling principles from film production, each mission is a scene you can replay until the conversation feels natural.',
    highlights: ['AI Conversation', 'Scenario-Based', 'Speech Recognition', 'VR'],
    color: '#8b5cf6',
    category: 'VR',
  },
  {
    id: 'nautilus',
    index: 4,
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
  },
];

import davidlee from '../assets/people/davidlee.jpg';
import peterbaustaedter from '../assets/people/peterbaustaetder.jpg';
import tomnursey from '../assets/people/tomnursey.jpg';
import noahkadner from '../assets/people/noahkadner.jpg';

export const testimonials = [
  {
    id: 1,
    name: 'David Lee',
    title: 'Production Designer — Nautilus, Watchmen, Brave New World',
    quote:
      'A joy to work with! He has been a great fit for the team.',
    image: davidlee,
  },
  {
    id: 2,
    name: 'Peter Baustaedter',
    title: 'VFX Art Director — Metropolis, Avatar, Rings of Power',
    quote:
      'Absolute powerhouse. Really great bridge between Art department and VAD.',
    image: peterbaustaedter,
  },
  {
    id: 3,
    name: 'Tom Nursey',
    title: 'Supervising Art Director — The Wilds, Mortal Kombat, Pacific Rim: Uprising',
    quote:
      'A very important member of the best little design team I have had.',
    image: tomnursey,
  },
  {
    id: 4,
    name: 'Noah Kadner',
    title: 'VP Editor, American Cinematographer',
    quote:
      'Any virtual production would be lucky to have someone as talented and curious as you on their team!',
    image: noahkadner,
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
    name: 'Instagram',
    url: 'https://www.instagram.com/chizbanz',
    icon: 'instagram',
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
  { value: '6', label: 'Platforms' },
  { value: '5+', label: 'Years' },
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
    title: 'Set Design & Drafting',
    description:
      'Traditional and digital set design for film & TV productions.',
    points: [
      'Technical drafting & construction drawings',
      'On-set design supervision',
      '3D modelling for set builds & props',
      'Cross-department coordination with SFX & stunts',
    ],
  },
  {
    title: 'VR / Unreal Development',
    description:
      'Immersive experiences, VR previs, and virtual production tools.',
    points: [
      'VR previsualization for directors & stakeholders',
      'Unreal Engine environment & asset development',
      'Meta Quest application development',
      'Virtual production pipeline integration',
    ],
  },
  {
    title: 'Architectural Concepting',
    description:
      'Spatial design and 3D concepting for built environments.',
    points: [
      'Concept design & spatial narrative',
      'Parametric modelling with Grasshopper',
      '3D visualization & rendering',
      'Design development from brief to build',
    ],
  },
];
