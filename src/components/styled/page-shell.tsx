"use client";

import styled from "styled-components";

export const PageShell = styled.main`
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(247, 249, 252, 1)),
    #f7f9fc;
`;

export const PageSection = styled.section`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0;
`;
