function NavItem({ children, link }) {
  return (
    <li className="nav-item">
      <a className="nav-link" href={link}>
        {children}
      </a>
    </li>
  );
}

export default NavItem;
