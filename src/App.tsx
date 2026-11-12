import { AppProvider, useApp } from '@/context/AppContext';
import { TabBar, AppHeader } from '@/components/Layout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';
import Rights from '@/pages/Rights';
import RightDetail from '@/pages/RightDetail';
import SOS from '@/pages/SOS';

function Screens() {
  const { page, detailId, profile } = useApp();

  if (!profile) return <Login />;

  return (
    <div className="min-h-[100dvh] bg-[#F4F2FC] dark:bg-[#141126]">
      {page === 'chat' ? (
        <Chat />
      ) : page === 'detail' ? (
        <RightDetail key={detailId} />
      ) : (
        <>
          <AppHeader />
          <main className="pb-24">
            {page === 'home' && <Home />}
            {page === 'rights' && <Rights />}
            {page === 'sos' && <SOS />}
          </main>
        </>
      )}
      <TabBar />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Screens />
    </AppProvider>
  );
}
