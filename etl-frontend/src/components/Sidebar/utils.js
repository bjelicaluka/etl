export const SidebarTogglerId = "unique-id-of-sidebar-toggler";

export function toggleSidebar() {
  const sidebarToggler = document.getElementById(SidebarTogglerId)
  sidebarToggler && sidebarToggler.click();
}