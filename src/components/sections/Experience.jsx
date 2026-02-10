import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle, HolographicCard, NeonTitle } from '../ui';
import useViewMode from '../../hooks/useViewMode';

const experiences = [
  {
    company: 'Oracle',
    icon: 'bxs-cloud',
    color: 'bg-red-500',
    type: 'Full-time · 3 yrs 8 mos',
    threshold: 0.15,
    roles: [
      {
        title: 'Software Development Engineer 2',
        period: 'Jul 2022 - Present',
        duration: '3 yrs 8 mos',
        location: 'India',
      },
    ],
    skills: ['5G', 'Cloud Native', 'OCNADD', '+3 skills'],
  },
  {
    company: 'SysCloud',
    icon: 'bxs-server',
    color: 'bg-blue-500',
    type: 'Full-time · 1 yr 7 mos',
    threshold: 0.4,
    roles: [
      {
        title: 'Software Engineer',
        period: 'Dec 2020 - Jun 2022',
        duration: '1 yr 7 mos',
        location: 'India',
      },
    ],
    skills: ['NestJS', 'AWS', 'Docker', 'Kubernetes', '+4 skills'],
  },
  {
    company: 'LG Soft India',
    icon: 'bxs-devices',
    color: 'bg-gray-700',
    type: 'Trainee · 3 mos',
    threshold: 0.6,
    roles: [
      {
        title: 'Trainee',
        period: 'Jul 2020 - Sep 2020',
        duration: '3 mos',
        location: 'Bengaluru, Karnataka, India',
      },
    ],
    skills: ['WebOS 2.0', 'Raspberry Pi'],
  },
  {
    company: 'The Big Stack',
    icon: 'bxs-briefcase',
    color: 'bg-sky-500',
    type: 'Internship · 2 mos',
    threshold: 0.8,
    roles: [
      {
        title: 'Intern — Front-end Developer',
        period: 'Apr 2019 - May 2019',
        duration: '2 mos',
        location: 'Greater Delhi Area',
      },
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
  },
];

// Individual role component to properly use hooks
function RoleCard({ role, scrollYProgress, roleThreshold, isLast }) {
  const opacity = useTransform(
    scrollYProgress,
    [roleThreshold - 0.05, roleThreshold],
    [0, 1]
  );

  const x = useTransform(
    scrollYProgress,
    [roleThreshold - 0.05, roleThreshold],
    [-40, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [roleThreshold - 0.05, roleThreshold],
    [0.85, 1]
  );

  const glowShadow = useTransform(
    scrollYProgress,
    [roleThreshold - 0.03, roleThreshold, roleThreshold + 0.08],
    [
      '0 0 0 0 rgba(233, 30, 140, 0)',
      '0 0 20px 8px rgba(233, 30, 140, 0.9)',
      '0 0 6px 2px rgba(233, 30, 140, 0.4)'
    ]
  );

  return (
    <motion.div
      className={`relative ${!isLast ? 'pb-6' : ''}`}
      style={{ opacity, x, scale }}
    >
      {/* Role dot with glow - aligned with timeline at left-[5px] */}
      <motion.div
        className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-primary z-10"
        style={{ boxShadow: glowShadow }}
      />

      <h4 className="font-semibold dark:text-white">{role.title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {role.period} · {role.duration}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{role.location}</p>
    </motion.div>
  );
}

// Nested timeline for roles
function RolesTimeline({ roles, scrollYProgress, baseThreshold, skills }) {
  const hasMultipleRoles = roles.length > 1;

  const timelineScale = useTransform(
    scrollYProgress,
    [baseThreshold, baseThreshold + (roles.length * 0.06)],
    [0, 1]
  );

  const skillsOpacity = useTransform(
    scrollYProgress,
    [baseThreshold + (roles.length * 0.06), baseThreshold + (roles.length * 0.06) + 0.05],
    [0, 1]
  );

  return (
    <div className="relative ml-2 pl-8">

      {roles.map((role, roleIndex) => (
        <RoleCard
          key={roleIndex}
          role={role}
          scrollYProgress={scrollYProgress}
          roleThreshold={baseThreshold + (roleIndex * 0.06)}
          isLast={roleIndex === roles.length - 1}
        />
      ))}

      {/* Skills */}
      {skills && (
        <motion.div
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-4"
          style={{ opacity: skillsOpacity }}
        >
          <i className="bx bx-diamond text-primary"></i>
          <span>{skills.join(', ')}</span>
        </motion.div>
      )}
    </div>
  );
}

function ExperienceCard({ exp, scrollYProgress, isLast }) {
  const { isModernView } = useViewMode();
  const threshold = exp.threshold;

  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold - 0.02],
    [0, 1]
  );

  const x = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold - 0.02],
    [-50, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold - 0.02],
    [0.8, 1]
  );

  const dotGlow = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold, threshold + 0.08],
    [
      '0 0 0 0 rgba(233, 30, 140, 0)',
      '0 0 25px 12px rgba(233, 30, 140, 0.8)',
      '0 0 8px 4px rgba(233, 30, 140, 0.4)'
    ]
  );

  return (
    <motion.div
      className={`relative pl-12 ${!isLast ? 'pb-10' : ''}`}
      style={{ opacity, x, scale }}
    >
      {/* Timeline dot with glow */}
      <motion.div
        className={`absolute left-0 w-8 h-8 rounded-full ${exp.color} flex items-center justify-center text-white text-base z-10 ${isModernView ? 'glow-border' : ''}`}
        style={{ boxShadow: dotGlow }}
      >
        <i className={`bx ${exp.icon}`}></i>
      </motion.div>

      {/* Card with holographic or plain style */}
      <HolographicCard className="rounded-xl">
        {/* Company header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold dark:text-white">{exp.company}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{exp.type}</p>
        </div>

        {/* Roles with nested timeline */}
        <RolesTimeline
          roles={exp.roles}
          scrollYProgress={scrollYProgress}
          baseThreshold={threshold}
          skills={exp.skills}
        />
      </HolographicCard>
    </motion.div>
  );
}

export default function Experience() {
  const { isModernView } = useViewMode();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const timelineHeadTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="experience" className="section bd-container">
      {isModernView ? (
        <NeonTitle>Experience</NeonTitle>
      ) : (
        <SectionTitle>Experience</SectionTitle>
      )}

      <div className="max-w-3xl mx-auto relative">
        {/* Main timeline background */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {/* Animated main timeline line */}
        <motion.div
          className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-pink-400 origin-top"
          style={{
            scaleY: scrollYProgress,
            height: '100%',
          }}
        />

        {/* Glowing head of the timeline */}
        <motion.div
          className="absolute left-[12px] w-2 h-2 rounded-full bg-primary z-20"
          style={{
            top: timelineHeadTop,
            boxShadow: '0 0 20px 8px rgba(233, 30, 140, 0.7)',
          }}
        />

        {/* Experience cards */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              scrollYProgress={scrollYProgress}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
