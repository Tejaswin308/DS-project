import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ToolsPage from './pages/ToolsPage';
import ExperimentDetailsPage from './pages/ExperimentDetailsPage';
import SubExperimentPage from './pages/SubExperimentPage';
import NotFoundPage from './pages/NotFoundPage';
import StudentProfileModal from './components/StudentProfileModal';
import StudentIDCardModal from './components/StudentIDCardModal';
import ToastContainer from './components/Toast';
import { useExperiments } from './hooks/useExperiments';
import { useStudentProfile } from './hooks/useStudentProfile';
import { useToast } from './hooks/useToast';

export default function App() {
  const { experiments, addExperiment, updateExperiment, deleteExperiment, searchExperiments, stats } =
    useExperiments();
  const { profile, updateProfile } = useStudentProfile();
  const { toasts, addToast, removeToast } = useToast();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [idCardModalOpen, setIdCardModalOpen] = useState(false);

  const handleSaveProfile = (data: typeof profile) => {
    updateProfile(data);
    setProfileModalOpen(false);
    addToast('Profile updated successfully.');
  };

  // Shared experiments props
  const experimentsProps = {
    experiments,
    profile,
    stats,
    onAdd: addExperiment,
    onEdit: updateExperiment,
    onDelete: deleteExperiment,
    onEditProfile: () => setProfileModalOpen(true),
    onViewIdCard: () => setIdCardModalOpen(true),
    searchExperiments,
    addToast,
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout profile={profile} onEditProfile={() => setProfileModalOpen(true)}>
          <Routes>
            {/* Home = same as Experiments library */}
            <Route path="/" element={<HomePage {...experimentsProps} />} />
            {/* /experiments also shows the same page */}
            <Route path="/experiments" element={<HomePage {...experimentsProps} />} />
            {/* Modules */}
            <Route path="/modules" element={<ModulesPage />} />
            {/* Tools */}
            <Route path="/tools" element={<ToolsPage />} />
            {/* Experiment details */}
            <Route
              path="/experiment/:id"
              element={<ExperimentDetailsPage experiments={experiments} />}
            />
            {/* Sub-experiments */}
            <Route
              path="/experiment/:id/:sub"
              element={<SubExperimentPage experiments={experiments} />}
            />
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>

        {/* Profile modal */}
        <StudentProfileModal
          isOpen={profileModalOpen}
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setProfileModalOpen(false)}
          onError={msg => addToast(msg, 'error')}
        />

        {/* ID Card modal */}
        <StudentIDCardModal
          isOpen={idCardModalOpen}
          profile={profile}
          onClose={() => setIdCardModalOpen(false)}
          onEdit={() => {
            setIdCardModalOpen(false);
            setProfileModalOpen(true);
          }}
        />

        {/* Toast notifications */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
