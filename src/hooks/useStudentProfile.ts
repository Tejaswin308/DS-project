import { useState, useCallback } from 'react';
import type { StudentProfile } from '../types/student';
import { loadStudentProfile, saveStudentProfile } from '../utils/storage';

export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile>(() => loadStudentProfile());

  const updateProfile = useCallback((data: StudentProfile) => {
    setProfile(data);
    saveStudentProfile(data);
  }, []);

  return { profile, updateProfile };
}
