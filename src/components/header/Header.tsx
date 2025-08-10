export const Header = () => {
  const onToggle = () => {
    const el = document.documentElement;
    const next = el.dataset.theme === 'dark' ? 'light' : 'dark';
    el.dataset.theme = next;
    document.cookie = `theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  return (
    <header className="header">
      <a className="header__brand" href="/">
        🎬 MovieBrowser
      </a>
      <button className="header__toggle" type="button" onClick={onToggle} aria-label="Toggle theme">
        Toggle theme
      </button>
    </header>
  );
};
