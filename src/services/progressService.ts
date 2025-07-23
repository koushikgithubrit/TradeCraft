import { modules } from '../data/modules';
import type { Module, Lesson } from '../data/modules';

interface Progress {
  completedLessons: string[];
  lastAccessedLesson: string | null;
  lastAccessedModule: string | null;
}

export const progressService = {
  getProgress(): Progress {
    const progress = localStorage.getItem('learningProgress');
    return progress ? JSON.parse(progress) : {
      completedLessons: [],
      lastAccessedLesson: null,
      lastAccessedModule: null
    };
  },

  saveProgress(progress: Progress) {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  },

  markLessonAsCompleted(lessonId: string) {
    const progress = this.getProgress();
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      this.saveProgress(progress);
    }
  },

  isLessonCompleted(lessonId: string): boolean {
    const progress = this.getProgress();
    return progress.completedLessons.includes(lessonId);
  },

  getModuleProgress(moduleId: string): { completed: number; total: number } {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return { completed: 0, total: 0 };

    const progress = this.getProgress();
    const completedLessons = module.lessons.filter(lesson => 
      progress.completedLessons.includes(lesson.id)
    );

    return {
      completed: completedLessons.length,
      total: module.lessons.length
    };
  },

  updateLastAccessed(moduleId: string, lessonId: string) {
    const progress = this.getProgress();
    progress.lastAccessedModule = moduleId;
    progress.lastAccessedLesson = lessonId;
    this.saveProgress(progress);
  },

  getLastAccessed(): { moduleId: string | null; lessonId: string | null } {
    const progress = this.getProgress();
    return {
      moduleId: progress.lastAccessedModule,
      lessonId: progress.lastAccessedLesson
    };
  }
}; 