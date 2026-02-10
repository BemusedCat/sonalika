import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          width: 800,
          height: 800,
        },
      },
      color: {
        value: '#E91E8C',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#E91E8C',
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'bounce',
        },
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.4,
            color: '#E91E8C',
          },
        },
        push: {
          quantity: 3,
        },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      options={options}
      init={particlesInit}
    />
  );
}
