import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    theme: {
      mainBgColor: string;
      textColor: string;
      accentColor: string;
    };
  }
}
