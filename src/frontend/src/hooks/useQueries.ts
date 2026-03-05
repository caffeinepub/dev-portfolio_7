import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Local storage message store ─────────────────────────────────
const MESSAGES_KEY = "portfolio_contact_messages";

export interface LocalContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: number;
  isRead: boolean;
}

function readMessages(): LocalContactMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalContactMessage[];
  } catch {
    return [];
  }
}

function writeMessages(msgs: LocalContactMessage[]): void {
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
  } catch {
    // ignore
  }
}

// ─── Hooks ────────────────────────────────────────────────────────

export function useAllMessages() {
  return useQuery<LocalContactMessage[]>({
    queryKey: ["allMessages"],
    queryFn: () => readMessages().sort((a, b) => b.timestamp - a.timestamp),
    staleTime: 0,
  });
}

export function useUnreadCount() {
  return useQuery<number>({
    queryKey: ["unreadCount"],
    queryFn: () => readMessages().filter((m) => !m.isRead).length,
    staleTime: 0,
  });
}

export function useSubmitContactForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      subject,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      const msgs = readMessages();
      const newMsg: LocalContactMessage = {
        id: Date.now(),
        name,
        email,
        phone,
        subject,
        message,
        timestamp: Date.now(),
        isRead: false,
      };
      writeMessages([newMsg, ...msgs]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMessages"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });
}

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const msgs = readMessages().map((m) =>
        m.id === id ? { ...m, isRead: true } : m,
      );
      writeMessages(msgs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMessages"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const msgs = readMessages().filter((m) => m.id !== id);
      writeMessages(msgs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMessages"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });
}
