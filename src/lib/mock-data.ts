// Mock data for the dashboard UI. Temporary until the database is in place.
// Shapes loosely follow the Prisma draft in context/project-overview.md.
// `itemCount` fields are display-only stand-ins for counts the database will provide.

export const currentUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null as string | null,
  isPro: false,
};

// `icon` holds lucide-react icon names.
export const itemTypes = [
  { id: "type_snippet", name: "Snippets", icon: "Code", color: "#3b82f6", isSystem: true, itemCount: 24 },
  { id: "type_prompt", name: "Prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true, itemCount: 18 },
  { id: "type_command", name: "Commands", icon: "Terminal", color: "#f97316", isSystem: true, itemCount: 15 },
  { id: "type_note", name: "Notes", icon: "StickyNote", color: "#fde047", isSystem: true, itemCount: 12 },
  { id: "type_file", name: "Files", icon: "File", color: "#6b7280", isSystem: true, itemCount: 5 },
  { id: "type_image", name: "Images", icon: "Image", color: "#ec4899", isSystem: true, itemCount: 3 },
  { id: "type_link", name: "Links", icon: "Link", color: "#10b981", isSystem: true, itemCount: 8 },
];

// `typeIds` lists the item types shown as icons on the collection card.
export const collections = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    typeIds: ["type_snippet", "type_note", "type_link"],
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    typeIds: ["type_snippet", "type_note"],
    updatedAt: "2026-01-06T10:00:00Z",
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    typeIds: ["type_file", "type_note"],
    updatedAt: "2026-01-02T10:00:00Z",
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    typeIds: ["type_note", "type_snippet", "type_link", "type_prompt"],
    updatedAt: "2026-01-04T10:00:00Z",
  },
  {
    id: "col_git",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    typeIds: ["type_command", "type_note"],
    updatedAt: "2026-01-08T10:00:00Z",
  },
  {
    id: "col_ai",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    typeIds: ["type_prompt", "type_snippet", "type_note"],
    updatedAt: "2026-01-10T10:00:00Z",
  },
];

export const items = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    typeId: "type_snippet",
    collectionId: "col_react",
    language: "typescript",
    content: `export function useAuth() {
  const { data: session, status } = useSession();
  return { user: session?.user, isLoading: status === "loading" };
}`,
    tags: ["react", "auth", "hooks"],
    isPinned: true,
    isFavorite: true,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    typeId: "type_snippet",
    collectionId: "col_react",
    language: "typescript",
    content: `async function fetchWithRetry(url: string, retries = 3, delay = 500) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}`,
    tags: ["api", "fetch", "error-handling"],
    isPinned: true,
    isFavorite: false,
    createdAt: "2026-01-12T10:00:00Z",
  },
  {
    id: "item_3",
    title: "Code Review Prompt",
    description: "Thorough code review focusing on bugs and readability",
    typeId: "type_prompt",
    collectionId: "col_ai",
    language: null,
    content:
      "Review the following code. Point out bugs, edge cases, and readability issues. Suggest concrete fixes.",
    tags: ["ai", "code-review"],
    isPinned: false,
    isFavorite: true,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "item_4",
    title: "Undo Last Commit",
    description: "Undo the last commit but keep the changes staged",
    typeId: "type_command",
    collectionId: "col_git",
    language: "bash",
    content: "git reset --soft HEAD~1",
    tags: ["git"],
    isPinned: false,
    isFavorite: false,
    createdAt: "2026-01-08T10:00:00Z",
  },
  {
    id: "item_5",
    title: "Python List Comprehensions",
    description: "Common list comprehension patterns",
    typeId: "type_snippet",
    collectionId: "col_python",
    language: "python",
    content: `squares = [x * x for x in range(10)]
evens = [x for x in nums if x % 2 == 0]`,
    tags: ["python", "lists"],
    isPinned: false,
    isFavorite: false,
    createdAt: "2026-01-06T10:00:00Z",
  },
  {
    id: "item_6",
    title: "Big-O Cheat Sheet",
    description: "Time complexity notes for common data structures",
    typeId: "type_note",
    collectionId: "col_interview",
    language: null,
    content: "- Array access: O(1)\n- Hash map lookup: O(1) avg\n- Binary search: O(log n)\n- Sorting: O(n log n)",
    tags: ["interview", "algorithms"],
    isPinned: false,
    isFavorite: false,
    createdAt: "2026-01-04T10:00:00Z",
  },
  {
    id: "item_7",
    title: "CLAUDE.md Template",
    description: "Starter context file for AI coding assistants",
    typeId: "type_file",
    collectionId: "col_context",
    language: "markdown",
    content: "# Project\n\n## Commands\n\n## Conventions\n",
    tags: ["ai", "context"],
    isPinned: false,
    isFavorite: true,
    createdAt: "2026-01-02T10:00:00Z",
  },
  {
    id: "item_8",
    title: "React Docs",
    description: "Official React documentation",
    typeId: "type_link",
    collectionId: "col_react",
    language: null,
    content: "https://react.dev",
    tags: ["react", "docs"],
    isPinned: false,
    isFavorite: false,
    createdAt: "2025-12-28T10:00:00Z",
  },
];
