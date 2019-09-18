import React, { FC } from 'react';

interface IProps {}

const Layout: FC<IProps> = ({ children }) => {
  return <div className="layout-container">{children}</div>;
};

export default Layout;
