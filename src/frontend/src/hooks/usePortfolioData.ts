import { useCallback, useEffect, useState } from "react";
import {
  certifications as seedCertifications,
  experiences as seedExperiences,
  projects as seedProjects,
  skills as seedSkills,
} from "../data/portfolio";
import type {
  Certification,
  Experience,
  Project,
  Skill,
} from "../data/portfolio";

// ─── Storage keys ───────────────────────────────────────────────
const KEYS = {
  projects: "portfolio_projects",
  skills: "portfolio_skills",
  certifications: "portfolio_certifications",
  experiences: "portfolio_experiences",
} as const;

// ─── Helper ─────────────────────────────────────────────────────
function readLS<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      // First visit — seed with static data
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as T[];
  } catch {
    return seed;
  }
}

function writeLS<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore quota errors silently
  }
}

// ─── Projects hook ───────────────────────────────────────────────
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProjects(readLS<Project>(KEYS.projects, seedProjects));
    setLoading(false);
  }, []);

  const addProject = useCallback((project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
    };
    setProjects((prev) => {
      const next = [newProject, ...prev];
      writeLS(KEYS.projects, next);
      return next;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      writeLS(KEYS.projects, next);
      return next;
    });
  }, []);

  return { projects, addProject, deleteProject, loading };
}

// ─── Skills hook ─────────────────────────────────────────────────
export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSkills(readLS<Skill>(KEYS.skills, seedSkills));
    setLoading(false);
  }, []);

  const addSkill = useCallback((skill: Skill) => {
    setSkills((prev) => {
      const next = [...prev, skill];
      writeLS(KEYS.skills, next);
      return next;
    });
  }, []);

  const deleteSkill = useCallback((name: string) => {
    setSkills((prev) => {
      const next = prev.filter((s) => s.name !== name);
      writeLS(KEYS.skills, next);
      return next;
    });
  }, []);

  return { skills, addSkill, deleteSkill, loading };
}

// ─── Certifications hook ─────────────────────────────────────────
export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCertifications(
      readLS<Certification>(KEYS.certifications, seedCertifications),
    );
    setLoading(false);
  }, []);

  const addCertification = useCallback((cert: Omit<Certification, "id">) => {
    const newCert: Certification = {
      ...cert,
      id: Date.now(),
    };
    setCertifications((prev) => {
      const next = [...prev, newCert];
      writeLS(KEYS.certifications, next);
      return next;
    });
  }, []);

  const deleteCertification = useCallback((id: number) => {
    setCertifications((prev) => {
      const next = prev.filter((c) => c.id !== id);
      writeLS(KEYS.certifications, next);
      return next;
    });
  }, []);

  return { certifications, addCertification, deleteCertification, loading };
}

// ─── Experiences hook ────────────────────────────────────────────
export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setExperiences(readLS<Experience>(KEYS.experiences, seedExperiences));
    setLoading(false);
  }, []);

  const addExperience = useCallback((exp: Omit<Experience, "id">) => {
    const newExp: Experience = {
      ...exp,
      id: Date.now(),
    };
    setExperiences((prev) => {
      const next = [newExp, ...prev];
      writeLS(KEYS.experiences, next);
      return next;
    });
  }, []);

  const deleteExperience = useCallback((id: number) => {
    setExperiences((prev) => {
      const next = prev.filter((e) => e.id !== id);
      writeLS(KEYS.experiences, next);
      return next;
    });
  }, []);

  return { experiences, addExperience, deleteExperience, loading };
}
