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

  const baseButtonStyle = {
    padding: '0.75rem 1.5rem',
    color: '#ffffff',
    fontWeight: 600,
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    background: '', // Set dynamically
  };

  const emeraldGradient = 'linear-gradient(to right, #10b981, #059669)';
  const emeraldHover = 'linear-gradient(to right, #059669, #047857)';
 
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
          <span style={{ fontWeight: 600, color: '#f0fdf4' }}>
            Welcome, {user.displayName || user.email}
          </span>

          <Link href="/customerCart">
            <button
              style={{ ...baseButtonStyle, background: emeraldGradient }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = emeraldHover)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = emeraldGradient)
              }
            >
              View Cart
            </button>
          </Link>

          <button
            onClick={handleLogout}
            style={{ ...baseButtonStyle, background: emeraldGradient }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = emeraldHover)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = emeraldGradient)
            }
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">
          <button
            style={{ ...baseButtonStyle, background: emeraldGradient }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = emeraldHover)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = emeraldGradient)
            }
          >
            Login
          </button>
        </Link>
      )}
    </div>
  );
}