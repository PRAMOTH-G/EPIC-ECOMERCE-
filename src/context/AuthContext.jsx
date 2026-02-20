import { createContext, useContext, useEffect, useState } from 'react';

// ── localStorage keys ──────────────────────────────────────────────
const USERS_KEY = 'fm_users';
const SESSION_KEY = 'fm_session';

// ── Helpers ────────────────────────────────────────────────────────
const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const hashPassword = (pw) => {
    // Simple deterministic hash for demo — NOT cryptographic, just obfuscation
    let h = 0;
    for (let i = 0; i < pw.length; i++) h = (Math.imul(31, h) + pw.charCodeAt(i)) | 0;
    return h.toString(16);
};

const generateUid = () => 'user_' + Math.random().toString(36).substr(2, 12);

const avatarUrl = (email) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=16a34a&color=fff&rounded=true`;

// ── Context ────────────────────────────────────────────────────────
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const saved = localStorage.getItem(SESSION_KEY);
        if (saved) {
            try { setCurrentUser(JSON.parse(saved)); } catch (_) { }
        }
        setLoading(false);
    }, []);

    // ── Signup ───────────────────────────────────────────────────
    function signup(email, password) {
        return new Promise((resolve, reject) => {
            const users = getUsers();
            if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
                return reject(new Error('An account with this email already exists.'));
            }
            if (password.length < 6) {
                return reject(new Error('Password must be at least 6 characters.'));
            }
            const user = {
                uid: generateUid(),
                email,
                displayName: email.split('@')[0],
                photoURL: avatarUrl(email),
                createdAt: new Date().toISOString(),
                passwordHash: hashPassword(password),
            };
            saveUsers([...users, user]);
            const sessionUser = { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL };
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
            setCurrentUser(sessionUser);
            resolve({ user: sessionUser });
        });
    }

    // ── Login ────────────────────────────────────────────────────
    function login(email, password) {
        return new Promise((resolve, reject) => {
            const users = getUsers();
            const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
            if (!found) return reject(new Error('No account found with this email.'));
            if (found.passwordHash !== hashPassword(password)) {
                return reject(new Error('Incorrect password. Please try again.'));
            }
            const sessionUser = { uid: found.uid, email: found.email, displayName: found.displayName, photoURL: found.photoURL };
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
            setCurrentUser(sessionUser);
            resolve({ user: sessionUser });
        });
    }

    // ── Google (demo — instant login with a mock Google account) ─
    function loginWithGoogle() {
        return new Promise((resolve) => {
            const email = 'demo.user@gmail.com';
            const users = getUsers();
            let found = users.find((u) => u.email === email);
            if (!found) {
                found = { uid: generateUid(), email, displayName: 'Demo User', photoURL: avatarUrl(email), passwordHash: '', createdAt: new Date().toISOString() };
                saveUsers([...users, found]);
            }
            const sessionUser = { uid: found.uid, email: found.email, displayName: found.displayName, photoURL: found.photoURL };
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
            setCurrentUser(sessionUser);
            resolve({ user: sessionUser });
        });
    }

    // ── Logout ───────────────────────────────────────────────────
    function logout() {
        return new Promise((resolve) => {
            localStorage.removeItem(SESSION_KEY);
            setCurrentUser(null);
            resolve();
        });
    }

    const value = { currentUser, signup, login, loginWithGoogle, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
