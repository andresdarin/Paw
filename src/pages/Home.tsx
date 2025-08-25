import { Feed } from '@/components/feed/Feed';
import { Header } from '@/components/layout/Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-social-bg">
      <Header />
      <main className="container mx-auto py-6">
        <Feed />
      </main>
    </div>
  );
};

export default Home;