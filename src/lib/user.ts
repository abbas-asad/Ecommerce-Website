export const getOrCreateUserId = (): string => {
    if (typeof window === 'undefined') return '';

    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('userId', userId);
    }
    return userId;
};

// Optional: Add future auth-related utilities here