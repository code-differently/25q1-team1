'use client';

import useUser from '@/src/hooks/useUser';

export default function DebugPage() {
  const user = useUser();

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
    </div>
  );
}
