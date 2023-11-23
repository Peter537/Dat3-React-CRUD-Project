function NavItem({ children, link, onClick }) {
  return (
    <li className="nav-item" onClick={onClick}>
      <a className="nav-link" href={link}>
        {children}
      </a>
    </li>
  );
}

export default NavItem;
