import { UserList } from '@/components/user/UserList';
import { Header } from '@/components/layout/Header';

const Users = () => {
  return (
    <div className="min-h-screen bg-social-bg">
      <Header />
      <main className="container mx-auto py-6">
        <UserList />
      </main>
    </div>
  );
};

export default Users;