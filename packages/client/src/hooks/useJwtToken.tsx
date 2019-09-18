import React, { createContext, FC, useContext, useState } from 'react';

interface IJwtToken {
  jwt_token?: string;
  jwt_token_expiry?: string;
}

export type IJwtTokenContext = [IJwtToken, React.Dispatch<React.SetStateAction<IJwtToken>>];

const JwtTokenContext = createContext<IJwtTokenContext>([{}, () => {}]);

export const TokenProvider: FC = ({ children }) => (
  <JwtTokenContext.Provider value={useState<IJwtToken>({})}>{children}</JwtTokenContext.Provider>
);

const useJwtToken = () => useContext(JwtTokenContext);

export default useJwtToken;
