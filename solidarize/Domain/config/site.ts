export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Solidarize",
	description: "Plataforma de doações",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Ongs",
      href: "/Ongs",
    },
    {
      label: "Doações",
      href: "/Donations",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
};
