import { Icons } from "@/components/icons";
import { siteConfig } from "@/data/site";

export const DATA = {
  url: siteConfig.url,
  lastUpdated: siteConfig.lastUpdated,
  name: "Yaozhi Ye",
  description: "AI undergraduate at Renmin University of China",
  chinese: {
    name: "叶耀之",
  },
  navbar: [
    { href: "/", icon: Icons.home, label: "Home" },
    { href: "/blog", icon: Icons.notebook, label: "Blog" },
  ],
  location: "Beijing, China",
  locationLink: "https://www.openstreetmap.org/search?query=Beijing%2C%20China",
  discover: [
    { name: "Renmin University of China", url: "https://www.ruc.edu.cn/" },
    { name: "CS Self-Learning", url: "https://csdiy.wiki/" },
    {
      name: "yydslws's Blog",
      url: "https://yydslws-6g9r3ozbc664f0f2-1416454691.tcloudbaseapp.com/",
    },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/RUCmonk2",
        icon: Icons.github,
        footer: true,
      },
      Zhihu: {
        name: "Zhihu",
        url: "https://www.zhihu.com/people/monk-90-11",
        icon: Icons.zhihu,
        footer: true,
      },
      Xiaohongshu: {
        name: "Xiaohongshu",
        url: "https://www.xiaohongshu.com/user/profile/66cbd2a5000000001d021723",
        icon: Icons.xiaohongshu,
        footer: true,
      },
      email: {
        name: "Email",
        url: "mailto:36231219360@qq.com",
        icon: Icons.email,
        footer: false,
      },
    },
  },
} as const;

export function getEmail(): string {
  return DATA.contact.social.email.url;
}
