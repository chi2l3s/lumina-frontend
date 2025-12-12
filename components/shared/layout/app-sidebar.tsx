import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineFilm } from "react-icons/hi";
import { PiFilmSlateBold } from "react-icons/pi";
import { TbMovie, TbPresentationAnalytics } from "react-icons/tb";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";

const items = {
  main: {
    title: "Главная",
    items: [
      {
        title: "Обзор",
        href: "/",
        icon: GrHomeRounded,
      },
    ],
  },
  content: {
    title: "Контент",
    items: [
      {
        title: "Весь контент",
        href: "/content",
        icon: HiOutlineFilm,
      },
      {
        title: "Фильмы",
        href: "/content/films",
        icon: PiFilmSlateBold,
      },
      {
        title: "Сериалы",
        href: "/content/series",
        icon: TbMovie,
      },
    ],
  },
  videoProcessing: {
    title: "Обработка видео",
    items: [
      {
        title: "Очередь видео",
        href: "/processing",
        icon: RiUploadCloud2Fill,
      },
    ],
  },
  usersAndAnalytics: {
    title: 'Пользователи и аналитика',
    items: [
        {
            title: 'Пользователи',
            href: '/data/users',
            icon: HiUsers
        },
        {
            title: 'Аналитика',
            href: '/data/analytics',
            icon: TbPresentationAnalytics
        }
    ]
  }
};

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{items.main.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.main.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard${item.href}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{items.content.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.content.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard${item.href}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{items.videoProcessing.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.videoProcessing.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard${item.href}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{items.usersAndAnalytics.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.usersAndAnalytics.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard${item.href}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
