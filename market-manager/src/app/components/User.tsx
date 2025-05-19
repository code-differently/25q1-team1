'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/lib/firebase';
import useUser from '../hooks/useUser';

export default function User() {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.refresh();
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: 600,
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {user ? (
        <>
          <span style={{ fontWeight: 600, color: '#1f2937' }}>
            Welcome, {user.displayName || user.email}
          </span>
          <Link href="/customerCart">
            <button
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#1d4ed8')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#2563eb')
              }
            >
              View Cart
            </button>
          </Link>
          <button
            onClick={handleLogout}
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#1d4ed8')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#2563eb')
            }
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">
          <button
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#1d4ed8')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#2563eb')
            }
          >
            Login
          </button>
        </Link>
      )}
    </div>
  );
}
