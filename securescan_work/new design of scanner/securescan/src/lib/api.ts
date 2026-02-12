/**
 * API service for interacting with the security scan backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3330/api";

export interface Scan {
    _id: string;
    domain: string;
    mode: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'stopped';
    progressPct: number;
    currentModule?: string;
    score?: number;
    grade?: string;
    results?: any;
    findings?: any[];
    error?: string;
    createdAt: string;
    completedAt?: string;
}

export interface AssessmentItem {
    id: number;
    category: string;
    questions: {
        id: number;
        text: string;
        options: {
            key: string;
            text: string;
            score: number;
        }[];
    }[];
}

export interface AssessmentResult {
    _id: string;
    userId?: string;
    domain?: string;
    responses: Record<string, string>;
    score: number;
    grade: string;
    createdAt: string;
}

export const api = {
    /**
     * Fetch all scans from the backend.
     */
    async getAllScans(): Promise<Scan[]> {
        const response = await fetch(`${API_URL}/scans`);
        if (!response.ok) throw new Error("Failed to fetch scans");
        return response.json();
    },

    /**
     * Start a new scan.
     */
    async startScan(domain: string, mode: string): Promise<{ success: boolean; scanId: string; message: string }> {
        const response = await fetch(`${API_URL}/scans/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ domain, mode }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to start scan");
        }
        return response.json();
    },

    /**
     * Get status of a specific scan.
     */
    async getScanStatus(scanId: string): Promise<Scan> {
        const response = await fetch(`${API_URL}/scans/status/${scanId}`);
        if (!response.ok) throw new Error("Failed to fetch scan status");
        return response.json();
    },

    /**
     * Get full results of a completed scan.
     */
    async getScanResults(scanId: string): Promise<Scan> {
        const response = await fetch(`${API_URL}/scans/results/${scanId}`);
        if (!response.ok) throw new Error("Failed to fetch scan results");
        return response.json();
    },

    /**
     * Get the URL for a PDF report.
     */
    getReportUrl(scanId: string): string {
        return `${API_URL}/scans/report/${scanId}`;
    },

    /**
     * Stop a running scan.
     */
    async stopScan(scanId: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/scans/stop/${scanId}`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Failed to stop scan");
        return response.json();
    },

    /**
     * Assessment: Fetch questions.
     */
    async getAssessmentQuestions(): Promise<AssessmentItem[]> {
        const response = await fetch(`${API_URL}/assessments/questions`);
        if (!response.ok) throw new Error("Failed to fetch assessment questions");
        return response.json();
    },

    /**
     * Assessment: Submit responses.
     */
    async submitAssessment(responses: Record<string, string>, domain?: string): Promise<{ success: boolean; assessmentId: string; score: number; grade: string }> {
        const response = await fetch(`${API_URL}/assessments/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ responses, domain }),
        });
        if (!response.ok) throw new Error("Failed to submit assessment");
        return response.json();
    },

    /**
     * Assessment: Get history.
     */
    async getAssessmentHistory(): Promise<AssessmentResult[]> {
        const response = await fetch(`${API_URL}/assessments/history`);
        if (!response.ok) throw new Error("Failed to fetch assessment history");
        return response.json();
    },

    /**
     * Assessment: Get details.
     */
    async getAssessmentDetails(id: string): Promise<AssessmentResult> {
        const response = await fetch(`${API_URL}/assessments/${id}`);
        if (!response.ok) throw new Error("Failed to fetch assessment details");
        return response.json();
    },

    /**
     * Delete a scan by ID.
     */
    async deleteScan(scanId: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/scans/${scanId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete scan");
        return response.json();
    }
};

/* ============================================
   Authentication API
   ============================================ */

export interface AuthUser {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: AuthUser;
        token: string;
    };
}

const TOKEN_KEY = "securescan_token";
const USER_KEY = "securescan_user";

export const authApi = {
    /**
     * Register a new user.
     */
    async register(fullName: string, email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        // Store token and user in localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, data.data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
        }

        return data;
    },

    /**
     * Login with email and password.
     */
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // Store token and user in localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, data.data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
        }

        return data;
    },

    /**
     * Get the current logged-in user from the server.
     */
    async getMe(): Promise<AuthUser | null> {
        const token = this.getToken();
        if (!token) return null;

        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                this.logout();
                return null;
            }

            const data = await response.json();
            return data.data.user;
        } catch {
            return null;
        }
    },

    /**
     * Logout by clearing stored data.
     */
    logout(): void {
        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        }
    },

    /**
     * Get the stored JWT token.
     */
    getToken(): string | null {
        if (typeof window !== "undefined") {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    },

    /**
     * Get the stored user data (fast, no network call).
     */
    getStoredUser(): AuthUser | null {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem(USER_KEY);
            return user ? JSON.parse(user) : null;
        }
        return null;
    },

    /**
     * Check if user is authenticated.
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};
