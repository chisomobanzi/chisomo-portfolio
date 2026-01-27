import appleLogo from '../assets/images/apple.png';
import disneyLogo from '../assets/images/disney.png';
import primeLogo from '../assets/images/prime.png';
import netflixLogo from '../assets/images/netflix.png';
import nbcuniversalLogo from '../assets/images/nbcuniversal.png';
import nickelodeonLogo from '../assets/images/nickelodeon.png';
import metaLogo from '../assets/images/meta.png';
import legendaryLogo from '../assets/images/legendary.png';

const logos = [
  { src: appleLogo, alt: 'Apple TV+', invert: true },
  { src: disneyLogo, alt: 'Disney+' },
  { src: primeLogo, alt: 'Amazon Prime Video' },
  { src: netflixLogo, alt: 'Netflix' },
  { src: nbcuniversalLogo, alt: 'NBCUniversal' },
  { src: nickelodeonLogo, alt: 'Nickelodeon' },
  { src: legendaryLogo, alt: 'Legendary' },
  { src: metaLogo, alt: 'Meta' },
];

const LogoTicker = () => {
  return (
    <section className="py-12 sm:py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-400 text-center mb-8">
          Trusted by leading studios
        </p>

        <div className="flex items-center justify-center flex-wrap gap-10 sm:gap-14">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className={`h-8 sm:h-10 w-auto object-contain opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300${logo.invert ? ' invert' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
