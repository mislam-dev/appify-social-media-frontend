import type {
  FeedEvent,
  FriendItem,
  NotificationItem,
  Post,
  RecommendedPerson,
  Story,
  SuggestedPerson,
} from "@/modules/feed/types";

const img = (name: string) => `/assets/images/${name}`;

export interface ExploreItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

export const EXPLORE_ITEMS: ExploreItem[] = [
  { id: "learning", label: "Learning", badge: "New", icon: "learning" },
  { id: "insights", label: "Insights", icon: "insights" },
  { id: "find-friends", label: "Find friends", icon: "find-friends" },
  { id: "bookmarks", label: "Bookmarks", icon: "bookmarks" },
  { id: "group", label: "Group", icon: "group" },
  { id: "gaming", label: "Gaming", badge: "New", icon: "gaming" },
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "save-post", label: "Save post", icon: "save" },
];

export const SUGGESTED_PEOPLE: SuggestedPerson[] = [
  { id: "p1", name: "Steve Jobs", role: "CEO of Apple", avatar: img("people1.png") },
  {
    id: "p2",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    avatar: img("people2.png"),
  },
  { id: "p3", name: "Dylan Field", role: "CEO of Figma", avatar: img("people3.png") },
];

export const FEED_EVENTS: FeedEvent[] = [
  {
    id: "e1",
    title: "No more terrorism no more cry",
    day: "10",
    month: "Jul",
    image: img("feed_event1.png"),
    going: 17,
  },
  {
    id: "e2",
    title: "No more terrorism no more cry",
    day: "10",
    month: "Jul",
    image: img("feed_event1.png"),
    going: 17,
  },
];

export const DESKTOP_STORIES: Story[] = [
  { id: "s0", name: "Your Story", image: img("card_ppl1.png"), isOwn: true },
  { id: "s1", name: "Ryan Roslansky", image: img("card_ppl2.png") },
  { id: "s2", name: "Ryan Roslansky", image: img("card_ppl3.png") },
  { id: "s3", name: "Ryan Roslansky", image: img("card_ppl4.png") },
];

export const MOBILE_STORIES: Story[] = [
  { id: "m0", name: "Your Story", image: img("mobile_story_img.png"), isOwn: true },
  { id: "m1", name: "Ryan...", image: img("mobile_story_img1.png"), state: "active" },
  { id: "m2", name: "Ryan...", image: img("mobile_story_img2.png"), state: "inactive" },
  { id: "m3", name: "Ryan...", image: img("mobile_story_img1.png"), state: "active" },
  { id: "m4", name: "Ryan...", image: img("mobile_story_img2.png"), state: "inactive" },
  { id: "m5", name: "Ryan...", image: img("mobile_story_img1.png"), state: "active" },
  { id: "m6", name: "Ryan...", image: img("mobile_story_img.png") },
  { id: "m7", name: "Ryan...", image: img("mobile_story_img1.png"), state: "active" },
];

export const NOTIFICATIONS: NotificationItem[] = Array.from({ length: 9 }).flatMap(
  (_, i) => [
    {
      id: `n-${i}-a`,
      image: img("friend-req.png"),
      highlight: "Steve Jobs",
      text: "posted a link in your timeline.",
      time: "42 miniutes ago",
    },
    {
      id: `n-${i}-b`,
      image: img("profile-1.png"),
      highlight: "Freelacer usa",
      text: "An admin changed the name of the group Freelacer usa",
      time: "42 miniutes ago",
    },
  ],
);

export const FRIENDS: FriendItem[] = [
  { id: "f1", name: "Steve Jobs", role: "CEO of Apple", avatar: img("people1.png"), online: false, lastSeen: "5 minute ago" },
  { id: "f2", name: "Ryan Roslansky", role: "CEO of Linkedin", avatar: img("people2.png"), online: true },
  { id: "f3", name: "Dylan Field", role: "CEO of Figma", avatar: img("people3.png"), online: true },
  { id: "f4", name: "Steve Jobs", role: "CEO of Apple", avatar: img("people1.png"), online: false, lastSeen: "5 minute ago" },
  { id: "f5", name: "Ryan Roslansky", role: "CEO of Linkedin", avatar: img("people2.png"), online: true },
  { id: "f6", name: "Dylan Field", role: "CEO of Figma", avatar: img("people3.png"), online: true },
  { id: "f7", name: "Dylan Field", role: "CEO of Figma", avatar: img("people3.png"), online: true },
  { id: "f8", name: "Steve Jobs", role: "CEO of Apple", avatar: img("people1.png"), online: false, lastSeen: "5 minute ago" },
];

export const RECOMMENDED: RecommendedPerson[] = [
  {
    id: "r1",
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
    avatar: img("Avatar.png"),
  },
];

const baseComment = {
  id: "c1",
  author: { id: "p1", name: "Radovan SkillArena", avatar: img("txt_img.png") },
  body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  reactions: 198,
  created_at: new Date(Date.now() - 21 * 60_000).toISOString(),
};

export const MOCK_POSTS: Post[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `post-${i + 1}`,
  author: { id: "u-karim", name: "Karim Saif", avatar: img("post_img.png") },
  title: "-Healthy Tracking App",
  content:
    "Sharing a quick look at the latest build. Feedback welcome — what would you add next?",
  image: img("timeline_img.png"),
  status: "public" as const,
  created_at: new Date(Date.now() - (i + 1) * 5 * 60_000).toISOString(),
  reactions: 9,
  reaction_avatars: [
    img("react_img1.png"),
    img("react_img2.png"),
    img("react_img3.png"),
    img("react_img4.png"),
    img("react_img5.png"),
  ],
  comment_count: 12,
  share_count: 122,
  previous_comments: 4,
  comments: [{ ...baseComment, id: `c-${i + 1}` }],
}));
