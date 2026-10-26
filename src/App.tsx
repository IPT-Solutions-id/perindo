import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { HeaderBanner } from './components/common/HeaderBanner';
import { DemoAccessInspector } from './components/common/DemoAccessInspector';
import { ForbiddenView } from './components/common/ForbiddenView';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { LoginPage } from './pages/public/LoginPage';
import { WorkspaceSelectPage } from './pages/public/WorkspaceSelectPage';

// Private App Pages & Shell
import { AppShell } from './pages/app/AppShell';
import { OverviewPage } from './pages/app/OverviewPage';
import { MembersPage } from './pages/app/MembersPage';
import { OrganizationsPage } from './pages/app/OrganizationsPage';
import { ProgramsPage } from './pages/app/ProgramsPage';
import { ActivitiesPage } from './pages/app/ActivitiesPage';
import { ServicesPage } from './pages/app/ServicesPage';
import { ApprovalsPage } from './pages/app/ApprovalsPage';
import { ElectionsPage } from './pages/app/ElectionsPage';
import { CandidatesPage } from './pages/app/CandidatesPage';
import { ExecutivePage } from './pages/app/ExecutivePage';
import { AdminHealthPage } from './pages/app/AdminHealthPage';
import { ProfilePage } from './pages/app/ProfilePage';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const { account, canAccessRoute } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const isAppRoute = currentPath.startsWith('/app/');

  // Private Route Guard
  const renderAppPage = () => {
    if (!account) {
      return (
        <ForbiddenView
          reason="Sesi login diperlukan untuk mengakses ruang kerja aplikasi."
          onNavigateHome={() => navigate('/login')}
          onOpenInspector={() => setIsInspectorOpen(true)}
        />
      );
    }

    const access = canAccessRoute(currentPath);
    if (!access.allowed) {
      return (
        <ForbiddenView
          reason={access.reason}
          onNavigateHome={() => navigate('/app/overview')}
          onOpenInspector={() => setIsInspectorOpen(true)}
        />
      );
    }

    switch (currentPath) {
      case '/app/overview':
        return <OverviewPage onNavigate={navigate} onOpenInspector={() => setIsInspectorOpen(true)} />;
      case '/app/members':
        return <MembersPage />;
      case '/app/organizations':
        return <OrganizationsPage onOpenInspector={() => setIsInspectorOpen(true)} />;
      case '/app/programs':
        return <ProgramsPage />;
      case '/app/activities':
        return <ActivitiesPage />;
      case '/app/services':
        return <ServicesPage />;
      case '/app/approvals':
        return <ApprovalsPage />;
      case '/app/elections':
        return <ElectionsPage />;
      case '/app/candidates':
        return <CandidatesPage />;
      case '/app/executive':
        return <ExecutivePage />;
      case '/app/admin/health':
        return <AdminHealthPage />;
      case '/app/profile':
        return <ProfilePage />;
      default:
        return <OverviewPage onNavigate={navigate} onOpenInspector={() => setIsInspectorOpen(true)} />;
    }
  };

  // Public Route Selector
  const renderPublicPage = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage onNavigate={navigate} onOpenInspector={() => setIsInspectorOpen(true)} />;
      case '/tentang':
        return <AboutPage onNavigate={navigate} />;
      case '/fitur':
        return <FeaturesPage onNavigate={navigate} onOpenInspector={() => setIsInspectorOpen(true)} />;
      case '/kontak':
        return <ContactPage onNavigate={navigate} />;
      case '/privasi':
        return <PrivacyPage onNavigate={navigate} />;
      case '/login':
        return <LoginPage onNavigate={navigate} onOpenInspector={() => setIsInspectorOpen(true)} />;
      case '/pilih-workspace':
        return <WorkspaceSelectPage onNavigate={navigate} onOpenInspector={() => setIsInspectorOpen(true)} />;
      default:
        return <LandingPage onNavigate={navigate} onOpenInspector={() => setIsInspectorOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 antialiased selection:bg-[#102C63] selection:text-white">
      {/* Main Content Router */}
      {isAppRoute ? (
        <AppShell
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenInspector={() => setIsInspectorOpen(true)}
        >
          {renderAppPage()}
        </AppShell>
      ) : (
        <div className="flex-1 flex flex-col">
          <PublicNavbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenInspector={() => setIsInspectorOpen(true)}
          />
          <main className="flex-1">{renderPublicPage()}</main>
          <PublicFooter onNavigate={navigate} />
        </div>
      )}

      {/* Developer Demo Access & Role Inspector Drawer */}
      <DemoAccessInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DataProvider>
  );
}
