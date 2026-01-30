import Dexie from 'dexie';

// Initialize the database
export const db = new Dexie('MasteryLoopDB');

// Define the schema
db.version(1).stores({
    users: '++id, email, name, goal, subject, level', // Primary key and indexed props
    progress: '++id, userId, moduleId, status, score, lastAccessed',
    careerProfile: '++id, userId, targetRole, readinessScore, currentSalary, targetSalary',
    sprints: '++id, userId, title, status, type, priority, createdAt', // Status: 'todo', 'in-progress', 'done'
    quizResults: '++id, userId, quizId, score, totalQuestions, date',
    learningPath: '++id, userId, moduleName, completed, locked',
    settings: 'userId, theme, notifications' // Key is usually strict for settings
});

// Helper function to get the current active user (for single-user mode)
export const getCurrentUser = async () => {
    const users = await db.users.toArray();
    return users.length > 0 ? users[0] : null;
};

// Helper to initialize a default user if none exists
export const initDefaultUser = async (preferences = {}) => {
    const existing = await getCurrentUser();
    if (!existing) {
        const userId = await db.users.add({
            name: 'Guest User',
            email: 'guest@masteryloop.com',
            joinedAt: new Date(),
            ...preferences
        });
        return userId;
    }
    return existing.id;
};

// --- Career Methods ---

export const saveCareerProfile = async (userId, profileData) => {
    // Check if profile exists
    const existing = await db.careerProfile.where('userId').equals(userId).first();
    if (existing) {
        return await db.careerProfile.update(existing.id, profileData);
    } else {
        return await db.careerProfile.add({ userId, ...profileData });
    }
};

export const getCareerProfile = async (userId) => {
    return await db.careerProfile.where('userId').equals(userId).first();
};

export const addSprintTask = async (userId, task) => {
    return await db.sprints.add({
        userId,
        createdAt: new Date(),
        status: 'todo',
        ...task
    });
};

export const getSprintTasks = async (userId) => {
    return await db.sprints.where('userId').equals(userId).toArray();
};

export const updateTaskStatus = async (taskId, newStatus) => {
    return await db.sprints.update(taskId, { status: newStatus });
};

export const deleteTask = async (taskId) => {
    return await db.sprints.delete(taskId);
};


// --- Progress Methods ---

export const updateModuleProgress = async (userId, moduleId, status, score = 0) => {
    const existing = await db.progress
        .where({ userId, moduleId })
        .first();

    if (existing) {
        return await db.progress.update(existing.id, {
            status,
            score,
            lastAccessed: new Date()
        });
    } else {
        return await db.progress.add({
            userId,
            moduleId,
            status,
            score,
            lastAccessed: new Date()
        });
    }
};

export const getModuleProgress = async (userId, moduleId) => {
    return await db.progress.where({ userId, moduleId }).first();
};

export const getAllProgress = async (userId) => {
    return await db.progress.where('userId').equals(userId).toArray();
};
