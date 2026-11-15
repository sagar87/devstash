export interface SeedItemType {
  name: string;
  icon: string;
  color: string;
}

export interface SeedItem {
  title: string;
  type: string;
  description: string;
  content?: string;
  url?: string;
  language?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
}

export interface SeedCollection {
  name: string;
  description: string;
  isFavorite?: boolean;
  items: SeedItem[];
}

// `icon` holds lucide-react icon names (see src/lib/item-type-icons.ts).
export const SYSTEM_ITEM_TYPES: SeedItemType[] = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
];

// Names used before the seed spec switched to singular lowercase.
export const LEGACY_ITEM_TYPE_NAMES: Record<string, string> = {
  Snippets: "snippet",
  Prompts: "prompt",
  Commands: "command",
  Notes: "note",
  Files: "file",
  Images: "image",
  Links: "link",
};

export const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    items: [
      {
        title: "useDebounce & useLocalStorage hooks",
        type: "snippet",
        language: "typescript",
        isPinned: true,
        description: "Custom hooks for debouncing values and persisting state",
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        title: "Typed context provider",
        type: "snippet",
        language: "typescript",
        description: "Context provider with a safe consumer hook",
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}`,
      },
      {
        title: "Utility functions: cn, formatDate, groupBy",
        type: "snippet",
        language: "typescript",
        description: "Small helpers used across components",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function groupBy<T, K extends string>(
  list: T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  return list.reduce(
    (acc, item) => {
      const key = getKey(item);
      (acc[key] ??= []).push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    isFavorite: true,
    items: [
      {
        title: "Code review prompt",
        type: "prompt",
        isPinned: true,
        description: "Structured review of a diff for bugs and maintainability",
        content: `You are a senior engineer reviewing a pull request.

Review the diff below and report, in order of severity:
1. Correctness bugs and edge cases
2. Security issues
3. Performance problems
4. Readability and maintainability

For each finding give the file and line, why it matters, and a concrete fix.
Skip style nitpicks that a linter would catch.

Diff:
{{diff}}`,
      },
      {
        title: "Documentation generator",
        type: "prompt",
        description: "Generate concise docs from source code",
        content: `Write documentation for the code below.

Include:
- A one-paragraph summary of what it does
- Parameters and return values
- A short usage example
- Gotchas or constraints worth knowing

Keep it concise and avoid restating the code line by line.

Code:
{{code}}`,
      },
      {
        title: "Refactoring assistant",
        type: "prompt",
        description: "Safe, incremental refactoring suggestions",
        content: `Refactor the code below without changing its behavior.

Goals: reduce duplication, clarify naming, and shrink functions over 40 lines.
Propose the changes as small, independently reviewable steps and explain the
reason for each. Flag anything that would need tests before changing.

Code:
{{code}}`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        title: "Multi-stage Dockerfile for Next.js",
        type: "snippet",
        language: "dockerfile",
        description: "Small production image using standalone output",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        title: "Deploy to Vercel production",
        type: "command",
        description: "Run migrations, then deploy to production",
        content: "npx prisma migrate deploy && vercel deploy --prod",
      },
      {
        title: "Vercel documentation",
        type: "link",
        url: "https://vercel.com/docs",
        description: "Deployment, environment variables and project settings",
      },
      {
        title: "GitHub Actions documentation",
        type: "link",
        url: "https://docs.github.com/en/actions",
        description: "Workflow syntax and CI/CD reference",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        title: "Undo last commit, keep changes",
        type: "command",
        isFavorite: true,
        description: "Git operations",
        content: "git reset --soft HEAD~1",
      },
      {
        title: "Remove stopped Docker containers and dangling images",
        type: "command",
        description: "Docker commands",
        content: "docker system prune -f",
      },
      {
        title: "Find and kill process on a port",
        type: "command",
        description: "Process management",
        content: "lsof -ti :3000 | xargs kill -9",
      },
      {
        title: "List outdated npm packages",
        type: "command",
        description: "Package manager utilities",
        content: "npm outdated",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        title: "Tailwind CSS documentation",
        type: "link",
        url: "https://tailwindcss.com/docs",
        description: "Utility class reference for CSS and Tailwind",
      },
      {
        title: "shadcn/ui",
        type: "link",
        url: "https://ui.shadcn.com",
        isFavorite: true,
        description: "Copy-and-paste component library",
      },
      {
        title: "Refactoring UI",
        type: "link",
        url: "https://www.refactoringui.com",
        description: "Practical design system and visual design tips",
      },
      {
        title: "Lucide icons",
        type: "link",
        url: "https://lucide.dev/icons",
        description: "Open-source icon library",
      },
    ],
  },
];
