/**
 * Fixed full-screen wallpaper applied to every page (same grain wallpaper the
 * portfolio uses across pages). Separate mobile/desktop assets, sits at -z-10.
 * No overlay — the wallpaper shows through directly.
 */
export function AppBackground() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat block sm:hidden"
        style={{ backgroundImage: "url(/wallpaper/background-mobile-hd-grain.webp)" }}
      />
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat hidden sm:block"
        style={{ backgroundImage: "url(/wallpaper/background-desktop-hd-grain.webp)" }}
      />
    </>
  )
}
