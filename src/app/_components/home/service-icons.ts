import { Bot, Camera, Globe, Megaphone, Palette, Search, type LucideIcon } from "lucide-react";
import type { HomeServiceKey } from "./offer-copy";

export const SERVICE_ICONS: Readonly<Record<HomeServiceKey, LucideIcon>> = {
  identity: Palette,
  website: Globe,
  content: Camera,
  ads: Megaphone,
  seo: Search,
  ai: Bot,
};
