import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaServer, FaDatabase, FaMobileAlt,
  FaCloud, FaRobot, FaToolbox, FaJs, FaLayerGroup, FaJava
} from 'react-icons/fa';
import {
  SiReact, SiNodedotjs, SiPython, 
  SiCplusplus, SiTypescript, 
  SiMysql, SiPostgresql, SiMongodb, SiDocker,
  SiGit, SiJira, SiFigma
} from 'react-icons/si'; 
import styles from './SkillIcon.module.css';

const SkillIcon = ({ skill, level, category, size = 'medium', interactive = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const skillCategories = {
    frontend: { color: '#61DAFB', icon: <SiReact /> },
    backend: { color: '#339933', icon: <FaServer /> },
    database: { color: '#47A248', icon: <FaDatabase /> },
    mobile: { color: '#34B7F1', icon: <FaMobileAlt /> },
    devops: { color: '#2496ED', icon: <FaCloud /> },
    ai_ml: { color: '#FF6B6B', icon: <FaRobot /> },
    tools: { color: '#F0DB4F', icon: <FaToolbox /> },
    design: { color: '#F24E1E', icon: <SiFigma /> },
    languages: { color: '#3776AB', icon: <FaCode /> }
  };

  const skillIcons = {
    'React': <SiReact />,
    'Next.js': <SiReact />,
    'TypeScript': <SiTypescript />,
    'JavaScript': <FaJs />,
    'HTML/CSS': <FaLayerGroup />,
    'Node.js': <SiNodedotjs />,
    'Express': <SiNodedotjs />,
    'Python': <SiPython />,
    'Java': <FaJava />,
    'C++': <SiCplusplus />,
    'MySQL': <SiMysql />,
    'PostgreSQL': <SiPostgresql />,
    'MongoDB': <SiMongodb />,
    'Docker': <SiDocker />,
    'Git': <SiGit />,
    'Figma': <SiFigma />,
    'Jira': <SiJira />,
    'default': <FaCode />
  };

  const levelColors = {
    beginner: '#FF6B6B',
    intermediate: '#FFD93D',
    advanced: '#6BCF7F',
    expert: '#4D96FF'
  };

  const levelText = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert'
  };

  const categoryInfo = skillCategories[category] || skillCategories.languages;
  const icon = skillIcons[skill] || skillIcons.default;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(level);
    }, 300);
    return () => clearTimeout(timer);
  }, [level]);

  const calculateLevel = (progress) => {
    if (progress >= 90) return 'expert';
    if (progress >= 70) return 'advanced';
    if (progress >= 40) return 'intermediate';
    return 'beginner';
  };

  const currentLevel = calculateLevel(level);

  const sizeClass = styles[size];
  const containerClass = `${styles.container} ${sizeClass} ${interactive ? styles.interactive : ''}`;

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={containerClass}
        style={{ '--skill-color': categoryInfo.color }}
        whileHover={interactive ? { scale: 1.05 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
       onMouseEnter={() => interactive && setIsHovered(true)}
       onMouseLeave={() => interactive && setIsHovered(false)}
       >
        {isHovered && (
          <motion.div
            className={styles.glow}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}

        <div className={styles.inner}>
          <div className={styles.content}>
            {icon}
          </div>
        </div>

        <svg className={styles.progressRing} width="80" height="80" viewBox="0 0 80 80">
          <circle
            className={styles.progressRingBackground}
            cx="40"
            cy="40"
            r="35"
          />
          <motion.circle
            className={styles.progressRingForeground}
            cx="40"
            cy="40"
            r="35"
            stroke={levelColors[currentLevel]}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>

        <div className={styles.levelBadge} style={{ backgroundColor: levelColors[currentLevel] }}>
          {Math.round(progress)}%
        </div>

        {isHovered && interactive && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {skill}
          </motion.div>
        )}
      </motion.div>

      {!interactive && (
        <div className={styles.label}>
          <span className={styles.name}>{skill}</span>
          <span className={styles.level} style={{ color: levelColors[currentLevel] }}>
            {levelText[currentLevel]}
          </span>
        </div>
      )}
    </div>
  );
};

SkillIcon.defaultProps = {
  skill: 'React',
  level: 85,
  category: 'frontend',
  size: 'medium',
  interactive: true
};

export default SkillIcon;